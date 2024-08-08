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

// פונקציה להוספת ספר לספריה
function addBookToLibrary(bookId) {
    var status = prompt('Enter status (e.g., want to read, read, purchased):');
    if (status) {
        var data = JSON.stringify({ bookId: bookId, status: status });
        ajaxCall('POST', '/api/addBookToLibrary', data,
            function (response) {
                alert('Book added to library successfully.');
                updateLibrary();
            },
            function (error) {
                console.log('Error adding book to library:', error);
            }
        );
    }
}

// פונקציה לעדכון הספריה
function updateLibrary() {
    ajaxCall('GET', '/api/getLibrary', null,
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

// פונקציה לחיפוש ספרים
function searchBooks() {
    var searchQuery = $('#searchInput').val();
    if (searchQuery) {
        ajaxCall('GET', '/api/searchBooks?query=' + encodeURIComponent(searchQuery), null,
            function (response) {
                displaySearchResults(response.books);
            },
            function (error) {
                console.log('Error searching books:', error);
            }
        );
    } else {
        alert('Please enter a search query.');
    }
}

// פונקציה להצגת תוצאות חיפוש
function displaySearchResults(books) {
    var searchResultsList = $('#searchResults');
    searchResultsList.empty();
    books.forEach(function (book) {
        var listItem = $('<li></li>')
            .text(book.title)
            .append($('<button></button>')
                .text('Add to Library')
                .click(function () {
                    addBookToLibrary(book.id);
                })
            );
        searchResultsList.append(listItem);
    });
}

// פונקציה לשינוי סטטוס ספר
function changeStatus(bookId, newStatus) {
    console.log(`Change status of book ${bookId} to ${newStatus}`);
    // תוכל להוסיף כאן קריאה ל-API לשינוי הסטטוס אם יש צורך
}

// פונקציה לרכישת ספר
function purchaseBook(bookId) {
    console.log(`Purchase book ${bookId}`);
    // תוכל להוסיף כאן קריאה ל-API לרכישת ספר אם יש צורך
}



// קריאה ראשונית לעדכון הספריה
$(document).ready(function () {
    updateLibrary();
});
