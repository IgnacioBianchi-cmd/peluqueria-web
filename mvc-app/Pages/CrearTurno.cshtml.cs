using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using mvc_app.Data;
using TurneroApp.Models;
using System.ComponentModel.DataAnnotations;

[Authorize]
public class CrearTurnoModel : PageModel
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<Usuario> _userManager;

    public CrearTurnoModel(ApplicationDbContext context, UserManager<Usuario> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [BindProperty]
    public DateTime FechaHora { get; set; }

    [BindProperty]
    public MetodoPago MetodoPago { get; set; }

    [BindProperty]
    public int? TarjetaId { get; set; }

    [BindProperty]
    public string IdsServicios { get; set; } = string.Empty;

    public List<Servicio> Servicios { get; set; } = new();
    public List<Tarjeta> TarjetasGuardadas { get; set; } = new();

    public async Task<IActionResult> OnGetAsync(string ids)
    {
        IdsServicios = ids;
        var idsParsed = ids.Split(',').Select(int.Parse).ToList();

        Servicios = await _context.Servicios.Where(s => idsParsed.Contains(s.Id)).ToListAsync();

        var user = await _userManager.GetUserAsync(User);
        TarjetasGuardadas = await _context.Tarjetas
            .Where(t => t.UsuarioId == user.Id)
            .ToListAsync();

            FechaHora = DateTime.Now.AddHours(24);
        return Page();
    }

    [BindProperty]
    public string? NuevaTarjetaNumero { get; set; }
    [BindProperty]
    public string? NuevaTarjetaNombre { get; set; }
    [BindProperty]
    public DateTime? NuevaTarjetaVencimiento { get; set; }
    [BindProperty]
    public bool GuardarTarjeta { get; set; }

    public async Task<IActionResult> OnPostAsync()
    {
        if (!ModelState.IsValid || string.IsNullOrEmpty(IdsServicios))
        {
                FechaHora = DateTime.Now.AddHours(24);
        return Page();
        }

        var user = await _userManager.GetUserAsync(User);
        var idsParsed = IdsServicios.Split(',').Select(int.Parse).ToList();
        var servicios = await _context.Servicios.Where(s => idsParsed.Contains(s.Id)).ToListAsync();

        var total = servicios.Sum(s => s.Precio);

        
        Tarjeta? tarjeta = null;

        if (MetodoPago == MetodoPago.Tarjeta)
        {
            if (TarjetaId.HasValue)
            {
                tarjeta = await _context.Tarjetas.FindAsync(TarjetaId.Value);
            }
            else if (!string.IsNullOrEmpty(NuevaTarjetaNumero) && !string.IsNullOrEmpty(NuevaTarjetaNombre) && NuevaTarjetaVencimiento.HasValue)
            {
                tarjeta = new Tarjeta
                {
                    NumeroEnmascarado = "**** **** **** " + NuevaTarjetaNumero[^4..],
                    Ultimos4Digitos = NuevaTarjetaNumero[^4..],
                    NombreTitular = NuevaTarjetaNombre,
                    Vencimiento = NuevaTarjetaVencimiento.Value,
                    UsuarioId = user.Id
                };

                if (GuardarTarjeta)
                {
                    _context.Tarjetas.Add(tarjeta);
                    await _context.SaveChangesAsync();
                }
            }
        }

        var turno = new Turno
        {
            UsuarioId = user.Id, 
            FechaHora = FechaHora,
            Confirmado = false,
            MetodoPago = MetodoPago,
            TarjetaId = MetodoPago == MetodoPago.Tarjeta ? TarjetaId : null,
            MontoTotal = total,
            QrToken = Guid.NewGuid().ToString(),
            QrExpiracion = FechaHora.AddHours(1),
            TurnosServicios = idsParsed.Select(id => new TurnoServicio { ServicioId = id }).ToList()
        };

        _context.Add(turno);
        await _context.SaveChangesAsync();

        return RedirectToPage("ConfirmacionTurno", new { id = turno.Id });
    }
}
