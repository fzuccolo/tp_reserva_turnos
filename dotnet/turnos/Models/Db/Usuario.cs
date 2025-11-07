namespace turnos.Models.Db;

public class Usuario
{
    public int UsuarioId { get; set; }
    public string Email { get; set; } = string.Empty;
    public int Limite { get; set; } = 5;
}