using System.Collections.Generic;

namespace OSU_CS467_Software_Quiz.Projections
{
  public class RoleModification : Role
  {
    public List<string> AddIds { get; set; }
    public List<string> DeleteIds { get; set; }
  }
}
