using Guestbook.Models;
using System.Collections.Generic;

namespace Guestbook.Services
{
    public interface IDBService
    {
        #region Public Methods

        /// <summary>
        /// Добавить пост в бд.
        /// </summary>
        /// <param name="post"></param>
        /// <param name="ipAdress">IP адресс клиента</param>
        /// <param name="browser">Браузер клиента</param>
        void AddPost(Post post, string ipAdress, string browser);

        /// <summary>
        /// Получить общее число постов в бд.
        /// </summary>
        /// <returns></returns>
        int GetCountPosts();

        /// <summary>
        /// Получить список постов из бд
        /// </summary>
        /// <param name="offset"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        IEnumerable<Post> GetPosts(int offset, int count);

        #endregion Public Methods
    }
}