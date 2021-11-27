using BKTarjetaCredito.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BKTarjetaCredito.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarjetaCreditoController : ControllerBase
    {
        private readonly AplicationDbContex _context;
        public TarjetaCreditoController(AplicationDbContex context) 
        {
            _context = context;
        }
        // GET: api/<TarjetaCreditoController>
        [HttpGet]
        public async Task<IActionResult>  Get()
        {
            try 
            {
                var listTarjetas =await _context.TarjetaCredito.ToListAsync();
                return Ok(listTarjetas);
            } catch(Exception ex) 
            {
                return BadRequest(ex.Message);
                
            }
        }


        // POST api/<TarjetaCreditoController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]  TarjetaCredito Tarjeta)
        {
            try
            {
                _context.Add(Tarjeta);
                await _context.SaveChangesAsync();
                return Ok(Tarjeta);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
              
            }
        }

        // PUT api/<TarjetaCreditoController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TarjetaCredito Tarjeta)
        {
            try
            {
                if (id!=Tarjeta.id) 
                {
                    return NotFound();
                }
                _context.Update(Tarjeta);
                await _context.SaveChangesAsync();
                return Ok(new { message="La tarjeta fue actualizada "});
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<TarjetaCreditoController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try 
            {
                var tarjeta = await _context.TarjetaCredito.FindAsync(id);
                if (tarjeta==null) 
                {
                    return NotFound();
                }
                _context.TarjetaCredito.Remove(tarjeta);
                await _context.SaveChangesAsync();
                return Ok(new { message = "La tarjeta fue eliminada" });
            } 
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
