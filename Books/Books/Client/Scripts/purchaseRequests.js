﻿var user = JSON.parse(sessionStorage.getItem('user'));

function fetchPurchaseRequests() {
    const sellerId = user.id; // מזהה המוכר הנוכחי//משתמש מחובר 
    
    const api = `https://localhost:7195/api/UserBooks/getPurchaseRequestsForUser/${sellerId}`;

    ajaxCall('GET', api, null,
        (response) => {
            renderPurchaseRequests(response);
        },
        (error) => {
            console.error('Error fetching purchase requests:', error);
        }
    );
}
function renderPurchaseRequests(requests) { 
   
    var requestsContainer = $('#requests-container');
    requestsContainer.empty();

    if (requests.length === 0) {
        requestsContainer.append('<p>No purchase requests available.</p>');
        return;
    }

    requests.forEach(request => {
        console.log(request);
        if (request.status === 'Pending') {
            var requestElement = $('<div>');
            requestElement.addClass('request');
            // Display buyer's username
            requestElement.append('<p>Buyer: ' + request.buyerUserName + '</p>');

            // Display book name and image
            requestElement.append('<p>Book: ' + request.bookName + '</p>');
            requestElement.append('<img src="' + request.bookImage + '" alt="' + request.bookName + '" width="100" />');
            requestElement.append('<p>Request Date: ' + new Date(request.requestDate).toLocaleDateString() + '</p>');

            // Add buttons for approval or rejection
            var approveBtn = $('<button class="approveRequestButton" data-request-id="' + request.requestId + '">Approve</button>');
            var rejectBtn = $('<button class="rejectRequestButton" data-request-id="' + request.requestId + '">Reject</button>');

            requestElement.append(approveBtn);
            requestElement.append(rejectBtn);

            requestsContainer.append(requestElement);

            // Attach click event handlers for the buttons
            approveBtn.on('click', function () {
                var requestId = $(this).data('request-id');
                manageBookPurchase(request.buyerId, user.id, request.bookId, requestId);
            });

            rejectBtn.on('click', function () {
                var requestId = $(this).data('request-id');
                updateRequestStatus(requestId, 'Rejected', () => {
                    removeRequestFromList(requestId);
                });

            });
        }
    });
}

function updateRequestStatus(requestId, status, callback) {
    const approvalDate = new Date().toISOString(); // קבלת התאריך הנוכחי בפורמט ISO
    const api = `https://localhost:7195/api/UserBooks/updatePurchaseRequestStatus?requestId=${requestId}&approvalStatus=${status}&approvalDate=${encodeURIComponent(approvalDate)}`;

    ajaxCall('PUT', api, null,
        (response) => {
            if (callback) callback(); // קריאה לפונקציה שסופקה בקולבק אם הסטטוס עודכן בהצלחה
        },
        (error) => {
            console.error('Error updating request status:', error);
            alert('An error occurred while updating the request status.'); 
        }
    );
}

// Manage the transfer of a book from the seller to the buyer
function manageBookPurchase(buyerId, sellerId, bookId, requestId) {
    // עדכון הסטטוס של הבקשה ל-"Approved" לפני ביצוע העברת הספר
    updateRequestStatus(requestId, 'Approved', () => {
        // אם הבקשה אושרה, בצע את העברת הספר
        ajaxCall('POST', `https://localhost:7195/api/UserBooks/Transfer-Book?buyerId=${buyerId}&sellerId=${sellerId}&bookId=${bookId}`, null,
            (response) => {
                console.log('Book purchase processed successfully:', response);
                alert('Book has been transferred successfully.');
                removeRequestFromList(requestId);
            },
            (error) => {
                console.error('Error processing book purchase:', error);
                alert('An error occurred while processing the book purchase.'); 
            }
        );
    });
}
function removeRequestFromList(requestId) { 
    // הסרת הבקשה מהרשימה בדף
    $('#requests-container .request').each(function () {
        var requestElement = $(this);
        var dataRequestId = requestElement.find('.approveRequestButton').data('request-id');
        if (dataRequestId == requestId) {
            requestElement.remove();
            return false; 
        }
    });
}




 //Call fetchPurchaseRequests when the page loads
window.onload = () => {
    fetchPurchaseRequests();
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
        window.location.href("index.html");
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

    const quizBtn = document.getElementById("quizBtn");
    $(quizBtn).click(function () {
        window.location.href = "quiz.html";
    });

  
  

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

