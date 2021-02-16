using OSU_CS467_Software_Quiz.Domain;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Services
{
  public interface IMailService
  {
    Task SendEmailAsync(MailRequest mailRequest);
  }
}
