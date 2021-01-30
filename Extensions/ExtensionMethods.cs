using System.Text.Json;
using System.Text.Json.Serialization;

namespace OSU_CS467_Software_Quiz.Extensions
{
  public static class ExtensionMethods
  {
    public static T DeepCopy<T>(this T self)
    {
      var serialized = JsonSerializer.Serialize<T>(self);
      return JsonSerializer.Deserialize<T>(serialized);
    }
  }
}
