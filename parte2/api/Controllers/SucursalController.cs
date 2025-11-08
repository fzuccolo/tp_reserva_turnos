
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using turnos.Models.Api;
using turnos.Models.Db;

namespace turnos.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SucursalController : ControllerBase
{
    private readonly ILogger<SucursalController> _logger;
    private readonly ApplicationDbContext _context;

    public SucursalController(ILogger<SucursalController> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Sucursal>>> Get()
    {
        var sucursales = await _context.Sucursales.ToListAsync();
        return Ok(sucursales);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Sucursal>> GetById(int id)
    {
        var sucursal = await _context.Sucursales.FirstOrDefaultAsync(s => s.SucursalId == id);
        if (sucursal == null)
        {
            return NotFound();
        }
        return Ok(sucursal);
    }
}
