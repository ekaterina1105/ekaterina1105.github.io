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
        const levelClass = (lang.level && (lang.level.includes('Родной') || lang.level.includes('C2'))) ? 'bg-primary text-white' : 'bg-info bg-opacity-25 text-dark';
        const item = `
            <div class="lang-item">
                <div class="d-flex justify-content-between align-items-center flex-wrap">
                    <strong style="font-size: 1.2rem;">${escapeHtml(lang.name)}</strong>
                    <span class="level-badge ${levelClass} mt-1 mt-sm-0">${escapeHtml(lang.level)}</span>
                </div>
                <p class="text-muted small mt-2 mb-0"><i class="fas fa-comment-dots"></i> Уровень владения: ${escapeHtml(lang.level)}</p>
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
                <div class="d-flex align-items-center gap-2 mb-2">
                    <i class="fas fa-award text-primary" style="font-size: 1.3rem;"></i>
                    <h5 class="fw-bold mb-0" style="font-size: 1.1rem;">${escapeHtml(edu.degree)}</h5>
                </div>
                <p class="mb-1"><i class="fas fa-university me-2 text-secondary"></i>${escapeHtml(edu.institution)}</p>
                <p class="text-muted small mb-0"><i class="far fa-calendar-alt me-1"></i>Год окончания: ${escapeHtml(edu.year)}</p>
            </div>
        `;
        container.innerHTML += item;
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

async function renderResume() {
    const resume = await fetchData();
    if (resume) {
        if (resume.personal) renderPersonalInfo(resume.personal);
        if (resume.languages) renderLanguages(resume.languages);
        if (resume.education) renderEducation(resume.education);
    } else {
        document.body.innerHTML += '<div class="alert alert-danger m-5">⚠️ Не удалось загрузить данные resume.json</div>';
    }
}

renderResume();