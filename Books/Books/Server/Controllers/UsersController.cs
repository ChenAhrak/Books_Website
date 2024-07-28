using Microsoft.AspNetCore.Mvc;
using Books.Server.BL;
using Books.Server.DAL;

namespace Books.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly User user;

        public UsersController()
        {
            user = new User();
        }

        // POST api/<UsersController>
        [HttpPost]
        public IActionResult Post([FromBody] User value)
        {
            bool result = user.registration(value);
            if (result)
                return Ok();
            return BadRequest();
        }

        // POST api/<UsersController>/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] Login value)
        {
            User nUser = user.login(value);
            if (nUser != null)
            {
                return Ok(nUser);
            }
            return Unauthorized();
        }
    }
}
