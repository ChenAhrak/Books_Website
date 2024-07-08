namespace Books.Server.BL;

public class EPub
{
    bool isAvailable;
    string acsTokenLink;

    public EPub()
    {
    }

    public EPub(bool isAvailable, string acsTokenLink)
    {
        this.isAvailable = isAvailable;
        this.acsTokenLink = acsTokenLink;
    }

    public bool IsAvailable { get => isAvailable; set => isAvailable = value; }
    public string AcsTokenLink { get => acsTokenLink; set => acsTokenLink = value; }
}