using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OSU_CS467_Software_Quiz.Models
{
  public class Questions
  {
    public int Id { get; set; }
    [Required]
    public string Question { get; set; }
    public QuestionType Type { get; set; }

    public ICollection<QuestionAnswers> QuestionAnswers { get; set; }
    public ICollection<QuizQuestions> QuizQuestions { get; set; }
    public ICollection<QuizResults> QuizResults { get; set; }
  }
}
