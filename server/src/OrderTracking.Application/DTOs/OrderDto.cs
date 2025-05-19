using OrderTracking.Domain.Enums;

namespace OrderTracking.Application.DTOs
{
    public record OrderDto(
        Guid Id,
        string OrderNumber,
        string? Description,
        OrderStatus Status,
        DateTime CreatedAt,
        DateTime UpdatedAt
    );
}
