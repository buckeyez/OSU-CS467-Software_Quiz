using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using OSU_CS467_Software_Quiz.Domain;
using OSU_CS467_Software_Quiz.Settings;
using System;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Services
{
  public class MailService : IMailService
  {
    private readonly MailSettings _mailSettings;
    private readonly string _mailPassword;

    public MailService(IOptions<MailSettings> mailSettings)
    {
      _mailSettings = mailSettings.Value;
      _mailPassword = Environment.GetEnvironmentVariable("MAIL_PWD");
    }

    public async Task SendEmailAsync(MailRequest mailRequest)
    {
      var builder = new BodyBuilder
      {
        HtmlBody = mailRequest.Body
      };

      var email = new MimeMessage
      {
        Sender = MailboxAddress.Parse(_mailSettings.Mail),
        Subject = mailRequest.Subject,
        Body = builder.ToMessageBody(),
      };
      email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
      
      using var smtp = new SmtpClient();
      smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
      smtp.Authenticate(_mailSettings.Mail, _mailPassword);
      await smtp.SendAsync(email);
      smtp.Disconnect(true);
    }
  }
}
