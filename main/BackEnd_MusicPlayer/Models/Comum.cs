namespace PlayList.Models;
public class Comum
{
    public string? Id { get; set; }
    public string? Nome { get; set; }
    public List<Playlist> Playlists { get; set; } = new();
    public List<Musica> Musicas { get; set; } = new();
}
