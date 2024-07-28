const booksApiURL = "https://localhost:7195/api/Books";

$(document).ready(function () {
   
async function getEBooksDataFromDB() {
    await ajaxCall("GET", `${booksApiURL}/GetEBooksDisplay`, "", getEBooksDataFromDBSCB, getEBooksDataFromDBECB);
}

function getEBooksDataFromDBSCB(result) {
    console.log(result);
    renderAllEBooksDisplay(result);
}

function getEBooksDataFromDBECB(err) {
    console.log(err);
}

function renderAllEBooksDisplay(ebooks) {
    var ebooksContainer = $('#ebooks-container');
    ebooks.forEach(ebook => {
        var ebookElement = $('div');
        ebookElement.append('<img src="' + ebook.image + '" alt="book image" />');
        ebookElement.append('<h3>' + ebook.title + '</h3>');
        ebookElement.append('<p>' + 'By: ' + ebook.authorNames + '</p>');
        ebookElement.append('<p>' + 'Price: ' + ebook.price + ' ILS' + '</p>');
        ebooksContainer.append(ebookElement);

    });  

}

    getEBooksDataFromDB();


});