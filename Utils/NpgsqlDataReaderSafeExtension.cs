using Npgsql;
using System;

namespace Guestbook.Utils
{
    public static class NpgsqlDataReaderSafeExtension
    {
        #region Public Methods

        public static DateTime GetDateTimeSafe(this NpgsqlDataReader reader, int idColum) =>
            reader.IsDBNull(idColum) ? new DateTime() : reader.GetDateTime(idColum);

        public static string GetStringSafe(this NpgsqlDataReader reader, int idColum) =>
                    reader.IsDBNull(idColum) ? null : reader.GetString(idColum);

        #endregion Public Methods
    }
}