
using Microsoft.EntityFrameworkCore;

namespace aspproject.Data
{
    internal sealed class AppDB : DbContext
    {
        public DbSet<Main> Mains { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder) => dbContextOptionsBuilder.UseSqlite("Data Source=./Data/AppDb.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Main[] postsToSeed = new Main[6];
            for(int i = 1; i <= 6; i++)
            {
                postsToSeed[i-1] = new Main
                {
                    PostId = i,
                    Name = $"Post {i}",
                    Content = $"This is post {i} and it has new content"
                };
            }
            modelBuilder.Entity<Main>().HasData(postsToSeed);
        }
    }
}
