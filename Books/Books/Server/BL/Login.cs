namespace Books.Server.BL;

public class Login
{
    private string username;
    private string email;
    private string password;
    public Login()
    {
    }

    public string Username { get => username; set => username = value; }
    public string Email { get => email; set => email = value; }
    public string Password { get => password; set => password = value; }
}
