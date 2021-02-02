using OSU_CS467_Software_Quiz.Models;
using System.ComponentModel.DataAnnotations;

namespace OSU_CS467_Software_Quiz.Projections
{
  public class Answer
  {
    public int Id { get; set; }

    [Required]
    public string Value { get; set; }

    [Required]
    public bool Correct { get; set; }

    public static Answer Build(Answers answer)
    {
      return new()
      {
        Id = answer.Id,
        Correct = answer.Correct,
        Value = answer.Answer,
      };
    }
  }
}
