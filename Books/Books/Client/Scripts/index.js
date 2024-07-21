const allData = [];
const allBooks = [];
const allAuthors = [];
const allCategories = [];
const allBooksAuthors = [];
const allBooksCategories = [];
const maxBooks = 50;
const maxEbooks = 50;
const booksApiURL = "https://localhost:7195/api/Books";
const authorsApiUrl = "https://localhost:7195/api/Authors";
const categoriesApiUrl = "https://localhost:7195/api/Categories";
$(document).ready(function () {

    function getRandomQuery(queries) {
        const randomIndex = Math.floor(Math.random() * queries.length);
        return queries[randomIndex];
    }

    async function fetchBooks(query, startIndex = 0, maxResults = 40) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.items || [];
        } catch (error) {
            console.error('Error fetching data from Google Books API:', error);
            return [];
        }
    }

    async function fetchEBooks(query, startIndex = 0, maxResults = 40) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&filter=ebooks&startIndex=${startIndex}&maxResults=${maxResults}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.items || [];
        } catch (error) {
            console.error('Error fetching data from Google Books API:', error);
            return [];
        }
    }

    async function fetchBooksAndEbooks(totalBooks, totalEbooks) {
        const maxResultsPerRequest = 40;
        const queries = [
            'subject:fiction',
            'subject:nonfiction',
            'subject:science',
            'subject:history',
            'subject:technology',
            'subject:fantasy',
            'subject:mystery',
            'subject:romance',
            'subject:thriller',
            'subject:biography'
        ];

        const books = [];
        const ebooks = [];
        let startIndex = 0;

        // Fetching books
        while (books.length < totalBooks) {
            const randomQuery = await getRandomQuery(queries);
            const booksBatch = await fetchBooks(randomQuery, startIndex, maxResultsPerRequest);
            for (const book of booksBatch) {
                if (books.length < totalBooks && !book.saleInfo.isEbook) {
                    books.push(book);
                }
            }

            startIndex += maxResultsPerRequest;

        }

        // Fetching ebooks
        startIndex = 0;

        while (ebooks.length < totalEbooks) {
            const randomQuery = await getRandomQuery(queries);
            const ebooksBatch = await fetchEBooks(randomQuery, startIndex, maxResultsPerRequest);
            for (const ebook of ebooksBatch) {
                if (ebooks.length < totalEbooks && ebook.saleInfo.isEbook) {
                    ebooks.push(ebook);
                }
            }

            startIndex += maxResultsPerRequest;

        }

        const combinedArray = [...books.slice(0, totalBooks), ...ebooks.slice(0, totalEbooks)];
        allData.push(combinedArray);

    }


    async function fetchAuthors(query) {
        const url = `https://openlibrary.org/search/authors.json?q=${query}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.docs[0];
        } catch (error) {
            console.error('Error fetching data from API:', error);
            return [];
        }

    }

    async function fetchImageDescriptionAuthors(query) {
        const url = `https://api.wikimedia.org/core/v1/wikipedia/en/search/title?q=${query}&limit=1`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.pages[0];
        } catch (error) {
            console.error('Error fetching data from API:', error);
            return [];
        }

    }

    async function insertAllDataToDB() {
        await fetchBooksAndEbooks(maxBooks, maxEbooks);
        const allAuthorsSet = new Set();
        const allCategoriesSet = new Set();
        let authorID = 100;
        let categoryID = 1;

        for (const item of allData[0]) {
            const authors = item.volumeInfo.authors ? item.volumeInfo.authors : [];
            const categories = item.volumeInfo.categories ? item.volumeInfo.categories : [];

            // Create the book object
            const book = {
                id: item.id,
                title: item.volumeInfo.title,
                subtitle: item.volumeInfo.subtitle ? item.volumeInfo.subtitle : "",
                language: item.volumeInfo.language ? item.volumeInfo.language : "",
                publisher: item.volumeInfo.publisher ? item.volumeInfo.publisher : "",
                publishedDate: item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate : "",
                description: item.volumeInfo.description ? item.volumeInfo.description : "",
                pageCount: item.volumeInfo.pageCount ? item.volumeInfo.pageCount : 0,
                printType: item.volumeInfo.printType ? item.volumeInfo.printType : "",
                smallThumbnail: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail ? item.volumeInfo.imageLinks.smallThumbnail : "",
                thumbnail: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : "",
                saleCountry: item.saleInfo.country ? item.saleInfo.country : "",
                saleability: item.saleInfo.saleability ? item.saleInfo.country : "",
                isEbook: item.saleInfo.isEbook ? item.saleInfo.isEbook : false,
                accessCountry: item.accessInfo.country ? item.accessInfo.country : "",
                viewability: item.accessInfo.viewability ? item.accessInfo.viewability : "",
                publicDomain: item.accessInfo.publicDomain ? item.accessInfo.publicDomain : false,
                textToSpeechPermission: item.accessInfo.textToSpeechPermission ? item.accessInfo.textToSpeechPermission : "",
                epubIsAvailable: item.accessInfo.epub.isAvailable ? item.accessInfo.epub.isAvailable : false,
                epubDownloadLink: item.accessInfo.epub && item.accessInfo.epub.downloadLink ? item.accessInfo.epub.downloadLink : "",
                epubAcsTokenLink: item.accessInfo.epub.acsTokenLink ? item.accessInfo.epub.acsTokenLink : "",
                pdfIsAvailable: item.accessInfo.pdf.isAvailable ? item.accessInfo.pdf.isAvailable : false,
                pdfDownloadLink: item.accessInfo.pdf && item.accessInfo.pdf.downloadLink ? item.accessInfo.pdf.downloadLink : "",
                pdfAcsTokenLink: item.accessInfo.pdf.acsTokenLink ? item.accessInfo.pdf.acsTokenLink : "",
                webReaderLink: item.webReaderLink ? item.webReaderLink : "",
                accessViewStatus: item.accessInfo.accessViewStatus ? item.accessInfo.accessViewStatus : "",
                quoteSharingAllowed: item.quoteSharingAllowed ? item.quoteSharingAllowed : false,
                textSnippet: item.searchInfo ? item.searchInfo.textSnippet : "",
                price: item.volumeInfo.pageCount ? item.volumeInfo.pageCount / 5 : 0.0
            };


            allBooks.push(book);
            // Create all Authors Objects
            for (const authorsName of authors) {
                if (!allAuthorsSet.has(authorsName)) {
                    const authorsData1 = await fetchAuthors(authorsName);
                    const authorsData2 = await fetchImageDescriptionAuthors(authorsName);
                    if (authorsData1 && authorsData2) {
                        allAuthorsSet.add(authorsName);
                        allAuthors.push({
                            id: authorID,
                            name: authorsName,
                            birthDate: authorsData1.birth_date ? authorsData1.birth_date : "",
                            deathDate: authorsData1.death_date ? authorsData1.death_date : "",
                            topWork: authorsData1.top_work ? authorsData1.top_work : "",
                            description: authorsData2.description ? authorsData2.description : "",
                            image: authorsData2.thumbnail && authorsData2.thumbnail.url ? authorsData2.thumbnail.url : ""

                        });
                        authorID++;
                    }
                }
        }

        // Create all BooksAuthors Objects
        for (const authorsName of authors) {
            let author = allAuthors.find(author => author.name === authorsName);
            if (author) {
                allBooksAuthors.push({ bookId: book.id, authorId: author.id });
            }

            //need to change the sending data to the server
        }

        // Create all Categories Objects
        for (const categoryName of categories) {
            if (!allCategoriesSet.has(categoryName)) {
                allCategoriesSet.add(categoryName);
                allCategories.push({ id: categoryID, name: categoryName });
                categoryID++;
            }

        }

        // Create all BooksCategories Objects
        for (const categoryName of categories) {
            let category = allCategories.find(category => category.name === categoryName);
            if (category) {
                allBooksCategories.push({ bookId: book.id, categoryId: category.id });

            }
        }
    }


    

    /* await ajaxCall("POST", `${booksApiURL}/InsertAllBooks`, JSON.stringify(allBooks), postBooksSCB, postBooksECB);*/

    await ajaxCall("POST", authorsApiUrl, JSON.stringify(allAuthors), postAuthorsSCB, postAuthorsECB);
    //await ajaxCall("POST", categoriesApiUrl, JSON.stringify(allCategories), postCategoriesSCB, postCategoriesECB);

    //for (const bookAuthor of allBooksAuthors) {
    //    await ajaxCall("POST", `${booksApiURL}/PostAllBooksAuthors/${bookAuthor.authorId}`, JSON.stringify(bookAuhtor.bookId), postAllBooksAuthorsSCB, postAllBooksAuthorsECB);
    //}

    //for (const bookCategory of allBooksCategories) {
    //    await ajaxCall("POST", `${booksApiURL}/InsertAllBooksCategories/${bookCategory.categoryId}`, JSON.stringify(bookCategory.bookId), postAllBooksCategoriesSCB, postAllBooksCategoriesECB);
    //}

}
  

    function postBooksSCB(result) {
        console.log(result);
    }

    function postBooksECB(err) {
        console.log(err);
    }

    function postAuthorsSCB(result) {
        console.log(result);
    }

    function postAuthorsECB(err) {
        console.log(err);
    }

    function postCategoriesSCB(result) {
        console.log(result);
    }

    function postCategoriesECB(err) {
        console.log(err);
    }

    function postAllBooksAuthorsSCB(result) {
        console.log(result);
    }

    function postAllBooksAuthorsECB(err) {
        console.log(err);
    }

    function postAllBooksCategoriesSCB(result) {
        console.log(result);
    }

    function postAllBooksCategoriesECB(err) {
        console.log(err);
    }


    const insertDataToDbBtn = document.getElementById("insertDataToDbBtn");
    $(insertDataToDbBtn).click(function () {
        insertAllDataToDB();
        insertDataToDbBtn.disabled = true;
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

    $(logoutbtn).click( function () {
        localStorage.clear();
        window.location.reload();
    });


    const registerbtn = document.getElementById("registerBtn");

    $(registerbtn).click(function () {
        window.location.href = "register.html";
    });

    const adminbtn = document.getElementById("adminBtn");

    $(adminBtn).click( function () {
        window.location.href = "admin.html";
    });

    const myBooks = document.getElementById("myBooksBtn");
    $(myBooks).click(function () {
        window.location.href = "myBooks.html";

    });

});

// Check user status and display appropriate buttons
//if (user && !user.isAdmin) {
//    $('#logoutBtn').show();
//    $('#loginBtn').hide();
//    $('#Registerbtn').hide();
//    $('#myCourses').show();
//    $('#Adminbtn').hide();
//} else if (user && user.isAdmin) {
//    $('#logoutBtn').show();
//    $('#loginBtn').hide();
//    $('#Registerbtn').hide();
//    $('#myCourses').show();
//    $('#Adminbtn').show();
//} else {
//    $('#logoutBtn').hide();
//    $('#loginBtn').show();
//    $('#Registerbtn').show();
//    $('#myCourses').hide();
//    $('#Adminbtn').hide();
//}



