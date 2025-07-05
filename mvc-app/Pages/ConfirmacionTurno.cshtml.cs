using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using mvc_app.Data;
using TurneroApp.Models;
using QRCoder;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System;

public class ConfirmacionTurnoModel : PageModel
{
    private readonly ApplicationDbContext _context;

    public ConfirmacionTurnoModel(ApplicationDbContext context)
    {
        _context = context;
    }

    public Turno Turno { get; set; } = null!;
    public List<Servicio> Servicios { get; set; } = new();
    public string QrImageBase64 { get; set; } = "";

    public async Task<IActionResult> OnGetAsync(int id)
    {
        Turno = await _context.Turnos
            .Include(t => t.TurnosServicios)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (Turno == null)
        {
            return NotFound();
        }

        Servicios = await _context.Servicios
            .Where(s => Turno.TurnosServicios.Select(ts => ts.ServicioId).Contains(s.Id))
            .ToListAsync();

        // Generar QR con token
        if (!string.IsNullOrEmpty(Turno.QrToken))
        {
            using var qrGenerator = new QRCodeGenerator();
            using var qrData = qrGenerator.CreateQrCode(Turno.QrToken, QRCodeGenerator.ECCLevel.Q);
            using var qrCode = new QRCode(qrData);
            using var bitmap = qrCode.GetGraphic(20);
            using var ms = new MemoryStream();
            bitmap.Save(ms, ImageFormat.Png);
            QrImageBase64 = Convert.ToBase64String(ms.ToArray());
        }

        return Page();
    }
}
