using System;
using System.Collections.Generic;

namespace TurneroApp.Models
{
    public class Servicio
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public decimal Precio { get; set; }
        public TimeSpan Duracion { get; set; }

        public ICollection<TurnoServicio> TurnosServicios { get; set; } = new List<TurnoServicio>();
    }
}
