var user = JSON.parse(sessionStorage.getItem('user'));

function fetchBooks() {
    const status = 'want to read'; // הגדרת הסטטוס

    const apiEndpoint = `https://localhost:7195/api/UserBooks/get?userID=${user.id}&status=${encodeURIComponent(status)}`;
    // שלח בקשה לשרת
    ajaxCall('GET', apiEndpoint, null,
        getBooksDisplayDataFromDBSCB,  // פונקציית הצלחה
        getBooksDisplayDataFromDBECB  // פונקציית שגיאה
    );
}

// פונקציית הצלחה בבקשה לשרת
function getBooksDisplayDataFromDBSCB(result) {
    // הצג את הספרים
    renderAllBooksDisplay(result);
}

// פונקציית שגיאה בבקשה לשרת
function getBooksDisplayDataFromDBECB(err) {
    console.log("Error fetching books:", err);
    if (err.readyState === 0) {
        console.log("Request was not sent or aborted.");
    }
    if (err.status === 0) {
        console.log("Network error or CORS issue.");
    } else {
        console.log("Status Code:", err.status);
        console.log("Status Text:", err.statusText);
    }
}


// הצגת הספרים בטבלה
function renderAllBooksDisplay(books) {
    var booksContainer = $('#books-container');
    booksContainer.empty(); // נקה את התוכן הקיים לפני הוספת ספרים חדשים

    if (books.length === 0) {
        booksContainer.append('<p>No books available in the "want to read" status.</p>');
        return;
    }

    var table = $('<table>');
    var tableHeader = $('<tr>');

    books.forEach(book => {
        var bookElement = $('<td>');
        bookElement.append('<img src="' + book.thumbnail + '" alt="book image" />');
        bookElement.append('<h3>' + book.title + '</h3>');
        bookElement.append('<p>' + 'By: ' + book.authors + '</p>');
        bookElement.append('<p>' + 'Price: ' + book.price + ' ILS' + '</p>');

        var addBookBtn = $('<button id="' + book.id + '" class="add-book">Add Book</button>');
        bookElement.append(addBookBtn);

        tableHeader.append(bookElement);

        // קרא לפונקציות המתאימות עבור הכפתור
        addpurchasedClick(addBookBtn);
    });

    table.append(tableHeader);
    booksContainer.append(table);
}

// פונקציה להוספת ספר לרשימת הקריאה //Update status from "want to read" to "purchased"
function addBookToPurchased(userID, bookId) {
    const status = "purchased";
    const api = `https://localhost:7195/api/UserBooks/update-status?userID=${userID}&bookID=${bookId}&newStatus=${status}`;

    ajaxCall(
        'PUT',
        api,
        null, // No need to send data in the body since we use query parameters
        function (response) {
            console.log("Success:", response);
            alert("Book added to purchased list.");
            // Update UI to reflect the book was added
            $(`button[data-book-id="${bookId}"]`).addClass('added').text('Added'); // Update button state on success
        },
        function (error) {
            console.error("Error:", error);
            alert("Error adding book to purchased list.");
        }
    );
}

// הוסף מאזין לאירוע ללחיצה על כפתור "purchased"
function addpurchasedClick(addBookBtn) {
    addBookBtn.on('click', function () {
        const bookId = $(this).attr('data-book-id');
        if (user.id) {
            console.log(bookId);
            addBookToPurchased(user.id, bookId);

            // עדכן את מצב הכפתור בהתאם להצלחה
            $(this).toggleClass('added');
        } else {
            alert("User not logged in.");
        }
    });
}

// קריאה לפונקציה לשליפת ספרים
fetchBooks();

const allBooksBtn = document.getElementById("allBooksBtn");
$(allBooksBtn).click(function () {
    window.location.href = "booksCatalog.html";
});

const allEBooksBtn = document.getElementById("allEBooksBtn");
$(allEBooksBtn).click(function () {

    window.location.href = "ebooksCatalog.html";
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

const wishlistBtn = document.getElementById("wishlistBtn");
$(wishlistBtn).click(function () {
    window.location.href = "wishList.html";
});

const purchaseBooksBtn = document.getElementById("purchaseBooksBtn");
$(purchaseBooksBtn).click(function () {
    window.location.href = "transferBook.html";
});

// Check user status and display appropriate buttons
if (user && !user.isAdmin) {
    $('#logoutBtn').show();
    $('#loginBtn').hide();
    $('#registerBtn').hide();
    $('#myBooksBtn').show();
    $('#adminBtn').hide();
    $('#wishlistBtn').show(); // Show wishlist button for regular users
} else if (user && user.isAdmin) {
    $('#logoutBtn').show();
    $('#loginBtn').hide();
    $('#registerBtn').hide();
    $('#myBooksBtn').show();
    $('#adminBtn').show();
    $('#wishlistBtn').hide(); // Hide wishlist button for admins
} else {
    $('#logoutBtn').hide();
    $('#loginBtn').show();
    $('#registerBtn').show();
    $('#myBooksBtn').hide();
    $('#adminBtn').hide();
    $('#wishlistBtn').hide(); // Hide wishlist button for not logged-in users
}


const currentTheme = localStorage.getItem('theme');
if (currentTheme == 'dark' && !document.body.classList.contains('dark-mode')) {
    document.body.classList.toggle('dark-mode');
}
else if (currentTheme == 'light' && document.body.classList.contains('dark-mode')) {
    document.body.classList.toggle('dark-mode');
}


//const currentTheme = localStorage.getItem('theme');
const toggleButton = document.getElementById('toggle-mode');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    let theme = 'light';
    if (document.body.classList.contains('dark-mode')) {
        theme = 'dark';
    }
    localStorage.setItem('theme', theme);
});



