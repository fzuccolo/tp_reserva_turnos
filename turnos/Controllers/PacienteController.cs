using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using turnos.Models.Api;
using turnos.Models.Db;

namespace turnos.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PacienteController : ControllerBase
{
    private readonly ILogger<PacienteController> _logger;
    private readonly ApplicationDbContext _context;

    public PacienteController(ILogger<PacienteController> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PacienteGetResponseModel>>> Get()
    {
        var pacientes = await _context.Pacientes.Where(p => p.UsuarioId == 1).Include(p => p.ObraSocial).ToListAsync();
        var result = new List<PacienteGetResponseModel>();
        foreach (var paciente in pacientes)
        {
            var resultItem = new PacienteGetResponseModel();
            resultItem.PacienteId = paciente.PacienteId;
            resultItem.Apellidos = paciente.Apellidos;
            resultItem.Nombres = paciente.Nombres;
            resultItem.DNI = paciente.DNI;
            resultItem.FechaDeNacimiento = paciente.FechaDeNacimiento;
            resultItem.Sexo = paciente.Sexo;
            resultItem.ObraSocial = new ObraSocialGetResponseModel();
            resultItem.ObraSocial.ObraSocialId = paciente.ObraSocial.ObraSocialId;
            resultItem.ObraSocial.Nombre = paciente.ObraSocial.Nombre;
            resultItem.Credencial = paciente.Credencial;
            resultItem.EsUsuario = paciente.EsUsuario;
            result.Add(resultItem);
        }
        return result;
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<PacienteGetResponseModel>> GetById(int id)
    {
        var paciente = await _context.Pacientes.Include(p => p.ObraSocial).FirstOrDefaultAsync(p => p.PacienteId == id && p.UsuarioId == 1);
        if (paciente == null)
        {
            return NotFound();
        }
        var result = new PacienteGetResponseModel();
        result.PacienteId = paciente.PacienteId;
        result.Apellidos = paciente.Apellidos;
        result.Nombres = paciente.Nombres;
        result.DNI = paciente.DNI;
        result.FechaDeNacimiento = paciente.FechaDeNacimiento;
        result.Sexo = paciente.Sexo;
        result.ObraSocial = new ObraSocialGetResponseModel();
        result.ObraSocial.ObraSocialId = paciente.ObraSocial.ObraSocialId;
        result.ObraSocial.Nombre = paciente.ObraSocial.Nombre;
        result.Credencial = paciente.Credencial;
        result.EsUsuario = paciente.EsUsuario;
        return result;
    }

    [HttpPost]
    public async Task<ActionResult<PacienteGetResponseModel>> Post([FromBody] PacientePostRequestModel body)
    {
        var usuario = await _context.Usuarios.FirstAsync(u => u.UsuarioId == 1);
        var pacientes = await _context.Pacientes.Where(p => p.UsuarioId == 1).ToListAsync();
        if (pacientes.Count >= usuario.Limite)
        {
            return BadRequest("El usuario alcanzó el límite de miembros en su grupo familiar");
        }
        if (string.IsNullOrWhiteSpace(body.Apellidos))
            return BadRequest("Apellidos es requerido.");
        if (string.IsNullOrWhiteSpace(body.Nombres))
            return BadRequest("Nombres es requerido.");
        if (body.DNI <= 0)
            return BadRequest("DNI debe ser mayor a 0.");
        if (pacientes.Where(p => p.DNI == body.DNI).Count() > 0)
        {
            return BadRequest("Ya existe un paciente con ese número de DNI para el usuario.");
        }
        if (body.FechaDeNacimiento == default)
            return BadRequest("FechaDeNacimiento es requerido.");
        if (body.FechaDeNacimiento > DateTime.Now)
            return BadRequest("FechaDeNacimiento no puede ser posterior a hoy.");
        if (body.Sexo != 'M' && body.Sexo != 'F' && body.Sexo != 'X')
            return BadRequest("Sexo debe ser 'M', 'F' o 'X'.");
        var obraSocial = await _context.ObrasSociales.FirstOrDefaultAsync(os => os.ObraSocialId == body.ObraSocialId);
        if (obraSocial == null)
            return BadRequest("ObraSocial no encontrada");
        if (body.Credencial == null)
            return BadRequest("Credencial no puede ser nulo.");

        var paciente = new Paciente
        {
            Apellidos = body.Apellidos,
            Nombres = body.Nombres,
            DNI = body.DNI,
            FechaDeNacimiento = body.FechaDeNacimiento,
            Sexo = body.Sexo,
            ObraSocialId = body.ObraSocialId,
            Credencial = body.Credencial,
            Usuario = usuario
        };
        _context.Pacientes.Add(paciente);
        await _context.SaveChangesAsync();

        var pacienteId = paciente.PacienteId;
        paciente = await _context.Pacientes.Include(p => p.ObraSocial).FirstAsync(p => p.PacienteId == pacienteId && p.UsuarioId == 1);
        var result = new PacienteGetResponseModel();
        result.PacienteId = paciente.PacienteId;
        result.Apellidos = paciente.Apellidos;
        result.Nombres = paciente.Nombres;
        result.DNI = paciente.DNI;
        result.FechaDeNacimiento = paciente.FechaDeNacimiento;
        result.Sexo = paciente.Sexo;
        result.ObraSocial = new ObraSocialGetResponseModel();
        result.ObraSocial.ObraSocialId = paciente.ObraSocial.ObraSocialId;
        result.ObraSocial.Nombre = paciente.ObraSocial.Nombre;
        result.Credencial = paciente.Credencial;
        result.EsUsuario = paciente.EsUsuario;

        return CreatedAtAction(nameof(GetById), new { id = result.PacienteId }, result);
    }

    [HttpDelete]
    public async Task<ActionResult> Delete(int id)
    {
        var paciente = await _context.Pacientes.FirstOrDefaultAsync(p => p.PacienteId == id && p.UsuarioId == 1);
        if (paciente == null)
        {
            return NotFound();
        }
        if (paciente.EsUsuario)
        {
            return BadRequest("No se puede eliminar al paciente asociado al titular de la cuenta de usuario.");
        }
        _context.Pacientes.Remove(paciente);
        return NoContent();
    }
}
