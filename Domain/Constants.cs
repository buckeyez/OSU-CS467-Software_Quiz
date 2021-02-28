using System;

namespace OSU_CS467_Software_Quiz.Domain
{
  public static class Constants
  {
    public static string GetQuizAssignmentUrl()
    {
      bool isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";
      return isDevelopment
        ? "https://localhost:5001/candidate-home/"
        : "https://osu-cs467-w21-sotware-quiz.herokuapp.com/candidate-home/";
    }
  }
}
