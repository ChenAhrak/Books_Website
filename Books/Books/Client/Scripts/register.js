const apiUsersUrl = "https://localhost:7195/api/Users";

$(document).ready(function () {
    $('#registerForm').submit(function (event) {
        event.preventDefault();

        const name = $('#name').val();
        const email = $('#email').val();
        const password = $('#password').val();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Invalid email format.");
            return;
        }

        if (password.length < 4) {
            alert("Password must be at least 4 characters long.");
            return;
        }

        const newUser = {
            userName: name,
            Email: email,
            Password: password
        };

        function submitToServer(newUser) {
            ajaxCall("POST", apiUsersUrl, JSON.stringify(newUser), postSCBF, postECBF);
        }

        function postSCBF(response) {
            alert("Registration successful.");
            autoLogin();

        }

        function postECBF(err) {
            alert("User with this email already exists.");
            console.log(err);
        }

        function autoLogin() {
            let api = apiUsersUrl + '/login';
            let userDetails = { Email: newUser.Email, Password: newUser.Password };
            ajaxCall("POST", api, JSON.stringify(userDetails), postLoginSCBF, postLoginECBF);
        }

        function postLoginSCBF(response) {
            if (response) {
                sessionStorage.setItem('user', JSON.stringify(response));
                console.log(response);
                if (response.isAdmin) window.location.href = "admin.html";
                else window.location.href = "index.html";
            }
        }

        function postLoginECBF(err) {
            console.log(err);
        }

        submitToServer(newUser);
    });
});

// will become redundant - to be removed later!
const loginPageBtn = document.getElementById("loginPageBtn");

loginPageBtn.addEventListener("click", function () {
    window.location.href = "../Pages/login.html";
});

$('#homeBtn').on('click', function () {
    window.location.href = "../Pages/index.html";
});

