using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OSU_CS467_Software_Quiz.Extensions;
using OSU_CS467_Software_Quiz.Models;
using OSU_CS467_Software_Quiz.Projections;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class UsersController : Controller
  {
    private readonly IOptions<ApiBehaviorOptions> _apiBehaviorOptions;
    private readonly UserManager<AppUser> _userManager;
    private readonly IPasswordHasher<AppUser> _passwordHasher;
    private readonly IPasswordValidator<AppUser> _passwordValidator;
    private readonly SignInManager<AppUser> _signInManager;

    public UsersController([FromServices] IOptions<ApiBehaviorOptions> apiBehaviorOptions,
      UserManager<AppUser> userManager, IPasswordHasher<AppUser> passwordHasher,
      IPasswordValidator<AppUser> passwordValidator, SignInManager<AppUser> signInManager)
    {
      _apiBehaviorOptions = apiBehaviorOptions;
      _userManager = userManager;
      _passwordHasher = passwordHasher;
      _passwordValidator = passwordValidator;
      _signInManager = signInManager;
    }

    [HttpPost("Add")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddAsync([FromBody] NewUser user)
    {
      if (ModelState.IsValid)
      {
        var appUser = AppUser.Build(user);

        IdentityResult result = await _userManager.CreateAsync(appUser, user?.Password ?? string.Empty);
        if (result.Succeeded)
        {
          var newUser = await _userManager.FindByEmailAsync(user.Email);
          return CreatedAtAction(nameof(AddAsync), user, Projections.User.Build(newUser));
        }
        else
        {
          ModelState.AppendErrors("User Manager", result);
        }
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpPost("AddPasswordless")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddPasswordlessAsync([FromBody] NewUser user)
    {
      if (ModelState.IsValid)
      {
        var appUser = AppUser.Build(user);

        IdentityResult result = await _userManager.CreateAsync(appUser);
        if (result.Succeeded)
        {
          var newUser = await _userManager.FindByEmailAsync(user.Email);
          return CreatedAtAction(nameof(AddPasswordlessAsync), user, Projections.User.Build(newUser));
        }

        ModelState.AppendErrors("User Manager", result);
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpPost("Delete")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteAsync([FromQuery][Required] string id)
    {
      AppUser user = await _userManager.FindByIdAsync(id);
      if (user != null)
      {
        IdentityResult result = await _userManager.DeleteAsync(user);
        if (result.Succeeded)
        {
          return Ok();
        }
        else
        {
          ModelState.AppendErrors("User Manager", result);
          return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
        }
      }

      return NotFound(id);
    }

    [HttpPost("SignIn")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> SignInAsync([FromBody] Login login)
    {
      if (ModelState.IsValid)
      {
        AppUser user = await _userManager.FindByEmailAsync(login.Email);
        if (user != null)
        {
          await _signInManager.SignOutAsync();

          Microsoft.AspNetCore.Identity.SignInResult result =
            await _signInManager.PasswordSignInAsync(user, login.Password, false, false);

          if (result.Succeeded)
          {
            return Ok(Projections.User.Build(user));
          }
        }

        ModelState.AddModelError("SignIn Manager", "Login failed: Invalid email or password!");
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<User>> GetUserAsync(string id)
    {
      AppUser user = await _userManager.FindByIdAsync(id);
      if (user != null)
      {
        return Projections.User.Build(user);
      }

      return NotFound(id);
    }

    [HttpGet]
    public IEnumerable<User> GetUsers()
    {
      return _userManager.Users.Select(u => Projections.User.Build(u));
    }

    [HttpPost("Update")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateUserAsync([FromBody] User user)
    {
      if (ModelState.IsValid)
      {
        AppUser appUser = await _userManager.FindByIdAsync(user.Id);
        if (user == null)
        {
          return NotFound(user);
        }

        appUser.UserName = user.Name;
        appUser.Email = user.Email;
        appUser.FirstName = user.FirstName;
        appUser.LastName = user.LastName;

        IdentityResult result = await _userManager.UpdateAsync(appUser);
        if (result.Succeeded)
        {
          return Ok(user);
        }
        else
        {
          ModelState.AppendErrors("User Manager", result);
        }

      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpPost("UpdatePassword")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateUserPassword([FromQuery][Required] string id,
      [FromQuery][Required] string password)
    {
      AppUser appUser = await _userManager.FindByIdAsync(id);
      if (appUser == null)
      {
        return NotFound(id);
      }

      IdentityResult validPassword = await _passwordValidator.ValidateAsync(_userManager, appUser, password);
      if (validPassword.Succeeded)
      {
        appUser.PasswordHash = _passwordHasher.HashPassword(appUser, password);

        IdentityResult result = await _userManager.UpdateAsync(appUser);
        if (result.Succeeded)
        {
          return Ok();
        }
        else
        {
          ModelState.AppendErrors("User Manager", result);
        }
      }
      else
      {
        ModelState.AppendErrors("Password", validPassword);
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }
  }
}
