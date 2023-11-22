using PlayListAPI.Models;
using PlayList.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PlayList.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PlaylistController(ApplicationDbContext db) : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Playlist>> Get()
    {
        if (db.Playlists == null)
            return NotFound();

        return db.Playlists;
    }

    [HttpGet("{id}")]
    public ActionResult<Playlist> GetId(string id)
    {
        var obj = db.Playlists.FirstOrDefault(x => x.Id == id);

        if (obj == null)
            return NotFound();

        return obj;
    }

    [HttpGet("mestre/{id}")]
    public ActionResult<IEnumerable<Playlist>> GetIdMestre(string id)
    {
        var obj = db.Playlists.Where(x => x.IdUsuario == id);

        if (obj == null)
            return NotFound();

        return obj.ToArray();
    }

    [HttpPost]
    public ActionResult<Playlist> Post(Playlist obj)
    {
        if (string.IsNullOrWhiteSpace(obj.Id))
            obj.Id = Guid.NewGuid().ToString();

        db.Playlists.Add(obj);
        db.SaveChanges();

        return CreatedAtAction(
            nameof(GetId),
            new { id = obj.Id },
            obj
        );
    }

    [HttpPut("{id}")]
    public IActionResult Put(string id, Playlist obj)
    {
        if (id != obj.Id)
            return BadRequest();
        
        db.Playlists.Update(obj);
        db.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(string id)
    {
        if (db.Playlists == null)
            return NotFound();

        var obj = db.Playlists.FirstOrDefault(x => x.Id == id);

        if (obj == null)
            return NotFound();

        db.Playlists.Remove(obj);
        db.SaveChanges();

        return NoContent();
    }

    private readonly ApplicationDbContext db = db;
}
