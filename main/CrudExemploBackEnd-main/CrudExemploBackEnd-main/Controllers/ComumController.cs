using AtletaApi.Models;
using AtletaBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AtletaBackend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ComumController : ControllerBase
{
    public ComumController(ApplicationDbContext db) => 
        this.db = db;
        
    // GET: api/Atleta
    [HttpGet]
    public ActionResult<IEnumerable<Comum>> Get()
    {
        if (db.Comuns == null)
            return NotFound();

        return db.Comuns;
    }

    // GET: api/Atleta/5
    [HttpGet("{id}")]
    public ActionResult<Comum> GetId(string id)
    {
        var obj = db.Comuns.FirstOrDefault(x => x.Id == id);

        if (obj == null)
            return NotFound();

        return obj;
    }

    // POST: api/Atleta
    [HttpPost]
    public ActionResult<Comum> Post(Comum obj)
    {
        if (string.IsNullOrWhiteSpace(obj.Id))
            obj.Id = Guid.NewGuid().ToString();

        db.Comuns.Add(obj);
        db.SaveChanges();

        return CreatedAtAction(
            nameof(GetId),
            new { id = obj.Id },
            obj
        );
    }

    // PUT: api/Atleta/5
    [HttpPut("{id}")]
    public IActionResult Put(string id, Comum obj)
    {
        if (id != obj.Id)
            return BadRequest();
        
        db.Comuns.Update(obj);
        db.SaveChanges();

        return NoContent();
    }

    // DELETE: api/Atleta/5
    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        if (db.Comuns == null)
            return NotFound();

        var obj = db.Comuns.FirstOrDefault(x => x.Id == id);

        if (obj == null)
            return NotFound();

        db.Comuns.Remove(obj);
        db.SaveChanges();

        return NoContent();
    }

    private readonly ApplicationDbContext db;
}
