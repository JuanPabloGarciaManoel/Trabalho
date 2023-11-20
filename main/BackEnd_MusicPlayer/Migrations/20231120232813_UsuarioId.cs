using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd_MusicPlayer.Migrations
{
    /// <inheritdoc />
    public partial class UsuarioId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UsuarioId",
                table: "Playlists",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UsuarioId",
                table: "Musicas",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Playlists");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Musicas");
        }
    }
}
