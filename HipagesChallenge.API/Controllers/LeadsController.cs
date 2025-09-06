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

        // POST: api/leads
        [HttpPost]
        public async Task<IActionResult> CreateLead([FromBody] Lead newLead)
        {
            // Validação básica para garantir que o objeto não é nulo
            if (newLead == null)
            {
                return BadRequest("Lead data is null.");
            }

            // Define os valores padrão conforme a regra de negócio
            newLead.Status = LeadStatus.Invited; // Status 0
            newLead.DateCreated = DateTime.UtcNow; // Data e hora atuais

            // Adiciona o novo lead ao contexto do banco de dados
            await _context.Leads.AddAsync(newLead);

            // Salva as alterações no banco
            await _context.SaveChangesAsync();

            // Retorna um status 201 Created com os dados do lead criado e a rota para acessá-lo
            return CreatedAtAction(nameof(GetLeads), new { id = newLead.Id }, newLead);
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

            // --- LÓGICA DO DESCONTO ATUALIZADA ---
            if (lead.Price > 500)
            {
                lead.Price *= 0.9m; // Aplica 10% de desconto
                lead.WasDiscountApplied = true; // Define nossa flag como verdadeira
            }

            lead.Status = LeadStatus.Accepted;

            await _context.SaveChangesAsync();

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