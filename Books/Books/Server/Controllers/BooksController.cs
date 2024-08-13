using Microsoft.AspNetCore.Mvc;
using Books.Server.BL;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Books.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        Book book = new Book();
        // GET: api/<BooksController>
        [HttpGet("GetBooksDisplay")]
        public IEnumerable<Object> GetBooksDisplay()
        {
            try
            {
                return book.getBooksDisplay();
            }
            catch 
            {
                return null;
            }

        }
          [HttpGet("GetEBooksDisplay")]
        public IEnumerable<Object> GetEBooksDisplay()
        {
            try
            {
                return book.getEBooksDisplay();
            }
            catch 
            {
                return null;
            }

        }

        [HttpGet("GetAllBooks")]
        public IEnumerable<Object> GetAllBooks()
        {
            try
            {
                return book.getAllBooks();
            }
            catch
            {
                return null;
            }

        }
       
        [HttpGet("GetAllEBooks")]

        public IEnumerable<Object> GetAllEBooks()
        {
            try
            {
                return book.getAllEBooks();
            }
            catch
            {
                return null;
            }

        }

        [HttpGet("GetTitlesAndAuthors")]
        public IEnumerable<Object> GetTitlesAndAuthors()
        {
            try
            {
                return book.getTitlesAndAuthors();
            }
            catch
            {
                return null;
            }

        }

        // POST api/<BooksController>
        [HttpPost("PostAllBooks")]
        public IActionResult PostAllBooks([FromBody] Book b)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                book.insertAllBooks(b);
                return Ok(new {message = "Books inserted successfully." });
            }
            catch (Exception ex)
            {
                return NotFound(new { message = "Books erorr" });
            }

        }

          // POST api/<BooksController>
        [HttpPost("PostAllBooksAuthors/{authorId}")] 
        public IActionResult PostAllBooksAuthors([FromBody] string bookId, int authorId )
        {
           
            try
            {
                book.insertAllBooksAuthors(bookId,authorId);
                return Ok(new {messasge= "BooksAuthors inserted successfully." });
            }
            catch (Exception ex)
            {
                return NotFound(new { message = "BooksAuthors erorr" });
            }

        }
           // POST api/<BooksController>
        [HttpPost("PostAllBooksCategories/{categoryId}")]
        public IActionResult PostAllBooksCategories([FromBody] string bookId, int categoryId)
        {
            try
            {
                book.insertAllBooksCategories(bookId,categoryId);
                return Ok(new { messasge = "BooksCategories inserted successfully." });
            }
            catch (Exception ex)
            {
                return NotFound(new { message = "BooksCategories erorr" });
            }

        }
        //Top 5 Most Purchased Books
        [HttpGet("GetTop5MostPurchasedBooks")]
        public ActionResult<List<Book>> GetTop5MostPurchasedBooks()
        {
            try
            {
                var topBooks = book.GetTop5MostPurchasedBooks();
                if (topBooks == null || !topBooks.Any())
                {
                    return NotFound(new { message = "No books found" });
                }
                return Ok(topBooks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"An error occurred: {ex.Message}" });
            }
        }

        [HttpPost("addBookToUser/{userId}")]
        //public IActionResult AddBookToUser(int userId, [FromBody] string bookId)
        //{
        //    if (book.addBookToUser(userId, bookId))
        //    {
        //        return Ok(new { message = "Course added to user successfully" });
        //    }
        //    return NotFound(new { message = "Failed to add course to user" });
        //}

        

        // DELETE api/<BooksController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
