using Microsoft.AspNetCore.Mvc;
using moderlv2.Server.DTOs;
using moderlv2.Server.Services;

namespace moderlv2.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly AuthService _authService;

        public AuthController(IUserService userService, AuthService authService)
        {
            _userService = userService;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var user = await _userService.RegisterAsync(model.Email, model.Password, model.Username);
                var token = _authService.GenerateJwtToken(user);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userService.AuthenticateAsync(model.Email, model.Password);
            if (user == null)
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            var token = _authService.GenerateJwtToken(user);
            return Ok(new { Token = token });
        }
    }
}
