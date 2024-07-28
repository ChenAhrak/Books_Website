const booksApiURL = "https://localhost:7195/api/Books";

$(document).ready(function () { 
    async function getBooksDataFromDB() {
        await ajaxCall("GET", `${booksApiURL}/GetBooksDisplay`, "", getBooksDataFromDBSCB, getBooksDataFromDBECB);
    }

    function getBooksDataFromDBSCB(result) {
        console.log(result);
        renderAllBooksDisplay(result);
    }

    function getBooksDataFromDBECB(err) {
        console.log(err);
    }

    function renderAllBooksDisplay(books) {
        var booksContainer = $('#books-container');

        books.forEach(book => {
            var bookElement = $('div');
            bookElement.append('<img src="' + book.image + '" alt="book image" />');
            bookElement.append('<h3>' + book.title + '</h3>');
            bookElement.append('<p>' + 'By: ' + book.authorNames + '</p>');
            bookElement.append('<p>' + 'Price: ' + book.price + ' ILS' + '</p>');
            bookElement.append('<p><button id="' + book.id + '" class="add-book">Add Book</button></p>');

            booksContainer.append(bookElement);

        });
    }
     
       

        getBooksDataFromDB();
});