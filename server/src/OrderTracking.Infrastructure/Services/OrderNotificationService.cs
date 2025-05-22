using Microsoft.AspNetCore.SignalR;
using OrderTracking.Application.Events;
using OrderTracking.Application.Interfaces;

namespace OrderTracking.Infrastructure.Services
{
    public class OrderNotificationService(IHubContext<OrderHub> hubContext)
        : IOrderNotificationService
    {
        public async Task NotifyOrderStatusChanged(
            OrderStatusMessage message,
            CancellationToken cancellationToken
        )
        {
            await hubContext.Clients.All.SendAsync(
                "ReceiveOrderStatus",
                message,
                cancellationToken
            );
        }
    }

    public class OrderHub : Hub { }
}
