using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackApi.models;
using BackApi.Models;

namespace BackApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioItemsController : ControllerBase
    {
        private readonly UsuarioContext _context;

        public UsuarioItemsController(UsuarioContext context)
        {
            _context = context;
        }

        // GET: api/UsuarioItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioItemDTO>>> GetUsuarioItems()
        {
          //if (_context.UsuarioItems == null)
          //{
          //    return NotFound();
          //}
          
            return await _context.UsuarioItems
            .Select(x => ItemToDTO(x)).
            ToListAsync();
        }

        // GET: api/UsuarioItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioItemDTO>> GetUsuarioItems(long id)
        {

          /*if (_context.UsuarioItems == null)
          {
              return NotFound();
          }*/

            var UsuarioItem = await _context.UsuarioItems.FindAsync(id);

            if (UsuarioItem == null)
            {
                return NotFound();
            }

            return ItemToDTO(UsuarioItem);
        }

        // PUT: api/UsuarioItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsuarioItem(long id, UsuarioItemDTO usuarioDTO)
        {
            if (id != usuarioDTO.Id)
            {
                return BadRequest();
            }

            /*_context.Entry(usuarioDTO).State = EntityState.Modified;*/

            var usuarioItem = await _context.UsuarioItems.FindAsync(id);

            if(usuarioItem == null){
                return NotFound();
            }

            usuarioItem.Name = usuarioDTO.Name;
            usuarioItem.Email = usuarioDTO.Email;
            usuarioItem.Senha = usuarioDTO.Senha;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!UsuarioItemExists(id))
            {
                if (!UsuarioItemExists(id)) 
                {
                    return NotFound();
                }
                /*else
                {
                    throw;
                }*/
            }

            return NoContent();
        }

        // POST: api/UsuarioItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UsuarioItemDTO>> PostUsuarioItem(UsuarioItemDTO usuarioDTO)
        {

            var usuarioItem = new UsuarioItem{
                Name = usuarioDTO.Name,
                Email = usuarioDTO.Email,
                Senha = usuarioDTO.Senha
            };

          //if (_context.UsuarioItems == null)
          //{
          //    return Problem("Entity set 'UsuarioContext.UsuarioItems'  is null.");
          //}

            _context.UsuarioItems.Add(usuarioItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
            nameof(GetUsuarioItems), 
            new { id = usuarioItem.Id }, 
            ItemToDTO(usuarioItem));
        }

        // DELETE: api/UsuarioItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuarioItem(long id)
        {
            var UsuarioItem = await _context.UsuarioItems.FindAsync(id);

            /*if (_context.UsuarioItems == null)
            {
                return NotFound();
            }
            var usuarioItem = await _context.UsuarioItems.FindAsync(id);
            if (usuarioItem == null)
            {
                return NotFound();
            }*/

            if(UsuarioItem == null){
                return NotFound();
            }

            _context.UsuarioItems.Remove(UsuarioItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsuarioItemExists(long id)
        {
            return _context.UsuarioItems.Any(e => e.Id == id);

            /*return (_context.UsuarioItems?.Any(e => e.Id == id)).GetValueOrDefault();*/
        }

        private static UsuarioItemDTO ItemToDTO(UsuarioItem usuarioItem) =>
        new UsuarioItemDTO
        {
            Id = usuarioItem.Id,
            Name = usuarioItem.Name,
            Email = usuarioItem.Email,
            Senha = usuarioItem.Senha
        };
    }
}
