using PlayListAPI.Models;
using PlayList.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PlayList.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ComumController(ApplicationDbContext db) : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Comum>> Get()
    {
        if (db.Comuns == null)
            return NotFound();

        return db.Comuns;
    }

    
    [HttpGet("{id}")]
    public ActionResult<Comum> GetId(string id)
    {
        var obj = db.Comuns.FirstOrDefault(x => x.Id == id);

        if (obj == null)
            return NotFound();

        return obj;
    }

    // [HttpGet("{id}/musicas")]
    // public ActionResult<IEnumerable<Musica>> GetMusicas(string id)
    // {
    //     var obj = db.Comuns.FirstOrDefault(x => x.Id == id);

    //     if (obj == null || obj.Musicas == null)
    //         return NotFound();

    //     return obj.Musicas;
    // }

    // [HttpGet("{id}/playlists")]
    // public ActionResult<IEnumerable<Playlist>> GetPlaylists(string id)
    // {
    //     var obj = db.Comuns.FirstOrDefault(x => x.Id == id);

    //     if (obj == null || obj.Playlists == null)
    //         return NotFound();

    //     return obj.Playlists;
    // }
    
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

    
    [HttpPut("{id}")]
    public IActionResult Put(string id, Comum obj)
    {
        if (id != obj.Id)
            return BadRequest();
        
        db.Comuns.Update(obj);
        db.SaveChanges();

        return NoContent();
    }

    
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

    private readonly ApplicationDbContext db = db;
}
