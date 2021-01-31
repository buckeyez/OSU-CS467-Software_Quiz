namespace OSU_CS467_Software_Quiz.Models
{
  public class QuestionAnswers
  {
    public int QuestionId { get; set; }
    public Questions Question { get; set; }
    public int AnswerId { get; set; }
    public Answers Answer { get; set; }
  }
}
