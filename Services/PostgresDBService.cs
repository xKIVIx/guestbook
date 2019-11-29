using Guestbook.Models;
using Guestbook.Utils;
using Npgsql;
using NpgsqlTypes;
using System.Collections.Generic;

namespace Guestbook.Services
{
    public class PostgresDBService : IDBService
    {
        #region Public Constructors

        public PostgresDBService()
        {
            var connString = "Host=localhost;Port=5432;Username=postgres;Password=435209092;Database=guestbook";
            _connection = new NpgsqlConnection(connString);
            _connection.Open();
        }

        #endregion Public Constructors

        #region Private Destructors

        ~PostgresDBService()
        {
            _connection.Close();
        }

        #endregion Private Destructors

        #region Private Fields

        private NpgsqlConnection _connection;

        #endregion Private Fields

        #region Public Methods
        /// <summary>
        /// <see cref="IDBService.AddPost(Post, string, string)"/>
        /// </summary>
        public void AddPost(Post post, string ipAdress, string browser)
        {
            string request = "INSERT INTO book(username, email, homepage, text, datepublish, ip, browser) " +
                             "VALUES (@username, @email, @homepage, @text, @datepublish, @ip, @browser);";

            using var cmd = new NpgsqlCommand(request, _connection);

            cmd.Parameters.AddWithValue("username", NpgsqlDbType.Text, post.UserName);
            cmd.Parameters.AddWithValue("email", NpgsqlDbType.Text, post.Email);
            cmd.Parameters.AddWithValue("homepage", NpgsqlDbType.Text, post.Homepage);
            cmd.Parameters.AddWithValue("text", NpgsqlDbType.Text, post.Text);
            cmd.Parameters.AddWithValue("datepublish", NpgsqlDbType.TimestampTz, post.Date);
            cmd.Parameters.AddWithValue("ip", NpgsqlDbType.Text, ipAdress);
            cmd.Parameters.AddWithValue("browser", NpgsqlDbType.Text, browser);

            using var reader = cmd.ExecuteReader();
        }

        /// <summary>
        /// <see cref="IDBService.GetCountPosts"/>
        /// </summary>
        public int GetCountPosts()
        {
            int result;

            using var cmd = new NpgsqlCommand("SELECT count(*) " +
                                              "FROM book;",
                                        _connection);
            using (var reader = cmd.ExecuteReader())
            {
                reader.Read();
                result = reader.GetInt32(0);
            }
            return result;
        }

        /// <summary>
        /// <see cref="IDBService.GetPosts(int, int)"/>
        /// </summary>
        public IEnumerable<Post> GetPosts(int offset, int count)
        {
            List<Post> posts = new List<Post>();

            using (var cmd = new NpgsqlCommand("SELECT userName, email, homepage, text, datepublish " +
                                               "FROM book " +
                                               "LIMIT @count OFFSET @offset;",
                                               _connection))
            {
                cmd.Parameters.AddWithValue("count", NpgsqlDbType.Integer, count);
                cmd.Parameters.AddWithValue("offset", NpgsqlDbType.Integer, offset);
                using var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    posts.Add(new Post
                    {
                        UserName = reader.GetStringSafe(0),
                        Email = reader.GetStringSafe(1),
                        Homepage = reader.GetStringSafe(2),
                        Text = reader.GetStringSafe(3),
                        Date = reader.GetDateTimeSafe(4)
                    });
                }
            }
            return posts;
        }

        #endregion Public Methods
    }
}