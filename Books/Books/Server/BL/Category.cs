namespace Books.Server.BL
{
    public class Category
    {
        int id;
        string name;
        static public List<Category> categories = new List<Category>();
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
            try
            {
                categories = allCategories;
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
