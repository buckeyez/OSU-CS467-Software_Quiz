using Microsoft.EntityFrameworkCore.Migrations;

namespace OSU_CS467_Software_Quiz.Migrations
{
    public partial class gradetoassignment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Grade",
                table: "QuizAssignments",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Grade",
                table: "QuizAssignments");
        }
    }
}
