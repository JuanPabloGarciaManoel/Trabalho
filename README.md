https://dev.to/documatic/building-a-music-player-in-react-2aa4


https://learn.microsoft.com/pt-br/ef/core/modeling/relationships/one-to-many

Não esquecer de colocar o ApplicationDBCOntext

using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using AtletaBackend.Models;

namespace AtletaApi.Models
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public DbSet<Atleta> Atletas { get; set; } = null!;
        public DbSet<AtletaRecord> AtletasRecords { get; set; } = null!;
        public DbSet<Treinador> Treinadores { get; set; } = null!;
        
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            options.UseSqlite($"Data Source={System.IO.Path.Join(path, "atleta.db")}");
        }
    }
}
