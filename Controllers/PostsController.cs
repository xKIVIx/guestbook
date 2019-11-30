using Guestbook.Models;
using Guestbook.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Text.RegularExpressions;

namespace Guestbook.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController : Controller
    {
        #region Public Constructors

        public PostsController(IDBService dbService,
                               IHttpContextAccessor httpContextAccessor)
        {
            _dbService = dbService;
            _httpContextAccessor = httpContextAccessor;
        }

        #endregion Public Constructors

        #region Private Fields

        private const int MAX_SIZE_EMAIL = 100;
        private const int MAX_SIZE_HOMEPAGE = 300;
        private const int MAX_SIZE_TEXT = 1000;
        private const int MAX_SIZE_USER_NAME = 100;
        private const int PAGE_SIZE = 25;
        private readonly string REGEX_EMAIL = @"^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$";

        private readonly IDBService _dbService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        #endregion Private Fields

        #region Public Methods

        /// <summary>
        /// Ендпоинт добавления поста.
        /// </summary>
        /// <param name="post"></param>
        /// <returns></returns>
        [HttpPost]
        public Response AddPost(Post post)
        {
            if (post.UserName.Length == 0 ||
                post.UserName.Length > MAX_SIZE_USER_NAME)
                return new Response
                {
                    IsSuccess = false,
                    UncorrectParam = "UserName"
                };

            if (post.Text.Length == 0 ||
                post.Text.Length > MAX_SIZE_TEXT)
                return new Response
                {
                    IsSuccess = false,
                    UncorrectParam = "Text"
                };

            if (post.Homepage.Length > MAX_SIZE_HOMEPAGE)
                return new Response
                {
                    IsSuccess = false,
                    UncorrectParam = "Homepage"
                };

            var emailRegex = new Regex(REGEX_EMAIL);
            if (!emailRegex.IsMatch(post.Email) ||
                post.Email.Length > MAX_SIZE_EMAIL)
                return new Response
                {
                    IsSuccess = false,
                    UncorrectParam = "Email"
                };

            var ip = _httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
            var browser = _httpContextAccessor.HttpContext.Request.Headers["User-Agent"].ToString();
            post.Date = DateTime.Now;

            _dbService.AddPost(post, ip, browser);
            return new Response
            {
                IsSuccess = true
            };
        }

        /// <summary>
        /// Ендпоинт получения спсика постов
        /// </summary>
        /// <param name="page">
        /// Страница отображения
        /// </param>
        /// <returns></returns>
        [HttpGet]
        public PostsResponse GetPosts(int page)
        {
            var countPages = _dbService.GetCountPosts();
            var response = new PostsResponse()
            {
                IsSuccess = true,
                CountPages = countPages / PAGE_SIZE + countPages % PAGE_SIZE > 0 ? 1 : 0,
                Posts = _dbService.GetPosts(PAGE_SIZE * page, PAGE_SIZE)
            };

            return response;
        }

        #endregion Public Methods
    }
}