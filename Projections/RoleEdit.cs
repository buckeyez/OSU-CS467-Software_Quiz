using System.Collections.Generic;

namespace OSU_CS467_Software_Quiz.Projections
{
  public class RoleEdit : Role
  {
    public IEnumerable<User> Members { get; set; }
    public IEnumerable<User> NonMembers { get; set; }
  }
}
