﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd_MusicPlayer.Migrations
{
    /// <inheritdoc />
    public partial class restauracao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Musicas_Comuns_ComumId",
                table: "Musicas");

            migrationBuilder.DropForeignKey(
                name: "FK_Playlists_Comuns_ComumId",
                table: "Playlists");

            migrationBuilder.DropTable(
                name: "Administradores");

            migrationBuilder.DropTable(
                name: "Comuns");

            migrationBuilder.DropIndex(
                name: "IX_Playlists_ComumId",
                table: "Playlists");

            migrationBuilder.DropIndex(
                name: "IX_Musicas_ComumId",
                table: "Musicas");

            migrationBuilder.RenameColumn(
                name: "ComumId",
                table: "Playlists",
                newName: "IdUsuario");

            migrationBuilder.RenameColumn(
                name: "ComumId",
                table: "Musicas",
                newName: "IdUsuario");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IdUsuario",
                table: "Playlists",
                newName: "ComumId");

            migrationBuilder.RenameColumn(
                name: "IdUsuario",
                table: "Musicas",
                newName: "ComumId");

            migrationBuilder.CreateTable(
                name: "Administradores",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Nome = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administradores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Comuns",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    Nome = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comuns", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Playlists_ComumId",
                table: "Playlists",
                column: "ComumId");

            migrationBuilder.CreateIndex(
                name: "IX_Musicas_ComumId",
                table: "Musicas",
                column: "ComumId");

            migrationBuilder.AddForeignKey(
                name: "FK_Musicas_Comuns_ComumId",
                table: "Musicas",
                column: "ComumId",
                principalTable: "Comuns",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Playlists_Comuns_ComumId",
                table: "Playlists",
                column: "ComumId",
                principalTable: "Comuns",
                principalColumn: "Id");
        }
    }
}
