﻿using Books.Server.DAL;
using System.Diagnostics.Metrics;

namespace Books.Server.BL;


public class Book
{

    string id; 
    //VolumeInfo volumeInfo;
    string title;
    string subtitle;
    string language;
    string publisher;
    string publishedDate;
    string description;
    int pageCount;
    string printType;
    string smallThumbnail; 
    string thumbnail;

    //SaleInfo saleInfo;
    string saleCountry;
    string saleability;
    bool isEbook;
    //AccessInfo accessInfo;
    string accessCountry;
    string viewability;
    bool publicDomain;
    string textToSpeechPermission;
    //EPub epub;
    bool epubIsAvailable;
    string epubDownloadLink;
    string epubAcsTokenLink;

    //Pdf pdf;
    bool pdfIsAvailable;
    string pdfDownloadLink;
    string pdfAcsTokenLink;

    string webReaderLink;
    string accessViewStatus;
    bool quoteSharingAllowed;
    //searchInfo
    string textSnippet;
    double price;

    public Book()
    {
    }
    
    public Book(string id, string title, string subtitle, string language, string publisher, string publishedDate, string description, int pageCount, string printType, string smallThumbnail, string thumbnail, string saleCountry, string saleability, bool isEbook, string accessCountry, string viewability, bool publicDomain, string textToSpeechPermission, bool epubIsAvailable, string epubDownloadLink, string epubAcsTokenLink, bool pdfIsAvailable, string pdfDownloadLink, string pdfAcsTokenLink, string webReaderLink, string accessViewStatus, bool quoteSharingAllowed, string textSnippet,double price)
    {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.language = language;
        this.publisher = publisher;
        this.publishedDate = publishedDate;
        this.description = description;
        this.pageCount = pageCount;
        this.printType = printType;
        this.smallThumbnail = smallThumbnail;
        this.thumbnail = thumbnail;
        this.saleCountry = saleCountry;
        this.saleability = saleability;
        this.isEbook = isEbook;
        this.accessCountry = accessCountry;
        this.viewability = viewability;
        this.publicDomain = publicDomain;
        this.textToSpeechPermission = textToSpeechPermission;
        this.epubIsAvailable = epubIsAvailable;
        this.epubDownloadLink = epubDownloadLink;
        this.epubAcsTokenLink = epubAcsTokenLink;
        this.pdfIsAvailable = pdfIsAvailable;
        this.pdfDownloadLink = pdfDownloadLink;
        this.pdfAcsTokenLink = pdfAcsTokenLink;
        this.webReaderLink = webReaderLink;
        this.accessViewStatus = accessViewStatus;
        this.quoteSharingAllowed = quoteSharingAllowed;
        this.textSnippet = textSnippet;
        this.price = price;
    }

    //getters and setters for all the fields
    public string Id { get => id; set => id = value; }
    public string Title { get => title; set => title = value; }
    public string Subtitle { get => subtitle; set => subtitle = value; }
    public string Language { get => language; set => language = value; }
    public string Publisher { get => publisher; set => publisher = value; }
    public string PublishedDate { get => publishedDate; set => publishedDate = value; }
    public string Description { get => description; set => description = value; }
    public int PageCount { get => pageCount; set => pageCount = value; }
    public string PrintType { get => printType; set => printType = value; }
    public string SmallThumbnail { get => smallThumbnail; set => smallThumbnail = value; }
    public string Thumbnail { get => thumbnail; set => thumbnail = value; }
    public string SaleCountry { get => saleCountry; set => saleCountry = value; }
    public string Saleability { get => saleability; set => saleability = value; }
    public bool IsEbook { get => isEbook; set => isEbook = value; }
    public string AccessCountry { get => accessCountry; set => accessCountry = value; }
    public string Viewability { get => viewability; set => viewability = value; }
    public bool PublicDomain { get => publicDomain; set => publicDomain = value; }
    public string TextToSpeechPermission { get => textToSpeechPermission; set => textToSpeechPermission = value; }
    public bool EpubIsAvailable { get => epubIsAvailable; set => epubIsAvailable = value; }
    public string EpubDownloadLink { get => epubDownloadLink; set => epubDownloadLink = value; }
    public string EpubAcsTokenLink { get => epubAcsTokenLink; set => epubAcsTokenLink = value; }
    public bool PdfIsAvailable { get => pdfIsAvailable; set => pdfIsAvailable = value; }
    public string PdfDownloadLink { get => pdfDownloadLink; set => pdfDownloadLink = value; }
    public string PdfAcsTokenLink { get => pdfAcsTokenLink; set => pdfAcsTokenLink = value; }
    public string WebReaderLink { get => webReaderLink; set => webReaderLink = value; }
    public string AccessViewStatus { get => accessViewStatus; set => accessViewStatus = value; }
    public bool QuoteSharingAllowed { get => quoteSharingAllowed; set => quoteSharingAllowed = value; }
    public string TextSnippet { get => textSnippet; set => textSnippet = value; }

    public double Price { get => price; set => price = value; }







    //just check of the class, need to rewrite this method to return a list of books from database
    public List<Object> readAllBooksDisplay()
    {
        DBservices db = new DBservices();
        try
        {
            return db.readAllBooksDisplay();
        }
        catch
        {
            return null;
        }

    }




// need to rewrite this method to insert a list of books into the database
public bool insertAllBooks(Book b)
    {
        DBservices db = new DBservices();
        try
        {
            db.insertAllBooks(b);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public bool insertAllBooksAuthors(string bookId,int authorId)
    {
        DBservices db = new DBservices();
        try
        {
            db.insertAllBooksAuthors(bookId,authorId);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public bool insertAllBooksCategories(string bookId, int categoryId)
    {
        DBservices db = new DBservices();
        try
        {
            db.insertAllBooksCategories(bookId,categoryId);
            return true;
        }
        catch
        {
            return false;
        }
    }
}