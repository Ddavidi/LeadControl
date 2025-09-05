using HipagesChallenge.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HipagesChallenge.Infrastructure.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Lead> Leads { get; set; } = null!;

    }
}