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

    function renderAdditional(data) {
    const container = document.getElementById('additional-list');
    if (!container) return;
    container.innerHTML = '';
    
    let html = '<div class="edu-item" style="width: 100%;"><div>';
    
    if (data.additionalIntro) {
        html = html + '<p style="margin-bottom: 15px; font-weight: 500;">' + data.additionalIntro + '</p>';
    }
    
    if (data.additional && data.additional.length > 0) {
        html = html + '<ul style="margin: 0 0 15px 0; padding-left: 20px;">';
        data.additional.forEach(item => {
            html = html + '<li>' + item + '</li>';
        });
        html = html + '</ul>';
    }
    
    if (data.additionalOutro) {
        html = html + '<p style="margin-top: 15px; font-weight: 500;">' + data.additionalOutro + '</p>';
    }
    
    if (data.additionalOutroList && data.additionalOutroList.length > 0) {
        html = html + '<ul style="margin: 0 0 15px 0; padding-left: 20px;">';
        data.additionalOutroList.forEach(item => {
            html = html + '<li>' + item + '</li>';
        });
        html = html + '</ul>';
    }
    
    if (data.additionalLinkText && data.additionalLinkUrl) {
        html = html + '<p style="margin-top: 15px; font-weight: 500;">' + data.additionalLinkText + ' <a href="' + data.additionalLinkUrl + '" target="_blank" style="color: #3b82f6; text-decoration: none;">' + data.additionalLinkUrl + '</a></p>';
    }
    
    if (data.additionalThirdPhrase && data.additionalThirdLinkUrl) {
        html = html + '<p style="margin-top: 15px; font-weight: 500;">' + data.additionalThirdPhrase + ' <a href="' + data.additionalThirdLinkUrl + '" target="_blank" style="color: #3b82f6; text-decoration: none;">' + (data.additionalThirdLinkText || data.additionalThirdLinkUrl) + '</a></p>';
    }
    
    html = html + '</div></div>';
    container.innerHTML = html;
}

async function renderResume() {
    const resume = await fetchData();
    if (resume) {
        if (resume.personal) renderPersonalInfo(resume.personal);
        if (resume.skills) renderSkills(resume.skills);
        if (resume.education) renderEducation(resume.education);
        if (resume.softskills) renderSoftskills(resume.softskills);
        renderAdditional(resume);
        setupPDFDownload();
    }
}

function setupPDFDownload() {
    const button = document.getElementById('downloadPDF');
    if (!button) return;
    
    button.addEventListener('click', async function() {
        const element = document.querySelector('.glass-card');
        const { jsPDF } = window.jspdf;
        
        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            });
            
            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            let position = 0;
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            
            if (imgHeight > pageHeight) {
                let heightLeft = imgHeight - pageHeight;
                position = -pageHeight;
                while (heightLeft > 0) {
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                    position -= pageHeight;
                }
            }
            
            pdf.save('resume_ekaterina.pdf');
        } catch (error) {
            console.error('Ошибка:', error);
        }
    });
}

renderResume();