using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mvc_app.Data.Migrations
{
    /// <inheritdoc />
    public partial class AgregarTarjetasYMetodoPago : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MetodoPago",
                table: "Turno",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "MontoTotal",
                table: "Turno",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "TarjetaId",
                table: "Turno",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Tarjetas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NumeroEnmascarado = table.Column<string>(type: "TEXT", nullable: false),
                    NombreTitular = table.Column<string>(type: "TEXT", nullable: false),
                    Ultimos4Digitos = table.Column<string>(type: "TEXT", nullable: false),
                    Vencimiento = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UsuarioId = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tarjetas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tarjetas_AspNetUsers_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Turno_TarjetaId",
                table: "Turno",
                column: "TarjetaId");

            migrationBuilder.CreateIndex(
                name: "IX_Tarjetas_UsuarioId",
                table: "Tarjetas",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Turno_Tarjetas_TarjetaId",
                table: "Turno",
                column: "TarjetaId",
                principalTable: "Tarjetas",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Turno_Tarjetas_TarjetaId",
                table: "Turno");

            migrationBuilder.DropTable(
                name: "Tarjetas");

            migrationBuilder.DropIndex(
                name: "IX_Turno_TarjetaId",
                table: "Turno");

            migrationBuilder.DropColumn(
                name: "MetodoPago",
                table: "Turno");

            migrationBuilder.DropColumn(
                name: "MontoTotal",
                table: "Turno");

            migrationBuilder.DropColumn(
                name: "TarjetaId",
                table: "Turno");
        }
    }
}
