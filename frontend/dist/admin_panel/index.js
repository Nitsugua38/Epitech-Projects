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
    loadUsers();
});

async function loadUsers() {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch("http://localhost:3000/api/users", {
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

        document.getElementById("total-users").innerText = data.total;

        const tbody = document.getElementById("users-table-body");
        tbody.innerHTML = "";

        for (let i = 0; i < data.users.length; i++) {
            const user = data.users[i];
            const tr = document.createElement("tr");

            const n = user.nom || "";
            const p = user.prenom || "";

            const htmlString = "<td>" + user.id + "</td>" +
                "<td>" + user.email + "</td>" +
                "<td>" + n + "</td>" +
                "<td>" + p + "</td>" +
                "<td>" + user.role + "</td>" +
                "<td><button class='edit-btn' onclick='openEditRole(" + user.id + ", \"" + user.role + "\")'>Modifier</button></td>";

            tr.innerHTML = htmlString;
            tbody.appendChild(tr);
        }
    } catch (error) {
        console.error(error);
    }
}

function openEditRole(id, role) {
    document.getElementById("edit-id").value = id;
    document.getElementById("edit-role").value = role;
    document.getElementById("edit-role-modal").style.display = "block";
}

function closeEditRole() {
    document.getElementById("edit-role-modal").style.display = "none";
}

async function submitEditRole() {
    const id = document.getElementById("edit-id").value;
    const role = document.getElementById("edit-role").value;
    const token = localStorage.getItem("token");

    const bodyData = JSON.stringify({ role: role });

    try {
        const res = await fetch("http://localhost:3000/api/users/" + id + "/role", {
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
            closeEditRole();
            loadUsers();
        } else {
            alert("Erreur lors de la modification du rôle");
        }
    } catch (e) {
        console.error(e);
    }
}