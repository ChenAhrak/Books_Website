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
        [HttpGet]
        public IEnumerable<Book> Get()
        {
            try
            {
                return book.readAllBooks();
            }
            catch (Exception ex)
            {
                throw ex;
            }
           
        }

        // GET api/<BooksController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
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
        [HttpPost("PostAllBooksAuthors/{authorId}")] //----need to change this somehow
        public IActionResult PostAllBooksAuthors([FromBody] string bookId, [FromQuery] int authorId )
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
        [HttpPost("PostAllBooksCategories/{categoryId}")]//need to change this somehow
        public IActionResult PostAllBooksCategories([FromBody] string bookId, [FromQuery] int categoryId)
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

        // PUT api/<BooksController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<BooksController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
