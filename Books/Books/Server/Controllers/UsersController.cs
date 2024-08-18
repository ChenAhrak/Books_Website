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
                return BadRequest(new { message = "Email need to be unique" });
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
        [HttpPut("UpdateUserData/{id}")]
        public IActionResult updateUserInfo([FromBody] User user)
        {
            DBservices db = new DBservices();
            User update = new(user.Id, user.UserName, user.Email, user.Password, user.IsAdmin, user.IsActive);
            try
            {
                db.UpdateUserInfo(user.Id, update);
                return Ok(new { message = "User updated successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"An error occurred: {ex.Message}" });
            }
        }

        // PUT api/<UsersController>/5
        [HttpPut("UpdateHighScore/{id}")]
        public void updateHighScore(int id, [FromBody] int score)
        {
            DBservices db = new DBservices();
            db.updateUserHighScore(id, score);
        }

        // GET api/<UsersController>/5
        [HttpGet("UpdateHighScore/{id}")]
        public int getHighScore(int id)
        {
            int highScore;
            DBservices db = new DBservices();
            highScore = db.getUserHighScore(id);
            return highScore;
        }

        // GET api/<UsersController>/5
        [HttpGet("GetAllUsers")]
        public List<User> getUsers()
        {
            List<User> allUsers = user.getAllUsers();
            if (allUsers != null)
            {
                return allUsers;
            }
            return null;
        }

        // DELETE api/<UsersController>/6
        [HttpDelete("{id}")]
        public void deleteUser(int id)
        {
            try
            {
                user.deleteUserById(id);
            }
            catch (Exception) { };
        }

        // GET api/<UsersController>
        [HttpGet("GetUserByEmail/{email}")]
        public User getUserByEmail(string email)
        {
          return user.getUserByEmail(email);
            
        }
    }
}
