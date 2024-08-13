// Step 1: Fetch books with 'read' status from all users
function fetchReadBooks() {
    const status = 'read';
    const apiEndpoint = `api/UserBooks/get?status=${encodeURIComponent(status)}`;
    ajaxCall('GET', apiEndpoint, null,
        (books) => {
            console.log('Books fetched successfully:', books);
            displayBooks(books);
        },
        (error) => {
            console.error('Error fetching books:', error);
        }
    );

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

// Step 3: Request to purchase a book
function requestBookPurchase(bookId, ownerId) {
    const buyerId = getCurrentUserId(); // Function to get current logged-in user ID

    ajaxCall('POST', `api/UserBooks/addBookPurchaseRequest?buyerId=${buyerId}&sellerId=${ownerId}&bookId=${bookId}`, null,
        (response) => {
            console.log('Purchase request added successfully:', response);
            alert('Your purchase request has been sent!');
        },
        (error) => {
            console.error('Error sending purchase request:', error);
            alert('An error occurred while sending the purchase request.');
        }
    );
}

// Update the status of a book purchase request
function updatePurchaseRequestStatus(requestId, approvalStatus, approvalDate) {
    ajaxCall('PUT', `api/UserBooks/updatePurchaseRequestStatus?requestId=${requestId}&approvalStatus=${approvalStatus}&approvalDate=${approvalDate.toISOString()}`, null,
        (response) => {
            console.log('Purchase request status updated successfully:', response);
            alert('Purchase request status updated successfully.');
        },
        (error) => {
            console.error('Error updating purchase request status:', error);
            alert('An error occurred while updating the purchase request status.');
        }
    );
}

// Manage the transfer of a book from the seller to the buyer
function manageBookPurchase(buyerId, sellerId, bookId) {
    ajaxCall('POST', `api/UserBooks/Transfer-Book?buyerId=${buyerId}&sellerId=${sellerId}&bookId=${bookId}`, null,
        (response) => {
            console.log('Book purchase processed successfully:', response);
            alert('Book has been transferred successfully.');
        },
        (error) => {
            console.error('Error processing book purchase:', error);
            alert('An error occurred while processing the book purchase.');
        }
    );
}

// Fetch and display the books when the page loads
window.onload = fetchReadBooks;
