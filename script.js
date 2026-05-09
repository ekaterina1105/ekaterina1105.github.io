async function fetchData() {
    try {
        const response = await fetch('resume.json');
        if (!response.ok) throw new Error('Ошибка загрузки');
        return await response.json();
    } catch (error) {
        console.error('Ошибка:', error);
        return null;
    }
}

function renderPersonalInfo(data) {
    if (data.name) document.getElementById('name').textContent = data.name;
    if (data.email) document.getElementById('email').textContent = data.email;
    if (data.phone) document.getElementById('phone').textContent = data.phone;
    if (data.city) document.getElementById('city').textContent = data.city;
}

function renderSkills(skills) {
    const container = document.getElementById('skills-list');
    if (!container) return;
    container.innerHTML = '';
    
    if (!skills || skills.length === 0) {
        container.innerHTML = '<div class="text-muted">Нет данных</div>';
        return;
    }

    skills.forEach(skil => {
        const item = '<div class="skill-item"><div><strong style="font-weight: normal;">' + skil + '</span></div>';
        container.innerHTML = container.innerHTML + item;
    });
}

function renderEducation(education) {
    const container = document.getElementById('education-list');
    if (!container) return;
    container.innerHTML = '';
    
    if (!education || education.length === 0) {
        container.innerHTML = '<div class="text-muted">Нет данных</div>';
        return;
    }

    education.forEach(edu => {
        const item = '<div class="edu-item"><div><h5 class="fw-bold mb-2">' + edu.university + '</h5><p class="mb-1">Уровень образования: ' + edu.degree + '</h5><p class="mb-1">Институт: ' + edu.institution + '</h5><p class="mb-1">Направление подготовки: ' + edu.direction + '</h5><p class="mb-1">Образовательная программа: ' + edu.program + '</p><p class="mb-1">Год окончания: ' + edu.year + '</p></div></div>';
        container.innerHTML = container.innerHTML + item;
    });
}

async function renderResume() {
    const resume = await fetchData();
    if (resume) {
        if (resume.personal) renderPersonalInfo(resume.personal);
        if (resume.skills) renderSkills(resume.skills);
        if (resume.education) renderEducation(resume.education);
    }
}

renderResume();