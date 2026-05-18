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
});