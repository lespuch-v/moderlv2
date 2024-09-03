using Microsoft.EntityFrameworkCore;
using moderlv2.Server.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace moderlv2.Server
{
    public class MooderDbContext : DbContext
    {
        public MooderDbContext(DbContextOptions<MooderDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<JournalEntry> JournalEntries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<JournalEntry>()
                .HasOne(j => j.User)
                .WithMany()
                .HasForeignKey(j => j.UserId);
        }
    }
}
