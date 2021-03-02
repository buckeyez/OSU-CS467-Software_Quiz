using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OSU_CS467_Software_Quiz.Projections
{
  public class AnswerSubmission
  {
    [Required]
    public int QuestionId { get; set; }

    public List<int> AnswerIds { get; set; }

    public string FreeResponse { get; set; }
  }

  public class QuizSubmission
  {
    [Required]
    public int QuizAssignmentId { get; set; }

    [Required]
    public int TimeTaken { get; set; }

    [Required]
    public List<AnswerSubmission> UserSelections { get; set; }
  }
}
