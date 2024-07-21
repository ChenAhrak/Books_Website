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

            // to many parameters to add to the command
            for (int i = 0; i < 1; i++)
            {

                cmd.Parameters.AddWithValue("@Id", books[i].Id);
                cmd.Parameters.AddWithValue("@Title", books[i].Title);
                cmd.Parameters.AddWithValue("@Subtitle", books[i].Subtitle);
                cmd.Parameters.AddWithValue("@Language", books[i].Language);
                cmd.Parameters.AddWithValue("@Publisher", books[i].Publisher);
                cmd.Parameters.AddWithValue("@PublishedDate", books[i].PublishedDate);
                cmd.Parameters.AddWithValue("@Description", books[i].Description);
                cmd.Parameters.AddWithValue("@PageCount", books[i].PageCount);
                cmd.Parameters.AddWithValue("@PrintType", books[i].PrintType);
                cmd.Parameters.AddWithValue("@SmallThumbnail", books[i].SmallThumbnail);
                cmd.Parameters.AddWithValue("@Thumbnail", books[i].Thumbnail);
                cmd.Parameters.AddWithValue("@SaleCountry", books[i].SaleCountry);
                cmd.Parameters.AddWithValue("@Saleability", books[i].Saleability);
                cmd.Parameters.AddWithValue("@IsEbook", books[i].IsEbook);
                cmd.Parameters.AddWithValue("@AccessCountry", books[i].AccessCountry);
                cmd.Parameters.AddWithValue("@Viewability", books[i].Viewability);
                cmd.Parameters.AddWithValue("@PublicDomain", books[i].PublicDomain);
                cmd.Parameters.AddWithValue("@TextToSpeechPermission", books[i].TextToSpeechPermission);
                cmd.Parameters.AddWithValue("@EpubIsAvailable", books[i].EpubIsAvailable);
                cmd.Parameters.AddWithValue("@EpubAcsTokenLink", books[i].EpubAcsTokenLink);
                cmd.Parameters.AddWithValue("@PdfIsAvailable", books[i].PdfIsAvailable);
                cmd.Parameters.AddWithValue("@PdfAcsTokenLink", books[i].PdfAcsTokenLink);
                cmd.Parameters.AddWithValue("@WebReaderLink", books[i].WebReaderLink);
                cmd.Parameters.AddWithValue("@AccessViewStatus", books[i].AccessViewStatus);
                cmd.Parameters.AddWithValue("@QuoteSharingAllowed", books[i].QuoteSharingAllowed);
                cmd.Parameters.AddWithValue("@TextSnippet", books[i].TextSnippet);
                cmd.Parameters.AddWithValue("@EpubDownloadLink", books[i].EpubDownloadLink);
                cmd.Parameters.AddWithValue("@PdfDownloadLink", books[i].PdfDownloadLink);
                cmd.Parameters.AddWithValue("@Price", books[i].Price);


            }
            return cmd;

        }

        public int insertAllAuthors(List<Author> authors)
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
            cmd = CreateCommandWithStoredProcedureInsertAllAuthors("SP_InsertAllAuthors", con, authors);             // create the command

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

        public SqlCommand CreateCommandWithStoredProcedureInsertAllAuthors(String spName, SqlConnection con, List<Author> authors)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            //foreach(Author author in authors)
           
            //{

                cmd.Parameters.AddWithValue("@Id", authors[0].Id);
                cmd.Parameters.AddWithValue("@Name", authors[0].Name);
                cmd.Parameters.AddWithValue("@BirthDate", authors[0].BirthDate);
                cmd.Parameters.AddWithValue("@DeathDate", authors[0].DeathDate);
                cmd.Parameters.AddWithValue("@TopWork", authors[0].TopWork);
                cmd.Parameters.AddWithValue("@Description", authors[0].Description);
                if (String.Compare(authors[0].Image, "") == 0)
                {
                    authors[0].Image = "https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png";
                }
                cmd.Parameters.AddWithValue("@Image", authors[0].Image);

            //}
            return cmd;

        }

        public int insertAllCategories(List<Category> categories)
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
            cmd = CreateCommandWithStoredProcedureInsertAllCategories("SP_InsertAllCategories", con, categories);             // create the command

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

        public SqlCommand CreateCommandWithStoredProcedureInsertAllCategories(String spName, SqlConnection con, List<Category> categories)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            //foreach (Category category in categories)
            //{

                cmd.Parameters.AddWithValue("@Id", categories[0].Id);
                cmd.Parameters.AddWithValue("@Name", categories[0].Name);
            //}
            return cmd;

        }

        public int insertAllBooksAuthors(string bookId, int authorId)
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
            cmd = CreateCommandWithStoredProcedureInsertAllBooksAuthors("SP_InsertAllBooksAuthors", con, bookId,authorId);             // create the command

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

        public SqlCommand CreateCommandWithStoredProcedureInsertAllBooksAuthors(String spName, SqlConnection con, string bookId, int authorId)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

           

                cmd.Parameters.AddWithValue("@BookId",bookId);
                cmd.Parameters.AddWithValue("@AuthorId", authorId);
           
            return cmd;

        }

        public int insertAllBooksCategories(string bookId, int categoryId)
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
            cmd = CreateCommandWithStoredProcedureInsertAllBooksCategories("SP_InsertAllBooksCategories", con, bookId,categoryId);             // create the command

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

        public SqlCommand CreateCommandWithStoredProcedureInsertAllBooksCategories(String spName, SqlConnection con, string bookId, int categoryId)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

           

                cmd.Parameters.AddWithValue("@BookId", bookId);
                cmd.Parameters.AddWithValue("@CategoryId",categoryId);
            
            return cmd;

        }


    }
}
  

   
