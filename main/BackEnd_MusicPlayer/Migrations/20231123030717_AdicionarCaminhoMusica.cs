using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd_MusicPlayer.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarCaminhoMusica : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CaminhoMusica",
                table: "Musicas",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CaminhoMusica",
                table: "Musicas");
        }
    }
}
