document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "../connexion/";
        return;
    }
    const btnLogin = document.getElementById("btn-login");
    const btnSignup = document.getElementById("btn-signup");
    
    if (btnLogin) {
        btnLogin.style.display = "none";
    }
    if (btnSignup) {
        btnSignup.innerText = "Déconnexion";
        btnSignup.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("token");
            window.location.href = "../connexion/";
        });
    }
    loadApplications();
});

async function loadApplications() {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch("http://localhost:3000/api/company/applications", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (response.status === 401 || response.status === 403) {
            window.location.href = "../acces/";
            return;
        }

        if (response.ok === false) {
            throw new Error("Erreur réseau");
        }
        
        const data = await response.json();
        const tbody = document.getElementById("applications-table-body");
        if (!tbody) return;
        tbody.innerHTML = "";
        for (let i = 0; i < data.applications.length; i++) {
            const app = data.applications[i];
            const tr = document.createElement("tr");
            const n = app.nom || "";
            const p = app.prenom || "";
            
            let cvHtml = "Pas de CV";
            if (app.cv) {
                const fileName = app.cv.substring(app.cv.lastIndexOf("/") + 1);
                cvHtml = "<a href='http://localhost:3000/api/company/cv/" + fileName + "?token=" + token + "' target='_blank' class='cv-link'><i class='fa-solid fa-file-pdf'></i> " + fileName + "</a>";
            }

            const htmlString = "<td>" + app.user_id + "</td>" +
                "<td>" + app.title + "</td>" +
                "<td>" + n + "</td>" +
                "<td>" + p + "</td>" +
                "<td>" + app.email + "</td>" +
                "<td>" + cvHtml + "</td>" +
                "<td>" + app.status + "</td>" +
                "<td><button class='edit-btn' onclick='openStatusModal(" + app.id + ", \"" + app.status + "\")'>Modifier</button></td>";

            tr.innerHTML = htmlString;
            tbody.appendChild(tr);
        }
    } catch (error) {
        console.error(error);
    }
}

function openStatusModal(appId, status) {
    document.getElementById("edit-app-id").value = appId;
    document.getElementById("edit-status").value = status;
    document.getElementById("edit-status-modal").style.display = "block";
}

function closeStatusModal() {
    document.getElementById("edit-status-modal").style.display = "none";
}

async function submitEditStatus() {
    const appId = document.getElementById("edit-app-id").value;
    const status = document.getElementById("edit-status").value;
    const token = localStorage.getItem("token");

    const bodyData = JSON.stringify({ status: status });

    try {
        const res = await fetch("http://localhost:3000/api/company/applications/" + appId + "/status", {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: bodyData
        });

        if (res.status === 401 || res.status === 403) {
            window.location.href = "../acces/";
            return;
        }

        if (res.ok === true) {
            closeStatusModal();
            loadApplications();
        } else {
            alert("Erreur lors de la modification du statut");
        }
    } catch (e) {
        console.error(e);
    }
}