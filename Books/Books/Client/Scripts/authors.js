const authorsApiUrl = "https://localhost:7195/api/Authors";
var user = JSON.parse(sessionStorage.getItem('user'));

$(document).ready(function () {

    async function getAllAuthorsFromDB() {
        await ajaxCall("GET", authorsApiUrl, "", getAllAuthorsFromDBSCB, getAllAuthorsFromDBECB);
    }

    function getAllAuthorsFromDBSCB(result) {
        console.log(result);
        renderAllAuthors(result);
    }

    function getAllAuthorsFromDBECB(err) {
        console.log(err);
    }

    function renderAllAuthors(authors) {
        var authorsContainer = $("#authors-container");
        authors.forEach(function (author) {
            var authorElement = $('<div>');
            authorElement.append('<img src="' + author.image + '" alt="author image" />');
            authorElement.append('<h3>' + author.name + '</h3>');
            authorElement.append('<p>' + 'Birth Date: ' + author.birthDate + '</p>');
            authorElement.append('<p>' + 'Death Date: ' + author.deathDate + '</p>');
            authorElement.append('<p>' + 'Top Work: ' + author.topWork + '</p>');
            authorElement.append('<p>' + 'Id: ' + author.id + '</p>');
            authorElement.append('<p>' + 'Description: ' + author.description + '</p>');

            authorsContainer.append(authorElement);

        });
    }

    getAllAuthorsFromDB();

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

    $(logoutbtn).click(function () {
        sessionStorage.clear();
        window.location.reload();
    });


    const registerbtn = document.getElementById("registerBtn");

    $(registerbtn).click(function () {
        window.location.href = "register.html";
    });

    const adminbtn = document.getElementById("adminBtn");

    $(adminBtn).click(function () {
        window.location.href = "admin.html";
    });

    const myBooks = document.getElementById("myBooksBtn");
    $(myBooks).click(function () {
        window.location.href = "myBooks.html";

    });


    // Check user status and display appropriate buttons
    if (user && !user.isAdmin) {
        $('#logoutBtn').show();
        $('#loginBtn').hide();
        $('#registerBtn').hide();
        $('#myBooksBtn').show();
        $('#adminBtn').hide();
    } else if (user && user.isAdmin) {
        $('#logoutBtn').show();
        $('#loginBtn').hide();
        $('#registerBtn').hide();
        $('#myBooksBtn').show();
        $('#adminBtn').show();
    } else {
        $('#logoutBtn').hide();
        $('#loginBtn').show();
        $('#registerBtn').show();
        $('#myBooksBtn').hide();
        $('#adminBtn').hide();
    }


});
