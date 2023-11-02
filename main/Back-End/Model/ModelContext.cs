using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
public class ModelContext : DbContext
{
    public DbSet<Usuario> Usuarios { get; set; }
    public ModelContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "dados.db");
    }
    public string DbPath {get;}
    protected override void OnConfiguring(DbContextOptionsBuilder options) => options.UseSqlite($"Data Source={DbPath}");
}