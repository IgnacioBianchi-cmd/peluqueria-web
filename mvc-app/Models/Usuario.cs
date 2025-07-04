using System.Collections.Generic;

namespace TurneroApp.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string NombreCompleto { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string PasswordSalt { get; set; } = string.Empty;
        public string Rol { get; set; } = string.Empty; // "cliente" o "admin"

        public ICollection<Turno> Turnos { get; set; } = new List<Turno>();
    }
}
