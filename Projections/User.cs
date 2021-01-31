using OSU_CS467_Software_Quiz.Models;
using System.ComponentModel.DataAnnotations;

namespace OSU_CS467_Software_Quiz.Projections
{
  public class User
  {
    [Required]
    public string Name { get; set; }

    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }

    public static User BuildUser(AppUser user)
    {
      return new User
      {
        Name = user.UserName,
        FirstName = user.FirstName,
        LastName = user.LastName,
        Email = user.Email,
      };
    }
  }
}
