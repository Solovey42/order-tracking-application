using OrderTracking.Domain.Enums;

namespace OrderTracking.Application.Events
{
    public record OrderStatusMessage(
        Guid OrderId,
        string OrderNumber,
        OrderStatus Status,
        DateTime UpdatedAt
    );
}
