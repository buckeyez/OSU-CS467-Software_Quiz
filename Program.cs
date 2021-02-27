using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OSU_CS467_Software_Quiz.Data;
using System;

namespace OSU_CS467_Software_Quiz
{
  public class Program
  {
    public static void Main(string[] args)
    {
      IHost host = CreateHostBuilder(args).Build();

      using (var scope = host.Services.CreateScope())
      {
        IServiceProvider serviceProvider = scope.ServiceProvider;
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        try
        {
          SeedData.InitializeDb(serviceProvider);
          SeedData.InitializeRoles(roleManager);
        }
        catch (Exception e)
        {
          Console.WriteLine(e);
        }
      }

      host.Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
      Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
          webBuilder.UseStartup<Startup>();
        });
  }
}
