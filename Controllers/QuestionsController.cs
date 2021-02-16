using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OSU_CS467_Software_Quiz.Models;
using OSU_CS467_Software_Quiz.Projections;
using OSU_CS467_Software_Quiz.Repositories;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class QuestionsController : Controller
  {
    private readonly IOptions<ApiBehaviorOptions> _apiBehaviorOptions;
    private readonly IQuestionsRepo _questionsRepo;

    public QuestionsController([FromServices] IOptions<ApiBehaviorOptions> apiBehaviorOptions,
      IQuestionsRepo questionsRepo)
    {
      _apiBehaviorOptions = apiBehaviorOptions;
      _questionsRepo = questionsRepo;
    }

    [HttpPost("Add")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddAsync([FromBody] QuestionAndAnswers model)
    {
      if (ModelState.IsValid)
      {
        var question = await _questionsRepo.AddQuestionAsync(model);

        if (question != null)
        {
          return CreatedAtAction(nameof(GetQuestionAndAnswersAsync), question.Id, QuestionAndAnswers.Build(question));
        }

        ModelState.AddModelError("DbError", "Failed to add question, reference console for more information.");
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpGet("{id}/Entire")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetQuestionAndAnswersAsync(int id)
    {
      var question = await _questionsRepo.GetQuestion(id);
      var answers = await _questionsRepo.GetQuestionAnswersAsync(id);

      if (question != null)
      {
        return Ok(QuestionAndAnswers.Build(question, answers));
      }
      else
      {
        ModelState.AddModelError("DbQuery Error", $"Question ({id}) is not found.");
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<List<Question>> GetQuestions()
    {
      var questions = await _questionsRepo.GetQuestions();
      return questions.Select(q => Question.Build(q)).ToList();
    }

    [HttpPost("Delete")]
    public async Task DeleteAsync([FromQuery][Required] int id) => await _questionsRepo.DeleteQuestionAsync(id);

    [HttpPost("Update")]
    [ProducesResponseType(StatusCodes.Status302Found)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateQuestion([FromQuery][Required] int id, [FromBody] QuestionAndAnswers model)
    {
      Questions toReturn = null;

      if (ModelState.IsValid)
      {
        toReturn = await _questionsRepo.UpdateQuestionAsync(id, model);
      }

      if (toReturn != null)
      {
        return Ok(Question.Build(toReturn));
      }
      else
      {
        ModelState.AddModelError("DbUpdate Error", "Failed to update question, reference console for more information.");
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }
  }
}
