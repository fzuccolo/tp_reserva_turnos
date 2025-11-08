namespace turnos.Models.Db;

public class Turno
{
    public int TurnoId { get; set; }
    public int SucursalId { get; set; }
    public Sucursal Sucursal { get; set; } = null!;
    public int PacienteId { get; set; }
    public Paciente Paciente { get; set; } = null!;
    public DateTime Horario { get; set; }
}