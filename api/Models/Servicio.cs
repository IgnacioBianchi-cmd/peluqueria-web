using System;
using System.Collections.Generic;

namespace TurneroApp.Models
{
    public class Servicio
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public TimeSpan Duracion { get; set; }

        public ICollection<TurnoServicio> TurnosServicios { get; set; }
    }
}
