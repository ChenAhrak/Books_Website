const apiMailUrl = "https://localhost:7195/api/Mails";

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
        var requestPurchaseBtn = $('<button class="requestPurchaseButton" data-book-id="' + book.id + '" data-book-title="' + book.title + '" data-seller-id="' + book.sellerId + '" data-seller-email="' + book.sellerEmail + '" data-seller-name="' + book.sellerName + '">Request Purchase</button>');
        bookElement.append(requestPurchaseBtn);

        booksContainer.append(bookElement);

        // Attach click event handler for the button
        requestPurchaseBtn.on('click', function () {
            requestBookPurchase(this);
            sendMailToBuyer(this);
        });
    });

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////need to fix
// Request to purchase a book
function requestBookPurchase(button) {
    var buyerId = user.id; // user.id holds the current logged-in user's ID
    var sellerId = button.getAttribute('data-seller-id');
    var bookId = button.getAttribute('data-book-id');

    if (!buyerId || !sellerId || !bookId) {
        alert("All fields are required.");
        return;
    }

    // Check if the user already has the book in their library
    hasBookInLibrary(buyerId, bookId, function (hasBook) {
        if (hasBook) {
            alert("You already own this book and cannot request to purchase it.");
        } else {
            // Proceed with sending the purchase request
            const api = `https://localhost:7195/api/UserBooks/addBookPurchaseRequest?buyerId=${buyerId}&sellerId=${sellerId}&bookId=${bookId}`;
            sendPurchaseRequest(api);
        }
    });
}

// בודק אם למשתמש שמבקש לרכוש ספר ממשתמש אחר כבר יש את הספר הזה
function hasBookInLibrary(userId, bookId, callback) {
    const checkApi = `https://localhost:7195/api/UserBooks/checkBookInLibrary?userId=${userId}&bookId=${bookId}`;

    fetch(checkApi)
        .then(response => response.json())
        .then(data => {
            // data.hasBook will be true if the book is in the user's library, otherwise false
            callback(data.hasBook);
        })
        .catch(error => {
            console.error("Error checking book in library:", error);
            callback(false); // Assume the book is not in the library if there's an error
        });
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function sendMailToBuyer(button) {
    var buyerId = user.id; // user.id holds the current logged-in user's ID
    var bookName = button.getAttribute('data-book-title');
    var sellerId = button.getAttribute('data-seller-id');
    var bookId = button.getAttribute('data-book-id');
    var sellerEmail = button.getAttribute('data-seller-email');
    var sellerName = button.getAttribute('data-seller-name');
    const mailToSend = {
        emailToId: sellerEmail,
        emailToName: sellerName,
        emailSubject: 'Purchase Request',
        emailBody: `Hello ${sellerName},\n\nYou have received a purchase request from ${user.userName} The book ${bookName} . Please check your purchase requests to approve or reject the request.\n\nRegards,\nBookstore Team`

    }
    console
    ajaxCall('Post', apiMailUrl, JSON.stringify(mailToSend), handleSuccessMail, handleErrorMail);


}

function handleSuccessMail(response) {
    console.log('Mail sent successfully:', response);

}

function handleErrorMail(error) {
    console.log('Error sending mail:', error);
 
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


    const logoutbtn = document.getElementById("logoutBtn");

    $(logoutbtn).click(function () {
        sessionStorage.clear();
        window.location.href = ("index.html");
    });



    const myBooks = document.getElementById("myBooksBtn");
    $(myBooks).click(function () {
        window.location.href = "myBooks.html";

    });
    const wishlistBtn = document.getElementById("wishlistBtn");
    $(wishlistBtn).click(function () {
        window.location.href = "wishList.html";
    });

   

    const mypurchaserequestsBtn = document.getElementById("mypurchaserequestsBtn");
    $(mypurchaserequestsBtn).click(function () {
        window.location.href = "purchaseRequests.html";
    });

    const quizBtn = document.getElementById("quizBtn");
    $(quizBtn).click(function () {
        window.location.href = "quiz.html";
    });

    // Check user status and display appropriate buttons
    

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

