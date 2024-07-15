const allData = [];
const allBooks = [];
const maxBooks = 50;
const maxEbooks = 50;
const apiURL = "https://localhost:7195/api/Books";
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
        
    async function insertBooksToDB() {
        await fetchBooksAndEbooks(maxBooks, maxEbooks);
        //run all over the array forEach
        console.log(allData[0]);
        allData[0].forEach(function (item) {
      

                const book = {
                    id: item.id,
                    title: item.volumeInfo.title,
                    subtitle: item.volumeInfo.subtitle ?item.volumeInfo.subtitle: "",
                    language: item.volumeInfo.language ? item.volumeInfo.language : "",
                    authors: item.volumeInfo.authors ? item.volumeInfo.authors: [],
                    publisher: item.volumeInfo.publisher ?item.volumeInfo.publisher :"",
                    publishedDate: item.volumeInfo.publishedDate ? item.volumeInfo.publishedDate:"",
                    description: item.volumeInfo.description ? item.volumeInfo.description:"",
                    pageCount: item.volumeInfo.pageCount ? item.volumeInfo.pageCount:0,
                    printType: item.volumeInfo.printType ? item.volumeInfo.printType:"",
                    categories: item.volumeInfo.categories ? item.volumeInfo.categories: [],
                    smallThumbnail: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail ? item.volumeInfo.imageLinks.smallThumbnail : "",
                    thumbnail: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail: "",
                    saleCountry: item.saleInfo.country ? item.saleInfo.country:"" ,
                    saleability: item.saleInfo.saleability ? item.saleInfo.country : "",
                    isEbook: item.saleInfo.isEbook ? item.saleInfo.isEbook:false,
                    accessCountry: item.accessInfo.country ? item.accessInfo.country : "",
                    viewability: item.accessInfo.viewability ? item.accessInfo.viewability : "",
                    publicDomain: item.accessInfo.publicDomain ? item.accessInfo.publicDomain:false,
                    textToSpeechPermission: item.accessInfo.textToSpeechPermission ? item.accessInfo.textToSpeechPermission:"",
                    epubIsAvailable: item.accessInfo.epub.isAvailable ? item.accessInfo.epub.isAvailable:false,
                    epubDownloadLink: item.accessInfo.epub && item.accessInfo.epub.downloadLink ? item.accessInfo.epub.downloadLink: "",
                    epubAcsTokenLink: item.accessInfo.epub.acsTokenLink ? item.accessInfo.epub.acsTokenLink: "",
                    pdfIsAvailable: item.accessInfo.pdf.isAvailable ? item.accessInfo.pdf.isAvailable :false,
                    pdfDownloadLink: item.accessInfo.pdf && item.accessInfo.pdf.downloadLink ? item.accessInfo.pdf.downloadLink: "",
                    pdfAcsTokenLink: item.accessInfo.pdf.acsTokenLink ? item.accessInfo.pdf.acsTokenLink:"",
                    webReaderLink: item.webReaderLink ? item.webReaderLink:"",
                    accessViewStatus: item.accessInfo.accessViewStatus ? item.accessInfo.accessViewStatus:"",
                    quoteSharingAllowed: item.quoteSharingAllowed ? item.quoteSharingAllowed: false,
                    textSnippet: item.searchInfo ? item.searchInfo.textSnippet : ""

            }

            allBooks.push(book);
               
        });
        console.log(allBooks);
        ajaxCall("POST", apiURL, JSON.stringify(allBooks), postBooksSCB, postBooksECB);
 
    }

    insertBooksToDB();

    function postBooksSCB(result) {
        console.log(result);
    }

    function postBooksECB(err) {
        console.log(err);
    }







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



