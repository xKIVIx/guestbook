using System;

namespace Guestbook.Models
{
    public class Post
    {
        #region Public Properties

        public DateTime Date { get; set; }
        public string Email { get; set; }
        public string Homepage { get; set; }
        public string Text { get; set; }
        public string UserName { get; set; }

        #endregion Public Properties
    }
}