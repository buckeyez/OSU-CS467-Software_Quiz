using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OSU_CS467_Software_Quiz.Projections
{
  public class Role
  {
    [Required]
    public string Id { get; set; }
    
    [Required]
    public string Name { get; set; }
  }
}
