using System.Diagnostics.Metrics;

namespace Books.Server.BL;


public class Book
{
    string kind;
    string id;
    VolumeInfo volumeInfo;
    SaleInfo saleInfo;
    AccessInfo accessInfo;

    public Book()
    {
    }

    public Book(string kind, string id, VolumeInfo volumeInfo, SaleInfo saleInfo, AccessInfo accessInfo)
    {
        this.kind = kind;
        this.id = id;
        this.volumeInfo = volumeInfo;
        this.saleInfo = saleInfo;
        this.accessInfo = accessInfo;
    }

    public string Kind { get => kind; set => kind = value; }
    public string Id { get => id; set => id = value; }
    public VolumeInfo VolumeInfo { get => volumeInfo; set => volumeInfo = value; }
    public SaleInfo SaleInfo { get => saleInfo; set => saleInfo = value; }
    public AccessInfo AccessInfo { get => accessInfo; set => accessInfo = value; }


    // just check of the class, need to rewrite this method to return a list of books from database
    public List<Book> readAllBooks() { 
        List<Book> books = new List<Book>();

        VolumeInfo volumeInfo = new VolumeInfo("title","subTitle", new List<string>(),"publisher","publishedDate","description",544,"Book",new List<string>(),"imageLinks" );
        SaleInfo saleInfo = new SaleInfo("country", "saleability", false);
        AccessInfo accessInfo = new AccessInfo("string country", "string viewability", true, true, "string textToSpeechPermission", new EPub(false,"fgdg"), new Pdf(true, "string acsTokenLin"), "string webReaderLink", "string accessViewStatus", false);
        Book book = new Book("books#volume", "123", volumeInfo,saleInfo, accessInfo);

        books.Add(book);
        return books;

    }


    // need to rewrite this method to insert a list of books into the database
    public bool insertAllBooks(List<Book> books)
    {
        return true;
    }
}