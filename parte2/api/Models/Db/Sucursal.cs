namespace turnos.Models.Db;

public class Sucursal
{
    public int SucursalId { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Direccion { get; set; } = string.Empty;
}