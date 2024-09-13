using Microsoft.EntityFrameworkCore;
using moderlv2.Server.Models;
using System.Security.Cryptography;
using System.Text;

namespace moderlv2.Server.Services
{
    public class UserService : IUserService
    {
        private readonly MooderDbContext _context;

        public UserService(MooderDbContext context)
        {
            _context = context;
        }

        public async Task<User> RegisterAsync(string email, string password, string username)
        {
            if (await _context.Users.AnyAsync(u => u.Email == email))
            {
                throw new Exception("Email already registered.");
            }

            var salt = GenerateSalt();
            var passwordHash = HashPassword(password, salt);

            var user = new User
            {
                Id = Guid.NewGuid().ToString(),
                Email = email,
                PasswordHash = passwordHash,
                PasswordSalt = salt,
                UserName = username
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }


        public async Task<User> AuthenticateAsync(string email, string password)
        {
            var user = await _context.Users
        .FirstOrDefaultAsync(u => u.Email == email);
            if (user == null || !VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }



            if (user == null)
            {
                return null;
            }

            return user;
        }

        private string GenerateSalt(int size = 32)
        {
            var rng = new RNGCryptoServiceProvider();
            var buffer = new byte[size];
            rng.GetBytes(buffer);
            return Convert.ToBase64String(buffer);
        }

        private string HashPassword(string password, string salt)
        {
            using (var sha256 = SHA256.Create())
            {
                var saltedPassword = password + salt;
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(saltedPassword));
                var builder = new StringBuilder();
                for (var i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        private bool VerifyPassword(string password, string storedHash, string storedSalt)
        {
            var hash = HashPassword(password, storedSalt);
            return hash == storedHash;
        }

        public async Task<User> GetUserByIdAsync(string userId)
        
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task<int> GetTotalNumberOfUsers()
        {
            return await _context.Users.CountAsync();
        }
    }

}
