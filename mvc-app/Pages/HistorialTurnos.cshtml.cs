using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using mvc_app.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using TurneroApp.Models;

namespace mvc_app.Pages
{
    [Authorize]
    public class HistorialTurnosModel : PageModel
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<Usuario> _userManager;

        public HistorialTurnosModel(ApplicationDbContext context, UserManager<Usuario> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public List<Turno> Turnos { get; set; } = new();

        public async Task<IActionResult> OnGetAsync()
        {
            var usuario = await _userManager.GetUserAsync(User);
            if (usuario == null)
                return RedirectToPage("/Account/Login");

            Turnos = await _context.Turnos
                .Include(t => t.TurnosServicios)
                    .ThenInclude(ts => ts.Servicio)
                .Where(t => t.UsuarioId == usuario.Id)
                .OrderByDescending(t => t.FechaHora)
                .ToListAsync();

            return Page();
        }
    }
}