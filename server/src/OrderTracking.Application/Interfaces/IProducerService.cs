namespace OrderTracking.Application.Interfaces
{
    public interface IProducerService<T>
    {
        Task ProduceAsync(string topic, Guid key, T message, CancellationToken cancellationToken);
    }
}
