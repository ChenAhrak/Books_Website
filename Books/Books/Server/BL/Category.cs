using Books.Server.DAL;

namespace Books.Server.BL
{
    public class Category
    {
        int id;
        string name;
        public Category()
        {
        }

        public Category(int id, string name)
        {
            this.name = name;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }

        public bool insertAllCategories(List<Category> allCategories)
        {
            DBservices db = new DBservices();
            try
            {
                db.insertAllCategories(allCategories);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<Category> ReadAllCategories()
        {

            return categories;
        }
    }
}
