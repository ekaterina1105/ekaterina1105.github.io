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

    let items = '';
    skills.forEach(skill => {
        items = items + '<li style="margin-bottom: 8px;">' + skill + '</li>';
    });
    
    const box = '<div class="edu-item" style="width: 100%;"><div><ul style="margin: 0; padding-left: 20px;">' + items + '</ul></div></div>';
    container.innerHTML = box;
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

    function renderSoftskills(softskills) {
        const container = document.getElementById('softskills-list');
        if (!container) return;
        container.innerHTML = '';
        
        if (!softskills || softskills.length === 0) {
            container.innerHTML = '<div class="text-muted">Нет данных</div>';
            return;
        }

        let items = '';
        softskills.forEach(item => {
            items = items + '<li style="margin-bottom: 8px;">' + item + '</li>';
        });
        
        const box = '<div class="edu-item" style="width: 100%;"><div><ul style="margin: 0; padding-left: 20px;">' + items + '</ul></div></div>';
        container.innerHTML = box;
    }

    function renderAdditional(additional, intro, outro, outroList, linkText, linkUrl, secondPhrase, secondLinkText, secondLinkUrl, thirdPhrase, thirdLinkText, thirdLinkUrl) {
        const container = document.getElementById('additional-list');
        if (!container) return;
        container.innerHTML = '';
        
        if (!additional || additional.length === 0) {
            container.innerHTML = '<div class="text-muted">Нет данных</div>';
            return;
        }

        let items = '';
        additional.forEach(item => {
            items = items + '<li>' + item + '</li>';
        });
        
        let introHtml = '';
        if (intro) {
            introHtml = '<p style="margin-bottom: 15px; font-weight: 500;">' + intro + '</p>';
        }
        
        let outroHtml = '';
        if (outro) {
            outroHtml = '<p style="margin-top: 15px; font-weight: 500;">' + outro + '</p>';
        }
        
        let outroItems = '';
        if (outroList && outroList.length > 0) {
            outroList.forEach(item => {
                outroItems = outroItems + '<li>' + item + '</li>';
            });
            outroHtml = outroHtml + '<ul style="margin: 10px 0 0 0; padding-left: 20px;">' + outroItems + '</ul>';
        }
        
        let linkHtml = '';
        if (linkText && linkUrl) {
            linkHtml = '<p style="margin-top: 15px; font-weight: 500;">' + linkText + ' <a href="' + linkUrl + '" target="_blank" style="color: #3b82f6; text-decoration: none;">' + linkUrl + '</a></p>';
        }
        
        let secondLinkHtml = '';
        if (secondPhrase && secondLinkText && secondLinkUrl) {
            secondLinkHtml = '<p style="margin-top: 15px; font-weight: 500;">' + secondPhrase + ' <a href="' + secondLinkUrl + '" target="_blank" style="color: #3b82f6; text-decoration: none;">' + secondLinkText + '</a></p>';
        }
        
        let thirdLinkHtml = '';
        if (thirdPhrase && thirdLinkText && thirdLinkUrl) {
            thirdLinkHtml = '<p style="margin-top: 15px; font-weight: 500;">' + thirdPhrase + ' <a href="' + thirdLinkUrl + '" target="_blank" style="color: #3b82f6; text-decoration: none;">' + thirdLinkText + '</a></p>';
        }
        
        const box = '<div class="edu-item" style="width: 100%;"><div>' + introHtml + '<ul style="margin: 0; padding-left: 20px;">' + items + '</ul>' + outroHtml + linkHtml + secondLinkHtml + thirdLinkHtml + '</div></div>';
        container.innerHTML = box;
    }

async function renderResume() {
    const resume = await fetchData();
    if (resume) {
        if (resume.personal) renderPersonalInfo(resume.personal);
        if (resume.skills) renderSkills(resume.skills);
        if (resume.education) renderEducation(resume.education);
        if (resume.softskills) renderSoftskills(resume.softskills);
        if (resume.additional) renderAdditional(
        resume.additional, 
        resume.additionalIntro, 
        resume.additionalOutro, 
        resume.additionalOutroList,
        resume.additionalLinkText,
        resume.additionalLinkUrl,
        resume.additionalSecondPhrase,
        resume.additionalSecondLinkText,
        resume.additionalSecondLinkUrl,
        resume.additionalThirdPhrase,
        resume.additionalThirdLinkText,
        resume.additionalThirdLinkUrl
    );
    }
}

renderResume();