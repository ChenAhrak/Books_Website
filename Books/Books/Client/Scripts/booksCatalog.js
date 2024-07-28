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

        books.forEach(ebook => {
            var bookElement = $('div');
            bookElement.append('<img src="' + ebook.image + '" alt="book image" />');
            bookElement.append('<h3>' + ebook.title + '</h3>');
            bookElement.append('<p>' + 'By: ' + ebook.authorNames + '</p>');
            bookElement.append('<p>' + 'Price: ' + ebook.price + ' ILS' + '</p>');
            booksContainer.append(bookElement);

        });
    }
     
       

        getBooksDataFromDB();
});