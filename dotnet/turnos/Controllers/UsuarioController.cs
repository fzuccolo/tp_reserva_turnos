using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using turnos.Models.Api;
using turnos.Models.Db;

namespace turnos.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuarioController : ControllerBase
{
    private readonly ILogger<UsuarioController> _logger;
    private readonly ApplicationDbContext _context;

    public UsuarioController(ILogger<UsuarioController> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UsuarioGetResponseModel>>> Get()
    {
        var usuarios = await _context.Usuarios.Where(u => u.UsuarioId == 1).ToListAsync();
        var result = new List<UsuarioGetResponseModel>();
        foreach (var usuario in usuarios)
        {
            var resultItem = new UsuarioGetResponseModel();
            resultItem.UsuarioId = usuario.UsuarioId;
            resultItem.Email = usuario.Email;
            resultItem.Limite = usuario.Limite;
            result.Add(resultItem);
        }
        return result;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UsuarioGetResponseModel>> GetById(int id)
    {
        var usuario = await _context.Usuarios.Where(u => u.UsuarioId == 1).FirstOrDefaultAsync(u => u.UsuarioId == id);
        if (usuario == null)
        {
            return NotFound();
        }
        var result = new UsuarioGetResponseModel();
        result.UsuarioId = usuario.UsuarioId;
        result.Email = usuario.Email;
        result.Limite = usuario.Limite;
        return result;
    }
}
