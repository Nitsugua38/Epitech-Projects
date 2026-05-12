document.addEventListener('DOMContentLoaded', function () {
    const searchInputs = document.querySelectorAll('.search-input');
    const inputQuoi = searchInputs[0];
    const inputOu = searchInputs[1];
    const jobGrid = document.querySelector('.job-grid');

    function showJobs(jobs) {
        let html = '';

        for (let i = 0; i < jobs.length; i++) {
            const job = jobs[i];
            let tags = '';

            for (let j = 0; j < job.tags.length; j++) {
                tags += `<span>${job.tags[j]}</span>`;
            }

            html += `
                <div class="job-card">
                    <div class="job-title">${job.title}</div>
                    <div class="job-company">${job.company}</div>
                    <div class="job-location">${job.location}</div>
                    <div class="job-tags">${tags}</div>
                </div>
            `;
        }

        if (jobGrid) {
            jobGrid.innerHTML = html;
        }
    }

    function searchJobs() {
        const queryQuoi = inputQuoi.value.toLowerCase().trim();
        const queryOu = inputOu.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.job-card');

        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            const title = card.querySelector('.job-title').textContent.toLowerCase();
            const company = card.querySelector('.job-company').textContent.toLowerCase();
            const location = card.querySelector('.job-location').textContent.toLowerCase();
            const tags = card.querySelector('.job-tags').textContent.toLowerCase();

            if ((title.includes(queryQuoi) || company.includes(queryQuoi) || tags.includes(queryQuoi)) && location.includes(queryOu)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        }
    }

    inputQuoi.addEventListener('input', searchJobs);
    inputOu.addEventListener('input', searchJobs);

    fetch('http://localhost:3000/api/jobs')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            showJobs(data.jobs || []);
            searchJobs();
        })
        .catch(function (error) {
            console.log(error);
        });
});