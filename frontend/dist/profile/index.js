document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    if (!token) {
        return window.location.href = "../connexion/";
    }

    const btnLogin = document.getElementById("btn-login");
    const btnSignup = document.getElementById("btn-signup");
    btnLogin.style.display = "none";
    btnSignup.innerText = "Déconnexion";
    btnSignup.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "../connexion/";
    });

    fetchProfile(token);
    fetchDataFeature(token);
    fetchRecommendations(token);
});






function fetchProfile(token) {
    fetch("http://localhost:3000/api/user", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => {
        if (res.status === 401) return window.location.href = "../connexion/";
        return res.json();
    })
    .then(data => {
        document.getElementById("account-name").innerHTML = `<i class="fa-solid fa-user"></i> ${data.user.prenom} ${data.user.nom}`;
        document.getElementById("account-email").innerHTML = `<i class="fa-solid fa-envelope"></i> ${data.user.email}`;
        document.getElementById("account-username").innerHTML = `<i class="fa-solid fa-briefcase"></i> Role: ${data.user.role == "user" ? "Candidat" : "Administrateur"}`;
        
        const cvDiv = document.getElementById("account-cv");
        if (data.user.cv) {
            cvDiv.innerHTML = `<i class="fa-solid fa-file-pdf"></i> CV uploadé : ${data.user.cv.substring(data.user.cv.lastIndexOf("/") + 1)}`;
        } else {
            cvDiv.innerHTML = `<i class="fa-solid fa-file-pdf"></i> Pas encore de CV !`;
        }

        cvDiv.innerHTML += `
            <div class="upload-cv-div">
                <input type="file" id="cv-upload-input" accept=".pdf"/>
                <button id="btn-upload-cv">Uploader</button>
            </div>`

        document.getElementById("btn-upload-cv").addEventListener("click", () => {
            const fileInput = document.getElementById("cv-upload-input");
            if (!fileInput.files || fileInput.files.length === 0) {
                return alert("Veuillez sélectionner un fichier");
            }

            const formData = new FormData();
            formData.append("cv", fileInput.files[0]);

            fetch("http://localhost:3000/api/user/cv", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            })
            .then(r => r.json())
            .then(uploadData => {
                if (uploadData.error) {
                    alert("Erreur lors de l'upload");
                } else {
                    window.location.reload();
                }
            })
            .catch(err => console.error(err));
        });
    })
    .catch(err => console.error(err));
}

function showRecommendations(recommendations) {
    const output = document.getElementById("ia-output");
    if (!recommendations || recommendations.length === 0) {
        output.innerHTML = `<p class="no-results">Aucune recommandation trouvée pour le moment. Upload ton CV et réessaie.</p>`;
        return;
    }

    output.innerHTML = recommendations.map(job => `
        <div class="job-card">
            <div class="job-card-header">
                <h3>${job.title}</h3>
                <span>${job.company}</span>
            </div>
            <p class="job-description">${job.descriptionPreview || job.description || "Description non disponible."}</p>
            <p><strong>Localisation :</strong> ${job.location || "Non précisé"}</p>
            <p><strong>Score de pertinence :</strong> ${Math.round(job.relevanceScore || 0)}</p>
            ${job.tags && job.tags.length ? `<p class="job-tags">${job.tags.map(tag => `<span class="tag">${tag}</span>`).join(" ")}</p>` : ""}
        </div>
    `).join("");
}

function showRecommendationError(message) {
    document.getElementById("ia-output").innerHTML = `<p class="ia-error">${message}</p>`;
}

function fetchRecommendations(token) {
    fetch("http://localhost:3000/api/recommendations", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => {
        if (res.status === 401) return window.location.href = "../connexion/";
        if (res.status === 400) return res.json().then(data => { throw new Error(data.error || "Aucun CV trouvé"); });
        return res.json();
    })
    .then(data => {
        showRecommendations(data.recommendations);
    })
    .catch(err => {
        if (err.message === "No CV found" || err.message === "Aucun CV trouvé") {
            showRecommendationError("Téléversez votre CV pour obtenir des recommandations IA.");
        } else {
            console.error(err);
            showRecommendationError("Impossible de charger les recommandations IA pour le moment.");
        }
    });
}


function fetchDataFeature(token) {
    fetch("http://localhost:3000/api/datafeature", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => {
        if (res.status === 401) return window.location.href = "../connexion/";
        return res.json();
    })
    .then(data => {
        const output = document.getElementById("data-output");
        
        let html = `
            <div class="profile-stats-card">
                <h3 class="profile-match-title">Ton Match Score : ${data.matchScore}%</h3>
                <p>Candidatures acceptées : <strong>${data.accepted}</strong></p>
            </div>
            
            <div class="profile-stats-card">
                <h3>Distribution des salaires des offres likées</h3>
                <ul class="salary-list">
        `;

        if (data.salaryDistribution) {
            for (const [range, count] of Object.entries(data.salaryDistribution)) {
                if (count > 0) {
                    html += `<li class="salary-list-item">
                        <span>${range}</span>
                        <span class="salary-count">${count}</span>
                    </li>`;
                }
            }
        }

        html += `</ul></div>`;
        output.innerHTML = html;
    })
    .catch(err => console.error(err));
}
