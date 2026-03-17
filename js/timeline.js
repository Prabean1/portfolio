document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('timeline-container');

    for (let i = timelineData.length - 1; i >= 0; i--) {
        const item = timelineData[i];
        const entry = document.createElement('div');
        entry.className = 'timeline-entry mb-5 position-relative';

        entry.innerHTML = `
            <div class="row">
                <div class="col-md-3 text-md-end">
                    <span class="badge bg-primary-subtle text-primary mb-2 mb-md-0">${item.period}</span>
                </div>
                <div class="col-md-9 border-start border-secondary ps-4 position-relative timeline-content">
                    <div class="timeline-dot bg-primary position-absolute rounded-circle"></div>
                    <h4 class="text-white fw-bold">${item.title}</h4>
                    <h6 class="text-muted mb-3">${item.subtitle} ${item.subtitle2 ? `| ${item.subtitle2}` : ''}</h6>
                    <p class="text-light">${item.desc}</p>
                </div>
            </div>
        `;

        container.appendChild(entry);
    }
});
