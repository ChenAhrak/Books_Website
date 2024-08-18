var user = JSON.parse(sessionStorage.getItem('user'));

$(document).ready(function () {


    $('#login').click(function () {

        window.location.href = "login.html";
    });
});
