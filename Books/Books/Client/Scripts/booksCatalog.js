const booksApiURL = "https://localhost:7195/api/Books";
const allBooks = [];
var user = JSON.parse(sessionStorage.getItem('user'));
var modal = $('#booksModal');
var span = $('.close');


$(document).ready(function () { 
    async function getBooksDataFromDB() {
        await ajaxCall("GET", `${booksApiURL}/GetAllBooks`, "", getBooksDataFromDBSCB, getBooksDataFromDBECB);
    }

    function getBooksDataFromDBSCB(result) {
        console.log(result);
        allBooks.push(result);
        renderAllBooksDisplay(result);
    }

    function getBooksDataFromDBECB(err) {
        console.log(err);
    }

    function renderAllBooksDisplay(books) {
        var booksContainer = $('#books-container');
        booksContainer.empty();
        books.forEach(function(book) {
            var bookElement = $('<div>');
            bookElement.addClass('book');
            bookElement.append('<img src="' + book.image + '" alt="book image" />');
            bookElement.append('<h3>' + book.title + '</h3>');
            bookElement.append('<p>' + 'By: ' + book.authorNames + '</p>');
            bookElement.append('<p>' + 'Price: ' + book.price + ' ILS' + '</p>');

            var addBookBtn = $('<p><button id="' + book.id + '" class="add-book">Add Book</button><p>');
            bookElement.append(addBookBtn);

            var addToWishlistBtn = $('<button class="wishlistButton" data-book-id="' + book.id + '">🤍</button>');
            bookElement.append(addToWishlistBtn);

            var moreDetails = $('<p id="' + book.id + '" class="more-details">More Details</button></p>');
            bookElement.append(moreDetails);


            booksContainer.append(bookElement);
            addBookClick(addBookBtn);
            showMoreDetails(moreDetails, book);


        });
    }

    modal.css('display', 'none');
    span.on('click', function () {
        modal.css('display', 'none');
    });

    $(window).on('click', function (event) {
        if (event.target === $('#booksModal')[0]) {
            $('#booksModal').hide();
        }
    });

    function addCoursesToModal(buttonId) {
        modal.css('display', 'block');

        $('#modal-content').children().slice(1).remove(); // Clear previous modal content

        let api = `https://localhost:7283/api/Courses/searchByInstructorId/${buttonId}`;
        ajaxCall("GET", api, null, getInstructorCoursesSCBF, getInstructorCoursesECBF);
    }
    function showMoreDetails(moreDetails, book) {
        moreDetails.on('click', function () {
            modal.css('display', 'block');
            $('#modal-content').children().slice(1).remove();
            renderBooksModal(book);
        });
    }

    function renderBooksModal(book) {
        var modalContent = $('#modal-content');
        var bookModal = {};
        //search for the book in allBooks
        allBooks.forEach(function (books) {
            books.forEach(function (b) {
                if (b.id === book.id) {
                    bookModal = b;
                }
            });
        });
        console.log(book.id)
        console.log(bookModal);
        var bookElement = $('<div>');
        bookElement.addClass('bookModal');
        bookElement.append('<img src="' + bookModal.image + '" alt="book image" />');
        bookElement.append('<h3>' + bookModal.title + '</h3>');
        bookElement.append('<h5>' + bookModal.subtitle + '</h5>');
        bookElement.append('<p>' + 'Publisher: ' + bookModal.publisher + '</p>');
        bookElement.append('<p>' + 'Published Date: ' + bookModal.publishedDate + '</p>');
        bookElement.append('<p>' + 'Language: ' + bookModal.language + '</p>');
        bookElement.append('<p>' + 'Page Count: ' + bookModal.pageCount + '</p>');
        bookElement.append('<p>' + 'Description: ' + bookModal.description + '</p>');
        bookElement.append('<p>' + 'By: ' + bookModal.authorNames + '</p>');
        bookElement.append('<p>' + 'Price: ' + bookModal.price + ' ILS' + '</p>');

        modalContent.append(bookElement);

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

    function searchBooks() {

        const query = $('#search-input').val();
        const filterdBooks = []
        allBooks.forEach(function (books) {
            books.forEach(function (book) {

                // check if the query is in the title of the book with no case sensitivity
                if (book.title.toLowerCase().includes(query.toLowerCase()) ||
                    book.authorNames.toLowerCase().includes(query.toLowerCase()) ||
                    book.description.toLowerCase().includes(query.toLowerCase())) {
                    filterdBooks.push(book);
                }

            });

        });
        renderAllBooksDisplay(filterdBooks);

    }

       

    getBooksDataFromDB();

    $('#searchBtn').on('click', function () {
        searchBooks();
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