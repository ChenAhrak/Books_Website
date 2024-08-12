using System;
using System.IO;
using System.Net.Http;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Threading.Tasks;
using Books.Server.DAL;
using iTextSharp.text.pdf;
using iTextSharp.text.pdf.parser;
using Microsoft.AspNetCore.Mvc.RazorPages;
using UglyToad.PdfPig;
using UglyToad.PdfPig.Content;

namespace Books.Server.BL
{
    public class Pdf
    {

        public Pdf()
        {
        }

        // Method to download PDF from a URL
        public async Task<byte[]> DownloadPdfAsync(string pdfDownloadLink)
        {
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync(pdfDownloadLink);
                response.EnsureSuccessStatusCode();
                return await response.Content.ReadAsByteArrayAsync();
            }
        }

        //public string ExtractTextFromPdf(byte[] pdfBytes)
        //    {
        //        using (MemoryStream memoryStream = new MemoryStream(pdfBytes))
        //        {
        //            using (UglyToad.PdfPig.PdfDocument document = UglyToad.PdfPig.PdfDocument.Open(memoryStream))
        //            {
        //                StringBuilder text = new StringBuilder();

        //                foreach (var page in document.GetPages())
        //                {
        //                    text.Append(page.Text);
        //                }

        //                return text.ToString();
        //            }
        //        }
        //    }


        //Method to extract text from a PDF byte array
    public string ExtractTextFromPdf(byte[] pdfBytes)
        {
            using (MemoryStream memoryStream = new MemoryStream(pdfBytes))
            using (PdfReader reader = new PdfReader(memoryStream))
            {
                StringBuilder text = new StringBuilder();

                for (int page = 1; page <= reader.NumberOfPages; page++)
                {
                    text.Append(PdfTextExtractor.GetTextFromPage(reader, page));
                }

                return text.ToString();
            }
        }

        // Method to extract text from a PDF link
        public async Task ExtractText(string pdfDownloadLink, string bookId)
        {
            DBservices db = new DBservices();

            byte[] pdfBytes = await DownloadPdfAsync(pdfDownloadLink);
            string extractedText = ExtractTextFromPdf(pdfBytes);
            //db.InsertBookText(bookId, 1, extractedText);

            // Assuming you want to store the extracted text page by page
            // If the PDF extraction is one large block, you can modify this part
            using (MemoryStream memoryStream = new MemoryStream(pdfBytes))
            using (PdfReader reader = new PdfReader(memoryStream))
            {
                for (int page = 1; page <= reader.NumberOfPages; page++)
                {
                    if (reader.GetPageSize(page).Width == 0 || reader.GetPageSize(page).Height == 0)
                    {
                        continue;
                    }

                    string pageText = PdfTextExtractor.GetTextFromPage(reader, page);
                    db.InsertBookText(bookId, page, pageText);
                }
            }
        }
    }
}
