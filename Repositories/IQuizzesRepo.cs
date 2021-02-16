using OSU_CS467_Software_Quiz.Models;
using OSU_CS467_Software_Quiz.Projections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Repositories
{
  public interface IQuizzesRepo
  {
    Task<Quizzes> AddQuizAsync(string name);
    Task<QuizAssignments> AssignQuizAsync(QuizAssignmentNew quizAssignment);
    Task DeleteQuizAsync(int id);
    Task<List<Quizzes>> GetQuizzes();
    Task<Quizzes> GetQuiz(int id, bool partial);
    Task<List<QuizAssignments>> GetQuizAssignments();
    Task<List<Quizzes>> GetQuizAssignmentsForUser(string userId);
    Task<List<AppUser>> GetUsersAssignedToQuiz(int id);
    Task RemoveQuizAssignmentAsync(int id);
    Task<QuizAssignments> SubmitQuizAsync(QuizSubmission quizSubmission);
    Task<QuizAssignments> UpdateQuizAssignmentAsync(QuizAssignmentNew quizAssignment);
    Task<Quizzes> UpdateQuizQuestionsAsync(int id, QuizUpdates entityUpdates);
    Task<Quizzes> UpdateQuizNameAsync(int id, string name);
  }
}
