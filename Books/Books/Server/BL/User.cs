using Books.Server.DAL;

namespace Books.Server.BL;

public class User
{
    private int id;
    private string userName;
    private string email;
    private string password;
    private bool isAdmin = false;
    private bool isActive = true;

    public User()
	{
	}

    public User(int id, string userName, string email, string password, bool isAdmin, bool isActive)
    {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
        this.isActive = isActive;
    }

    public int Id { get => id; set => id = value; }
    public string UserName { get => userName; set => userName = value; }
    public string Email { get => email; set => email = value; }
    public string Password { get => password; set => password = value; }
    public bool IsAdmin { get => isAdmin; set => isAdmin = value; }
    public bool IsActive { get => isActive; set => isActive = value; }


    public bool registration(User user)
    {
        DBservices db = new DBservices();
        try
        {
            db.Registration(user);
            return true;

        }
        catch 
        {
            return false;
        }

    }

    public User login(Login login)
    {
        DBservices db = new DBservices();
        try
        {
            User user = db.Login(login);
            return user;
        }
        catch
        {
            return null;
        }


    }
}
