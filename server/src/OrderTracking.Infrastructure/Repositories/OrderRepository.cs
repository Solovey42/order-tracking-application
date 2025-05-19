using Microsoft.EntityFrameworkCore;
using OrderTracking.Application.Interfaces;
using OrderTracking.Domain.Entities;

namespace OrderTracking.Infrastructure.Repositories
{
    public class OrderRepository(ApplicationDbContext context) : IOrderRepository
    {
        public async Task<IEnumerable<Order>> GetAllOrders(CancellationToken cancellationToken) =>
            await context.Orders.ToListAsync(cancellationToken);

        public async Task<Order?> GetOrderById(Guid id, CancellationToken cancellationToken) =>
            await context.Orders.Where(o => o.Id == id).FirstOrDefaultAsync(cancellationToken);

        public async Task AddAsync(Order order)
        {
            context.Orders.Add(order);
            await context.SaveChangesAsync();
        }
    }
}
