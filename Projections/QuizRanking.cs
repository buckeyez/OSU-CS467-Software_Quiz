using OSU_CS467_Software_Quiz.Models;

namespace OSU_CS467_Software_Quiz.Projections
{
  public class QuizRanking
  {
    public User User { get; set; }
    public int Grade { get; set; }
    public string AssignmentKey { get; set; }

    public static QuizRanking Build(QuizAssignments quizAssignment)
    {
      return new()
      {
        User = User.Build(quizAssignment.User),
        Grade = quizAssignment.Grade,
        AssignmentKey = quizAssignment.Key.ToString(),
      };
    }
  }
}
