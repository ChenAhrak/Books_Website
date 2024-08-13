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
            if (result) { 
                return Ok(new { message = "User created successfully" });
            }
            else
            {
                return BadRequest(new {message = "Email need to be unique"});
            }

        }

        // POST api/<UsersController>/login
        [HttpPost("login")]
        public User Login([FromBody] Login value)
        {
            User nUser = user.login(value);
            if (nUser != null)
            {
                return nUser;
            }
            return null;
        }

        // PUT api/<UsersController>/5
        [HttpPut("UpdateHighScore/{id}")]
        public void Put(int id, [FromBody] int score)
        {
            DBservices db = new DBservices();
            db.updateUserHighScore(id, score);
        }

        // GET api/<UsersController>/5
        [HttpGet("UpdateHighScore/{id}")]
        public int GET(int id)
        {
            int highScore;
            DBservices db = new DBservices();
            highScore = db.getUserHighScore(id);
            return highScore;
        }
    }
}
