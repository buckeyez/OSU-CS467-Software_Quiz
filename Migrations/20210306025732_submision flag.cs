using Microsoft.EntityFrameworkCore.Migrations;

namespace OSU_CS467_Software_Quiz.Migrations
{
    public partial class submisionflag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Submitted",
                table: "QuizAssignments",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Submitted",
                table: "QuizAssignments");
        }
    }
}
