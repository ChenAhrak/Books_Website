const authorsBtn = document.getElementById("authorsBtn");
//jquery click event
$(authorsBtn).click(function () {
    window.location.href = "authors.html";
});

const loginBtn = document.getElementById("loginBtn");
$(loginBtn).click(function () {
    window.location.href = "login.html";
});

const logoutbtn = document.getElementById("logoutBtn");

$(logoutbtn).click( function () {
    localStorage.clear();
    window.location.reload();
});


const registerbtn = document.getElementById("registerBtn");

$(registerbtn).click(function () {
    window.location.href = "register.html";
});

const adminbtn = document.getElementById("adminbtn");

Adminbtn.addEventListener("click", function () {
    window.location.href = "admin.html";
});

// Check user status and display appropriate buttons
if (user && !user.isAdmin) {
    $('#logoutBtn').show();
    $('#loginBtn').hide();
    $('#Registerbtn').hide();
    $('#myCourses').show();
    $('#Adminbtn').hide();
} else if (user && user.isAdmin) {
    $('#logoutBtn').show();
    $('#loginBtn').hide();
    $('#Registerbtn').hide();
    $('#myCourses').show();
    $('#Adminbtn').show();
} else {
    $('#logoutBtn').hide();
    $('#loginBtn').show();
    $('#Registerbtn').show();
    $('#myCourses').hide();
    $('#Adminbtn').hide();
}

