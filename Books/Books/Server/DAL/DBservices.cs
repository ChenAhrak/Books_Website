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

        public List<Object> getBooksDisplay()
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
                books.Add(new
                {
                    id = (string)reader["Id"],
                    title = (string)reader["Title"],
                    //Check for null value in the AuthorNames column
                    authorNames = reader.IsDBNull(reader.GetOrdinal("AuthorNames"))
                                        ? "Unknown"
                                        : reader.GetString(reader.GetOrdinal("AuthorNames")),

                    price = (double)reader["Price"],
                    smallImage = (string)reader["SmallThumbnail"],
                    image = (string)reader["Thumbnail"]

                }); 
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

            public List<Object> getEBooksDisplay()
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
            SqlCommand cmd = CreateCommandWithStoredProcedureGetAllEBooksDisplay("SP_GetEBooksDisplay", con);             // create the command
            SqlDataReader reader = cmd.ExecuteReader(); // execute the command
            List<Object> ebooks = new List<Object>();
            while (reader.Read())
            {
                ebooks.Add(new
                {
                    id = (string)reader["Id"],
                    title = (string)reader["Title"],
                    //Check for null value in the AuthorNames column
                    authorNames = reader.IsDBNull(reader.GetOrdinal("AuthorNames"))
                                        ? "Unknown"
                                        : reader.GetString(reader.GetOrdinal("AuthorNames")),

                    price = (double)reader["Price"],
                    smallImage = (string)reader["SmallThumbnail"],
                    image = (string)reader["Thumbnail"]

                });
            }
            return ebooks;

        }
        public SqlCommand CreateCommandWithStoredProcedureGetAllEBooksDisplay(String spName, SqlConnection con)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            return cmd;
        }

        public List<Object> getAllBooks()
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
            SqlCommand cmd = CreateCommandWithStoredProcedureGetAllBooks("SP_GetAllBooks", con);             // create the command
            SqlDataReader reader = cmd.ExecuteReader(); // execute the command
            List<Object> books = new List<Object>();
            while (reader.Read())
            {
                books.Add(new
                {
                    id = (string)reader["Id"],
                    title = (string)reader["Title"],
                    subtitle = (string)reader["Subtitle"],
                    //Check for null value in the AuthorNames column
                    authorNames = reader.IsDBNull(reader.GetOrdinal("AuthorNames"))
                                        ? "Unknown"
                                        : reader.GetString(reader.GetOrdinal("AuthorNames")),

                    publisher = (string)reader["Publisher"],
                    publishedDate = reader.IsDBNull(reader.GetOrdinal("PublishedDate"))
                              ? null
                              : ((DateTime)reader["PublishedDate"]).ToString("yyyy-MM-dd"),
                    description = (string)reader["Description"],
                    pageCount = (int)reader["PageCount"],
                    language = (string)reader["Language"],
                    price = (double)reader["Price"],
                    smallImage = (string)reader["SmallThumbnail"],
                    image = (string)reader["Thumbnail"],
                    pdfLink = (string)reader["PdfDownloadLink"]

                });
            }
            return books;
        }

        private SqlCommand CreateCommandWithStoredProcedureGetAllBooks(String spName, SqlConnection con)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            return cmd;
        }

        public List<Object> getAllEBooks()
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
            SqlCommand cmd = CreateCommandWithStoredProcedureGetAllEBooks("SP_GetAllEBooks", con);             // create the command
            SqlDataReader reader = cmd.ExecuteReader(); // execute the command
            List<Object> ebooks = new List<Object>();
            while (reader.Read())
            {
               
                ebooks.Add(new
                {
                    id = (string)reader["Id"],
                    title = (string)reader["Title"],
                    subtitle = (string)reader["Subtitle"],
                    //Check for null value in the AuthorNames column
                    authorNames = reader.IsDBNull(reader.GetOrdinal("AuthorNames"))
                                            ? "Unknown"
                                            : reader.GetString(reader.GetOrdinal("AuthorNames")),

                    publisher = (string)reader["Publisher"],
                    publishedDate = reader.IsDBNull(reader.GetOrdinal("PublishedDate"))
                                  ? null
                                  : ((DateTime)reader["PublishedDate"]).ToString("yyyy-MM-dd"),
                    description = (string)reader["Description"],
                    pageCount = (int)reader["PageCount"],
                    language = (string)reader["Language"],
                    price = (double)reader["Price"],
                    smallImage = (string)reader["SmallThumbnail"],
                    image = (string)reader["Thumbnail"],
                    pdfLink = (string)reader["PdfDownloadLink"]
                });
            }
            return ebooks;

        }

        private SqlCommand CreateCommandWithStoredProcedureGetAllEBooks(String spName, SqlConnection con)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            return cmd;
        }

        public List<Author> ReadAllAuthors()
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
            SqlCommand cmd = CreateCommandWithStoredProcedureGetAllAuthors("SP_GetAllAuthors", con);             // create the command
            SqlDataReader reader = cmd.ExecuteReader(); // execute the command
            List<Author> authors = new List<Author>();
            while (reader.Read())
            {
                authors.Add(new Author
                {
                    Id = (int)reader["AuthorId"],
                    Name = (string)reader["Name"],
                    BirthDate = (string)reader["BirthDate"]==""?"Unknown" : (string)reader["BirthDate"],
                    DeathDate = (string)reader["DeathDate"] == "" ? "Unknown" : (string)reader["BirthDate"],
                    TopWork = (string)reader["TopWork"],
                    Description = (string)reader["Description"],
                    Image = (string)reader["Image"]
                });
            }
            return authors;
        }

        public SqlCommand CreateCommandWithStoredProcedureGetAllAuthors(String spName, SqlConnection con)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object

            cmd.CommandText = spName;      // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            return cmd;
        }

        public int Registration(User user)
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

            cmd = CreateCommandWithStoredProcedureRegistration("SP_Register", con, user); // create the command

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

        private SqlCommand CreateCommandWithStoredProcedureRegistration(String spName, SqlConnection con, User user)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con; // assign the connection to the command object

            cmd.CommandText = spName; // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10; // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@p_name", user.UserName);
            cmd.Parameters.AddWithValue("@p_email", user.Email);
            cmd.Parameters.AddWithValue("@p_isActive", user.IsActive);
            cmd.Parameters.AddWithValue("@p_isAdmin", user.IsAdmin);
            cmd.Parameters.AddWithValue("@p_password", user.Password);

            return cmd;
        }

        public User Login(Login login)
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

            cmd = CreateCommandWithStoredProcedureLogin("SP_Login", con, login); // create the command

            try
            {
                SqlDataReader reader = cmd.ExecuteReader(CommandBehavior.CloseConnection); // execute the command
                if (reader.Read())
                {
                    User user = new User();
                    user.Id = Convert.ToInt32(reader["UserId"]);
                    user.UserName = reader["UserName"].ToString();
                    user.Email = reader["Email"].ToString();
                    user.IsActive = Convert.ToBoolean(reader["IsActive"]);
                    user.IsAdmin = Convert.ToBoolean(reader["IsAdmin"]);
                    user.Password = reader["Password"].ToString();
                    return user;
                }
                return null;
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

        private SqlCommand CreateCommandWithStoredProcedureLogin(String spName, SqlConnection con, Login login)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con; // assign the connection to the command object

            cmd.CommandText = spName; // can be Select, Insert, Update, Delete 

            cmd.CommandTimeout = 10; // Time to wait for the execution' The default is 30 seconds

            cmd.CommandType = System.Data.CommandType.StoredProcedure; // the type of the command, can also be text

            cmd.Parameters.AddWithValue("@p_userEmail", login.Email);
            cmd.Parameters.AddWithValue("@p_passwordHash", login.Password);

            return cmd;
        }
        //Top 5 Most Purchased Books
        public List<Book> GetTop5MostPurchasedBooks()
        {
            List<Book> books = new List<Book>();

            try
            {
                using (SqlConnection con = connect("myProjDB"))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_GetTop5MostPurchasedBooks", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        using (SqlDataReader reader = cmd.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                Book book = new Book
                                {
                                    Id = reader["ID"].ToString(),
                                    Title = reader["Title"].ToString(),
                                    //PurchaseCount = reader["PurchaseCount"] as int? ?? 0
                                };

                                books.Add(book);
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw;
            }

            return books;
        }
        //
        public List<Book> GetBooksByAuthor(int authorId)
        {
            SqlConnection con = null;
            SqlCommand cmd = null;
            List<Book> books = new List<Book>();

            try
            {
                con = connect("myProjDB"); // create the connection
                cmd = CreateCommandWithStoredProcedureGetBooksByAuthor("SP_GetBooksByAuthor", con, authorId); // create the command
                SqlDataReader reader = cmd.ExecuteReader(CommandBehavior.CloseConnection); // execute the command

                while (reader.Read())
                {
                    Book book = new Book
                    {
                        Id = reader["BookID"].ToString(),
                        Title = reader["Title"].ToString(),
                        Subtitle = reader["Subtitle"].ToString(),
                        Language = reader["Language"].ToString(),
                        Publisher = reader["Publisher"].ToString(),
                        PublishedDate = reader["PublishedDate"] as string,
                        Description = reader["Description"].ToString(),
                        PageCount = reader["PageCount"] as int? ?? 0,
                        Price = reader["Price"] as double? ?? 0.0
                    };

                    books.Add(book);
                }
            }
            catch (Exception ex)
            {
                // write to log
                Console.WriteLine($"Error: {ex.Message}");
                throw; // rethrow the exception
            }
            finally
            {
                if (con != null)
                {
                    con.Close(); // close the db connection
                }
            }

            return books;
        }

        private SqlCommand CreateCommandWithStoredProcedureGetBooksByAuthor(String spName, SqlConnection con, int authorId)
        {
            SqlCommand cmd = new SqlCommand(); // create the command object

            cmd.Connection = con;              // assign the connection to the command object
            cmd.CommandText = spName;          // specify the stored procedure name
            cmd.CommandTimeout = 10;           // Time to wait for the execution
            cmd.CommandType = System.Data.CommandType.StoredProcedure; // specify that it's a stored procedure

            // Add the parameter for the stored procedure
            cmd.Parameters.AddWithValue("@AuthorID", authorId);

            return cmd;
        }


       

        /// new procedure test
        public List<Object> getTitlesAndAuthors()
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
            SqlCommand cmd = CreateCommandWithStoredProcedureGetAllBooks("SP_GetTitlesAndAuthors", con);             // create the command
            SqlDataReader reader = cmd.ExecuteReader(); // execute the command
            List<Object> books = new List<Object>();
            while (reader.Read())
            {
                books.Add(new
                {
                    title = (string)reader["Title"],
                    name = (string)reader["Name"]
                });
            }
            return books;
        }

        private SqlCommand CreateCommandWithStoredProcedure(string spName, SqlConnection con, params SqlParameter[] parameters)
        {
            SqlCommand cmd = new SqlCommand
            {
                Connection = con,
                CommandText = spName,
                CommandTimeout = 10,
                CommandType = CommandType.StoredProcedure
            };

            cmd.Parameters.AddRange(parameters);
            return cmd;
        }
        public List<dynamic> GetUserLibrary(int userId, string status)
        {
            List<dynamic> books = new List<dynamic>();

            try
            {
                using (SqlConnection con = connect("myProjDB"))
                using (SqlCommand cmd = new SqlCommand("SP_GetUserLibrary", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserID", userId);
                    cmd.Parameters.AddWithValue("@Status", status);

                    
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var book = new
                            {
                                Id = reader["BookID"].ToString(),
                                Title = reader["Title"].ToString(),
                                Subtitle = reader["Subtitle"].ToString(),
                                Language = reader["Language"].ToString(),
                                Publisher = reader["Publisher"].ToString(),
                                PublishedDate = reader.IsDBNull(reader.GetOrdinal("PublishedDate"))
                                                ? null
                                                : reader["PublishedDate"].ToString(),
                                PageCount = reader["PageCount"] as int? ?? 0,
                                PrintType = reader["PrintType"].ToString(),
                                Price = reader["Price"] as double? ?? 0.0,
                                Status = reader["Status"].ToString()
                            };

                            books.Add(book);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                throw;
            }

            return books;
        }
        public bool AddBookToLibrary(UserBooks userBook)
        {
            try
            {
                using (SqlConnection con = connect("myProjDB"))
                {
                    // בדיקה אם הספר קיים בטבלה Books
                    using (SqlCommand checkCmd = new SqlCommand("SELECT COUNT(*) FROM Books WHERE Id = @BookID", con))
                    {
                        checkCmd.Parameters.AddWithValue("@BookID", userBook.BookID);
                        int count = (int)checkCmd.ExecuteScalar();

                        if (count == 0)
                        {
                            Console.WriteLine("Book does not exist in the Books table.");
                            return false;
                        }
                    }

                    // הוספת הספר לספריית המשתמשים אם הוא קיים
                    using (SqlCommand cmd = new SqlCommand("SP_AddBookToLibrary", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 10;

                        cmd.Parameters.AddWithValue("@UserID", userBook.UserID);
                        cmd.Parameters.AddWithValue("@BookID", userBook.BookID);
                        cmd.Parameters.AddWithValue("@Status", userBook.Status);

                        cmd.ExecuteNonQuery();
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return false;
            }
            
        }


        public bool UpdateBookStatus(int userId, string bookId, string newStatus)
        {
            SqlConnection con = null;
            SqlCommand cmd = null;

            try
            {
                con = connect("myProjDB"); // יצירת החיבור לבסיס הנתונים

                // יצירת פקודת SQL עם פרוצדורה
                cmd = new SqlCommand("SP_UpdateBookStatus", con)
                {
                    CommandType = CommandType.StoredProcedure,
                    CommandTimeout = 10
                };

                // הוספת פרמטרים לפקודת SQL
                cmd.Parameters.AddWithValue("@UserID", userId);
                cmd.Parameters.AddWithValue("@BookID", bookId);
                cmd.Parameters.AddWithValue("@NewStatus", newStatus);

                // הרצת הפקודה
                cmd.ExecuteNonQuery();

                return true;
            }
            catch (Exception ex)
            {
                // טיפול בשגיאות
                Console.WriteLine($"Error: {ex.Message}");
                return false;
            }
            finally
            {
                if (con != null)
                {
                    con.Close(); // סגירת החיבור לבסיס הנתונים
                }
            }
        }
        //PurchaseRequest
        public bool AddBookPurchaseRequest(int buyerId, int sellerId, string bookId)
        {
            try
            {
                using (SqlConnection con = connect("myProjDB"))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_AddBookPurchaseRequest", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 10;

                        // הוספת פרמטרים לפקודת SQL
                        cmd.Parameters.AddWithValue("@BuyerID", buyerId);
                        cmd.Parameters.AddWithValue("@SellerID", sellerId);
                        cmd.Parameters.AddWithValue("@BookID", bookId);

                        cmd.ExecuteNonQuery();
                    }
                } // SqlConnection סוגר אוטומטית את החיבור
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return false;
            }
        }
        public bool UpdateBookPurchaseRequestStatus(int requestId, string approvalStatus, DateTime approvalDate)
        {
            try
            {
                using (SqlConnection con = connect("myProjDB"))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_UpdateBookPurchaseRequestStatus", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 10;

                        // Adding parameters to the SQL command
                        cmd.Parameters.AddWithValue("@RequestID", requestId);
                        cmd.Parameters.AddWithValue("@ApprovalStatus", approvalStatus);
                        cmd.Parameters.AddWithValue("@ApprovalDate", approvalDate);

                        cmd.ExecuteNonQuery();
                    }
                } // SqlConnection automatically closes the connection
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return false;
            }
        }

        public bool TransferBook(int buyerId, int sellerId, string bookId)
        {
            try
            {
                using (SqlConnection con = connect("myProjDB"))
                {
                    using (SqlCommand cmd = new SqlCommand("SP_TransferBook", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 10;

                        // הוספת פרמטרים לפקודת SQL
                        cmd.Parameters.AddWithValue("@BuyerID", buyerId);
                        cmd.Parameters.AddWithValue("@SellerID", sellerId);
                        cmd.Parameters.AddWithValue("@BookID", bookId);

                        cmd.ExecuteNonQuery();
                    } 
                } // SqlConnection סוגר אוטומטית את החיבור
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return false;
            }
        }



    }
}


