using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OSU_CS467_Software_Quiz.Extensions;
using OSU_CS467_Software_Quiz.Models;
using OSU_CS467_Software_Quiz.Projections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class RolesController : Controller
  {
    private readonly IOptions<ApiBehaviorOptions> _apiBehaviorOptions;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<AppUser> _userManager;

    public RolesController([FromServices] IOptions<ApiBehaviorOptions> apiBehaviorOptions,
      RoleManager<IdentityRole> roleManager, UserManager<AppUser> userManager)
    {
      _apiBehaviorOptions = apiBehaviorOptions;
      _roleManager = roleManager;
      _userManager = userManager;
    }

    [HttpPost("Add")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddAsync([FromQuery][Required] string name)
    {
      if (ModelState.IsValid)
      {
        IdentityRole newRole = new(name);
        IdentityResult result = await _roleManager.CreateAsync(newRole);
        if (result.Succeeded)
        {
          return CreatedAtAction(nameof(GetRoleAsync), name, new Role
          {
            Name = newRole.Name,
            Id = newRole.Id,
          });
        }
        else
        {
          ModelState.AppendErrors("Role Manager", result);
        }
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpPost("Delete")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> DeleteAsync([FromQuery][Required] string id)
    {
      IdentityRole role = await _roleManager.FindByIdAsync(id);
      if (role != null)
      {
        IdentityResult result = await _roleManager.DeleteAsync(role);
        if (result.Succeeded)
        {
          return Ok();
        }
        else
        {
          ModelState.AppendErrors("Role Manager", result);
        }
      }
      else
      {
        ModelState.AddModelError("Role Manager", $"Role ({id}) not found");
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpGet("{name}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Role>> GetRoleAsync(string name)
    {
      IdentityRole role = await _roleManager.FindByNameAsync(name);
      if (role != null)
      {
        return new Role
        {
          Id = role.Id,
          Name = role.Name
        };
      }

      return NotFound(name);
    }

    [HttpGet]
    public IEnumerable<Role> GetRoles()
    {
      return _roleManager.Roles
        .Select(r => new Role
        {
          Id = r.Id,
          Name = r.Name
        });
    }

    [HttpGet("{id}/Edit")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<RoleEdit>> GetRoleEditAsync(string id)
    {
      IdentityRole role = await _roleManager.FindByIdAsync(id);
      List<AppUser> usersInRole = new();
      List<AppUser> usersNotInRole = new();

      if (role != null)
      {
        foreach (AppUser user in _userManager.Users.ToList())
        {
          var list = await _userManager.IsInRoleAsync(user, role.Name) ? usersInRole : usersNotInRole;
          list.Add(user);
        }
      }
      else
      {
        return NotFound(id);
      }

      return new RoleEdit
      {
        Id = role.Id,
        Name = role.Name,
        Members = usersInRole.Select(u => Projections.User.Build(u)),
        NonMembers = usersNotInRole.Select(u => Projections.User.Build(u)),
      };
    }

    [HttpPost("Update")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateRoleAsync(RoleModification model)
    {
      if (ModelState.IsValid)
      {
        IdentityResult result;

        foreach (string userId in model.AddIds ?? new())
        {
          AppUser user = await _userManager.FindByIdAsync(userId);
          if (user != null)
          {
            result = await _userManager.AddToRoleAsync(user, model.Name);
            if (!result.Succeeded)
            {
              ModelState.AppendErrors("User Manager", result);
            }
          }
        }

        foreach (string userId in model.DeleteIds ?? new())
        {
          AppUser user = await _userManager.FindByIdAsync(userId);
          if (user != null)
          {
            result = await _userManager.RemoveFromRoleAsync(user, model.Name);
            if (!result.Succeeded)
            {
              ModelState.AppendErrors("User Manager", result);
            }
          }
        }

        if (ModelState.IsValid)
        {
          return Ok();
        }
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }
  }
}
