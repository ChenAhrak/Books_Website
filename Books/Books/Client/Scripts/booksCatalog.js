const booksApiURL = "https://localhost:7195/api/Books";
var user = JSON.parse(sessionStorage.getItem('user'));


$(document).ready(function () { 
    async function getBooksDataFromDB() {
        await ajaxCall("GET", `${booksApiURL}/GetBooksDisplay`, "", getBooksDataFromDBSCB, getBooksDataFromDBECB);
    }

    function getBooksDataFromDBSCB(result) {
        console.log(result);
        renderAllBooksDisplay(result);
    }

    function getBooksDataFromDBECB(err) {
        console.log(err);
    }

    function renderAllBooksDisplay(books) {
        var booksContainer = $('#books-container');

        books.forEach(function(book) {
            var bookElement = $('<div>');
            bookElement.addClass('book');
            bookElement.append('<img src="' + book.image + '" alt="book image" />');
            bookElement.append('<h3>' + book.title + '</h3>');
            bookElement.append('<p>' + 'By: ' + book.authorNames + '</p>');
            bookElement.append('<p>' + 'Price: ' + book.price + ' ILS' + '</p>');
            var addBookBtn = $('<p><button id="' + book.id + '" class="add-book">Add Book</button><p>');
            bookElement.append(addBookBtn);

            booksContainer.append(bookElement);
            addBookClick(addBookBtn);

        });
    }
    function isLoggedIn() {
        return sessionStorage.getItem('user') !== null;
    }

    // Event listener for add book button
    function addBookClick(addBookBtn) {
        addBookBtn.on('click', function (event) {
            if (event.target.tagName.toLowerCase() === 'button') {
                const buttonId = event.target.id;
                console.log("Button clicked with ID:", buttonId);

                if (isLoggedIn()) {
                    const user = JSON.parse(sessionStorage.getItem('user'));
                    addBook(buttonId, user.id);
                } else {
                    console.log("User not logged in. Redirecting to login.");
                    alert("Please login or register to add book.");
                    window.location.href = "login.html";
                }
            }
        });
    }

    //// Function to add a book to user's list
    function addBook(buttonId, userId) {

        ajaxCall("POST", `${booksApiURL}/addBookToUser/${userId}`, JSON.stringify(buttonId), postSCBF, postECBF);

    }

    function postSCBF(result) {
        alert("Book added successfully!");
        console.log(result);
    }

    function postECBF(err) {
        alert("Book was already added.");
        console.log(err);
    }
     
       

    getBooksDataFromDB();

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