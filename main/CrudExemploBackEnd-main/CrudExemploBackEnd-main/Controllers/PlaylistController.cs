using AtletaApi.Models;
using AtletaBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AtletaBackend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PlaylistController : ControllerBase
{
    public PlaylistController(ApplicationDbContext db) => 
        this.db = db;
        
    // GET: api/AtletaRecord
    [HttpGet]
    public ActionResult<IEnumerable<Playlist>> Get()
    {
        if (db.Playlists == null)
            return NotFound();

        return db.Playlists;
    }

    // GET: api/AtletaRecord/5
    [HttpGet("{id}")]
    public ActionResult<Playlist> GetId(string id)
    {
        var obj = db.Playlists.FirstOrDefault(x => x.Id == id);

        if (obj == null)
            return NotFound();

        return obj;
    }

    // GET: api/mestre/AtletaRecord/5
    [HttpGet("mestre/{id}")]
    public ActionResult<IEnumerable<Playlist>> GetIdMestre(string id)
    {
        var objetos = db.Playlists.Where(x => x.Id == id);

        if (objetos == null)
            return NotFound();

        return objetos.ToArray();
    }

    // POST: api/AtletaRecord
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

    // PUT: api/AtletaRecord/5
    [HttpPut("{id}")]
    public IActionResult Put(string id, Playlist obj)
    {
        if (id != obj.Id)
            return BadRequest();
        
        db.Playlists.Update(obj);
        db.SaveChanges();

        return NoContent();
    }

    // DELETE: api/AtletaRecord/5
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

    private readonly ApplicationDbContext db;
}
