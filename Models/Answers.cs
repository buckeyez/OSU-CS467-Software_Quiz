using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OSU_CS467_Software_Quiz.Models
{
  public class Answers
  {
    public int Id { get; set; }
    [Required]
    public string Answer { get; set; }
    [Required]
    public bool Correct { get; set; }

    public ICollection<QuestionAnswers> QuestionAnswers { get; set; }
    public ICollection<QuizResults> QuizResults { get; set; }
  }
}
