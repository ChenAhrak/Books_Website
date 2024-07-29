const apiUsersUrl = "https://localhost:7195/api/Users";

$(document).ready(function () {
    $('#loginForm').submit(function (event) {
        event.preventDefault();

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

        const loginData = {
            Email: email,
            Password: password
        };

        submitToServer(loginData);

        function submitToServer(loginData) {
            let api = apiUsersUrl + '/login';
            ajaxCall('POST', api, JSON.stringify(loginData), postSCBF, postECBF);
        }

        function postSCBF(response) {
            console.log(response);
            if (response) {
                sessionStorage.setItem('user', JSON.stringify(response));
                console.log(response);
                alert("Login successful.");
                if (response.isAdmin) window.location.href = "admin.html";
                else window.location.href = "index.html";
            } else {
                postECBF();
            }
        }

        function postECBF() {
            alert("User not found, Please register!");
        }
    });
});

$('#homeBtn').on('click', function () {
    window.location.href = "../Pages/index.html";
});

// will become redundant - to be removed later!
const registerPageBtn = document.getElementById("registerPageBtn");

registerPageBtn.addEventListener("click", function () {
    window.location.href = "../Pages/register.html";
});
