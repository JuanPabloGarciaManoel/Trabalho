using Microsoft.AspNetCore.Mvc;
using PlayList.Models;
using PlayListAPI.Models;

namespace PlayList.Controllers;

public class MusicaController(ApplicationDbContext db) : ControllerBase
{

    [HttpGet]
    public ActionResult<IEnumerable<Musica>> Get()
    {
        if (db.Musicas == null)
            return NotFound();

        return db.Musicas;
    }

    [HttpGet("{id}")]
    public ActionResult<Musica> GetId(string id)
    {
        var obj = db.Musicas?.FirstOrDefault(x => x.Id == id);

        if (obj == null)
            return NotFound();

        return obj;
    }

    [HttpPost]
    public ActionResult<Musica> Post(Musica obj)
    {
        if (obj.Id == null)
            obj.Id = Guid.NewGuid().ToString();

        db.Musicas.Add(obj);

        return CreatedAtAction(
            nameof(GetId),
            new { id = obj.Id },
            obj
        );
    }

    [HttpPut("{id}")]
    public IActionResult Put(string id, Musica obj)
    {
        if (id != obj.Id)
            return BadRequest();


        var objOrig = db.Musicas.FirstOrDefault(x => x.Id == id);

        if (objOrig == null)
            return NotFound();

        db.Entry(objOrig).CurrentValues.SetValues(obj);

        db.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        if (db.Musicas == null)
            return NotFound();

        var obj = db.Musicas.FirstOrDefault(x => x.Id == id);

        if (obj == null)
            return NotFound();

        db.Musicas.Remove(obj);
        db.SaveChanges();

        return NoContent();
    }

    private readonly ApplicationDbContext db = db;

}