using Microsoft.AspNetCore.Mvc;
using Books.Server.BL; 
using System.Collections.Generic;

namespace Books.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserBooksController : ControllerBase
    {
        private readonly UserBooks _userBooks;

        public UserBooksController()
        {
            _userBooks = new UserBooks(); 
        }

        // שליפת ספרים מספריית המשתמש לפי סטטוס
        [HttpGet("get")]
        public IActionResult GetUserLibrary([FromQuery] int userID, [FromQuery] string status)
        {
            var userBooksList = _userBooks.GetUserLibrary(userID, status);
            if (userBooksList == null)
            {
                return NotFound("No books found for the specified user and status.");
            }
            return Ok(userBooksList);
        }

        // הוספת ספר לספריית המשתמש
        [HttpPost("purchased")]
        public IActionResult AddBookToLibrary([FromBody] UserBooks userBook)
        {
            if (userBook == null)
            {
                return BadRequest("Invalid user book data.");
            }

            var result = _userBooks.AddBookToLibrary(userBook);
            if (result)
            {
                return Ok("Book added to the library successfully.");
            }
            return StatusCode(500, "An error occurred while adding the book to the library.");
        }

        [HttpPost("addBookToWishlist/{userId}")]
        public IActionResult AddBookToWishlist(int userId, [FromBody] Book book)
        {
            if (book == null || string.IsNullOrEmpty(book.Id))
            {
                return BadRequest("Invalid book data.");
            }

            var result = _userBooks.AddBookToLibrary(new UserBooks
            {
                UserID = userId,
                BookID = book.Id,
                Status = "want to read"
            });

            if (result)
            {
                return Ok("Book added to wishlist successfully.");
            }

            return StatusCode(500, "An error occurred while adding the book to the wishlist.");
        }


        // עדכון סטטוס הספר בספריית המשתמש
        [HttpPut("update-status")]
        public IActionResult UpdateBookStatus([FromQuery] int userID, [FromQuery] string bookID, [FromQuery] string newStatus)
        {
            var result = _userBooks.UpdateBookStatus(userID, bookID, newStatus);
            if (result)
            {
                return Ok("Book status updated successfully.");
            }
            return StatusCode(500, "An error occurred while updating the book status.");
        }

        // ניהול רכישת ספר
        [HttpPost("Transfer-Book")]
        public IActionResult ManagePurchase([FromQuery] int buyerId, [FromQuery] int sellerId, [FromQuery] string bookId)
        {
            var result = _userBooks.TransferBook(buyerId, sellerId, bookId);
            if (result)
            {
                return Ok("Purchase processed successfully.");
            }
            return StatusCode(500, "An error occurred while processing the purchase.");
        }
    }
}
