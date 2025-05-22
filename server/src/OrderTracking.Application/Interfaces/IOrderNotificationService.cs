using OrderTracking.Application.Events;

namespace OrderTracking.Application.Interfaces
{
    public interface IOrderNotificationService
    {
        Task NotifyOrderStatusChanged(
            OrderStatusMessage message,
            CancellationToken cancellationToken
        );
    }
}
