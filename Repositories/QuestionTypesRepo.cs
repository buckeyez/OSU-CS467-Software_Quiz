using Microsoft.EntityFrameworkCore;
using OSU_CS467_Software_Quiz.Data;
using OSU_CS467_Software_Quiz.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Repositories
{
  public class QuestionTypesRepo : IQuestionTypesRepo
  {
    private readonly AppDbContext _db;

    public QuestionTypesRepo(AppDbContext db)
    {
      _db = db;
    }

    public async Task<QuestionType> AddTypeAsync(string type)
    {
      var typeEntry = _db.QuestionType.Add(new()
      {
        Type = type,
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

      return typeEntry.Entity;
    }

    public async Task DeleteTypeAsync(string type)
    {
      var entity = _db.QuestionType
        .AsQueryable()
        .Where(t => t.Type == type)
        .FirstOrDefault();

      if (entity == null)
      {
        return;
      }

      _db.QuestionType.Remove(entity);

      try
      {
        await _db.SaveChangesAsync();
      }
      catch (DbUpdateException e)
      {
        Console.WriteLine($"{e.Source}: {e.Message}");
      }
    }

    public Task<List<QuestionType>> GetTypes()
    {
      return _db.QuestionType.ToListAsync();
    }

    public async Task<QuestionType> UpdateTypeAsync(string newType, string oldType)
    {
      var entity = _db.QuestionType
        .AsQueryable()
        .Where(t => t.Type == oldType)
        .FirstOrDefault();
      
      if (entity == null)
      {
        return null;
      }

      entity.Type = newType;
      _db.QuestionType.Update(entity);

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
  }
}
