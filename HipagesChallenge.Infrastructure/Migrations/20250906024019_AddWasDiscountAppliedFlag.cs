using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HipagesChallenge.Infrastructure.Migrations
{
    public partial class AddWasDiscountAppliedFlag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "WasDiscountApplied",
                table: "Leads",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WasDiscountApplied",
                table: "Leads");
        }
    }
}
