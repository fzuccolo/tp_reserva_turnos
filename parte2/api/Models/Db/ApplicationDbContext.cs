using Microsoft.EntityFrameworkCore;

namespace turnos.Models.Db;

public class ApplicationDbContext : DbContext
{
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Paciente> Pacientes { get; set; }
    public DbSet<ObraSocial> ObrasSociales { get; set; }
    public DbSet<Sucursal> Sucursales { get; set; }
    public DbSet<Turno> Turnos { get; set;  }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {

    }
}