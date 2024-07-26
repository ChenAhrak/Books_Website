const authorsApiUrl = "https://localhost:7195/api/Authors";

$(document).ready(function () {

    async function getAllAuthorsFromDB() {
        await ajaxCall("GET", authorsApiUrl, "", getAllAuthorsFromDBSCB, getAllAuthorsFromDBECB);
    }

    function getAllAuthorsFromDBSCB(result) {
        console.log(result);
        renderAllAuthors(result);
    }

    function getAllAuthorsFromDBECB(err) {
        console.log(err);
    }

    function renderAllAuthors(authors) {
        var authorsContainer = $("#authors-container");
        authors.forEach(function (author) {
            var authorElement = $('<div>');
            authorElement.append('<img src="' + author.image + '" alt="author image" />');
            authorElement.append('<h3>' + author.name + '</h3>');
            authorElement.append('<p>' + 'Birth Date: ' + author.birthDate + '</p>');
            authorElement.append('<p>' + 'Death Date: ' + author.deathDate + '</p>');
            authorElement.append('<p>' + 'Top Work: ' + author.topWork + '</p>');
            authorElement.append('<p>' + 'Id: ' + author.id + '</p>');
            authorElement.append('<p>' + 'Description: ' + author.description + '</p>');

            authorsContainer.append(authorElement);

        });
    }

    getAllAuthorsFromDB();




});
