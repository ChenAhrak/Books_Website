using static System.Reflection.Metadata.BlobBuilder;
using Books.Server.DAL;

namespace Books.Server.BL
{
    public class Author
    {
        int id;
        string name;
       public Author()
        {
        }

        public Author(int id, string name)
        {
            this.name = name;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }

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

