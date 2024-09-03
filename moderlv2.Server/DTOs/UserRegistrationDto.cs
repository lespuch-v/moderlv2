using System.ComponentModel.DataAnnotations;

namespace moderlv2.Server.DTOs
{
    public class UserRegistrationDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(3)]
        public string Password { get; set; }
    }
}
