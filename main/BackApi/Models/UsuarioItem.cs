namespace BackApi.models;

public class UsuarioItem
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public string Email { get; set; } = "";
    public string Senha { get; set; } = "";
    public string? Secret { get; set; }

    //public bool IsComplete { get; set; }
}