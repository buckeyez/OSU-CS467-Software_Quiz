using System.Collections.Generic;

namespace OSU_CS467_Software_Quiz.Projections
{
  public class QuizUpdates
  {
    public List<int> EntityIdsToAdd { get; set; }
    public List<int> EntityIdsToRemove { get; set; }
  }
}
