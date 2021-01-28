using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OSU_CS467_Software_Quiz.Models;
using OSU_CS467_Software_Quiz.Projections;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class UserController : Controller
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly IUserValidator<AppUser> _userValidator;
    private readonly IPasswordHasher<AppUser> _passwordHasher;
    private readonly IPasswordValidator<AppUser> _passwordValidator;

    public UserController(UserManager<AppUser> userManager, IUserValidator<AppUser> userValidator,
      IPasswordHasher<AppUser> passwordHasher, IPasswordValidator<AppUser> passwordValidator)
    {
      _userManager = userManager;
      _userValidator = userValidator;
      _passwordHasher = passwordHasher;
      _passwordValidator = passwordValidator;
    }

    [HttpPost("add")]
    public async Task<IActionResult> Add(User user)
    {
      if (ModelState.IsValid)
      {
        AppUser appUser = new()
        {
          UserName = user.Name,
          Email = user.Email,
          FirstName = user.FirstName,
          LastName = user.LastName,
        };

        IdentityResult result = await _userManager.CreateAsync(appUser, user.Password);
        if (result.Succeeded)
        {
          return CreatedAtAction(nameof(GetUserAsync), appUser.Id, user);
        }
      }

      return BadRequest(user);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserAsync(string id)
    {
      AppUser user = await _userManager.FindByIdAsync(id);
      if (user != null)
      {
        return Ok(new User()
        {
          Name = user.UserName,
          FirstName = user.FirstName,
          LastName = user.LastName,
          Email = user.Email,
        });
      }

      return NotFound(id);
    }

    private void Errors(IdentityResult result)
    {
      foreach (var error in result.Errors)
      {
        ModelState.AddModelError("", error.Description);
      }
    }
  }
}
