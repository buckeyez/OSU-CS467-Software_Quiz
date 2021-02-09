using OSU_CS467_Software_Quiz.Models;

namespace OSU_CS467_Software_Quiz.Projections
{
  public class Quiz
  {
    public int Id { get; set; }

    public string Name { get; set; }

    public static Quiz Build(Quizzes quiz)
    {
      return new()
      {
        Id = quiz.Id,
        Name = quiz.Name,
      };
    }
  }
}
