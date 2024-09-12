using Microsoft.EntityFrameworkCore;
using moderlv2.Server.Models;

namespace moderlv2.Server.Repositories
{
    public class JournalEntryRepository : IJournalEntryRepository
    {
        private readonly MooderDbContext _context;

        public JournalEntryRepository(MooderDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Models.JournalEntry>> GetAllAsync()
        {
            var entries = await _context.JournalEntries.OrderBy(journalEntry => journalEntry.CreatedAt).ToListAsync();
            return entries;
        }

        public async Task<JournalEntry> GetByIdAsync(int id)
        {
            return await _context.JournalEntries.FindAsync(id);
        }

        public async Task<IEnumerable<JournalEntry>> GetAllByUserIdAsync(string userId)
        {
            return await _context.JournalEntries
                .Where(journalEntry => journalEntry.UserId == userId)
                .OrderBy(journalEntry => journalEntry.CreatedAt)
                .ToListAsync();
        }

        public async Task<JournalEntry> GetByIdAndUserIdAsync(int id, string userId)
        {
            return await _context.JournalEntries
                .FirstOrDefaultAsync(journalEntry => journalEntry.Id == id && journalEntry.UserId == userId);
        }

        public async Task<JournalEntry> CreateAsync(JournalEntry journalEntry)
        {
            _context.JournalEntries.Add(journalEntry);
            await _context.SaveChangesAsync();
            return journalEntry;
        }

        public async Task UpdateAsync(JournalEntry journalEntry)
        {
            _context.Entry(journalEntry).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var journalEntry = await _context.JournalEntries.FindAsync(id);
            if (journalEntry != null)
            {
                _context.JournalEntries.Remove(journalEntry);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<int> GetTotalCountAsync()
        {
            return await _context.JournalEntries.CountAsync();
        }
    }
}
