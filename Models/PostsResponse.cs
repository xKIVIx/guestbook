using System.Collections.Generic;

namespace Guestbook.Models
{
    public class PostsResponse : Response
    {
        #region Public Properties

        public int CountPages { get; set; }

        public IEnumerable<Post> Posts { get; set; }

        #endregion Public Properties
    }
}