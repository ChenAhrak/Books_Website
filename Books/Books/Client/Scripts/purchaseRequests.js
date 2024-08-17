/*var user = JSON.parse(sessionStorage.getItem('user'));*/
function fetchPurchaseRequests() {
    const sellerId = user.id; // מזהה המוכר הנוכחי//משתמש מחובר 
    const apiEndpoint = `https://localhost:7195/api/UserBooks/GetPurchaseRequestsForUser?sellerId=${sellerId}`;

    ajaxCall('GET', apiEndpoint, null,
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
        var requestElement = $('<div>');
        requestElement.addClass('request');
        requestElement.append('<p>Buyer ID: ' + request.buyerId + '</p>');
        requestElement.append('<p>Book ID: ' + request.bookId + '</p>');
        requestElement.append('<p>Request Date: ' + new Date(request.requestDate).toLocaleDateString() + '</p>');

        // Add buttons for approval or rejection
        var approveBtn = $('<button class="approveRequestButton" data-request-id="' + request.requestId + '">Approve</button>');
        var rejectBtn = $('<button class="rejectRequestButton" data-request-id="' + request.requestId + '">Reject</button>');

        requestElement.append(approveBtn);
        requestElement.append(rejectBtn);

        requestsContainer.append(requestElement);

        // Attach click event handlers for the buttons
        approveBtn.on('click', function () {
            updateRequestStatus(this, 'Approved');
        });

        rejectBtn.on('click', function () {
            updateRequestStatus(this, 'Rejected');
        });
    });
}

function updateRequestStatus(requestId, status, callback) {
    const url = `https://localhost:7195/api/UserBooks/UpdateRequestStatus?requestId=${requestId}&status=${status}`;

    ajaxCall('PUT', url, null,
        (response) => {
            alert('Request status updated successfully.');
            if (callback) callback(); // קריאה לפונקציה אם הסטטוס עודכן בהצלחה
        },
        (error) => {
            console.error('Error updating request status:', error);
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
            },
            (error) => {
                console.error('Error processing book purchase:', error);
                alert('An error occurred while processing the book purchase.');
            }
        );
    });
}


 //Call fetchPurchaseRequests when the page loads
window.onload = () => {
    fetchPurchaseRequests();
};
