using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OSU_CS467_Software_Quiz.Models
{
  public class AppUser : IdentityUser
  {
    [ProtectedPersonalData]
    public string FirstName { get; set; }

    [ProtectedPersonalData]
    public string LastName { get; set; }

    public ICollection<QuizAssignments> QuizAssignments { get; set; }
  }
}
