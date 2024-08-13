function fetchBooks(status) {
    // הגדרת פרמטרים ל-ajaxCall
    const apiEndpoint = `api/UserBooks/get?status=${encodeURIComponent(status)}`;

    // קריאה לפונקציה ajaxCall
    ajaxCall('GET', apiEndpoint, null,
        (books) => {
            console.log('Books fetched successfully:', books);
            displayBooks(books);
        },
        (error) => {
            console.error('Error fetching books:', error);
        }
    );
}

// Step 2: Display the books to the user
function displayBooks(books) {
    const bookListElement = document.getElementById('bookList');
    bookListElement.innerHTML = ''; // Clear the list before adding new items

    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <span>${book.title} by ${book.author} (Owner: ${book.owner})</span>
            <button onclick="requestBookPurchase(${book.id}, ${book.ownerId})">Request Purchase</button>
        `;
        bookListElement.appendChild(bookItem);
    });
}

// פונקציה להוספת ספר לרשימת הקריאה
function addBookToRead(userID, book) {
    var apiUrl = `/api/UserBooks/addBookToRead/${encodeURIComponent(userID)}`;

    ajaxCall('POST', apiUrl, JSON.stringify(book),
        function (response) {
            console.log('Book added to read list successfully:', response);
            updateLibrary(userID, 'all'); // עדכן את רשימות הספרים לאחר הוספת הספר
        },
        function (error) {
            console.log('Error adding book to read list:', error);
        }
    );
}
// פונקציה לעדכון הספריה
function updateLibrary(userID, status) {
    // בנה את כתובת ה-API עם פרמטרים
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

