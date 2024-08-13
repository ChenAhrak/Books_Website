const authorsApiUrl = "https://localhost:7195/api/Authors";
const allAuthors = [];
var user = JSON.parse(sessionStorage.getItem('user'));

$(document).ready(function () {

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

            authorsContainer.append(authorElement);
        });

        addAuthorClickHandlers(); // Add click handlers after rendering authors
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

    async function getBooksByAuthor(authorId) {
        const apiUrl = `https://localhost:7195/api/Authors/${authorId}/Books`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const books = await response.json();
            renderBooksByAuthor(books);
        } catch (error) {
            console.error('Error fetching books by author:', error);
        }
    }

    function renderBooksByAuthor(books) {
        const booksContainer = $("#books-container");
        booksContainer.empty();

        books.forEach(book => {
            const bookElement = $('<div class="book">');
            bookElement.append('<img src="' + book.image + '" alt="book image" />');
            bookElement.append('<h3>' + book.title + '</h3>');
            bookElement.append('<p>' + 'By: ' + book.authorNames + '</p>');
            bookElement.append('<p>' + 'Price: ' + book.price + ' ILS' + '</p>');

            // Add "Add to Wishlist" button
            const addToWishlistBtn = $('<button class="wishlistButton" data-book-id="' + book.id + '">🤍</button>');
            bookElement.append(addToWishlistBtn);

            // Add "Add Book" button
            const addBookBtn = $('<button id="' + book.id + '" class="add-book">Add Book</button>');
            bookElement.append(addBookBtn);

            booksContainer.append(bookElement);

            addBookClick(addBookBtn);
            addWishlistClick(addToWishlistBtn); // Ensure you call the correct function for wishlist buttons
        });
    }

    function addAuthorClickHandlers() {
        $('.author').click(function () {
            const authorId = $(this).data('author-id');
            getBooksByAuthor(authorId);
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
