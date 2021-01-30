using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using System.Linq;

namespace OSU_CS467_Software_Quiz.Extensions
{
  public static class ModelStateExtensions
  {
    public static void AppendErrors(this ModelStateDictionary modelState, string errorCategory, IdentityResult result)
    {
      foreach (var error in result.Errors)
      {
        modelState.AddModelError(errorCategory, error.Description);
      }
    }
  }
}
