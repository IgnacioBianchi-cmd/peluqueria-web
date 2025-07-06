using System;
using System.Collections.Generic;

namespace TurneroApp.Models
{
    public enum MetodoPago
    {
        Efectivo,
        Tarjeta
    }

    public class Turno
    {
        public int Id { get; set; }
        public string UsuarioId { get; set; } = string.Empty;
        public Usuario Usuario { get; set; } = null!;

        public DateTime FechaHora { get; set; }
        public bool Confirmado { get; set; }

        public string QrToken { get; set; } = string.Empty;
        public DateTime? QrExpiracion { get; set; }
        public bool QrActivo { get; set; } = true;

        public MetodoPago MetodoPago { get; set; }
        public int? TarjetaId { get; set; }
        public Tarjeta? Tarjeta { get; set; }

        public decimal MontoTotal { get; set; }

        public ICollection<TurnoServicio> TurnosServicios { get; set; } = new List<TurnoServicio>();
    }
}