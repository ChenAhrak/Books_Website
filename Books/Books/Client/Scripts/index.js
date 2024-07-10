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
            console.log("here");

            data.forEach(function (item) {
                console.log("here");
                const book = {
                    kind: item.kind,
                    id: item.id,
                    title: item.items.volumeInfo.title,
                    subtitle: item.items.volumeInfo.subtitle,
                    authors: item.items.volumeInfo.authors,
                    publisher: item.items.volumeInfo.publisher,
                    publishedDate: item.items.volumeInfo.publishedDate,
                    description: item.items.volumeInfo.description,
                    pageCount: item.items.volumeInfo.pageCount,
                    printType: item.items.volumeInfo.printType,
                    categories: item.items.volumeInfo.categories,
                    smallThumbnail: item.items.volumeInfo.smallThumbnail,
                    thumbnail: item.items.volumeInfo.thumbnail,
                    saleCountry: item.items.saleInfo.saleCountry,
                    saleability: item.items.saleInfo.saleability,
                    isEbook: item.items.saleInfo.isEbook,
                    accessCountry: item.items.accessInfo.accessCountry,
                    viewability: item.items.accessInfo.viewability,
                    embeddable: item.items.accessInfo.embeddable,
                    publicDomain: item.items.accessInfo.publicDomain,
                    textToSpeechPermission: item.items.accessInfo.textToSpeechPermission,
                    epubIsAvailable: item.items.accessInfo.epub.isAvailable,
                    epubAcsTokenLink: item.items.accessInfo.epub.downloadLink,
                    pdfIsAvailable: item.items.accessInfo.pdf.isAvailable,
                    pdfAcsTokenLink: item.items.accessInfo.pdf.downloadLink,
                    webReaderLink: item.webReaderLink,
                    accessViewStatus: item.accessViewStatus,
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



