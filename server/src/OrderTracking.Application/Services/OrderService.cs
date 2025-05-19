using OrderTracking.Application.DTOs;
using OrderTracking.Application.Interfaces;

namespace OrderTracking.Application.Services
{
    public class OrderService(IOrderRepository orderRepository) : IOrderService
    {
        public async Task<IEnumerable<OrderDto>> GetAllOrders(CancellationToken cancellationToken)
        {
            var orders = await orderRepository.GetAllOrders(cancellationToken);

            return
            [
                .. orders.Select(order => new OrderDto(
                    order.Id,
                    order.OrderNumber,
                    order.Description,
                    order.Status,
                    order.CreatedAt,
                    order.UpdatedAt
                ))
            ];
        }

        public async Task<OrderDto?> GetOrderById(Guid id, CancellationToken cancellationToken)
        {
            var order = await orderRepository.GetOrderById(id, cancellationToken);

            return order != null
                ? new OrderDto(
                    order.Id,
                    order.OrderNumber,
                    order.Description,
                    order.Status,
                    order.CreatedAt,
                    order.UpdatedAt
                )
                : null;
        }
    }
}
