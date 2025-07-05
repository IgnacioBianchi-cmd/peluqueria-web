using System;
using System.ComponentModel.DataAnnotations;

namespace TurneroApp.Models
{
    public class Tarjeta
    {
        public int Id { get; set; }

        [Required]
        public string NumeroEnmascarado { get; set; } = string.Empty;

        [Required]
        public string NombreTitular { get; set; } = string.Empty;

        [Required]
        public string Ultimos4Digitos { get; set; } = string.Empty;

        [Required]
        public DateTime Vencimiento { get; set; }

        [Required]
        public string UsuarioId { get; set; } = string.Empty;
    }
}
