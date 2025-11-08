namespace turnos.Models.Api;

public class TurnoGetResponseModel
{
    public int TurnoId { get; set; }
    public int SucursalId { get; set; }
    public int PacienteId { get; set; }
    public DateTime Horario { get; set; }
}