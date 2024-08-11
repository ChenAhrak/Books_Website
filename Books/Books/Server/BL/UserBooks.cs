﻿using Books.Server.DAL;

namespace Books.Server.BL
{
    public class UserBooks
    {
        private int userID;
        private string bookID;
        private string status;
        private DateTime dateAdded;

        public UserBooks()
        {
        }

        public UserBooks(int userBookID, int userID, string bookID, string status, DateTime dateAdded)
        {
            this.userID = userID;
            this.bookID = bookID;
            this.status = status;
            this.dateAdded = dateAdded;
        }
        public int UserID { get => userID; set => userID = value; }
        public string BookID { get => bookID; set => bookID = value; }
        public string Status { get => status; set => status = value; }
        public DateTime DateAdded { get => dateAdded; set => dateAdded = value; }

        // שליפת ספרים מספריית המשתמש לפי סטטוס
        public List<Book> GetUserLibrary(int userId, string status)
        {
            DBservices db = new DBservices();
            try
            {
                return db.GetUserLibrary(userId, status);
            }
            catch
            {
                return null;
            }
        }

        // הוספת ספר לספריית המשתמש
        public bool AddBookToLibrary(UserBooks userBook)
        {
            DBservices db = new DBservices();
            try
            {
                return db.AddBookToLibrary(userBook);
            }
            catch
            {
                return false;
            }
        }

        // עדכון סטטוס הספר בספריית המשתמש
        public bool UpdateBookStatus(int userID, string bookID, string newStatus)
        {
            DBservices db = new DBservices();
            try
            {
                db.UpdateBookStatus(userID, bookID, newStatus);
                return true;
            }
            catch
            {
                return false;
            }
        }
        // ניהול רכישת ספר
        public bool TransferBook(int buyerId, int sellerId, string bookId)
        {
            DBservices db = new DBservices();
            try
            {
                return db.TransferBook(buyerId, sellerId, bookId);
            }
            catch
            {
                return false;
            }
        }


    }
}
