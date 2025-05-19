using OrderTracking.Domain.Entities;

namespace OrderTracking.Application.Interfaces
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetAllOrders(CancellationToken cancellationToken);
        Task<Order?> GetOrderById(Guid id, CancellationToken cancellationToken);
    }
}
