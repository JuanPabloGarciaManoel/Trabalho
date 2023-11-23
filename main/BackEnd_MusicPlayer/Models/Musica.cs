namespace PlayList.Models;
public class Musica 
{
    public string? Id { get; set; }
    public string? IdUsuario { get; set; }
    public string Nome { get; set; } = null!;
    public string CaminhoDB { get; set; } = null!;
    public string? CaminhoImagem { get; set; }
    public string? CaminhoMusica { get; set; }

}