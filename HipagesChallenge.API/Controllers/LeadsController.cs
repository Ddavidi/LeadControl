using HipagesChallenge.Domain.Entities;
using HipagesChallenge.Domain.Interfaces;
using HipagesChallenge.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HipagesChallenge.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeadsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IEmailService _emailService;

        // Agora injetamos o DbContext E o nosso serviço de email
        public LeadsController(AppDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        // GET: api/leads?status=Invited
        [HttpGet]
        public async Task<IActionResult> GetLeads([FromQuery] LeadStatus status)
        {
            var leads = await _context.Leads
                .Where(l => l.Status == status)
                .ToListAsync();

            return Ok(leads);
        }

        // POST: api/leads/1/accept
        [HttpPost("{id}/accept")]
        public async Task<IActionResult> AcceptLead(int id)
        {
            var lead = await _context.Leads.FindAsync(id);

            if (lead == null)
            {
                return NotFound(); // Retorna 404 se o lead não for encontrado
            }

            // Regra de negócio: Se o preço for maior que $500, aplica 10% de desconto
            if (lead.Price > 500)
            {
                lead.Price *= 0.9m; // 0.9m é o mesmo que subtrair 10%
            }

            // Atualiza o status para aceito
            lead.Status = LeadStatus.Accepted;

            // Salva as alterações no banco de dados
            await _context.SaveChangesAsync();

            // Envia a notificação por email (simulada)
            await _emailService.SendEmailAsync(
                to: "vendas@test.com",
                subject: "Lead Aceito!",
                body: $"O lead {lead.Id} de {lead.ContactFirstName} foi aceito."
            );

            return Ok(lead); // Retorna 200 OK com os dados do lead atualizado
        }

        // POST: api/leads/2/decline
        [HttpPost("{id}/decline")]
        public async Task<IActionResult> DeclineLead(int id)
        {
            var lead = await _context.Leads.FindAsync(id);

            if (lead == null)
            {
                return NotFound();
            }

            // Apenas atualiza o status para recusado
            lead.Status = LeadStatus.Declined;

            // Salva as alterações
            await _context.SaveChangesAsync();

            return NoContent(); // Retorna 204 NoContent, indicando sucesso sem corpo de resposta
        }
    }
}