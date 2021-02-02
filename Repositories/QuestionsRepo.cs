using Microsoft.EntityFrameworkCore;
using OSU_CS467_Software_Quiz.Data;
using OSU_CS467_Software_Quiz.Models;
using OSU_CS467_Software_Quiz.Projections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Repositories
{
  public class QuestionsRepo : IQuestionsRepo
  {
    private readonly AppDbContext _db;

    public QuestionsRepo(AppDbContext db)
    {
      _db = db;
    }
    public async Task<Questions> AddQuestionAsync(QuestionAndAnswers newQuestion)
    {
      var questionEntry = await _db.AddAsync<Questions>(new()
      {
        Question = newQuestion.Question.Value,
        Type = await _db.QuestionType
          .AsQueryable()
          .Where(qt => qt.Type == newQuestion.Question.Type)
          .FirstAsync(),
      });

      foreach (Answer answer in newQuestion.Answers)
      {
        var answerEntry = _db.Add<Answers>(new()
        {
          Answer = answer.Value,
          Correct = answer.Correct,
        });

        _db.Add<QuestionAnswers>(new()
        {
          Answer = answerEntry.Entity,
          Question = questionEntry.Entity
        });
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

      return questionEntry.Entity;
    }

    public async Task DeleteQuestionAsync(int id)
    {
      var question = _db.Questions
        .AsQueryable()
        .Where(q => q.Id == id)
        .Include(q => q.QuestionAnswers)
        .ThenInclude(qa => qa.Answer)
        .FirstOrDefault();

      if (question == null)
      {
        return;
      }

      foreach (Answers answer in question.QuestionAnswers.Select(qa => qa.Answer).ToList())
      {
        _db.Remove(answer);
      }
      _db.Remove(question);

      try
      {
        await _db.SaveChangesAsync();
      }
      catch (DbUpdateException e)
      {
        Console.WriteLine($"{e.Source}: {e.Message}");
      }
    }

    public async Task<List<Answers>> GetQuestionAnswersAsync(int id)
    {
      return await _db.Questions
        .AsQueryable()
        .Where(q => q.Id == id)
        .SelectMany(q => q.QuestionAnswers)
        .Select(qa => qa.Answer)
        .ToListAsync();
    }

    public Task<Questions> GetQuestion(int id)
    {
      return _db.Questions
        .AsQueryable()
        .Where(q => q.Id == id)
        .Include(q => q.Type)
        .FirstOrDefaultAsync();
    }

    public Task<List<Questions>> GetQuestions()
    {
      return _db.Questions
        .Include(q => q.Type)
        .ToListAsync();
    }

    public async Task<Questions> UpdateQuestionAsync(int id, Question updatedQuestion)
    {
      var question = await _db.Questions
        .AsQueryable()
        .Where(q => q.Id == id)
        .Include(q => q.Type)
        .Include(q => q.QuestionAnswers)
        .ThenInclude(qa => qa.Answer)
        .FirstAsync();

      question.Question = updatedQuestion.Value;

      question.Type = await _db.QuestionType
          .AsQueryable()
          .Where(qt => qt.Type == updatedQuestion.Type)
          .FirstAsync();

      _db.Update(question);

      try
      {
        await _db.SaveChangesAsync();
      }
      catch (DbUpdateException e)
      {
        Console.WriteLine($"{e.Source}: {e.Message}");
        return null;
      }

      return question;
    }
  }
}
