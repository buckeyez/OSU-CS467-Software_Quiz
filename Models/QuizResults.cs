namespace OSU_CS467_Software_Quiz.Models
{
  public class QuizResults
  {
    public int Id { get; set; }
    public string FreeResponse { get; set; }
    
    public int QuizAssignmentId { get; set; }
    public QuizAssignments QuizAssignment { get; set; }
    public int QuestionId { get; set; }
    public Questions Question { get; set; }
    public int? AnswerId { get; set; }
    public Answers? Answer { get; set; }
  }
}
