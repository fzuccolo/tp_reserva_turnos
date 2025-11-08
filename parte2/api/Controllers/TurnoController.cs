using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using turnos.Models.Api;
using turnos.Models.Db;

namespace turnos.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TurnoController : ControllerBase
{
    private readonly ILogger<TurnoController> _logger;
    private readonly ApplicationDbContext _context;

    public TurnoController(ILogger<TurnoController> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<TurnoGetResponseModel>>> Get()
    {
        var pacienteIds = await _context.Pacientes.Where(p => p.UsuarioId == 1).Select(p => p.PacienteId).ToListAsync();
        var turnos = await _context.Turnos.Where(t => pacienteIds.Contains(t.PacienteId)).ToListAsync();
        var result = new List<TurnoGetResponseModel>();
        foreach (var turno in turnos)
        {
            var resultItem = new TurnoGetResponseModel();
            resultItem.TurnoId = turno.TurnoId;
            resultItem.SucursalId = turno.SucursalId;
            resultItem.PacienteId = turno.PacienteId;
            resultItem.Horario = turno.Horario;
            result.Add(resultItem);
        }
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TurnoGetResponseModel>> GetById(int id)
    {
        var usuario = await _context.Usuarios.FirstAsync(u => u.UsuarioId == 1);
        var pacienteIds = await _context.Pacientes.Where(p => p.UsuarioId == 1).Select(p => p.PacienteId).ToListAsync();
        var turno = await _context.Turnos.FirstOrDefaultAsync(t => t.TurnoId == id);
        if (turno == null)
        {
            return NotFound();
        }
        if (!pacienteIds.Contains(turno.PacienteId))
        {
            return NotFound();
        }
        var result = new TurnoGetResponseModel();
        result.TurnoId = turno.TurnoId;
        result.SucursalId = turno.SucursalId;
        result.PacienteId = turno.PacienteId;
        result.Horario = turno.Horario;

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<TurnoGetResponseModel>> Post([FromBody] TurnoPostResponseModel body)
    {
        var horarioInicio = new TimeSpan(9, 0, 0); // 9:00
        var horarioFinal = new TimeSpan(17, 55, 0); // 17:55
        var horarioTurno = new TimeSpan(body.Horario.Hour, body.Horario.Minute, 0);
        if (horarioTurno < horarioInicio || horarioTurno > horarioFinal)
        {
            return BadRequest("El horario de atención de las sucursales es de 9 a 18 horas. El último turno disponible es el de las 17:55 horas.");
        }
        if (body.Horario.Minute % 5 != 0)
        {
            return BadRequest("El horario del turno debe estar dado en múltiplos de 5 minutos. (Ej: 0, 5, 10, etc.)");
        }
        var horario = new DateTime(body.Horario.Date.Year, body.Horario.Date.Month, body.Horario.Date.Day, body.Horario.Hour, body.Horario.Minute, 0);
        var usuario = await _context.Usuarios.FirstAsync(u => u.UsuarioId == 1);
        var paciente = await _context.Pacientes.Where(p => p.UsuarioId == usuario.UsuarioId).FirstOrDefaultAsync(p => p.PacienteId == body.PacienteId);
        if (paciente == null)
        {
            return NotFound($"No se encontró paciente {body.PacienteId} para el usuario actual.");
        }
        var sucursal = await _context.Sucursales.FirstOrDefaultAsync(s => s.SucursalId == body.SucursalId);
        if (sucursal == null)
        {
            return BadRequest($"No se encontró sucursal {body.SucursalId}");
        }
        var turno = await _context.Turnos.FirstOrDefaultAsync(t => t.SucursalId == body.SucursalId && t.Horario == horario);
        if (turno != null)
        {
            return BadRequest($"El turno {horario} ya se encuentra ocupado en la sucursal {body.SucursalId}");
        }
        turno = await _context.Turnos.FirstOrDefaultAsync(t => t.PacienteId == body.PacienteId);
        if (turno != null)
        {
            return BadRequest($"Un paciente no puede tener más de un turno asignado");
        }

        turno = new Turno();
        turno.Sucursal = sucursal;
        turno.Paciente = paciente;
        turno.Horario = horario;
        _context.Turnos.Add(turno);
        await _context.SaveChangesAsync();

        var result = new TurnoGetResponseModel();
        result.TurnoId = turno.TurnoId;
        result.SucursalId = turno.SucursalId;
        result.PacienteId = turno.PacienteId;
        result.Horario = turno.Horario;

        return CreatedAtAction(nameof(GetById), new { id = result.PacienteId }, result);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var usuario = await _context.Usuarios.FirstAsync(u => u.UsuarioId == 1);
        var pacienteIds = await _context.Pacientes.Where(p => p.UsuarioId == usuario.UsuarioId).Select(p => p.PacienteId).ToListAsync();
        var turno = await _context.Turnos.FirstOrDefaultAsync(t => t.TurnoId == id);
        if (turno == null)
        {
            return NotFound();
        }
        if (!pacienteIds.Contains(turno.PacienteId))
        {
            return NotFound();
        }
        _context.Turnos.Remove(turno);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
