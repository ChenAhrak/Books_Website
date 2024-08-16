const booksApiURL = "https://localhost:7195/api/Books";
const allEBooks = [];
var user = JSON.parse(sessionStorage.getItem('user'));
var modal = $('#booksModal');
var span = $('.close');

$(document).ready(function () {

    const toggleModeCheckbox = document.getElementById('toggle-mode');
    const currentTheme = localStorage.getItem('theme');

    // Apply the saved theme on load
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleModeCheckbox.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
    }

    // Toggle dark mode and save the theme
    toggleModeCheckbox.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    $('#homeBtn').on('click', function () {
        window.location.href = "../Pages/index.html";
    });
   
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
        ebooksContainer.empty();
        ebooks.forEach(ebook => {
            var ebookElement = $('<div>');
            ebookElement.addClass('ebook');
            ebookElement.append('<img src="' + ebook.image + '" alt="book image" />');
            ebookElement.append('<h3>' + ebook.title + '</h3>');
            ebookElement.append('<p>' + 'By: ' + ebook.authorNames + '</p>');
            ebookElement.append('<p>' + 'Price: ' + ebook.price + ' ILS' + '</p>');

            var addToWishlistBtn = $('<button class="wishlistButton" data-book-id="' + ebook.id + '">🤍</button>');
            ebookElement.append(addToWishlistBtn);

            var addBookBtn = $('<p><button id="' + ebook.id + '" class="add-book">Add Book</button></p>');
            ebookElement.append(addBookBtn);

            var moreDetails = $('<p id="' + ebook.id + '" class="more-details">More Details</button></p>');
            ebookElement.append(moreDetails);

            ebooksContainer.append(ebookElement);
            addBookClick(addBookBtn);
            showMoreDetails(moreDetails, ebook);


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
        allEBooks.forEach(function (books) {
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
        renderAllEBooksDisplay(filterdEBooks);

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