using OSU_CS467_Software_Quiz.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace OSU_CS467_Software_Quiz.Projections
{
  public class QuestionAndAnswers
  {
    [Required]
    public Question Question { get; set; }

    [Required]
    public List<Answer> Answers { get; set; }

    public static QuestionAndAnswers Build(Questions question)
    {
      return new()
      {
        Question = Question.Build(question),
        Answers = question.QuestionAnswers?.Select(qa => Answer.Build(qa.Answer)).ToList() ?? new(),
      };
    }

    public static QuestionAndAnswers Build(Questions question, List<Answers> answers)
    {
      return new()
      {
        Question = Question.Build(question),
        Answers = answers.Select(a => Answer.Build(a)).ToList(),
      };
    }
  }
}
