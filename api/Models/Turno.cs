using System;
using System.Collections.Generic;

namespace TurneroApp.Models
{
    public class Turno
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }

        public DateTime FechaHora { get; set; }
        public bool Confirmado { get; set; }

        public string QrToken { get; set; }
        public DateTime? QrExpiracion { get; set; }

        public ICollection<TurnoServicio> TurnosServicios { get; set; }
    }
}
