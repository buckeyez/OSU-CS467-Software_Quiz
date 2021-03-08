using Microsoft.EntityFrameworkCore;
using OSU_CS467_Software_Quiz.Data;
using OSU_CS467_Software_Quiz.Models;
using OSU_CS467_Software_Quiz.Projections;
using OSU_CS467_Software_Quiz.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Repositories
{
  public class QuizzesRepo : IQuizzesRepo
  {
    private readonly AppDbContext _db;
    private readonly IMailService _mailService;

    public QuizzesRepo(AppDbContext db, IMailService mailService)
    {
      _db = db;
      _mailService = mailService;
    }

    public async Task<Quizzes> AddQuizAsync(string name)
    {
      var quizEntry = _db.Add<Quizzes>(new()
      {
        Name = name,
      });

      try
      {
        await _db.SaveChangesAsync();
      }
      catch (DbUpdateException e)
      {
        Console.WriteLine($"{e.Source}: {e.Message}");
        return null;
      }

      return quizEntry.Entity;
    }

    public async Task<QuizAssignments> AssignQuizAsync(QuizAssignmentNew quizAssignment)
    {
      var quizEntity = _db.Quizzes
        .AsQueryable()
        .Where(q => q.Id == quizAssignment.QuizId)
        .FirstOrDefault();

      var userEntity = _db.Users
        .AsQueryable()
        .Where(u => u.Id == quizAssignment.UserId)
        .FirstOrDefault();

      if (quizEntity == null || userEntity == null)
      {
        Console.WriteLine(
          $"QuizAssignment: Quiz ({quizAssignment.QuizId}) or User ({quizAssignment.UserId}) does not exist."
        );
        return null;
      }

      var assignmentExists = _db.QuizAssignments
        .AsQueryable()
        .Where(qa => qa.QuizId == quizEntity.Id && qa.User.Id == userEntity.Id)
        .FirstOrDefault();

      if (assignmentExists != null)
      {
        Console.WriteLine("Quiz Assignment Exists!");
        return null;
      }

      var quizAssignmentEntry = _db.QuizAssignments.Add(new()
      {
        Key = Guid.NewGuid(),
        Quiz = quizEntity,
        TimeAllotment = quizAssignment.TimeAllotment,
        User = userEntity,
      });

      try
      {
        await _db.SaveChangesAsync();
      }
      catch (DbUpdateException e)
      {
        Console.WriteLine($"{e.Source}: {e.Message}");
        return null;
      }

      try
      {
        await _mailService.SendQuizAssignmentAsync(quizAssignmentEntry.Entity);
      }
      catch (Exception e)
      {
        Console.WriteLine($"{e.Source}: {e.Message}");
        await RemoveQuizAssignmentAsync(quizAssignmentEntry.Entity.Id);
        return null;
      }

      return quizAssignmentEntry.Entity;
    }

    public async Task DeleteQuizAsync(int id)
    {
      var entity = _db.Quizzes
        .AsQueryable()
        .Where(q => q.Id == id)
        .FirstOrDefault();

      if (entity == null)
      {
        return;
      }

      _db.Quizzes.Remove(entity);

      try
      {
        await _db.SaveChangesAsync();
      }
      catch (DbUpdateException e)
      {
        Console.WriteLine($"{e.Source}: {e.Message}");
      }
    }

    public Task<Quizzes> GetQuiz(int id, bool partial)
    {
      if (partial)
      {
        return _db.Quizzes
          .AsQueryable()
          .Where(q => q.Id == id)
          .Include(qq => qq.QuizQuestions)
          .ThenInclude(qq => qq.Question)
          .ThenInclude(q => q.Type)
          .FirstOrDefaultAsync();
      }

      return _db.Quizzes
        .AsQueryable()
        .Where(q => q.Id == id)
        .Include(qq => qq.QuizQuestions)
        .ThenInclude(qq => qq.Question)
        .ThenInclude(q => q.Type)
        .Include(qq => qq.QuizQuestions)
        .ThenInclude(qq => qq.Question)
        .ThenInclude(q => q.QuestionAnswers)
        .ThenInclude(qa => qa.Answer)
        .FirstOrDefaultAsync();
    }

    public Task<List<Quizzes>> GetQuizzes()
    {
      return _db.Quizzes
        .Include(q => q.QuizAssignments)
        .ToListAsync();
    }

    public Task<QuizAssignments> GetQuizAssignment(string key)
    {
      return _db.QuizAssignments
        .AsQueryable()
        .Where(qa => qa.Key.ToString() == key)
        .Include(qa => qa.Quiz)
        .Include(qa => qa.User)
        .FirstOrDefaultAsync();
    }

    public async Task<QuizAssignments> GetQuizAssignmentResultsAsync(string key)
    {
      var toReturn = await _db.QuizAssignments
        .AsQueryable()
        .Where(qa => qa.Key.ToString() == key)
        .Include(qa => qa.Quiz)
          .ThenInclude(q => q.QuizQuestions)
          .ThenInclude(qq => qq.Question)
          .ThenInclude(q => q.QuestionAnswers)
          .ThenInclude(qa => qa.Answer)
        .FirstOrDefaultAsync();
      
      if (toReturn == null)
      {
        return null;
      }
      
      _db.Entry(toReturn).Reference(qa => qa.User).Load();

      foreach(var q in toReturn.Quiz.QuizQuestions.Select(qq => qq.Question))
      {
        _db.Entry(q).Reference(q => q.Type).Load();
      }

      _db.Entry(toReturn).Collection(qa => qa.QuizResults).Load();
      foreach (var qr in toReturn.QuizResults)
      {
        _db.Entry(qr).Reference(qr => qr.Answer).Load();
      }

      return toReturn;
    }

    public Task<List<QuizAssignments>> GetQuizAssignments()
    {
      return _db.QuizAssignments
        .Include(qa => qa.Quiz)
        .Include(qa => qa.User)
        .ToListAsync();
    }

    public Task<List<AppUser>> GetUsersAssignedToQuiz(int id)
    {
      return _db.QuizAssignments
        .AsQueryable()
        .Where(qa => qa.QuizId == id)
        .Include(u => u.User)
        .Select(qa => qa.User)
        .ToListAsync();
    }

    public Task<List<Quizzes>> GetQuizAssignmentsForUser(string userId)
    {
      return _db.QuizAssignments
        .AsQueryable()
        .Where(qa => qa.UserId == userId)
        .Include(q => q.Quiz)
        .Select(qa => qa.Quiz)
        .ToListAsync();
    }

    public Task<List<QuizAssignments>> GetQuizRankings()
    {
      return _db.QuizAssignments
        .Include(qa => qa.User)
        .Include(qa => qa.Quiz)
        .OrderByDescending(qa => qa.Grade)
        .ToListAsync();
    }

    public async Task RemoveQuizAssignmentAsync(int id)
    {
      var entity = _db.QuizAssignments
        .AsQueryable()
        .Where(qa => qa.Id == id)
        .FirstOrDefault();

      if (entity == null)
      {
        return;
      }

      _db.QuizAssignments.Remove(entity);

      try
      {
        await _db.SaveChangesAsync();
      }
      catch (DbUpdateException e)
      {
        Console.WriteLine($"{e.Source}: {e.Message}");
      }
    }

    public async Task<QuizAssignments> SubmitQuizAsync(QuizSubmission quizSubmission)
    {
      var alreadySubmitted = _db.QuizAssignments
        .AsQueryable()
        .Where(qa => qa.Id == quizSubmission.QuizAssignmentId)
        .Select(qa => qa.Submitted)
        .FirstOrDefault();

      if (alreadySubmitted)
      {
        Console.WriteLine($"QuizSubmission: Quiz Assignment ({quizSubmission.QuizAssignmentId}) has already been submitted.");
        return null;
      }

      var quizAssignmentEntity = _db.QuizAssignments
        .AsQueryable()
        .Where(qa => qa.Id == quizSubmission.QuizAssignmentId)
        .Include(qa => qa.Quiz)
        .Include(qa => qa.User)
        .FirstOrDefault();

      if (quizAssignmentEntity == null)
      {
        Console.WriteLine($"QuizSubmission: Quiz Assignment ({quizSubmission.QuizAssignmentId}) does not exist.");
        return null;
      }

      quizAssignmentEntity.Submitted = true;
      quizAssignmentEntity.TimeTaken = quizSubmission.TimeTaken;

      foreach (AnswerSubmission selection in quizSubmission.UserSelections)
      {
        var question = _db.Questions
          .AsQueryable()
          .Where(q => q.Id == selection.QuestionId)
          .Include(q => q.QuestionAnswers)
          .ThenInclude(qa => qa.Answer)
          .FirstOrDefault();

        if (question == null)
        {
          Console.WriteLine($"QuizSubmission: Question ({selection.QuestionId}) does not exist.");
          return null;
        }

        if (selection.AnswerIds != null && selection.AnswerIds.Count != 0)
        {
          foreach (int answerId in selection.AnswerIds)
          {
            var answer = question.QuestionAnswers
              .AsQueryable()
              .Where(qa => qa.AnswerId == answerId)
              .Select(qa => qa.Answer)
              .FirstOrDefault();

            if (answer == null)
            {
              Console.WriteLine(
                $"QuizSubmission: Answer ({answerId}) does not exist for question({selection.QuestionId})."
              );
              return null;
            }

            _db.QuizResults.Add(new()
            {
              Answer = answer,
              Question = question,
              QuizAssignment = quizAssignmentEntity,
            });
          }
        }
        else
        {
          _db.QuizResults.Add(new()
          {
            FreeResponse = selection.FreeResponse,
            Question = question,
            QuizAssignment = quizAssignmentEntity,
          });
        }

      }

      try
      {
        await _db.SaveChangesAsync();
        await GradeQuizAsync(quizSubmission.QuizAssignmentId);
        await Task.WhenAll(_mailService.SendQuizResultsAsync(quizAssignmentEntity));
      }
      catch (DbUpdateException e)
      {
        Console.WriteLine($"{e.Source}: {e.Message}");
        return null;
      }

      return quizAssignmentEntity;
    }

    public async Task<QuizAssignments> UpdateQuizAssignmentAsync(QuizAssignmentNew quizAssignment)
    {
      var entity = _db.QuizAssignments
        .AsQueryable()
        .Where(qa => qa.Id == quizAssignment.Id)
        .FirstOrDefault();

      if (entity == null)
      {
        Console.WriteLine($"QuizAssignment: Assignment ({quizAssignment.Id}) does not exist.");
        return null;
      }

      entity.QuizId = quizAssignment.QuizId;
      entity.UserId = quizAssignment.UserId;
      entity.TimeAllotment = quizAssignment.TimeAllotment;
      _db.QuizAssignments.Update(entity);

      try
      {
        await _db.SaveChangesAsync();
      }
      catch (DbUpdateException e)
      {
        Console.WriteLine($"{e.Source}: {e.Message}");
        return null;
      }

      return entity;
    }

    public async Task<Quizzes> UpdateQuizNameAsync(int id, string name)
    {
      var entity = _db.Quizzes
        .AsQueryable()
        .Where(q => q.Id == id)
        .FirstOrDefault();

      if (entity == null)
      {
        Console.WriteLine($"QuizName: Quiz ({id}) does not exist.");
        return null;
      }

      entity.Name = name;
      _db.Quizzes.Update(entity);

      try
      {
        await _db.SaveChangesAsync();
      }
      catch (DbUpdateException e)
      {
        Console.WriteLine($"{e.Source}: {e.Message}");
        return null;
      }

      return entity;
    }

    public async Task<Quizzes> UpdateQuizQuestionsAsync(int id, QuizUpdates entityUpdates)
    {
      var entity = _db.Quizzes
        .AsQueryable()
        .Where(q => q.Id == id)
        .Include(q => q.QuizQuestions)
        .ThenInclude(qq => qq.Question)
        .ThenInclude(qq => qq.Type)
        .FirstOrDefault();

      if (entity == null)
      {
        Console.WriteLine($"QuizQuestions: Quiz ({id}) does not exist.");
        return null;
      }

      foreach (int questionId in entityUpdates.EntityIdsToAdd ?? new())
      {
        var questionEntity = _db.Questions
          .AsQueryable()
          .Where(q => q.Id == questionId)
          .Include(q => q.Type)
          .FirstOrDefault();

        if (questionEntity == null)
        {
          Console.WriteLine($"QuizQuestions: Question ({questionId}) does not exist.");
          return null;
        }

        _db.QuizQuestions.Add(new()
        {
          Question = questionEntity,
          Quiz = entity,
        });
      }

      foreach (int questionId in entityUpdates.EntityIdsToRemove ?? new())
      {
        var qqEntity = _db.QuizQuestions
          .AsQueryable()
          .Where(qq => qq.QuestionId == questionId)
          .FirstOrDefault();

        if (qqEntity == null)
        {
          continue;
        }

        _db.QuizQuestions.Remove(qqEntity);
      }

      try
      {
        await _db.SaveChangesAsync();
      }
      catch (DbUpdateException e)
      {
        Console.WriteLine($"{e.Source}: {e.Message}");
        return null;
      }

      return entity;
    }

    private async Task GradeQuizAsync(int quizAssignmentId)
    {
      var qa = _db.QuizAssignments
        .AsQueryable()
        .Where(qa => qa.Id == quizAssignmentId)
        .Include(qa => qa.Quiz)
          .ThenInclude(q => q.QuizQuestions)
          .ThenInclude(qq => qq.Question)
          .ThenInclude(q => q.QuestionAnswers)
          .ThenInclude(qa => qa.Answer)
        .First();

      var questions = qa.Quiz.QuizQuestions
        .Select(qq => qq.Question)
        .ToList();

      var responses = _db.QuizResults
        .AsQueryable()
        .Where(qr => qr.QuizAssignmentId == quizAssignmentId)
        .AsEnumerable();

      int gradedCount = 0;
      int correctCount = 0;

      foreach (var q in questions)
      {
        _db.Entry(q).Reference(q => q.Type).Load();
        if (q.Type.Type == SeedData.FreeResponse)
        {
          continue;
        }

        gradedCount++;

        bool correct = true;
        var answers = q.QuestionAnswers.Select(qa => qa.Answer).ToList();
        foreach (var a in answers)
        {
          bool answered = responses
            .Where(r => r.QuestionId == q.Id)
            .Where(r => r.AnswerId == a.Id)
            .Any();

          if (answered != a.Correct)
          {
            correct = false;
            break;
          }
        }

        if (correct && answers.Count != 0)
        {
          correctCount++;
        }
      }

      qa.Grade = (int)Math.Round((double)(correctCount * 100) / gradedCount);

      _db.QuizAssignments.Update(qa);

      await _db.SaveChangesAsync();
    }
  }
}
