using Microsoft.Extensions.Hosting;

namespace OrderTracking.Application.Interfaces
{
    public interface IConsumerService : IHostedService
    {
        Task ConsumeMessage(CancellationToken cancellationToken);
    }
}
