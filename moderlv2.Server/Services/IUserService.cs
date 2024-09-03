using moderlv2.Server.Models;

namespace moderlv2.Server.Services
{
    public interface IUserService
    {
        Task<User> RegisterAsync(string email, string password);
        Task<User> AuthenticateAsync(string email, string password);
    }
}
