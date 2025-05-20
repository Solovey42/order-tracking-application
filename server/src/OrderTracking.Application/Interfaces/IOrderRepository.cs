using OrderTracking.Domain.Entities;
using OrderTracking.Domain.Enums;

namespace OrderTracking.Application.Interfaces
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetAllOrders(CancellationToken cancellationToken);
        Task<Order?> GetOrderById(Guid orderId, CancellationToken cancellationToken);
        Task<Guid> CreateOrder(Order order, CancellationToken cancellationToken);
        Task UpdateStatus(
            Guid orderId,
            OrderStatus orderStatus,
            CancellationToken cancellationToken
        );
    }
}
