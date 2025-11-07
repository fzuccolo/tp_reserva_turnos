using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using turnos.Models.Api;
using turnos.Models.Db;

namespace turnos.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ObraSocialController : ControllerBase
{
    private readonly ILogger<ObraSocialController> _logger;
    private readonly ApplicationDbContext _context;

    public ObraSocialController(ILogger<ObraSocialController> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ObraSocialGetResponseModel>>> Get()
    {
        var obrasSociales = await _context.ObrasSociales.ToListAsync();
        var result = new List<ObraSocialGetResponseModel>();
        foreach (var obraSocial in obrasSociales)
        {
            var resultItem = new ObraSocialGetResponseModel();
            resultItem.ObraSocialId = obraSocial.ObraSocialId;
            resultItem.Nombre = obraSocial.Nombre;
            result.Add(resultItem);
        }
        return result;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ObraSocialGetResponseModel>> GetById(int id)
    {
        var obraSocial = await _context.ObrasSociales.FirstOrDefaultAsync(os => os.ObraSocialId == id);
        if (obraSocial == null)
        {
            return NotFound();
        }
        var result = new ObraSocialGetResponseModel();
        result.ObraSocialId = obraSocial.ObraSocialId;
        result.Nombre = obraSocial.Nombre;
        return result;
    }
}
