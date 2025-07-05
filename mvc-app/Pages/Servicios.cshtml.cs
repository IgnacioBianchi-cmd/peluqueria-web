using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using mvc_app.Data;
using TurneroApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public class ServiciosModel : PageModel
{
    private readonly ApplicationDbContext _context;

    public ServiciosModel(ApplicationDbContext context)
    {
        _context = context;
    }

    public IList<Servicio> Servicios { get; set; } = new List<Servicio>();

    [BindProperty]
    public List<int> ServiciosSeleccionados { get; set; } = new();

    public async Task OnGetAsync()
    {
        Servicios = await _context.Servicios.ToListAsync();
    }

    public IActionResult OnPost()
    {
        if (ServiciosSeleccionados == null || ServiciosSeleccionados.Count == 0)
        {
            ModelState.AddModelError(string.Empty, "Debe seleccionar al menos un servicio.");
            Servicios = _context.Servicios.ToList();
            return Page();
        }

        var serviciosStr = string.Join(",", ServiciosSeleccionados);
        return RedirectToPage("CrearTurno", new { ids = serviciosStr });
    }
}
