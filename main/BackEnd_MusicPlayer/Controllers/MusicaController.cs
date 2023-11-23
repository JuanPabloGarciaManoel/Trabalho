using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlayList.Models;
using PlayListAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PlayList.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MusicaController : ControllerBase
    {
        private readonly ApplicationDbContext db;

        public MusicaController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Musica>> Get()
        {
            var userId = User.Identity.Name;
            var musicas = db.Musicas.Where(x => x.IdUsuario == userId).ToList();
            return Ok(musicas);
        }

        [HttpGet("{id}")]
        public ActionResult<Musica> GetId(string id)
        {
            var userId = User.Identity.Name;
            var obj = db.Musicas?.FirstOrDefault(x => x.Id == id && x.IdUsuario == userId);

            if (obj == null)
                return NotFound();

            return obj;
        }

        [HttpGet("mestre/{id}")]
        public ActionResult<IEnumerable<Musica>> GetIdMestre(string id)
        {
            var userId = User.Identity.Name;
            var obj = db.Musicas?.Where(x => x.IdUsuario == userId && x.Id == id);

            if (obj == null)
                return NotFound();

            return obj.ToArray();
        }

        [HttpPost]
        public ActionResult<Musica> Post(Musica obj)
        {
            var userId = User.Identity.Name;

            if (string.IsNullOrWhiteSpace(obj.Id))
                obj.Id = Guid.NewGuid().ToString();

            obj.IdUsuario = userId;
            db.Musicas.Add(obj);
            db.SaveChanges();

            return CreatedAtAction(nameof(GetId), new { id = obj.Id }, obj);
        }

        [HttpPut("{id}")]
        public IActionResult Put(string id, Musica obj)
        {
            var userId = User.Identity.Name;

            // Certifique-se de que o usuário autenticado é o proprietário da música
            if (id != obj.Id || userId != obj.IdUsuario)
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
            var userId = User.Identity.Name;

            var obj = db.Musicas.FirstOrDefault(x => x.Id == id && x.IdUsuario == userId);

            if (obj == null)
                return NotFound();

            db.Musicas.Remove(obj);
            db.SaveChanges();

            return NoContent();
        }
    }
}
