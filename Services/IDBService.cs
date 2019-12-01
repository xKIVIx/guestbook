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
        /// <param name="orderField">
        /// Поле по которому происходит сортировка.
        /// Поддерживамые поля:
        /// "email" - email пользователя
        /// "userName" - имя пользователя
        /// "date" - дата публикации
        /// </param>
        /// <param name="orderType">
        /// Вид сортировки.
        /// "forward" - по возрастанию
        /// "backward" - по убыванию
        /// </param>
        /// <returns></returns>
        IEnumerable<Post> GetPosts(int offset, int count, string orderField, string orderType);

        #endregion Public Methods
    }
}