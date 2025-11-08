using Microsoft.EntityFrameworkCore;
using turnos.Models.Db;

namespace turnos;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("PermitirTodo", policy =>
            {
                policy.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });

        builder.Services.AddControllers();

        // En Windows: %LOCALAPPDATA%. En Linux: $XDG_DATA_HOME (<home>/.local/share)
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        var dbPath = Path.Join(path, "turnos_parte1.sqlite3");
        Console.WriteLine($"La ubicación de la base de datos es {dbPath}");
        builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite($"Data source={dbPath}"));


        var app = builder.Build();

        // Configure the HTTP request pipeline.

        app.UseHttpsRedirection();

        app.UseCors("PermitirTodo");

        app.UseAuthorization();


        app.MapControllers();

        using (var scope = app.Services.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            context.Database.Migrate();

            if (!context.Usuarios.Any())
            {
                var obraSocial = new ObraSocial()
                {
                    Nombre = "Particular"
                };
                context.ObrasSociales.Add(obraSocial);

                var usuario = new Usuario
                {
                    Email = "juanperez@example.com"
                };
                context.Usuarios.Add(usuario);

                var paciente = new Paciente
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
                context.Pacientes.Add(paciente);
                paciente = new Paciente
                {
                    Apellidos = "Pérez",
                    Nombres = "María",
                    DNI = 12345679,
                    FechaDeNacimiento = new DateTime(1991, 1, 1),
                    Sexo = 'F',
                    ObraSocial = obraSocial,
                    Usuario = usuario,
                };
                context.Pacientes.Add(paciente);

                obraSocial = new ObraSocial()
                {
                    Nombre = "OSDE"
                };
                context.ObrasSociales.Add(obraSocial);
                obraSocial = new ObraSocial()
                {
                    Nombre = "Swiss Medical"
                };
                context.ObrasSociales.Add(obraSocial);
                obraSocial = new ObraSocial()
                {
                    Nombre = "Galeno"
                };
                context.ObrasSociales.Add(obraSocial);

                context.SaveChanges();
            }
        }

        app.Run();
    }
}
