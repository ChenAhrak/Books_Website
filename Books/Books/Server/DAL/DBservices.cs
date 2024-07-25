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

        public int insertAllBooks(Book book)
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
            cmd = CreateCommandWithStoredProcedureInsertAllBooks("SP_InsertAllBooks", con, book);             // create the command

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

        private SqlCommand CreateCommandWithStoredProcedureInsertAllBooks(String spName, SqlConnection con, Book book)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text


            cmd.Parameters.AddWithValue("@Id", book.Id);
            cmd.Parameters.AddWithValue("@Title", book.Title);
            cmd.Parameters.AddWithValue("@Subtitle", book.Subtitle);
            cmd.Parameters.AddWithValue("@Language", book.Language);
            cmd.Parameters.AddWithValue("@Publisher", book.Publisher);
            cmd.Parameters.AddWithValue("@PublishedDate", book.PublishedDate);
            cmd.Parameters.AddWithValue("@Description", book.Description);
            cmd.Parameters.AddWithValue("@PageCount", book.PageCount);
            cmd.Parameters.AddWithValue("@PrintType", book.PrintType);
            if (String.Compare(book.SmallThumbnail, "") == 0)
            {
                book.SmallThumbnail = "https://img.freepik.com/free-vector/open-book-icon_24877-82146.jpg";
            }

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
            cmd.Parameters.AddWithValue("@EpubAcsTokenLink", book.EpubAcsTokenLink);
            cmd.Parameters.AddWithValue("@PdfIsAvailable", book.PdfIsAvailable);
            cmd.Parameters.AddWithValue("@PdfAcsTokenLink", book.PdfAcsTokenLink);
            cmd.Parameters.AddWithValue("@WebReaderLink", book.WebReaderLink);
            cmd.Parameters.AddWithValue("@AccessViewStatus", book.AccessViewStatus);
            cmd.Parameters.AddWithValue("@QuoteSharingAllowed", book.QuoteSharingAllowed);
            cmd.Parameters.AddWithValue("@TextSnippet", book.TextSnippet);
            cmd.Parameters.AddWithValue("@EpubDownloadLink", book.EpubDownloadLink);
            cmd.Parameters.AddWithValue("@PdfDownloadLink", book.PdfDownloadLink);
            cmd.Parameters.AddWithValue("@Price", book.Price);



            return cmd;

        }

        public int insertAllAuthors(Author author)
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
            cmd = CreateCommandWithStoredProcedureInsertAllAuthors("SP_InsertAllAuthors", con, author);             // create the command

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

        private SqlCommand CreateCommandWithStoredProcedureInsertAllAuthors(String spName, SqlConnection con, Author author)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text


            cmd.Parameters.AddWithValue("@Id", author.Id);
            cmd.Parameters.AddWithValue("@Name", author.Name);
            cmd.Parameters.AddWithValue("@BirthDate", author.BirthDate);
            cmd.Parameters.AddWithValue("@DeathDate", author.DeathDate);
            cmd.Parameters.AddWithValue("@TopWork", author.TopWork);
            cmd.Parameters.AddWithValue("@Description", author.Description);
            if (String.Compare(author.Image, "") == 0)
            {
                author.Image = "https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png";
            }
            cmd.Parameters.AddWithValue("@Image", author.Image);


            return cmd;

        }

        public int insertAllCategories(Category category)
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
            cmd = CreateCommandWithStoredProcedureInsertAllCategories("SP_InsertAllCategories", con, category);             // create the command

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

        private SqlCommand CreateCommandWithStoredProcedureInsertAllCategories(String spName, SqlConnection con, Category category)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text



            cmd.Parameters.AddWithValue("@Id", category.Id);
            cmd.Parameters.AddWithValue("@Name", category.Name);

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
            cmd = CreateCommandWithStoredProcedureInsertAllBooksAuthors("SP_InsertAllBooksAuthors", con, bookId, authorId);             // create the command

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

        private SqlCommand CreateCommandWithStoredProcedureInsertAllBooksAuthors(String spName, SqlConnection con, string bookId, int authorId)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text



            cmd.Parameters.AddWithValue("@BookId", bookId);
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
            cmd = CreateCommandWithStoredProcedureInsertAllBooksCategories("SP_InsertAllBooksCategories", con, bookId, categoryId);             // create the command

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
            cmd.Parameters.AddWithValue("@CategoryId", categoryId);

            return cmd;

        }

        public List<Object> readAllBooksDisplay()
        {
            SqlConnection con = null;
            try
            {
                con = connect("myProjDB"); // create the connection
            }
            catch (Exception ex)
            {
                // write to log
                throw (ex);
            }
            SqlCommand cmd = CreateCommandWithStoredProcedureGetAllBooksDisplay("SP_GetBooksDisplay", con);             // create the command
            SqlDataReader reader = cmd.ExecuteReader(); // execute the command
            List<Object> books = new List<Object>();
            while (reader.Read())
            {
                //compare between null and (string)reader["AuthorNames"] null
                if (reader["AuthorNames"] == DBNull.Value)
                {
                    books.Add(new
                    {
                        id = (string)reader["Id"],
                        title = (string)reader["Title"],
                        authorNames = "No Authors",
                        price = (string)reader["Price"],
                        smallImage = (string)reader["SmallThumbnail"],
                        image = (string)reader["Thumbnail"]

                    });
                }

                else
                {
                    books.Add(new
                    {
                        id = (string)reader["Id"],
                        title = (string)reader["Title"],
                        authorNames = (string)reader["AuthorNames"],
                        price = (double)reader["Price"],
                        smallImage = (string)reader["SmallThumbnail"],
                        image = (string)reader["Thumbnail"]

                    });
                }
            }
            return books;
        }
        







            public SqlCommand CreateCommandWithStoredProcedureGetAllBooksDisplay(String spName, SqlConnection con)
            {
                SqlCommand cmd = new SqlCommand(); // create the command object

                cmd.Connection = con;              // assign the connection to the command object

                cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

                cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

                cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

                return cmd;

            }


        }
    }


              



  


       




