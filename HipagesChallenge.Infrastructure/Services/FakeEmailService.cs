using HipagesChallenge.Domain.Interfaces;

namespace HipagesChallenge.Infrastructure.Services
{
    public class FakeEmailService : IEmailService
    {
        public Task SendEmailAsync(string to, string subject, string body)
        {
            // Simula o envio de um email escrevendo no console
            Console.WriteLine("--- SIMULANDO ENVIO DE EMAIL ---");
            Console.WriteLine($"Para: {to}");
            Console.WriteLine($"Assunto: {subject}");
            Console.WriteLine($"Corpo: {body}");
            Console.WriteLine("---------------------------------");
            return Task.CompletedTask;
        }
    }
}