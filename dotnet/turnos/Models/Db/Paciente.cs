namespace turnos.Models.Db;

public class Paciente
{
    public int PacienteId { get; set; }
    public string Apellidos { get; set; } = string.Empty;
    public string Nombres { get; set; } = string.Empty;
    public int DNI { get; set; }
    public DateTime FechaDeNacimiento { get; set; }
    public char Sexo { get; set; }
    public int ObraSocialId { get; set; }
    public ObraSocial ObraSocial { get; set; } = null!;
    public string Credencial { get; set; } = string.Empty;
    public int UsuarioId { get; set; }
    public Usuario Usuario { get; set; } = null!;
    public bool EsUsuario { get; set; }
}