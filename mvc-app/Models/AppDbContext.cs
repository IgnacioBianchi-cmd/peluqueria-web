using Microsoft.EntityFrameworkCore;

namespace TurneroApp.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Servicio> Servicios { get; set; }
        public DbSet<Turno> Turnos { get; set; }
        public DbSet<TurnoServicio> TurnosServicios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TurnoServicio>()
                .HasKey(ts => new { ts.TurnoId, ts.ServicioId });

            modelBuilder.Entity<TurnoServicio>()
                .HasOne(ts => ts.Turno)
                .WithMany(t => t.TurnosServicios)
                .HasForeignKey(ts => ts.TurnoId);

            modelBuilder.Entity<TurnoServicio>()
                .HasOne(ts => ts.Servicio)
                .WithMany(s => s.TurnosServicios)
                .HasForeignKey(ts => ts.ServicioId);
        }
    }
}
