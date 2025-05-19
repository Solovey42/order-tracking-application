using OrderTracking.Domain.Enums;

namespace OrderTracking.Domain.Entities
{
    public class Order
    {
        public Guid Id { get; set; }
        public string OrderNumber { get; set; } = null!;
        public string? Description { get; set; }
        public OrderStatus Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
