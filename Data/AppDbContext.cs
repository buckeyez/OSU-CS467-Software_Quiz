using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OSU_CS467_Software_Quiz.Models;

namespace OSU_CS467_Software_Quiz.Data
{
  public class AppDbContext : IdentityDbContext<AppUser>
  {
    public AppDbContext(DbContextOptions<AppDbContext> options)
      : base(options)
    {
    }

    public DbSet<Answers> Answers { get; set; }
    public DbSet<Questions> Questions { get; set; }
    public DbSet<QuestionType> QuestionType { get; set; }
    public DbSet<Quizzes> Quizzes { get; set; }

    public DbSet<QuestionAnswers> QuestionAnswers { get; set; }
    public DbSet<QuizAssignments> QuizAssignments { get; set; }
    public DbSet<QuizQuestions> QuizQuestions { get; set; }
    public DbSet<QuizResults> QuizResults { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      builder.Entity<QuestionType>(entity =>
      {
        entity.HasIndex(e => e.Type)
          .IsUnique();
      });

      builder.Entity<Quizzes>(entity =>
      {
        entity.HasIndex(e => e.Name)
          .IsUnique();
      });

      builder.Entity<QuestionAnswers>(entity =>
      {
        entity.HasKey(e => new { e.AnswerId, e.QuestionId });

        entity.HasOne(e => e.Answer)
          .WithMany(qa => qa.QuestionAnswers)
          .HasForeignKey(e => e.AnswerId);

        entity.HasOne(e => e.Question)
          .WithMany(qa => qa.QuestionAnswers)
          .HasForeignKey(e => e.QuestionId);
      });

      builder.Entity<QuizAssignments>(entity =>
      {
        entity.HasOne(e => e.Quiz)
          .WithMany(qa => qa.QuizAssignments)
          .HasForeignKey(e => e.QuizId);

        entity.HasOne(e => e.User)
          .WithMany(qa => qa.QuizAssignments)
          .HasForeignKey(e => e.UserId);
      });

      builder.Entity<QuizQuestions>(entity =>
      {
        entity.HasKey(e => new { e.QuestionId, e.QuizId });

        entity.HasOne(e => e.Question)
          .WithMany(qq => qq.QuizQuestions)
          .HasForeignKey(e => e.QuestionId);

        entity.HasOne(e => e.Quiz)
          .WithMany(qq => qq.QuizQuestions)
          .HasForeignKey(e => e.QuizId);
      });

      builder.Entity<QuizResults>(entity =>
      {
        entity.HasOne(e => e.Answer)
          .WithMany(qr => qr.QuizResults)
          .HasForeignKey(e => e.AnswerId);

        entity.HasOne(e => e.Question)
          .WithMany(qr => qr.QuizResults)
          .HasForeignKey(e => e.QuestionId);

        entity.HasOne(e => e.QuizAssignment)
          .WithMany(qr => qr.QuizResults)
          .HasForeignKey(e => e.QuizAssignmentId);
      });
    }
  }
}
