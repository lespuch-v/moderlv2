using moderlv2.Server.Models;
using moderlv2.Server.Repositories;
using System.Text.RegularExpressions;

namespace moderlv2.Server.Services
{
    public class JournalService
    {
        private readonly IJournalEntryRepository _JournalRepository;
        private readonly IUserService _userService;

        public JournalService(IJournalEntryRepository repository, IUserService userService)
        {
            _JournalRepository = repository;
            _userService = userService;
        }

        public async Task<IEnumerable<JournalEntry>> GetAllJournalEntriesAsync()
        {
            return await _JournalRepository.GetAllAsync();
        }

        public async Task<JournalEntry> GetJournalEntryByIdAsync(int id)
        {
            return await _JournalRepository.GetByIdAsync(id);
        }

        public async Task<JournalEntry> CreateJournalEntryAsync(JournalEntry journalEntry)
        {
            journalEntry.CreatedAt = DateTime.UtcNow;
            journalEntry.UpdatedAt = DateTime.UtcNow;
            return await _JournalRepository.CreateAsync(journalEntry);
        }

        public async Task UpdateJournalEntryAsync(JournalEntry journalEntry)
        {
            journalEntry.UpdatedAt = DateTime.UtcNow;
            await _JournalRepository.UpdateAsync(journalEntry);
        }

        public async Task DeleteJournalEntryAsync(int id)
        {
            await _JournalRepository.DeleteAsync(id);
        }

        public async Task<int> GetWordCountAsync()
        {
            var allEntries = await GetAllJournalEntriesAsync();
            return allEntries.Sum(entry => CountWords(entry.Description));
        }

        private int CountWords(string text)
        {
            if (string.IsNullOrEmpty(text))
            {
                return 0;
            }

            var words = Regex.Matches(text, @"\b[\w']+\b");
            return words.Count;
        }

        public async Task<int> JournalEntryCount(string userId)
        {
            var allEntries = await GetAllJournalEntriesByUserAsync(userId);
            return allEntries.Count();
        }

        public async Task<IEnumerable<JournalEntry>> GetAllJournalEntriesByUserAsync(string userId)
        {
            return await _JournalRepository.GetAllByUserIdAsync(userId);
        }

        public async Task<JournalEntry> GetJournalEntryByIdAndUserAsync(int id, string userId)
        {
            return await _JournalRepository.GetByIdAndUserIdAsync(id, userId);
        }
    }
}
