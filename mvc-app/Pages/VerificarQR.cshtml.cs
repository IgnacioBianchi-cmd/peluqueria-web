using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using mvc_app.Data;
using TurneroApp.Models;

public class VerificarQRModel : PageModel
{
    private readonly ApplicationDbContext _context;

    public VerificarQRModel(ApplicationDbContext context)
    {
        _context = context;
    }

    [BindProperty(SupportsGet = true)]
    public string Token { get; set; } = string.Empty;

    public bool TurnoValido { get; set; }
    public string NombreUsuario { get; set; } = "";
    public DateTime FechaTurno { get; set; }
    public string EstadoTurno { get; set; } = "";

    public async Task<IActionResult> OnGetAsync()
    {
        if (string.IsNullOrWhiteSpace(Token))
        {
            TurnoValido = false;
            return Page();
        }

        var turno = await _context.Turnos
            .Include(t => t.Usuario)
            .FirstOrDefaultAsync(t => t.QrToken == Token && t.QrActivo);

        if (turno == null || turno.QrExpiracion < DateTime.Now)
        {
            TurnoValido = false;
            return Page();
        }

        TurnoValido = true;
        NombreUsuario = turno.Usuario.NombreCompleto;
        FechaTurno = turno.FechaHora;
        EstadoTurno = turno.Confirmado ? "Confirmado" : "Pendiente";

        return Page();
    }
}
