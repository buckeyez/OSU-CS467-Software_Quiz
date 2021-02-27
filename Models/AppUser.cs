using Microsoft.AspNetCore.Identity;
using OSU_CS467_Software_Quiz.Projections;
using System.Collections.Generic;

namespace OSU_CS467_Software_Quiz.Models
{
  public class AppUser : IdentityUser
  {
    [ProtectedPersonalData]
    public string FirstName { get; set; }

    [ProtectedPersonalData]
    public string LastName { get; set; }

    public ICollection<QuizAssignments> QuizAssignments { get; set; }

    public static AppUser Build(NewUser user)
    {
      return new()
      {
        UserName = user.Name,
        Email = user.Email,
        FirstName = user.FirstName,
        LastName = user.LastName,
      };
    }
  }
}
