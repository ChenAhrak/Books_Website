// Fetch books with 'read' status for all users except the current user
var user = JSON.parse(sessionStorage.getItem('user'));
function fetchBooks() {
    const api = `https://localhost:7195/api/Books/GetAllReadBooks?currentUserId=${user.id}`;
    ajaxCall('GET', api, null,
        getBooksDisplayDataFromDBSCB,  // Success callback
        getBooksDisplayDataFromDBECB  // Error callback
    );
}
function getBooksDisplayDataFromDBSCB(result) {
    renderAllBooksDisplay(result);
}
function getBooksDisplayDataFromDBECB(err) {
    console.log("Error fetching books:", err);
}
function renderAllBooksDisplay(books) {
    var booksContainer = $('#books-container');
    booksContainer.empty(); // Clear existing content before adding new books

    if (books.length === 0) {
        booksContainer.append('<p>No books available in the "read" status.</p>');
        return;
    }

    console.log(books);

    books.forEach(book => {
        var bookElement = $('<div>');
        bookElement.addClass('book');
        bookElement.append('<img src="' + book.thumbnail + '" alt="book image" />');
        bookElement.append('<h3>' + book.title + '</h3>');
        bookElement.append('<p>' + 'By: ' + book.authorNames + '</p>');
        bookElement.append('<p>' + 'Price: ' + book.price + ' ILS' + '</p>');
        
        // Add "Request Purchase" button
        var requestPurchaseBtn = $('<button class="requestPurchaseButton" data-book-id="' + book.id + '" data-seller-id="' + book.SellerId + '">Request Purchase</button>');
        bookElement.append(requestPurchaseBtn);

        booksContainer.append(bookElement);

        // Attach click event handler for the button
        requestPurchaseBtn.on('click', function () {
            requestBookPurchase(this);
        });
    });

}


// Request to purchase a book
function requestBookPurchase(button) {
    const buyerId = user.id; // user.id holds the current logged-in user's ID
    const sellerId = button.getAttribute('data-seller-id');
    const bookId = button.getAttribute('data-book-id');

    if (!buyerId || !sellerId || !bookId) {
        alert("All fields are required.");
        return;
    }

    const api = `https://localhost:7195/api/UserBooks/addBookPurchaseRequest?buyerId=${buyerId}&sellerId=${sellerId}&bookId=${bookId}`;
    sendPurchaseRequest(api);
}

function sendPurchaseRequest(api) {
    ajaxCall('POST', api, null, handleSuccess, handleError);
}

function handleSuccess(response) {
    console.log('Purchase request added successfully:', response);
    alert('Your purchase request has been sent!');
}

function handleError(error) {
    console.error('Error sending purchase request:', error);
    alert('An error occurred while sending the purchase request.');
}

// Call fetchBooks when the page loads
window.onload = () => {
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

    const mypurchaserequestsBtn = document.getElementById("mypurchaserequestsBtn");
    $(mypurchaserequestsBtn).click(function () {
        window.location.href = "purchaseRequests.html";
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

    const toggleModeCheckbox = document.getElementById('toggle-mode');
    const currentTheme = localStorage.getItem('theme');

    // Apply the saved theme on load
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleModeCheckbox.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
    }

    // Toggle dark mode and save the theme
    toggleModeCheckbox.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    $('#homeBtn').on('click', function () {
        window.location.href = "../Pages/index.html";
    });
};

