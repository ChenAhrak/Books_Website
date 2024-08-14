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

        // הוסף כפתור "Add to Read List"
        var addToReadListBtn = $('<button class="addToReadListButton" data-book-id="' + book.id + '">Add to Read List</button>');
        bookElement.append(addToReadListBtn);

        tableHeader.append(bookElement);

        // קרא לפונקציות המתאימות עבור הכפתור
        addReadClick(addToReadListBtn);
    });

    table.append(tableHeader);
    booksContainer.append(table);
}

// פונקציה להוספת ספר לרשימת הקריאה
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

            // אופציונלית, עדכן את מצב הכפתור בהתאם להצלחה
            $(this).toggleClass('added');
        } else {
            alert("User not logged in.");
        }
    });
}

// Function to update the library based on userID and status
function updateLibrary(userID, status) {
    // Build API URL with parameters
    var apiUrl = `/api/UserBooks/get?userID=${encodeURIComponent(userID)}&status=${encodeURIComponent(status)}`;

    ajaxCall('GET', apiUrl, null,
        function (response) {
            updateBookLists(response);
        },
        function (error) {
            console.log('Error updating library:', error);
        }
    );
}

// קריאה לפונקציה לשליפת ספרים
fetchBooks();
