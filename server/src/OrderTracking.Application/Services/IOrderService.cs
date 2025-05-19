using OrderTracking.Application.DTOs;

namespace OrderTracking.Application.Services
{
    public interface IOrderService
    {
        Task<IEnumerable<OrderDto>> GetAllOrders(CancellationToken cancellationToken);
        Task<OrderDto?> GetOrderById(Guid id, CancellationToken cancellationToken);
    }
}
