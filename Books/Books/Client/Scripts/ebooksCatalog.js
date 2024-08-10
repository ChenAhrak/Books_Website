const booksApiURL = "https://localhost:7195/api/Books";
const allEBooks = [];
var user = JSON.parse(sessionStorage.getItem('user'));

$(document).ready(function () {
   
async function getEBooksDataFromDB() {
    await ajaxCall("GET", `${booksApiURL}/GetAllEBooks`, "", getEBooksDataFromDBSCB, getEBooksDataFromDBECB);
}

function getEBooksDataFromDBSCB(result) {
    console.log(result);
    allEBooks.push(result);
    renderAllEBooksDisplay(result);
}

function getEBooksDataFromDBECB(err) {
    console.log(err);
}

function renderAllEBooksDisplay(ebooks) {
    var ebooksContainer = $('#ebooks-container');
    ebooks.forEach(ebook => {
        var ebookElement = $('<div>');
        ebookElement.addClass('ebook');
        ebookElement.append('<img src="' + ebook.image + '" alt="book image" />');
        ebookElement.append('<h3>' + ebook.title + '</h3>');
        ebookElement.append('<p>' + 'By: ' + ebook.authorNames + '</p>');
        ebookElement.append('<p>' + 'Price: ' + ebook.price + ' ILS' + '</p>');
        var addBookBtn = $('<p><button id="' + ebook.id + '" class="add-book">Add Book</button></p>');
        ebookElement.append( addBookBtn);

        ebooksContainer.append(ebookElement);
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

    //// ****Function to add a book to user's list not working****
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

    function renderFilterdEBooks(filterdBooks) {
        const mainContent = $('#ebooks-container');
        mainContent.empty();
        mainContent.css({
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
        });


        console.log(filterdBooks);
        filterdBooks.forEach(function (book) {
            var bookElement = $('<div>');
            bookElement.addClass('book');
            bookElement.append('<img src="' + book.image + '" alt="book image" />');
            bookElement.append('<h3>' + book.title + '</h3>');
            bookElement.append('<p>' + 'By: ' + book.authorNames + '</p>');
            //bookElement.append('<p>' + 'Description: ' + book.description + '</p>')
            bookElement.append('<p>' + 'Price: ' + book.price + ' ILS' + '</p>');
            var addBookBtn = $('<p><button id="' + book.id + '" class="add-book">Add Book</button><p>');
            bookElement.append(addBookBtn);

            mainContent.append(bookElement);
            addBookClick(addBookBtn);

        });
    }
    function searchEBooks() {

        const query = $('#search-input').val();
        const filterdEBooks = []
        allEBooks.forEach(function (books) {
            books.forEach(function (book) {

                // check if the query is in the title of the book with no case sensitivity
                if (book.title.toLowerCase().includes(query.toLowerCase()) ||
                    book.authorNames.toLowerCase().includes(query.toLowerCase()) ||
                    book.description.toLowerCase().includes(query.toLowerCase())) {
                    filterdEBooks.push(book);
                }

            });

        });
        renderFilterdEBooks(filterdEBooks);

    }

    getEBooksDataFromDB();

    $('#searchBtn').on('click', function () {
        searchEBooks();
    });

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