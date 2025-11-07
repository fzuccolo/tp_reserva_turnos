namespace turnos.Models.Api;

public class UsuarioGetResponseModel
{
    public int UsuarioId { get; set; }
    public string Email { get; set; } = string.Empty;
    public int Limite { get; set; }
}