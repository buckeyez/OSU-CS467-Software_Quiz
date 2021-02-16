using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using OSU_CS467_Software_Quiz.Domain;
using OSU_CS467_Software_Quiz.Services;
using System;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class MailController : Controller
  {
    private readonly IOptions<ApiBehaviorOptions> _apiBehaviorOptions;
    private readonly IMailService _mailService;

    public MailController([FromServices] IOptions<ApiBehaviorOptions> apiBehaviorOptions, IMailService mailService)
    {
      _apiBehaviorOptions = apiBehaviorOptions;
      _mailService = mailService;
    }

    [HttpPost("SendAssignment")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> SendQuizAssignmentAsync()
    {
      MailRequest mail = new()
      {
        Body = "Hello World!",
        Subject = "Test Email From Software Quiz",
        ToEmail = "masonx88@gmail.com"
      };

      try
      {
        await _mailService.SendEmailAsync(mail);
        return Ok();
      }
      catch (Exception e)
      {
        ModelState.AddModelError(e.Source, e.Message);
      }

      return _apiBehaviorOptions.Value.InvalidModelStateResponseFactory(ControllerContext);
    }
  }
}
