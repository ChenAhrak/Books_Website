const allData = [];
const allBooks = [];
$(document).ready(function () {
    //40 ebooks max in one request
    $.get("https://www.googleapis.com/books/v1/volumes?q=a&filter=ebooks&maxResults=40", function (eBookdData1) {
        //10 ebooks default in one request
        $.get("https://www.googleapis.com/books/v1/volumes?q=b&filter=ebooks", function (eBooksData2) {
            allData.push(eBookdData1, eBooksData2);
            console.log(allData);
            insertBooks();
        });

    });
    
    function insertBooks() {
        allData.forEach(function (data) {
            console.log(data);

            data.items.forEach(function (item) {
                const book = {
                    kind: item.kind,
                    id: item.id,
                    title: item.volumeInfo.title,
                    subtitle: item.volumeInfo.subtitle,
                    authors: item.volumeInfo.authors,
                    publisher: item.volumeInfo.publisher,
                    publishedDate: item.volumeInfo.publishedDate,
                    description: item.volumeInfo.description,
                    pageCount: item.volumeInfo.pageCount,
                    printType: item.volumeInfo.printType,
                    categories: item.volumeInfo.categories,
                    smallThumbnail: item.volumeInfo.imageLinks.smallThumbnail,
                    thumbnail: item.volumeInfo.imageLinks.thumbnail,
                    saleCountry: item.saleInfo.country,
                    saleability: item.saleInfo.saleability,
                    isEbook: item.saleInfo.isEbook,
                    accessCountry: item.accessInfo.country,
                    viewability: item.accessInfo.viewability,
                    embeddable: item.accessInfo.embeddable,
                    publicDomain: item.accessInfo.publicDomain,
                    textToSpeechPermission: item.accessInfo.textToSpeechPermission,
                    epubIsAvailable: item.accessInfo.epub.isAvailable,
                    epubAcsTokenLink: item.accessInfo.epub.downloadLink,
                    pdfIsAvailable: item.accessInfo.pdf.isAvailable,
                    pdfAcsTokenLink: item.accessInfo.pdf.downloadLink,
                    webReaderLink: item.webReaderLink,
                    accessViewStatus: item.accessInfo.accessViewStatus,
                    quoteSharingAllowed: item.quoteSharingAllowed

                }
                allBooks.push(book);
            });
            console.log(allBooks);
        });
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



