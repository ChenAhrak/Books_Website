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
        [HttpPost("InsertAllBooks")]
        public IActionResult PostAllBooks([FromBody] List<Book> allBooks)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                book.insertAllBooks(allBooks);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }

        }

          // POST api/<BooksController>
        [HttpPost("InsertAllBooksAuthors/{authorId}")] //----need to change this somehow
        public IActionResult PostAllBooksAuthors([FromBody] string bookId, int authorId )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                book.insertAllBooksAuthors(bookId,authorId);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }

        }
           // POST api/<BooksController>
        [HttpPost("InsertAllBooksCategories/{categoryId}")]//need to change this somehow
        public IActionResult PostAllBooksCategories([FromBody] string bookId, int categoryId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                book.insertAllBooksCategories(bookId,categoryId);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
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
