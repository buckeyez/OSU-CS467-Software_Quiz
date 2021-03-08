using OSU_CS467_Software_Quiz.Models;
using System.Linq;

namespace OSU_CS467_Software_Quiz.Projections
{
  public class Quiz
  {
    public int Id { get; set; }

    public string Name { get; set; }
    public bool IsAssigned { get; set; }

    public static Quiz Build(Quizzes quiz)
    {
      return new()
      {
        Id = quiz.Id,
        Name = quiz.Name,
        IsAssigned = quiz.QuizAssignments
          ?.Where(qa => qa.QuizId == quiz.Id)
          .Any() ?? false,
      };
    }
  }
}
