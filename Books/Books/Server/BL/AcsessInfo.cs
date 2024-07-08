namespace Books.Server.BL
{
    public class AccessInfo
    {
        string country;
        string viewability;
        bool embeddable;
        bool publicDomain;
        string textToSpeechPermission;
        EPub epub;
        Pdf pdf;
        string webReaderLink;
        string accessViewStatus;
        bool quoteSharingAllowed;

        public AccessInfo()
        {
        }

        public AccessInfo(string country, string viewability, bool embeddable, bool publicDomain, string textToSpeechPermission, EPub epub, Pdf pdf, string webReaderLink, string accessViewStatus, bool quoteSharingAllowed)
        {
            this.country = country;
            this.viewability = viewability;
            this.embeddable = embeddable;
            this.publicDomain = publicDomain;
            this.textToSpeechPermission = textToSpeechPermission;
            this.epub = epub;
            this.pdf = pdf;
            this.webReaderLink = webReaderLink;
            this.accessViewStatus = accessViewStatus;
            this.quoteSharingAllowed = quoteSharingAllowed;
        }

        public string Country { get => country; set => country = value; }
        public string Viewability { get => viewability; set => viewability = value; }
        public bool Embeddable { get => embeddable; set => embeddable = value; }
        public bool PublicDomain { get => publicDomain; set => publicDomain = value; }
        public string TextToSpeechPermission { get => textToSpeechPermission; set => textToSpeechPermission = value; }
        public EPub Epub { get => epub; set => epub = value; }
        public Pdf Pdf { get => pdf; set => pdf = value; }
        public string WebReaderLink { get => webReaderLink; set => webReaderLink = value; }
        public string AccessViewStatus { get => accessViewStatus; set => accessViewStatus = value; }
        public bool QuoteSharingAllowed { get => quoteSharingAllowed; set => quoteSharingAllowed = value; }
    }
}