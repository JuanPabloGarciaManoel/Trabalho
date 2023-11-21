using PlayListAPI.Models;
using PlayList.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PlayList.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AdministradorController : ControllerBase
{
    public AdministradorController(ApplicationDbContext db) => this.db = db;
    
    [HttpGet]
    public ActionResult<IEnumerable<Administrador>> Get()
    {
        if (db.Administradores == null)
            return NotFound("Nenhum administrador cadastrado");

        return db.Administradores;
    }

    
    [HttpGet("{id}")]
    public ActionResult<Administrador> GetId(string id)
    {
        var obj = db.Administradores.FirstOrDefault(x => x.Id == id);

        if (obj == null)
            return NotFound("Não foi encontrado nenhum administrador com o identificador informado.");

        return obj;
    }

    
    [HttpPost]
    public ActionResult<Administrador> Post(Administrador obj)
    {
        if (string.IsNullOrWhiteSpace(obj.Id))
        //if (obj.Id == null)
            obj.Id = Guid.NewGuid().ToString();

        db.Administradores.Add(obj);
        db.SaveChanges();

        return CreatedAtAction(
            nameof(GetId),
            new { id = obj.Id },
            obj
        );
    }

    
    [HttpPut("{id}")]
    public IActionResult Put(string id, Administrador obj)
    {
        if (id != obj.Id)
            return BadRequest("O identificador informado difere do identificador do objeto");
        
        db.Administradores.Update(obj);
        db.SaveChanges();

        return NoContent();
    }

    
    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        if (db.Administradores == null)
            return NotFound("Nenhum administrador cadastrado.");

        var obj = db.Administradores.FirstOrDefault(x => x.Id == id);

        if (obj == null)
            return NotFound("Não foi encontrado nenhum administrador com o identificador informado.");

        db.Administradores.Remove(obj);
        db.SaveChanges();

        return NoContent();
    }

    private readonly ApplicationDbContext db;
}
