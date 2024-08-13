using Books.Server.BL;
using Microsoft.AspNetCore.Mvc;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Books.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PdfsController : ControllerBase
    {
        Pdf pdf = new Pdf();

        // GET api/<Pdfs>/5
        [HttpGet("SearchInBookText/{bookId}")]
        public IActionResult SearchInBookText(string bookId, [FromQuery] string query)
        {
            try
            {
                bool found = pdf.searchInBookText(bookId, query);
                return Ok(found);
            }
            catch
            {
                return BadRequest();
            }
        }


        // POST api/<Pdfs>
        [HttpPost]
        public async Task<IActionResult> Post(string bookId, [FromBody] string pdfDownloadLink)
        {
            try
            {
                Pdf pdf = new Pdf();
                await pdf.ExtractText(pdfDownloadLink, bookId);
                return Ok();
            }
            catch (Exception ex)
            {
                // Optionally log the exception
                return BadRequest($"Error: {ex.Message}");
            }
        }
        // PUT api/<Pdfs>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Pdfs>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
