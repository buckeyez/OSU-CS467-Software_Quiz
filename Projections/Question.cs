using OSU_CS467_Software_Quiz.Models;
using System.ComponentModel.DataAnnotations;

namespace OSU_CS467_Software_Quiz.Projections
{
  public class Question
  {
    public int Id { get; set; }

    [Required]
    public string Value { get; set; }

    [Required]
    public string Type { get; set; }

    public static Question Build(Questions question)
    {
      return new()
      {
        Id = question.Id,
        Type = question.Type.Type,
        Value = question.Question,
      };
    }
  }
}
