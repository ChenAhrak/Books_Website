// פונקציה לשליחת בקשה לשרת לצורך שליפת ספרים עם סטטוס "purchased"

var user = JSON.parse(sessionStorage.getItem('user'));

function fetchBooks() {
    const status = 'purchased'; // הגדרת הסטטוס
    //                   https://localhost:7195/api/UserBooks/get?userID=34&status=purchased
    const apiEndpoint = `https://localhost:7195/api/UserBooks/get?userID=${user.id}&status=${status}`;

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
}

// הצגת הספרים בטבלה
// הצגת הספרים בטבלה
// פונקציה להציג ספרים
function renderAllBooksDisplay(books) {
    var booksContainer = $('#books-container');
    booksContainer.empty(); // נקה את התוכן הקיים לפני הוספת ספרים חדשים

    if (books.length === 0) {
        booksContainer.append('<p>No books available in the "purchased" status.</p>');
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

        //  "Add to Read List" הוסף כפתור רק לספרים פיזיים
        if (book.isEbook === 0) {  // אם הספר הוא פיזי (isEbook == 0)
            var addToReadListBtn = $('<button class="addToReadListButton" data-book-id="' + book.id + '">Add to Read List</button>');
            bookElement.append(addToReadListBtn);
            addReadClick(addToReadListBtn);
        } else {
            console.log(`No button added for eBook with ID: ${book.id}`);
        }

        tableHeader.append(bookElement);
    });

    table.append(tableHeader);
    booksContainer.append(table);
}



// פונקציה להוספת ספר לרשימת הקריאה //Update status from purchased to read 
function addBookToRead(userID, bookId) {

    const status = "read";
    const api = `https://localhost:7195/api/UserBooks/update-status?userID=${userID}&bookID=${bookId}&newStatus=${status}`;
    const data = JSON.stringify(bookId);

    ajaxCall(
        'PUT',
        api,
        data,
        function (response) {
            console.log("Success:", response);
            alert("Book added to read list.");
            // Update UI to reflect the book was added
            $(`button[data-book-id="${bookId}"]`).addClass('added').text('Added'); // Update button state on success
        },
        function (error) {
            console.error("Error:", error);
            alert("Error adding book to read list.");
        }
    );
}

// הוסף מאזין לאירוע ללחיצה על כפתור "Add to Read List"
function addReadClick(readBtn) {
    readBtn.on('click', function () {
        const bookId = this.getAttribute('data-book-id');
        if (user.id) {
            //const book = getBookById(bookId); // Assuming you have a function to get book details
            console.log(bookId);
            addBookToRead(user.id, bookId);

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
