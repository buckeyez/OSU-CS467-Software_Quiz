using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OSU_CS467_Software_Quiz.Repositories;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.Extensions.Options;

namespace OSU_CS467_Software_Quiz.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class QuestionTypesController : Controller
  {
    private readonly IOptions<ApiBehaviorOptions> _apiBehaviorOptions;
    private readonly IQuestionTypesRepo _questionTypesRepo;

    public QuestionTypesController([FromServices] IOptions<ApiBehaviorOptions> apiBehaviorOptions,
      IQuestionTypesRepo questionTypesRepo)
    {
      _apiBehaviorOptions = apiBehaviorOptions;
      _questionTypesRepo = questionTypesRepo;
    }

    [HttpPost("Add")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddTypeAsync([FromQuery][Required] string type)
    {
      if (ModelState.IsValid)
      {
        var result = await _questionTypesRepo.AddTypeAsync(type);
        if (result != null)
        {
          return CreatedAtAction(nameof(AddTypeAsync), type, result.Type);
        }
        else
        {
          ModelState.AddModelError("DbError", "Failed to add question type, reference console for more information.");
        }
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<List<string>> GetTypesAsync()
    {
      var types = await _questionTypesRepo.GetTypes();

      return types
        .Select(t => t.Type)
        .ToList();
    }

    [HttpPost("Delete")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> DeleteTypeAsync([FromQuery][Required] string type)
    {
      if (ModelState.IsValid)
      {
        await _questionTypesRepo.DeleteTypeAsync(type);
        return Ok();
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpPost("Update")]
    public async Task<IActionResult> UpdateTypeAsync([FromQuery][Required] string newType,
      [FromQuery][Required] string oldType)
    {
      if (ModelState.IsValid)
      {
        var result = await _questionTypesRepo.UpdateTypeAsync(newType, oldType);

        if (result != null)
        {
          return Ok(result.Type);
        }
        else
        {
          ModelState.AddModelError("DbUpdate Error",
            "Failed to update question type, reference console for more information.");
        }
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }
  }
}
