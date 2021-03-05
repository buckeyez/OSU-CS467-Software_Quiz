using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
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
  public class QuizzesController : Controller
  {
    private readonly IOptions<ApiBehaviorOptions> _apiBehaviorOptions;
    private readonly IQuizzesRepo _quizRepo;

    public QuizzesController(IOptions<ApiBehaviorOptions> apiBehaviorOptions, IQuizzesRepo quizRepo)
    {
      _apiBehaviorOptions = apiBehaviorOptions;
      _quizRepo = quizRepo;
    }

    [HttpPost("Add")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddAsync([FromQuery] string name)
    {
      if (ModelState.IsValid)
      {
        var quiz = await _quizRepo.AddQuizAsync(name);

        if (quiz != null)
        {
          return CreatedAtAction(nameof(AddAsync), name, Quiz.Build(quiz));
        }

        ModelState.AddModelError("DbError", "Failed to add quiz, reference console for more information.");
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpPost("Assign")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AssignAsync([FromBody] QuizAssignmentNew quizAssignment)
    {
      if (ModelState.IsValid)
      {
        var qa = await _quizRepo.AssignQuizAsync(quizAssignment);

        if (qa != null)
        {
          return CreatedAtAction(nameof(AssignAsync), quizAssignment, QuizAssignmentNew.Build(qa));
        }

        ModelState.AddModelError("DbError", "Failed to add quiz assignment, reference console for more information.");
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpPost("Delete")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> DeleteQuizAsync([FromQuery] int id)
    {
      if (ModelState.IsValid)
      {
        await _quizRepo.DeleteQuizAsync(id);
        return Ok();
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<List<Quiz>> GetQuizzesAsync()
    {
      return (await _quizRepo.GetQuizzes())
        .Select(q => Quiz.Build(q))
        .ToList();
    }

    [HttpGet("{id}/{partial}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetQuizAsync(int id, bool partial)
    {
      if (ModelState.IsValid)
      {
        var quiz = await _quizRepo.GetQuiz(id, partial);

        if (quiz != null)
        {
          return Ok(QuizFull.Build(quiz, partial));
        }

        ModelState.AddModelError("Quizzes", $"Quiz {id} could not be found.");
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpGet("Assignment/{key}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetQuizAssignment(string key)
    {
      if (ModelState.IsValid)
      {
        var qa = await _quizRepo.GetQuizAssignment(key);

        if (qa != null)
        {
          return Ok(QuizAssignment.Build(qa));
        }

        ModelState.AddModelError("Quizzes", $"Quiz assignment key ({key}) could not be found.");
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }
    
    [HttpGet("Results/{key}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetQuizAssignmentResultsAsync(string key)
    {
      if (ModelState.IsValid)
      {
        var qa = await _quizRepo.GetQuizAssignmentResultsAsync(key);

        if (qa != null)
        {
          return Ok(QuizResults.Build(qa));
        }

        ModelState.AddModelError("Quizzes", $"Quiz assignment key ({key}) could not be found.");
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpGet("Assignments")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<List<QuizAssignment>> GetQuizAssignmentsAsync()
    {
      return (await _quizRepo.GetQuizAssignments())
        .Select(qa => QuizAssignment.Build(qa))
        .ToList();
    }

    [HttpGet("User/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<List<Quiz>> GetQuizAssignmentsForUserAsync(string userId)
    {
      return (await _quizRepo.GetQuizAssignmentsForUser(userId))
        .Select(q => Quiz.Build(q))
        .ToList();
    }

    [HttpGet("{id}/Users")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<List<User>> GetUsersAssignedToQuiz(int id)
    {
      return (await _quizRepo.GetUsersAssignedToQuiz(id))
        .Select(u => Projections.User.Build(u))
        .ToList();
    }

    [HttpPost("Assignments/Delete")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RemoveQuizAssignmentAsync([FromQuery][Required] int quizAssignmentId)
    {
      if (ModelState.IsValid)
      {
        await _quizRepo.RemoveQuizAssignmentAsync(quizAssignmentId);
        return Ok();
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpPost("Submit")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> SubmitQuizAsync([FromBody] QuizSubmission quizSubmission)
    {
      if (ModelState.IsValid)
      {
        var qa = await _quizRepo.SubmitQuizAsync(quizSubmission);

        if (qa != null)
        {
          return Ok(QuizAssignment.Build(qa));
        }

        ModelState.AddModelError("Quizzes", $@"Quiz assignment ({
          quizSubmission.QuizAssignmentId
          }) could not be submitted, reference console for more information.");
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpPost("Assignments/Update")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateQuizAssignmentAsync([FromQuery][Required] int id,
      [FromBody] QuizAssignmentNew quizAssignment)
    {
      if(ModelState.IsValid)
      {
        quizAssignment.Id = id;
        var qa = await _quizRepo.UpdateQuizAssignmentAsync(quizAssignment);

        if (qa != null)
        {
          return Ok(QuizAssignmentNew.Build(qa));
        }

        ModelState.AddModelError("Quizzes", $"Quiz Assignment ({id}) could not be found or updated.");
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpPost("Update")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateQuizQuestionsAsync([FromQuery][Required] int id,
      [FromBody] QuizUpdates quizUpdates)
    {
      if (ModelState.IsValid)
      {
        var quiz = await _quizRepo.UpdateQuizQuestionsAsync(id, quizUpdates);

        if (quiz != null)
        {
          return Ok(QuizFull.Build(quiz, true));
        }

        ModelState.AddModelError("Quizzes", $"Quiz ({id}) could not be found or assigned questions could not be found.");
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }

    [HttpPost("Update/Name")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateQuizNameAsync([FromQuery][Required] int id, [FromQuery][Required] string name)
    {
      if(ModelState.IsValid)
      {
        var quiz = await _quizRepo.UpdateQuizNameAsync(id, name);

        if (quiz != null)
        {
          return Ok(Quiz.Build(quiz));
        }

        ModelState.AddModelError("Quizzes", $"Quiz ({id}) could not be found or update error occurred.");
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }
  }
}
