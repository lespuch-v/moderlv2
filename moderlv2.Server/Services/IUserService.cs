using moderlv2.Server.Models;

namespace moderlv2.Server.Services
{
    public interface IUserService
    {
        Task<User> RegisterAsync(string email, string password, string username);
        Task<User> AuthenticateAsync(string email, string password);
        Task<User> GetUserByIdAsync(string userId);
        Task<int> GetTotalNumberOfUsers();
        Task UpdateUserAsync(User user);
    }
}
