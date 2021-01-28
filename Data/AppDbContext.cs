using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OSU_CS467_Software_Quiz.Models;

namespace OSU_CS467_Software_Quiz.Data
{
  public class AppDbContext : IdentityDbContext<AppUser>
  {
    public AppDbContext(DbContextOptions<AppDbContext> options)
      : base(options)
    { }
  }
}
