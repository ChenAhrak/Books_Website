using static System.Reflection.Metadata.BlobBuilder;
using Books.Server.DAL;

namespace Books.Server.BL
{
    public class Author
    {
        int id;
        string name;
        string birthDate;
        string deathDate;
        string topWork;
        //Add image field
        public Author()
        {
        }

        public Author(int id, string name, string birthDate, string deathDate, string topWork)
        {
            Id = id;
            Name = name;
            BirthDate = birthDate;
            DeathDate = deathDate;
           
            TopWork = topWork;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string BirthDate { get => birthDate; set => birthDate = value; }
        public string DeathDate { get => deathDate; set => deathDate = value; }
        public string TopWork { get => topWork; set => topWork = value; }

        public bool insertAllAuthors(List<Author> allAuthors)
        {
            DBservices db = new DBservices();
            try
            {
                db.insertAllAuthors(allAuthors);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<Author> ReadAllAuthors()
        {

            return null;
        }
    }
}

