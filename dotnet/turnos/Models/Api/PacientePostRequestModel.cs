namespace turnos.Models.Api;

public class PacientePostRequestModel
{
    public string Apellidos { get; set; } = string.Empty;
    public string Nombres { get; set; } = string.Empty;
    public int DNI { get; set; }
    public DateTime FechaDeNacimiento { get; set; }
    public char Sexo { get; set; }
    public int ObraSocialId { get;set;}
    public string Credencial { get; set; } = string.Empty;
}