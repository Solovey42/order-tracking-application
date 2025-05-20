using OrderTracking.Domain.Enums;

namespace OrderTracking.Application.DTOs
{
    public record UpdateOrderDto(OrderStatus Status);
}
