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
