// Fetch books with 'read' status for all users except the current user
var user = JSON.parse(sessionStorage.getItem('user'));

function fetchBooks() {
    // Use the endpoint that fetches all 'read' books excluding the current user's
    const apiEndpoint = `https://localhost:7195/api/Books/GetAllReadBooks?currentUserId=${user.id}`;

    // Send request to server
    ajaxCall('GET', apiEndpoint, null,
        getBooksDisplayDataFromDBSCB,  // Success callback
        getBooksDisplayDataFromDBECB  // Error callback
    );
}


// Success callback for fetching books
function getBooksDisplayDataFromDBSCB(result) {
    // Display the books
    renderAllBooksDisplay(result);
}

// Error callback for fetching books
function getBooksDisplayDataFromDBECB(err) {
    console.log("Error fetching books:", err);
}

// Display books in the table
function renderAllBooksDisplay(books) {
    var booksContainer = $('#books-container');
    booksContainer.empty(); // Clear existing content before adding new books

    if (books.length === 0) {
        booksContainer.append('<p>No books available in the "read" status.</p>');
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

        // Add "Request Purchase" button
        var requestPurchaseBtn = $('<button class="requestPurchaseButton" data-book-id="' + book.id + '" data-seller-id="' + book.sellerId + '">Request Purchase</button>');
        bookElement.append(requestPurchaseBtn);

        tableHeader.append(bookElement);

        // Attach click event handler for the button
        requestPurchaseBtn.on('click', function () {
            requestBookPurchase(this);
        });
    });

    table.append(tableHeader);
    booksContainer.append(table);
}

// Step 3: Request to purchase a book
function requestBookPurchase(button) {
    const bookId = button.getAttribute('data-book-id');
    const sellerId = button.getAttribute('data-seller-id');
    const buyerId = user.id; // Assuming user.id is available and holds the current logged-in user's ID

    if (!buyerId || !sellerId || !bookId) {
        alert("All fields are required.");
        return;
    }
    const url = `https://localhost:7195/api/UserBooks/addBookPurchaseRequest?buyerId=${buyerId}&sellerId=${sellerId}&bookId=${bookId}`;

    ajaxCall('POST', url, null,
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
    ajaxCall('PUT', `https://localhost:7195/api/UserBooks/updatePurchaseRequestStatus?requestId=${requestId}&approvalStatus=${approvalStatus}&approvalDate=${approvalDate.toISOString()}`, null,
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
    ajaxCall('POST', `https://localhost:7195/api/UserBooks/Transfer-Book?buyerId=${buyerId}&sellerId=${sellerId}&bookId=${bookId}`, null,
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

// Call fetchBooks when the page loads
window.onload = () => {
    fetchBooks();
};

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
