namespace Books.Server.BL;

public class VolumeInfo
{
    string title;
    string subtitle;
    List<string> authors;
    string publisher;
    string publishedDate;
    string description;
    int pageCount;
    string printType;
    List<string> categories;
    string imageLinks;

    public VolumeInfo()
	{
    }

    public VolumeInfo(string title, string subtitle, List<string> authors, string publisher, string publishedDate, string description, int pageCount, string printType, List<string> categories, string imageLinks)
    {
        this.title = title;
        this.subtitle = subtitle;
        this.authors = authors;
        this.publisher = publisher;
        this.publishedDate = publishedDate;
        this.description = description;
        this.pageCount = pageCount;
        this.printType = printType;
        this.categories = categories;
        this.imageLinks = imageLinks;
    }

    public string Title { get => title; set => title = value; }
    public string Subtitle { get => subtitle; set => subtitle = value; }
    public List<string> Authors { get => authors; set => authors = value; }
    public string Publisher { get => publisher; set => publisher = value; }
    public string PublishedDate { get => publishedDate; set => publishedDate = value; }
    public string Description { get => description; set => description = value; }
    public int PageCount { get => pageCount; set => pageCount = value; }
    public string PrintType { get => printType; set => printType = value; }
    public List<string> Categories { get => categories; set => categories = value; }
    public string ImageLinks { get => imageLinks; set => imageLinks = value; }
}
