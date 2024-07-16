using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Text;
using Microsoft.Extensions.Configuration;
using Books.Server.BL;
using System.Data.SqlClient;
using System.Xml.Linq;
using System.Reflection.PortableExecutable;

namespace Books.Server.DAL
{
    public class DBservices
    {
        public DBservices()
        {
        }
        public SqlConnection connect(string coString)
        {
            // read the connection string from the configuration file
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json").Build();
            string cStr = configuration.GetConnectionString("myProjDB");
            SqlConnection con = new SqlConnection(cStr);
            con.Open();
            return con;
        }

        public int insertAllBooks(List<Book> books)
        {

            SqlConnection con;
            SqlCommand cmd;

            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            cmd = CreateCommandWithStoredProcedureInsertAllBooks("SP_InsertAllBooks", con, books);             // create the command

            try
            {
                int numEffected = cmd.ExecuteNonQuery(); // execute the command
                return numEffected;
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }

            finally
            {
                if (con != null)
                {
                    // close the db connection
                    con.Close();
                }
            }

        }

        public SqlCommand CreateCommandWithStoredProcedureInsertAllBooks(String spName, SqlConnection con, List<Book> books)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

           
            foreach (Book book in books)
            {
                cmd.Parameters.AddWithValue("@Id", book.Id);
                cmd.Parameters.AddWithValue("@Title", book.Title);
                cmd.Parameters.AddWithValue("@Subtitle", book.Subtitle);
                cmd.Parameters.AddWithValue("@Language", book.Language);
                cmd.Parameters.AddWithValue("@Publisher", book.Publisher);
                cmd.Parameters.AddWithValue("@PublishedDate", book.PublishedDate);
                cmd.Parameters.AddWithValue("@Description", book.Description);
                cmd.Parameters.AddWithValue("@PageCount", book.PageCount);
                cmd.Parameters.AddWithValue("@PrintType", book.PrintType);
                cmd.Parameters.AddWithValue("@SmallThumbnail", book.SmallThumbnail);
                cmd.Parameters.AddWithValue("@Thumbnail", book.Thumbnail);
                cmd.Parameters.AddWithValue("@SaleCountry", book.SaleCountry);
                cmd.Parameters.AddWithValue("@Saleability", book.Saleability);
                cmd.Parameters.AddWithValue("@IsEbook", book.IsEbook);
                cmd.Parameters.AddWithValue("@AccessCountry", book.AccessCountry);
                cmd.Parameters.AddWithValue("@Viewability", book.Viewability);
                cmd.Parameters.AddWithValue("@PublicDomain", book.PublicDomain);
                cmd.Parameters.AddWithValue("@TextToSpeechPermission", book.TextToSpeechPermission);
                cmd.Parameters.AddWithValue("@EpubIsAvailable", book.EpubIsAvailable);
                cmd.Parameters.AddWithValue("@EpubDownloadLink", book.EpubDownloadLink);
                cmd.Parameters.AddWithValue("@EpubAcsTokenLink", book.EpubAcsTokenLink);
                cmd.Parameters.AddWithValue("@PdfIsAvailable", book.PdfIsAvailable);
                cmd.Parameters.AddWithValue("@PdfDownloadLink", book.PdfDownloadLink);
                cmd.Parameters.AddWithValue("@PdfAcsTokenLink", book.PdfAcsTokenLink);
                cmd.Parameters.AddWithValue("@WebReaderLink", book.WebReaderLink);
                cmd.Parameters.AddWithValue("@AccessViewStatus", book.AccessViewStatus);
                cmd.Parameters.AddWithValue("@QuoteSharingAllowed", book.QuoteSharingAllowed);
                cmd.Parameters.AddWithValue("@TextSnippet", book.TextSnippet);
            }   
            return cmd;

        }
    }
}
