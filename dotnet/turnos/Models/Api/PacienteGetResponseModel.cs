namespace turnos.Models.Api;

public class PacienteGetResponseModel
{
    public int PacienteId { get; set; }
    public string Apellidos { get; set; } = string.Empty;
    public string Nombres { get; set; } = string.Empty;
    public int DNI { get; set; }
    public DateTime FechaDeNacimiento { get; set; }
    public char Sexo { get; set; }
    public ObraSocialGetResponseModel ObraSocial { get; set; } = null!;
    public string Credencial { get; set; } = string.Empty;
    public bool EsUsuario { get; set; }
}