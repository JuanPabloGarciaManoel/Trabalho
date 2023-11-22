namespace PlayList.Models;
public class Playlist
{
    public string? Id { get; set; }
    public string? IdUsuario { get; set; }
    public string Nome { get; set; } = null!;
    public string? Descricao { get; set; }
    public List<Musica> Musicas { get; set; } = new();
    public string? CaminhoImagem { get; set; }
    
}
