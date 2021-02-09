using OSU_CS467_Software_Quiz.Models;
using System.Collections.Generic;
using System.Linq;

namespace OSU_CS467_Software_Quiz.Projections
{
  public class QuizFull : Quiz
  {
    public List<QuestionAndAnswers> Questions { get; set; }

    public static QuizFull Build(Quizzes quiz, bool partial)
    {
      List<QuestionAndAnswers> toReturn;

      if (partial)
      {
        toReturn = quiz.QuizQuestions
          .Select(qq => QuestionAndAnswers.Build(qq.Question))
          .ToList();
      }
      else
      {
        toReturn = quiz.QuizQuestions
          .Select(qq => QuestionAndAnswers
            .Build(qq.Question, qq.Question.QuestionAnswers
              .Select(qa => qa.Answer)
              .ToList()))
          .ToList();
      }

      return new()
      {
        Id = quiz.Id,
        Name = quiz.Name,
        Questions = toReturn,
      };
    }
  }
}
