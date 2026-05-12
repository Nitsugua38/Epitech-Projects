document.addEventListener("DOMContentLoaded", function () {

    const userLoggedIn = localStorage.getItem("token")
    if (!userLoggedIn) {
        return;
    } else {
        document.getElementById("public-view").style.display = "none";
        document.getElementById("private-view").style.display = "block";
        document.getElementById("btn-login").style.display = "none";
        document.getElementById("btn-signup").style.display = "none";
    }

    const searchInputs = document.querySelectorAll(".search-input");
    const inputQuoi = searchInputs[0];
    const inputOu = searchInputs[1];
    const jobGrid = document.getElementById("tinder-cards-container");

    let currentPage = 0;
    let isFetching = false;
    let loadedJobs = [];




    // Affichage des jobs

    function renderJobs(jobs, append = false) {
        if (!append) loadedJobs = [];
        loadedJobs = [...loadedJobs, ...jobs];
        let html = "";
        

        const loading = document.querySelector('.tinder-loading');
        if (loading) loading.remove();

        for (let i = 0; i < jobs.length; i++) {
            const job = jobs[i];
            let tags = "";

            for (let j = 0; j < job.tags.length; j++) {
                tags += `<span>${capitalize(job.tags[j])}</span>`;
            }
            if (job.profession) tags += `<span>${capitalize(job.profession)}</span>`;
            if (job.requiredExperience) tags += `<span>Exp: ${capitalize(job.requiredExperience)} ans</span>`;


            const zIndex = 10000 - (currentPage * 50 + i);

            const salaryHtml = job.salary 
                ? `<div class="job-salary"><i class="fa-solid fa-sack-dollar"></i> ${job.salary}</div>` 
                : `<div class="job-salary" style="color: #999;"><i class="fa-solid fa-sack-dollar"></i> Non précisé</div>`;

            const statsHtml = `
                <div class="job-details-extended">
                    <h4>Description</h4>
                    <p style="white-space: pre-wrap;">${job.descriptionPreview || 'Aucune description disponible.'}</p>
                    <h4>Informations complémentaires</h4>
                    <ul>
                        ${job.requiredExperience ? `<li><strong>Expérience requise :</strong> ${job.requiredExperience} ans</li>` : ''}
                        ${job.remotePolicy ? `<li><strong>Télétravail :</strong> ${job.remotePolicy}</li>` : ''}
                        ${job.profession ? `<li><strong>Profession :</strong> ${job.profession}</li>` : ''}
                        ${job.skills && job.skills.length > 0 ? `<li><strong>Compétences demandées:</strong> ${job.skills.join(', ')}</li>` : ''}
                        ${job.publishDate ? `<li><strong>Publié le :</strong> ${new Date(Math.floor(job.publishDate / 1000)).toLocaleDateString('fr-FR')}</li>` : ''}
                    </ul>
                </div>
            `;

            const imageHtml = job.companyLogo 
                ? `<div class="job-image" style="background-image: url('${job.companyLogo}');"></div>`
                : `<div class="job-image no-job-image"><i class="fa-solid fa-building"></i></div>`;

            html += `
                <div class="tinder-card job-card" data-id="${job.id}" style="z-index: ${zIndex};" onclick="this.classList.add('expanded')">
                    ${imageHtml}
                    <div class="tinder-card-content">
                        <div class="job-title">${job.title}</div>
                        <div class="job-company">${job.company}</div>
                        <div class="job-location"><i class="fa-solid fa-location-dot"></i> ${job.location}</div>
                        ${salaryHtml}
                        <div class="job-tags">${tags}</div>
                        ${statsHtml}
                    </div>
                </div>
            `;
        }

        if (append) {
            jobGrid.innerHTML += html;
        } else {
            jobGrid.innerHTML = html;
        }
    }




    // Récupération des jobs sur le back, par bloc de 50

    function fetchJobs(page = 0, append = false) {
        let url = `http://localhost:3000/api/jobs?page=${page}&size=50`;
        const token = localStorage.getItem("token");

        fetch(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            renderJobs(data.jobs || [], append);
            searchJobs();
        })
        .catch(error => {
            console.error("Error fetching jobs:", error);
        });
    }







    // Trier les jobs
    

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


    inputQuoi.addEventListener("input", searchJobs);
    inputOu.addEventListener("input", searchJobs);


    





    // Swiper pour enlever ou postuler à un job

    function swipeJob(direction) {
        const cards = Array.from(document.querySelectorAll(".job-card")).filter(c => c.style.display !== "none");
        if (cards.length === 0) return;
        
        const topCard = cards[0];
        const jobId = topCard.getAttribute("data-id");
        
        if (direction === "right") {
            const jobData = loadedJobs.find(j => j.id == jobId);
            if (jobData) {
                const token = localStorage.getItem("token");
                fetch("http://localhost:3000/api/jobs/apply", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ job: jobData })
                })
                .then(r => r.json())
                .then(data => console.log("Applied:", data))
                .catch(err => console.error("Error applying:", err));
            }
            topCard.style.transform = "translate(100vw, 20px) rotate(20deg)";
        }
        
        else if (direction === "left") topCard.style.transform = "translate(-100vw, 20px) rotate(-20deg)";
        
        topCard.style.opacity = "0";
        setTimeout(() => topCard.remove(), 500);


        if (cards.length <= 5 && !isFetching) {
            isFetching = true;
            currentPage++;
            fetchJobs(currentPage, true);
            setTimeout(() => {
                isFetching = false;
            }, 2000);
        }
    }

    document.getElementById("btn-nope").addEventListener("click", () => swipeJob("left"));
    document.getElementById("btn-like").addEventListener("click", () => swipeJob("right"));




    // Affichage des 50 premiers jobs au chargement
    
    fetchJobs(currentPage, false);
});







function capitalize(string) {
    if (!string) return "";
    string = String(string);
    return string.slice(0, 1).toUpperCase() + string.slice(1);
}
