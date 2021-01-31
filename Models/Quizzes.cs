using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OSU_CS467_Software_Quiz.Models
{
  public class Quizzes
  {
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }

    public ICollection<QuizAssignments> QuizAssignments { get; set; }
    public ICollection<QuizQuestions> QuizQuestions { get; set; }
  }
}
