using OSU_CS467_Software_Quiz.Models;

namespace OSU_CS467_Software_Quiz.Projections
{
  public class QuizAssignment
  {
    public int Id { get; set; }

    public Quiz Quiz { get; set; }

    public User User { get; set; }

    public int TimeAllotment { get; set; }

    public static QuizAssignment Build(QuizAssignments quizAssignment)
    {
      return new()
      {
        Id = quizAssignment.Id,
        Quiz = Quiz.Build(quizAssignment.Quiz),
        TimeAllotment = quizAssignment.TimeAllotment,
        User = User.Build(quizAssignment.User),
      };
    }
  }
}
