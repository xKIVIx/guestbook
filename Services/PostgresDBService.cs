using Guestbook.Models;
using Guestbook.Utils;
using Npgsql;
using NpgsqlTypes;
using System.Collections.Generic;

namespace Guestbook.Services
{
    public class PostgresDBService : IDBService
    {
        private readonly string _connectString;

        #region Public Constructors

        public PostgresDBService()
        {
            _connectString = "Host=localhost;Port=5432;Username=postgres;Password=435209092;Database=guestbook";
        }

        #endregion Public Constructors

        #region Public Methods
        /// <summary>
        /// <see cref="IDBService.AddPost(Post, string, string)"/>
        /// </summary>
        public void AddPost(Post post, string ipAdress, string browser)
        {
            using var connection = new NpgsqlConnection(_connectString);
            connection.Open();

            string request = "INSERT INTO book(username, email, homepage, text, datepublish, ip, browser) " +
                             "VALUES (@username, @email, @homepage, @text, @datepublish, @ip, @browser);";

            using var cmd = new NpgsqlCommand(request, connection);

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
            using var connection = new NpgsqlConnection(_connectString);
            connection.Open();

            int result;

            using var cmd = new NpgsqlCommand("SELECT count(*) " +
                                              "FROM book;",
                                              connection);
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
            using var connection = new NpgsqlConnection(_connectString);
            connection.Open();

            List<Post> posts = new List<Post>();

            using (var cmd = new NpgsqlCommand("SELECT userName, email, homepage, text, datepublish " +
                                               "FROM book " +
                                               "LIMIT @count OFFSET @offset;",
                                               connection))
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