using System;
using System.Collections.Generic;

namespace OSU_CS467_Software_Quiz.Models
{
  public class QuizAssignments
  {
    public int Id { get; set; }
    public Guid Key { get; set; }
    public int TimeAllotment { get; set; }
    public int TimeTaken { get; set; }
    public int Grade { get; set; }

    public string UserId { get; set; }
    public AppUser User { get; set; }
    public int QuizId { get; set; }
    public Quizzes Quiz { get; set; }

    public ICollection<QuizResults> QuizResults { get; set; }
  }
}
