document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('timeline-container');


    [...timelineData].reverse().forEach((item, index) => {
        const entry = document.createElement('div');
        entry.className = 'timeline-entry mb-5 position-relative';

        // Flex html generation
        let flexHtml = '';
        if (item.flex) {
            flexHtml = `
                <div class="mt-3">
                    <button class="btn btn-sm btn-outline-secondary spoiler-btn" type="button" data-bs-toggle="collapse" data-bs-target="#flex-${index}" aria-expanded="false" aria-controls="flex-${index}">
                        Extras
                    </button>
                    <div class="collapse mt-2" id="flex-${index}">
                        <div class="card card-body bg-dark text-light border-secondary small">
                            ${item.flex}
                        </div>
                    </div>
                </div>
            `;
        }

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
                    ${flexHtml}
                </div>
            </div>
        `;

        container.appendChild(entry);
    });
});
