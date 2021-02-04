using OSU_CS467_Software_Quiz.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Repositories
{
  public interface IQuestionTypesRepo
  {
    Task<QuestionType> AddTypeAsync(string type);
    Task DeleteTypeAsync(string type);
    Task<List<QuestionType>> GetTypes();
    Task<QuestionType> UpdateTypeAsync(string newType, string oldType);
  }
}
