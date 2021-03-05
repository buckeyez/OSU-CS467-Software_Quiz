using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using MimeKit;
using OSU_CS467_Software_Quiz.Data;
using OSU_CS467_Software_Quiz.Domain;
using OSU_CS467_Software_Quiz.Models;
using OSU_CS467_Software_Quiz.Settings;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OSU_CS467_Software_Quiz.Services
{
  public class MailService : IMailService
  {
    private readonly MailSettings _mailSettings;
    private readonly UserManager<AppUser> _userManager;
    private readonly string _mailPassword;

    public MailService(IOptions<MailSettings> mailSettings, UserManager<AppUser> userManager)
    {
      _mailSettings = mailSettings.Value;
      _mailPassword = Environment.GetEnvironmentVariable("MAIL_PWD");
      _userManager = userManager;
    }

    public Task SendQuizAssignmentAsync(QuizAssignments quizAssignment)
    {
      var user = quizAssignment.User;
      string url = $"{Constants.GetQuizAssignmentUrl()}/?key={quizAssignment.Key}";

      MailRequest mail = new()
      {
        Body = $@"<p>Hello {
          user.FirstName
          } {
          user.LastName
          }, you have been invited to take a software quiz for OSU CS467!</p>
          <p>Please click here to take the quiz: <a href=""{url}"">{url}</a></p>",
        Subject = "Software Quiz Invite",
        ToEmail = user.Email,
      };

      return SendEmailAsync(mail);
    }

    public async Task<List<Task>> SendQuizResultsAsync(QuizAssignments quizAssignment)
    {
      List<Task> toReturn = new();
      string url = $"{Constants.GetQuizResultUrl()}/?key={quizAssignment.Key}";

      var admins = await _userManager.GetUsersInRoleAsync(SeedData.Admin);
      foreach (var a in admins)
      {
        MailRequest mail = new()
        {
          Body = $@"<p>Hello {
            a.FirstName
            } {
            a.LastName
            }, candidate {
            quizAssignment.User.FirstName
            } {
            quizAssignment.User.LastName
            } has completed their assigned quiz.</p>
            <p>Please click here to review their results: <a href=""{url}"">{url}</a></p>",
          Subject = "Software Quiz Result",
          ToEmail = a.Email,
        };

        toReturn.Add(SendEmailAsync(mail));
      }

      return toReturn;
    }

    private async Task SendEmailAsync(MailRequest mailRequest)
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
