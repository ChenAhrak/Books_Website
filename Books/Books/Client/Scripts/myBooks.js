// פונקציה לרנדר ספרים בחלקים
function renderBooks(sectionId, books) {
    const listElement = document.getElementById(sectionId);
    books.forEach(book => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${book.title}
            <div class="actions">
                <button onclick="changeStatus('${book.id}', 'read')">Mark as Read</button>
                <button onclick="purchaseBook('${book.id}')">Purchase</button>
            </div>
        `;
        listElement.appendChild(li);
    });
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

// פונקציה לעדכון רשימות הספרים בדף
function updateBookLists(library) {
    $('#wantToReadList').empty();
    $('#readList').empty();
    $('#purchasedList').empty();

    library.wantToRead.forEach(function (book) {
        renderBooks('wantToReadList', [book]);
    });

    library.read.forEach(function (book) {
        renderBooks('readList', [book]);
    });

    library.purchased.forEach(function (book) {
        renderBooks('purchasedList', [book]);
    });
}

// פונקציה לשינוי סטטוס ספר
function changeStatus(bookId, newStatus) {
    console.log(`Change status of book ${bookId} to ${newStatus}`);
    // תוכל להוסיף כאן קריאה ל-API לשינוי הסטטוס אם יש צורך
}


