using OSU_CS467_Software_Quiz.Data;
using OSU_CS467_Software_Quiz.Models;
using System.Collections.Generic;
using System.Linq;

namespace OSU_CS467_Software_Quiz.Projections
{
  public class QuestionResult
  {
    public Question Question { get; set; }
    public List<Answer> Answers { get; set; }
    public List<Answer> UserSelection { get; set; }
    public string FreeResponse { get; set; }

    public static QuestionResult Build(Questions question, List<Answers> userSelection)
    {
      return new()
      {
        Question = Question.Build(question),
        Answers = question.QuestionAnswers.Select(qa => Answer.Build(qa.Answer)).ToList(),
        UserSelection = userSelection.Select(a => Answer.Build(a)).ToList(),
      };
    }

    public static QuestionResult Build(Questions question, string response)
    {
      return new()
      {
        Question = Question.Build(question),
        Answers = question.QuestionAnswers.Select(qa => Answer.Build(qa.Answer)).ToList(),
        FreeResponse = response,
      };
    }
  }

  public class QuizResults
  {
    public User User { get; set; }
    public int Grade { get; set; }
    public List<QuestionResult> QuestionResults { get; set; }

    public static QuizResults Build(QuizAssignments quizAssignment)
    {
      List<QuestionResult> results = new();
      var questions = quizAssignment.Quiz.QuizQuestions.Select(qq => qq.Question).ToList();
      var responses = quizAssignment.QuizResults.Where(qr => qr.Answer != null).Select(qr => qr.Answer).ToList();

      foreach (var q in questions)
      {
        if (q.Type.Type != SeedData.FreeResponse)
        {
          results.Add(QuestionResult.Build(
            q,
            responses
              .Where(r => q.QuestionAnswers
              .Any(qa => qa.AnswerId == r.Id))
              .ToList()
          ));
        }
        else
        {
          results.Add(QuestionResult.Build(
            q,
            quizAssignment.QuizResults
              .Where(qr => qr.QuestionId == q.Id)
              .Select(qr => qr.FreeResponse)
              .First()
          ));
        }
      }

      return new()
      {
        User = User.Build(quizAssignment.User),
        Grade = quizAssignment.Grade,
        QuestionResults = results,
      };
    }
  }
}
