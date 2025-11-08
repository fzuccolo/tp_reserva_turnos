namespace turnos.Models.Api;

public class TurnoPostResponseModel
{
    public int SucursalId { get; set; }
    public int PacienteId { get; set; }
    public DateTime Horario { get; set; }
}