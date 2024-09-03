using moderlv2.Server.Models;

namespace moderlv2.Server.Repositories
{
    public interface IJournalEntryRepository
    {
        Task<IEnumerable<JournalEntry>> GetAllAsync();
        Task<JournalEntry> GetByIdAsync(int id);
        Task<JournalEntry> CreateAsync(JournalEntry journalEntry);
        Task UpdateAsync(JournalEntry journalEntry);
        Task DeleteAsync(int id);
        Task<IEnumerable<JournalEntry>> GetAllByUserIdAsync(string userId);
        Task<JournalEntry> GetByIdAndUserIdAsync(int id, string userId);
    }
}
