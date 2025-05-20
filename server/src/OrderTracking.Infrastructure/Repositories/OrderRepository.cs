using Microsoft.EntityFrameworkCore;
using OrderTracking.Application.Interfaces;
using OrderTracking.Domain.Entities;
using OrderTracking.Domain.Enums;

namespace OrderTracking.Infrastructure.Repositories
{
    public class OrderRepository(ApplicationDbContext context) : IOrderRepository
    {
        public async Task<IEnumerable<Order>> GetAllOrders(CancellationToken cancellationToken) =>
            await context.Orders.ToListAsync(cancellationToken);

        public async Task<Order?> GetOrderById(Guid orderId, CancellationToken cancellationToken) =>
            await context.Orders.Where(o => o.Id == orderId).FirstOrDefaultAsync(cancellationToken);

        public async Task<Guid> CreateOrder(Order order, CancellationToken cancellationToken)
        {
            context.Orders.Add(order);
            await context.SaveChangesAsync(cancellationToken);

            return order.Id;
        }

        public async Task UpdateStatus(
            Guid orderId,
            OrderStatus orderStatus,
            CancellationToken cancellationToken
        )
        {
            var order = await context
                .Orders.Where(o => o.Id == orderId)
                .FirstOrDefaultAsync(cancellationToken);

            if (order != null)
            {
                order.Status = orderStatus;
                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
