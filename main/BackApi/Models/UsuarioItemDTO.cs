namespace BackApi.Models;

public class UsuarioItemDTO
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public string Email { get; set; } = "";
    public string Senha { get; set; } = "";
}