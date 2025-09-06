namespace HipagesChallenge.Domain.Entities
{
    public class Lead
    {
        public int Id { get; set; } 
        public string ContactFirstName { get; set; } = string.Empty;
        public string? ContactFullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public DateTime DateCreated { get; set; }
        public string Suburb { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public LeadStatus Status { get; set; }
        public bool WasDiscountApplied { get; set; } 
    }

    public enum LeadStatus
    {
        Invited,
        Accepted,
        Declined
    }
}