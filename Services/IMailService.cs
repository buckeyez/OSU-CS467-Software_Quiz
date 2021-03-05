using OSU_CS467_Software_Quiz.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Services
{
  public interface IMailService
  {
    Task SendQuizAssignmentAsync(QuizAssignments quizAssignment);
    Task<List<Task>> SendQuizResultsAsync(QuizAssignments quizAssignment);
  }
}
