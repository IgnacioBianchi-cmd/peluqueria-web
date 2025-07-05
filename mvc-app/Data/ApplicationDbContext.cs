using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TurneroApp.Models; // Importante: usar tu namespace de modelos

namespace mvc_app.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Servicio> Servicios { get; set; } = null!;
    public DbSet<Tarjeta> Tarjetas { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<TurnoServicio>().HasKey(ts => new { ts.TurnoId, ts.ServicioId });

        builder.Entity<Servicio>().HasData(
            new Servicio { Id = 1, Nombre = "Corte de pelo", Descripcion = "Corte clásico o moderno", Precio = 15, Duracion = TimeSpan.FromMinutes(30) },
            new Servicio { Id = 2, Nombre = "Teñido", Descripcion = "Coloración completa o mechas", Precio = 40, Duracion = TimeSpan.FromMinutes(90) },
            new Servicio { Id = 3, Nombre = "Barbería", Descripcion = "Afeitado, arreglo de barba", Precio = 20, Duracion = TimeSpan.FromMinutes(45) },
            new Servicio { Id = 4, Nombre = "Manicura", Descripcion = "Esmaltado, limado, cutículas", Precio = 25, Duracion = TimeSpan.FromMinutes(60) },
            new Servicio { Id = 5, Nombre = "Pedicura", Descripcion = "Tratamiento de pies completo", Precio = 30, Duracion = TimeSpan.FromMinutes(60) }
        );

        builder.Entity<Tarjeta>()
            .HasOne<IdentityUser>()
            .WithMany()
            .HasForeignKey(t => t.UsuarioId);
    }
}
