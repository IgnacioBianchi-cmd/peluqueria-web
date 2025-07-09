using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using mvc_app.Data;
using QRCoder;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
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

        public List<TurnoConQR> Turnos { get; set; } = new();

        public class TurnoConQR
        {
            public Turno Turno { get; set; }
            public string QrBase64 { get; set; } = "";
        }

        public async Task<IActionResult> OnGetAsync()
        {
            var usuario = await _userManager.GetUserAsync(User);
            if (usuario == null)
                return RedirectToPage("/Account/Login");

            var turnos = await _context.Turnos
                .Include(t => t.TurnosServicios)
                    .ThenInclude(ts => ts.Servicio)
                .Where(t => t.UsuarioId == usuario.Id)
                .OrderByDescending(t => t.FechaHora)
                .ToListAsync();

            foreach (var t in turnos)
            {
                var qrImage = GenerarQrBase64(t.QrToken);
                Turnos.Add(new TurnoConQR { Turno = t, QrBase64 = qrImage });
            }

            return Page();
        }

        private string GenerarQrBase64(string contenido)
        {
            using var qrGenerator = new QRCodeGenerator();
            using var qrData = qrGenerator.CreateQrCode(contenido, QRCodeGenerator.ECCLevel.Q);
            using var qrCode = new QRCode(qrData);
            using var bitmap = qrCode.GetGraphic(20);
            using var ms = new MemoryStream();
            bitmap.Save(ms, ImageFormat.Png);
            return "data:image/png;base64," + Convert.ToBase64String(ms.ToArray());
        }
    }
}