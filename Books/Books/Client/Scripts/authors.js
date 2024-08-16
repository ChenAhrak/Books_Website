const authorsApiUrl = "https://localhost:7195/api/Authors";
const allAuthors = [];
var user = JSON.parse(sessionStorage.getItem('user'));
var modal = $('#authorsModal');
var span = $('.close');

$(document).ready(function () {

    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('toggle-mode').checked = true; // Set checkbox to checked if dark mode
    } else if (currentTheme === 'light') {
        document.body.classList.remove('dark-mode');
        document.getElementById('toggle-mode').checked = false; // Set checkbox to unchecked if light mode
    }

    // Event listener to toggle the theme and save it in localStorage
    document.getElementById('toggle-mode').addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    async function getAllAuthorsFromDB() {
        await ajaxCall("GET", authorsApiUrl, "", getAllAuthorsFromDBSCB, getAllAuthorsFromDBECB);
    }

    function getAllAuthorsFromDBSCB(result) {
        console.log(result);
        allAuthors.push(result);
        renderAllAuthors(result);
    }

    function getAllAuthorsFromDBECB(err) {
        console.log(err);
    }

    function renderAllAuthors(authors) {
        var authorsContainer = $("#authors-container");
        authorsContainer.empty();
        authors.forEach(function (author) {
            var authorElement = $('<div class="author" data-author-id="' + author.id + '">');
            authorElement.append('<img src="' + author.image + '" alt="author image" />');
            authorElement.append('<h3>' + author.name + '</h3>');
            authorElement.append('<p>' + 'Birth Date: ' + author.birthDate + '</p>');
            authorElement.append('<p>' + 'Death Date: ' + author.deathDate + '</p>');
            authorElement.append('<p>' + 'Top Work: ' + author.topWork + '</p>');
            authorElement.append('<p>' + 'Description: ' + author.description + '</p>');
            var authorBooks = $('<p class="author-books">' + 'Books ' + '</p>');
            authorElement.append(authorBooks);
            authorsContainer.append(authorElement);

            addAuthorClickHandlers(authorBooks, author.id); // Add click handlers after rendering authors
        });

    }

    function searchAuthorName() {
        const query = $('#search-input').val();
        const filterdAuthors = []
        allAuthors.forEach(function (authors) {
            authors.forEach(function (author) {
                if (author.name.toLowerCase().includes(query.toLowerCase())) {
                    filterdAuthors.push(author);
                }
            });
        });

        renderAllAuthors(filterdAuthors);
    }


    modal.css('display', 'none');
    span.on('click', function () {
        modal.css('display', 'none');
    });

    $(window).on('click', function (event) {
        if (event.target === $('#authorsModal')[0]) {
            $('#authorsModal').hide();
        }
    });

    async function getBooksByAuthor(authorId) {
        ajaxCall("GET", `${authorsApiUrl}/GetBooksByAuthor${authorId}`, "", getBooksByAuthorSCB, getBooksByAuthorECB);
       
    }

    function getBooksByAuthorSCB(result){
        console.log(result);
        renderBooksByAuthor(result);
    }

    function getBooksByAuthorECB(err) {
        console.log(err);
    }

    function renderBooksByAuthor(books) {
        var modalContent = $('#modal-content');

        books.forEach(book => {
            const bookElement = $('<div class="book">');
            bookElement.append('<img src="' + book.image + '" alt="book image" />');
            bookElement.append('<h3>' + book.title + '</h3>');
            bookElement.append('<h4>' + book.subtitle + '</h4>');
            bookElement.append('<p>' + book.description + '</p>');   

            modalContent.append(bookElement);

            //addBookClick(addBookBtn);
            //addWishlistClick(addToWishlistBtn); // Ensure you call the correct function for wishlist buttons
        });
    }

    

    function addAuthorClickHandlers(authorBooks, authorID) {
        authorBooks.on('click', function () {
            modal.css('display', 'block');

            $('#modal-content').children().slice(1).remove();
            getBooksByAuthor(authorID);
           
        });
       
    }

    getAllAuthorsFromDB();

    const searchBtn = document.getElementById("searchBtn");
    $(searchBtn).click(function () {
        searchAuthorName();
    });

    const homeBtn = document.getElementById("homeBtn");
    $(homeBtn).click(function () {
        window.location.href = "index.html";
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

    $(adminbtn).click(function () {
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
