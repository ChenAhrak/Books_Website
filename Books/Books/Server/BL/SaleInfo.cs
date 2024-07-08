using System;

namespace Books.Server.BL;

public class SaleInfo
{
	string country;
    string saleability;
    bool isEbook;

	public SaleInfo()
	{
    }
    public SaleInfo(string country, string saleability, bool isEbook)
    {
        this.country = country;
        this.saleability = saleability;
        this.isEbook = isEbook;
    }

    public string Country { get => country; set => country = value; }
    public string Saleability { get => saleability; set => saleability = value; }
    public bool IsEbook { get => isEbook; set => isEbook = value; }
}
