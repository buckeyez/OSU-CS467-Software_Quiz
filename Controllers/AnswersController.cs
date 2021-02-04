using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OSU_CS467_Software_Quiz.Projections;
using OSU_CS467_Software_Quiz.Repositories;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class AnswersController : Controller
  {
    private readonly IOptions<ApiBehaviorOptions> _apiBehaviorOptions;
    private readonly IAnswersRepo _answersRepo;

    public AnswersController(IOptions<ApiBehaviorOptions> apiBehaviorOptions, IAnswersRepo answersRepo)
    {
      _apiBehaviorOptions = apiBehaviorOptions;
      _answersRepo = answersRepo;
    }

    [HttpPost("Delete")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> DeleteAnswerAsync([FromQuery][Required] int id)
    {
      if (ModelState.IsValid)
      {
        await _answersRepo.DeleteAnswerAsync(id);
        return Ok();
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpPost("Update")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateAnswerAsync([FromQuery][Required] int id, [FromBody] Answer answer)
    {
      if (ModelState.IsValid)
      {
        var result = await _answersRepo.UpdateAnswerAsync(id, answer);

        if (result != null)
        {
          return Ok(Answer.Build(result));
        }
        else
        {
          ModelState.AddModelError("DbUpdate Error",
            "Failed to update answer, reference console for more information.");
        }
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }
  }
}
