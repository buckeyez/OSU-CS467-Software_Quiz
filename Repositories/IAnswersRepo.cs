using OSU_CS467_Software_Quiz.Models;
using OSU_CS467_Software_Quiz.Projections;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Repositories
{
  public interface IAnswersRepo
  {
    Task DeleteAnswerAsync(int id);
    Task<Answers> UpdateAnswerAsync(int id, Answer answer);
  }
}
