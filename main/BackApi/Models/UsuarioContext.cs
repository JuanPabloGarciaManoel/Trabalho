using Microsoft.EntityFrameworkCore;

namespace BackApi.models;

public class UsuarioContext : DbContext
{
    public UsuarioContext(DbContextOptions<UsuarioContext> options)
        : base(options)
    {
        
    }

    public DbSet<UsuarioItem> UsuarioItems { get; set; } = null!;
}