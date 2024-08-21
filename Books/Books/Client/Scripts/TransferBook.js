﻿const apiMailUrl = "https://localhost:7195/api/Mails";
const userBooksApiUrl = "https://localhost:7195/api/UserBooks";
const booksApiUrl = "https://localhost:7195/api/Books";

// Fetch books with 'read' status for all users except the current user
var user = JSON.parse(sessionStorage.getItem('user'));

if (!user) {
    alert("Must be logged in to transfer books!");
    window.location.href = "login.html";
}

function fetchBooks() {
    const api = `${booksApiUrl}/GetAllReadBooks?currentUserId=${user.id}`;
    ajaxCall('GET', api, null,
        getBooksDisplayDataFromDBSCB,  // Success callback
        getBooksDisplayDataFromDBECB  // Error callback
    );
}
function getBooksDisplayDataFromDBSCB(result) {
    console.log(result);
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
        bookElement.append('<h3>'+'Seller: ' + book.sellerName + '</h3>');
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
        emailBody: `Hello ${sellerName},\n\nYou have received a purchase request from ${user.userName} to buy the book ${bookName}. Please check your purchase requests to approve or reject the request.\n\nRegards,\nBookstore Team`

    }
    ajaxCall('Post', apiMailUrl, JSON.stringify(mailToSend), handleSuccessMail, handleErrorMail);
}

function handleSuccessMail(response) {
    console.log('Mail sent successfully:', response);

}

function handleErrorMail(error) {
    console.log('Error sending mail:', error);
 
}





// Request to purchase a book
function requestBookPurchase(button) {
    var buyerId = user.id; // user.id holds the current logged-in user's ID
    var sellerId = button.getAttribute('data-seller-id');
    var bookId = button.getAttribute('data-book-id');

    if (!buyerId || !sellerId || !bookId) {
        alert("All fields are required.");
        return;
    }

    const api = `${userBooksApiUrl}/addBookPurchaseRequest?buyerId=${buyerId}&sellerId=${sellerId}&bookId=${bookId}`;
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

