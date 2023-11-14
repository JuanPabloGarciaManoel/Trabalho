namespace AtletaBackend.Models;
public class Comum
{
    public string? Id { get; set; }
    public string Nome { get; set; } = "";

    public IList<Playlist> Records { get; set; } = new List<Playlist>();
}
