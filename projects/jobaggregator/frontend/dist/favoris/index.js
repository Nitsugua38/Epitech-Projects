document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    if (!token) {
        return window.location.href = "../connexion/";
    }

    const btnLogout = document.getElementById("btn-logout");
    btnLogout.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "../connexion/";
    });

    fetchFavorites(token);
});

function fetchFavorites(token) {
    fetch("http://localhost:3000/api/favorites", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => {
        if (res.status === 401) return window.location.href = "../connexion/";
        return res.json();
    })
    .then(data => {
        const container = document.getElementById("favorites-container");

        if (data.favorites && data.favorites.length > 0) {
            container.innerHTML = data.favorites.map(job => `
                <div class="job-card" data-id="${job.offer_id}">
                    <div class="job-title">${job.title}</div>
                    <div class="job-company">${job.company}</div>
                    <div class="job-location"><i class="fa-solid fa-location-dot"></i> ${job.location}</div>
                    <button class="btn-login" onclick='removeFavorite("${job.offer_id}")' style="margin-top: 15px; width: 100%; padding: 8px; border-radius: 8px;">Retirer</button>
                </div>
            `).join('');
        } else {
            container.innerHTML = "<p style='text-align:center; color:#555; width: 100%;'>Tu n'as pas encore postulé à des offres.</p>";
        }
    })
    .catch(err => console.error(err));
}

function removeFavorite(jobId) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/api/favorites/${jobId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(() => {
        fetchFavorites(token);
    })
    .catch(err => console.error(err));
}