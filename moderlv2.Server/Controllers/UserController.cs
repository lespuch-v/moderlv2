using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using moderlv2.Server.Services;
using moderlv2.Server.DTOs; // Add this directive
using System.Security.Claims;

namespace moderlv2.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        private string GetUserIdFromToken()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || string.IsNullOrEmpty(userIdClaim.Value))
            {
                var claims = User.Claims.Select(c => $"{c.Type}: {c.Value}");
                Console.WriteLine("Available Claims: " + string.Join(", ", claims));
                throw new UnauthorizedAccessException("Invalid user ID claim in the token.");
            }
            return userIdClaim.Value;
        }

        [Produces("application/json")]
        [HttpGet]
        [Route("get-username")]
        public async Task<IActionResult> GetUserName()
        {
            try
            {
                var userId = GetUserIdFromToken();
                var user = await _userService.GetUserByIdAsync(userId);
                if (user == null)
                {
                    return NotFound($"User with ID {userId} not found");
                }
                return Ok(user.UserName);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}