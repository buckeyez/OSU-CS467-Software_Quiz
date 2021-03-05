using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace OSU_CS467_Software_Quiz.Data
{
  public static class SeedData
  {
    public const string Admin = "Administrator";
    public const string Candidate = "Candidate";
    public const string MultipleChoice = "Multiple Choice";
    public const string SelectAll = "Select All That Apply";
    public const string TF = "True or False";
    public const string FreeResponse = "Free Response";

    public static void InitializeDb(IServiceProvider serviceProvider)
    {
      using var context = new AppDbContext(serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>());

      if (!context.QuestionType.Any())
      {
        context.QuestionType.Add(new() { Type = MultipleChoice });
        context.QuestionType.Add(new() { Type = SelectAll });
        context.QuestionType.Add(new() { Type = TF });
        context.QuestionType.Add(new() { Type = FreeResponse });
      }

      context.SaveChanges();
    }

    public static void InitializeRoles(RoleManager<IdentityRole> roleManager)
    {
      if (!roleManager.RoleExistsAsync(Admin).Result)
      {
        IdentityRole newRole = new(Admin);
        roleManager.CreateAsync(newRole).Wait();
      }

      if (!roleManager.RoleExistsAsync(Candidate).Result)
      {
        IdentityRole newRole = new(Candidate);
        roleManager.CreateAsync(newRole).Wait();
      }
    }
  }
}
