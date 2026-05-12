document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.auth-form');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');

    if (!form) {
        return;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then(function (response) {
                return response.json().then(function (data) {
                    return {
                        ok: response.ok,
                        data: data,
                    };
                });
            })
            .then(function (result) {
                if (result.ok) {
                    if (result.data.token) {
                        localStorage.setItem('token', result.data.token);
                    }
                    alert('Connexion reussie.');
                    window.location.href = '../index.html';
                    return;
                }

                alert(result.data.error || 'Identifiants invalides.');
            })
            .catch(function () {
                alert('Impossible de contacter le serveur.');
            });
    });
});
