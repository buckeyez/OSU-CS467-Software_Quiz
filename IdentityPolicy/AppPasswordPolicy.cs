using Microsoft.AspNetCore.Identity;
using OSU_CS467_Software_Quiz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.IdentityPolicy
{
  public class AppPasswordPolicy : PasswordValidator<AppUser>
  {
    public override async Task<IdentityResult> ValidateAsync(UserManager<AppUser> manager, AppUser user,
      string password)
    {
      IdentityResult result = await base.ValidateAsync(manager, user, password);
      List<IdentityError> errors = result.Succeeded ? new() : result.Errors.ToList();

      if (password.Contains(user.UserName, StringComparison.OrdinalIgnoreCase))
      {
        errors.Add(new()
        {
          Description = "Password cannot contain username."
        });
      }

      return errors.Count == 0 ? IdentityResult.Success : IdentityResult.Failed(errors.ToArray());
    }
  }
}
