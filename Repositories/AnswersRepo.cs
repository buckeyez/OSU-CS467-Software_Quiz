using Microsoft.EntityFrameworkCore;
using OSU_CS467_Software_Quiz.Data;
using OSU_CS467_Software_Quiz.Models;
using OSU_CS467_Software_Quiz.Projections;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Repositories
{
  public class AnswersRepo : IAnswersRepo
  {
    private readonly AppDbContext _db;

    public AnswersRepo(AppDbContext db)
    {
      _db = db;
    }

    public async Task DeleteAnswerAsync(int id)
    {
      var answer = _db.Answers
        .AsQueryable()
        .Where(a => a.Id == id)
        .First();

      if (answer == null)
      {
        return;
      }

      _db.Answers.Remove(answer);

      try
      {
        await _db.SaveChangesAsync();
      }
      catch (DbUpdateException e)
      {
        Console.WriteLine($"{e.Source}: {e.Message}");
      }
    }

    public async Task<Answers> UpdateAnswerAsync(int id, Answer answer)
    {
      var entity = _db.Answers
        .AsQueryable()
        .Where(a => a.Id == id)
        .First();

      if (entity == null)
      {
        return null;
      }

      entity.Answer = answer.Value;
      entity.Correct = answer.Correct;
      _db.Answers.Update(entity);

      try
      {
        await _db.SaveChangesAsync();
        return entity;
      }
      catch (DbUpdateException e)
      {
        Console.WriteLine($"{e.Source}: {e.Message}");
      }

      return null;
    }
  }
}
