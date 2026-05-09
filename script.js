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
    document.getElementById('name').textContent = data.name;
    document.getElementById('email').textContent = data.email;
    document.getElementById('phone').textContent = data.phone;
}

function renderLanguages(languages) {
    const container = document.getElementById('languages-list');
    if (!container) return;
    container.innerHTML = '';
    
    if (!languages || languages.length === 0) {
        container.innerHTML = '<div class="text-muted">Нет данных</div>';
        return;
    }

    languages.forEach(lang => {
        const item = `
            <div class="lang-item">
                <div>
                    <strong style="font-size: 1.2rem;">${lang.name}</strong>
                    <p class="text-muted small mt-2 mb-0">Уровень: ${lang.level}</p>
                </div>
            </div>
        `;
        container.innerHTML += item;
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
        const item = `
            <div class="edu-item">
                <div>
                    <h5 class="fw-bold mb-2">${edu.degree}</h5>
                    <p class="mb-1">${edu.institution}</p>
                    <p class="text-muted small mb-0">Год окончания: ${edu.year}</p>
                </div>
            </div>
        `;
        container.innerHTML += item;
    });
}

async function renderResume() {
    const resume = await fetchData();
    if (resume) {
        if (resume.personal) renderPersonalInfo(resume.personal);
        if (resume.languages) renderLanguages(resume.languages);
        if (resume.education) renderEducation(resume.education);
    }
}

renderResume();