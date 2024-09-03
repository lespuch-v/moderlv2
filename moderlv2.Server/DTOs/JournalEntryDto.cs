using moderlv2.Server.Models;

namespace moderlv2.Server.DTOs
{
    public class JournalEntryDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime Date { get; set; }
        public Mood MoodRating { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
