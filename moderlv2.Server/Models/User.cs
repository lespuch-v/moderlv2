using System.ComponentModel.DataAnnotations;

namespace moderlv2.Server.Models
{
    public class User
    {
        [Key]
        public string Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public string PasswordSalt { get; set; }

        [Required]
        [MaxLength(50)]
        [MinLength(3)]
        public string UserName { get; set; }
    }
}
