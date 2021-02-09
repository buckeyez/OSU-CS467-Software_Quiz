using OSU_CS467_Software_Quiz.Models;
using System.ComponentModel.DataAnnotations;

namespace OSU_CS467_Software_Quiz.Projections
{
  public class QuizAssignmentNew
  {
    public int Id { get; set; }

    [Required]
    public int QuizId { get; set; }

    [Required]
    public string UserId { get; set; }

    [Required]
    public int TimeAllotment { get; set; }

    public static QuizAssignmentNew Build(QuizAssignments quizAssignment)
    {
      return new()
      {
        Id = quizAssignment.Id,
        QuizId = quizAssignment.QuizId,
        TimeAllotment = quizAssignment.TimeAllotment,
        UserId = quizAssignment.UserId,
      };
    }
  }
}
