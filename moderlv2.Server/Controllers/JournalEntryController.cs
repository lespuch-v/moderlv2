using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using moderlv2.Server.DTOs;
using moderlv2.Server.Models;
using moderlv2.Server.Services;
using System.Security.Claims;

namespace moderlv2.Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class JournalEntryController : ControllerBase
    {
        private readonly JournalService _journalService;

        public JournalEntryController(JournalService journalService)
        {
            _journalService = journalService;
        }

        private string GetUserIdFromToken()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || string.IsNullOrEmpty(userIdClaim.Value))
            {
                throw new UnauthorizedAccessException("Invalid user ID claim in the token.");
            }
            return userIdClaim.Value;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<JournalEntry>>> GetAllJournalEntries()
        {
            var authHeader = Request.Headers["Authorization"].FirstOrDefault();
            Console.WriteLine($"Received Authorization header: {authHeader}");

            try
            {
                var userId = GetUserIdFromToken();
                Console.WriteLine($"Extracted User ID: {userId}");
                var entries = await _journalService.GetAllJournalEntriesByUserAsync(userId);
                return Ok(entries);
            }
            catch (UnauthorizedAccessException ex)
            {
                Console.WriteLine($"Unauthorized: {ex.Message}");
                return Unauthorized(ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetAllJournalEntries: {ex}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JournalEntryDto>> GetJournalEntry(int id)
        {
            var userId = GetUserIdFromToken();
            var entry = await _journalService.GetJournalEntryByIdAndUserAsync(id, userId);

            if (entry == null)
            {
                return NotFound();
            }

            var entryDto = new JournalEntryDto
            {
                Id = entry.Id,
                UserId = entry.UserId.ToString(),
                Date = entry.Date,
                MoodRating = entry.MoodRating,
                Description = entry.Description,
                CreatedAt = entry.CreatedAt,
                UpdatedAt = entry.UpdatedAt
            };

            return Ok(entryDto);
        }

        [HttpPost]
        public async Task<ActionResult<JournalEntryDto>> CreateJournalEntry(JournalEntryDto journalEntryDto)
        {
            var userId = GetUserIdFromToken();

            var journalEntry = new JournalEntry
            {
                UserId = userId,
                Date = journalEntryDto.Date,
                MoodRating = journalEntryDto.MoodRating,
                Description = journalEntryDto.Description,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var createdEntry = await _journalService.CreateJournalEntryAsync(journalEntry);

            var createdEntryDto = new JournalEntryDto
            {
                Id = createdEntry.Id,
                UserId = createdEntry.UserId.ToString(),
                Date = createdEntry.Date,
                MoodRating = createdEntry.MoodRating,
                Description = createdEntry.Description,
                CreatedAt = createdEntry.CreatedAt,
                UpdatedAt = createdEntry.UpdatedAt
            };

            return CreatedAtAction(nameof(GetJournalEntry), new { id = createdEntryDto.Id }, createdEntryDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJournalEntry(int id, JournalEntryDto journalEntryDto)
        {
            var userId = GetUserIdFromToken();
            var journalEntry = await _journalService.GetJournalEntryByIdAndUserAsync(id, userId);

            if (journalEntry == null)
            {
                return NotFound();
            }

            journalEntry.Date = journalEntryDto.Date;
            journalEntry.MoodRating = journalEntryDto.MoodRating;
            journalEntry.Description = journalEntryDto.Description;
            journalEntry.UpdatedAt = DateTime.UtcNow;

            await _journalService.UpdateJournalEntryAsync(journalEntry);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJournalEntry(int id)
        {
            var userId = GetUserIdFromToken();
            var journalEntry = await _journalService.GetJournalEntryByIdAndUserAsync(id, userId);

            if (journalEntry == null)
            {
                return NotFound();
            }

            await _journalService.DeleteJournalEntryAsync(id);
            return NoContent();
        }

        [HttpGet("word-count")]
        public async Task<ActionResult<int>> GetWordJournalCount()
        {
            int wordCount = await _journalService.GetWordCountAsync();
            return Ok(wordCount);
        }

        [HttpGet("journalEntry-count")]
        public async Task<ActionResult<int>> GetJournalEntryCount()
        {
            int journalEntryCount = await _journalService.JournalEntryCount();
            return Ok(journalEntryCount);
        }
    }
}
