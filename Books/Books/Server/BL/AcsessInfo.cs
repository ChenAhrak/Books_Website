namespace Books.Server.BL
{
    public class AccessInfo
    {
        string country;
        string viewability;
        bool embeddable;
        bool publicDomain;
        string textToSpeechPermission;
        Epub epub;
        Pdf pdf;
        string webReaderLink;
        string accessViewStatus;
        bool quoteSharingAllowed;

        public AccessInfo()
        {
        }
    }
}