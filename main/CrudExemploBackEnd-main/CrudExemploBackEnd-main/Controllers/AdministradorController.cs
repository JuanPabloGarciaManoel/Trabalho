using AtletaApi.Models;
using AtletaBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TreinadorBackend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class AdministradorController : ControllerBase
{
    public AdministradorController(ApplicationDbContext db) => 
        this.db = db;
        
    // GET: api/Treinador
    [HttpGet]
    public ActionResult<IEnumerable<Administrador>> Get()
    {
        if (db.Administradores == null)
            return NotFound();

        return db.Administradores;
    }

    // GET: api/Treinador/5
    [HttpGet("{id}")]
    public ActionResult<Administrador> GetId(string id)
    {
        var obj = db.Administradores.FirstOrDefault(x => x.Id == id);

        if (obj == null)
            return NotFound();

        return obj;
    }

    // POST: api/Treinador
    [HttpPost]
    public ActionResult<Administrador> Post(Administrador obj)
    {
        if (string.IsNullOrWhiteSpace(obj.Id))
            obj.Id = Guid.NewGuid().ToString();

        db.Administradores.Add(obj);
        db.SaveChanges();

        return CreatedAtAction(
            nameof(GetId),
            new { id = obj.Id },
            obj
        );
    }

    // PUT: api/Treinador/5
    [HttpPut("{id}")]
    public IActionResult Put(string id, Administrador obj)
    {
        if (id != obj.Id)
            return BadRequest();
        
        db.Administradores.Update(obj);
        db.SaveChanges();

        return NoContent();
    }

    // DELETE: api/Treinador/5
    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        if (db.Administradores == null)
            return NotFound();

        var obj = db.Administradores.FirstOrDefault(x => x.Id == id);

        if (obj == null)
            return NotFound();

        db.Administradores.Remove(obj);
        db.SaveChanges();

        return NoContent();
    }

    private readonly ApplicationDbContext db;
}
