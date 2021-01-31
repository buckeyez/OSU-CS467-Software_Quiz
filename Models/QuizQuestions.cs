namespace OSU_CS467_Software_Quiz.Models
{
  public class QuizQuestions
  {
    public int QuizId { get; set; }
    public Quizzes Quiz { get; set; }
    public int QuestionId { get; set; }
    public Questions Question { get; set; }
  }
}
