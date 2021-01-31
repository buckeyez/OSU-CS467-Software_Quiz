using System.ComponentModel.DataAnnotations;

namespace OSU_CS467_Software_Quiz.Models
{
  public class QuestionType
  {
    public int Id { get; set; }
    
    [Required]
    public string Type { get; set; }
  }
}
