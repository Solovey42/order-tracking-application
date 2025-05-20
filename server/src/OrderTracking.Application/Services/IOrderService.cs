using OrderTracking.Application.DTOs;

namespace OrderTracking.Application.Services
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderDto>> GetAllOrders(CancellationToken cancellationToken);
        Task<OrderDto> GetOrderById(Guid orderId, CancellationToken cancellationToken);
        Task<Guid> CreateOrder(CreateOrderDto order, CancellationToken cancellationToken);
        Task UpdateStatus(Guid orderId, UpdateOrderDto order, CancellationToken cancellationToken);
    }
}
