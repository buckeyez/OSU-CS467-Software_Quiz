using Microsoft.Extensions.DependencyInjection;
using OSU_CS467_Software_Quiz.Repositories;

namespace OSU_CS467_Software_Quiz.Extensions
{
  public static class ServiceCollectionExtensions
  {
    public static void AddRepositories(this IServiceCollection services)
    {
      services.AddTransient<IQuestionsRepo, QuestionsRepo>();
    }
  }
}
