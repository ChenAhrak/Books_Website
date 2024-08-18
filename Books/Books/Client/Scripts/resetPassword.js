apiUsersUrl = "https://localhost:7195/api/Users";
var user = JSON.parse(sessionStorage.getItem('user'));

$(document).ready(function () {

    $('#loginForm').submit(function (event) {
        event.preventDefault();


        var password = $('#password').val();
        var confirmPassword = $('#confirmPassword').val();

        if (password.length < 3) {
            alert("Password must be at least 4 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }



    });




});