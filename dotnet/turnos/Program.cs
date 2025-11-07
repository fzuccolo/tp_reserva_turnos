using Microsoft.EntityFrameworkCore;
using turnos.Models.Db;

namespace turnos;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container
        builder.Services.AddControllers();

        // Configurar CORS
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowLocalhost", policy =>
            {
                policy.WithOrigins("http://localhost:8080") // Cambia al puerto de tu frontend
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });

        // Configuración de base de datos SQLite
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        var dbPath = Path.Join(path, "turnos.sqlite3");
        Console.WriteLine($"La ubicación de la base de datos es {dbPath}");
        builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite($"Data source={dbPath}"));

        var app = builder.Build();

        // Middleware
        app.UseHttpsRedirection();

        // Activar CORS antes de la autorización
        app.UseCors("AllowLocalhost");

        app.UseAuthorization();

        app.MapControllers();

        // Migraciones y seed de datos
        using (var scope = app.Services.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            context.Database.Migrate();

            if (!context.Usuarios.Any())
            {
                var obraSocial = new ObraSocial() { Nombre = "Particular" };
                context.ObrasSociales.Add(obraSocial);

                var usuario = new Usuario { Email = "juanperez@example.com" };
                context.Usuarios.Add(usuario);

                var paciente1 = new Paciente
                {
                    Apellidos = "Pérez",
                    Nombres = "Juan",
                    DNI = 12345678,
                    FechaDeNacimiento = new DateTime(1990, 1, 1),
                    Sexo = 'M',
                    ObraSocial = obraSocial,
                    Usuario = usuario,
                    EsUsuario = true
                };
                context.Pacientes.Add(paciente1);

                var paciente2 = new Paciente
                {
                    Apellidos = "Pérez",
                    Nombres = "María",
                    DNI = 12345679,
                    FechaDeNacimiento = new DateTime(1991, 1, 1),
                    Sexo = 'F',
                    ObraSocial = obraSocial,
                    Usuario = usuario,
                };
                context.Pacientes.Add(paciente2);

                context.ObrasSociales.Add(new ObraSocial() { Nombre = "OSDE" });
                context.ObrasSociales.Add(new ObraSocial() { Nombre = "Swiss Medical" });
                context.ObrasSociales.Add(new ObraSocial() { Nombre = "Galeno" });

                context.SaveChanges();
            }
        }

        app.Run();
    }
}
