using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace TurneroApp.Models
{
    public class Usuario : IdentityUser
    {
        public string NombreCompleto { get; set; } = "";
        public string Rol { get; set; } = "cliente";
        public ICollection<Turno> Turnos { get; set; } = new List<Turno>();
    }
}
