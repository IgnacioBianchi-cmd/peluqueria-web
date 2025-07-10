using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TurneroApp.Models;
using TurneroApp.DTOs;

namespace TurneroApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TurnosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TurnosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/turnos/proximos
        [HttpGet("proximos")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult> GetTurnosProximos()
        {
            try
            {
                var hoy = DateTime.Today;
                var mañana = hoy.AddDays(1);

                var turnos = await _context.Turnos
                    .Include(t => t.Usuario)
                    .Include(t => t.TurnosServicios)
                        .ThenInclude(ts => ts.Servicio)
                    .Where(t => t.FechaHora.Date == hoy || t.FechaHora.Date == mañana)
                    .ToListAsync();

                var resultado = turnos.Select(t => new
                {
                    t.Id,
                    t.FechaHora,
                    Estado = t.Estado,
                    MetodoPago = t.MetodoPago.ToString(),
                    QrActivo = t.QrActivo,
                    Usuario = t.Usuario == null ? null : new
                    {
                        t.Usuario.Id,
                        t.Usuario.NombreCompleto,
                        t.Usuario.Email
                    },
                    Servicios = t.TurnosServicios.Select(ts => new
                    {
                        ts.Servicio.Id,
                        ts.Servicio.Nombre
                    }).ToList()
                });

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message, stack = ex.StackTrace });
            }
        }

        // PUT: api/turnos/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> EditarTurno(int id, [FromBody] TurnoUpdateDto dto)
        {
            var turno = await _context.Turnos
                .Include(t => t.TurnosServicios)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (turno == null)
                return NotFound(new { mensaje = "Turno no encontrado." });

            turno.FechaHora = dto.FechaHora;
            turno.Estado = dto.Estado;

            await _context.SaveChangesAsync();
            return Ok(new { mensaje = "Turno actualizado correctamente." });
        }

        // DELETE: api/turnos/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> EliminarTurno(int id)
        {
            var turno = await _context.Turnos.FindAsync(id);
            if (turno == null)
                return NotFound();

            _context.Turnos.Remove(turno);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // PUT: api/turnos/{id}/desactivar-qr
        [HttpPut("{id}/desactivar-qr")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DesactivarQR(int id)
        {
            var turno = await _context.Turnos.FindAsync(id);

            if (turno == null)
                return NotFound(new { mensaje = "Turno no encontrado." });

            turno.QrActivo = false;
            await _context.SaveChangesAsync();

            return Ok(new { mensaje = "QR desactivado correctamente." });
        }
    }
}
