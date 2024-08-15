function fetchReadBooks() {
    const status = 'want to read';
    const apiEndpoint = `http://localhost:7195/api/UserBooks/get?status=${encodeURIComponent(status)}`;

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

// קריאה לפונקציה
fetchReadBooks();


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