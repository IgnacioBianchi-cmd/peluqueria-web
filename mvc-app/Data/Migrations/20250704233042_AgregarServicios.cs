using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace mvc_app.Data.Migrations
{
    /// <inheritdoc />
    public partial class AgregarServicios : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Servicios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nombre = table.Column<string>(type: "TEXT", nullable: false),
                    Descripcion = table.Column<string>(type: "TEXT", nullable: false),
                    Precio = table.Column<decimal>(type: "TEXT", nullable: false),
                    Duracion = table.Column<TimeSpan>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Servicios", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuario",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NombreCompleto = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: false),
                    PasswordSalt = table.Column<string>(type: "TEXT", nullable: false),
                    Rol = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuario", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Turno",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UsuarioId = table.Column<int>(type: "INTEGER", nullable: false),
                    FechaHora = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Confirmado = table.Column<bool>(type: "INTEGER", nullable: false),
                    QrToken = table.Column<string>(type: "TEXT", nullable: false),
                    QrExpiracion = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Turno", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Turno_Usuario_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuario",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TurnoServicio",
                columns: table => new
                {
                    TurnoId = table.Column<int>(type: "INTEGER", nullable: false),
                    ServicioId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TurnoServicio", x => new { x.TurnoId, x.ServicioId });
                    table.ForeignKey(
                        name: "FK_TurnoServicio_Servicios_ServicioId",
                        column: x => x.ServicioId,
                        principalTable: "Servicios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TurnoServicio_Turno_TurnoId",
                        column: x => x.TurnoId,
                        principalTable: "Turno",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Servicios",
                columns: new[] { "Id", "Descripcion", "Duracion", "Nombre", "Precio" },
                values: new object[,]
                {
                    { 1, "Corte clásico o moderno", new TimeSpan(0, 0, 30, 0, 0), "Corte de pelo", 15m },
                    { 2, "Coloración completa o mechas", new TimeSpan(0, 1, 30, 0, 0), "Teñido", 40m },
                    { 3, "Afeitado, arreglo de barba", new TimeSpan(0, 0, 45, 0, 0), "Barbería", 20m },
                    { 4, "Esmaltado, limado, cutículas", new TimeSpan(0, 1, 0, 0, 0), "Manicura", 25m },
                    { 5, "Tratamiento de pies completo", new TimeSpan(0, 1, 0, 0, 0), "Pedicura", 30m }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Turno_UsuarioId",
                table: "Turno",
                column: "UsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_TurnoServicio_ServicioId",
                table: "TurnoServicio",
                column: "ServicioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TurnoServicio");

            migrationBuilder.DropTable(
                name: "Servicios");

            migrationBuilder.DropTable(
                name: "Turno");

            migrationBuilder.DropTable(
                name: "Usuario");
        }
    }
}
