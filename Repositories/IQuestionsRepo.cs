using OSU_CS467_Software_Quiz.Models;
using OSU_CS467_Software_Quiz.Projections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Repositories
{
  public interface IQuestionsRepo
  {
    Task<Questions> AddQuestionAsync(QuestionAndAnswers newQuestion);
    Task DeleteQuestionAsync(int id);
    Task<List<Answers>> GetQuestionAnswersAsync(int id);
    Task<Questions> GetQuestion(int id);
    Task<List<Questions>> GetQuestions();
    Task<Questions> UpdateQuestionAsync(int id, Question updatedQuestion);
  }
}
