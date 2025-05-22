using System.Text.Json;
using Confluent.Kafka;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using OrderTracking.Application.Interfaces;

namespace OrderTracking.Infrastructure.Services
{
    public class ProducerService<T> : IProducerService<T>
    {
        private readonly IProducer<string, string> _producer;
        private readonly ILogger<ProducerService<T>> _logger;
        private readonly string _bootstrapServers;

        public ProducerService(IConfiguration configuration, ILogger<ProducerService<T>> logger)
        {
            var bootstrapServers = configuration.GetSection("Kafka:BootstrapServers").Value;

            if (string.IsNullOrEmpty(bootstrapServers))
            {
                throw new NullReferenceException("Bootstrap servers are not configured");
            }

            _bootstrapServers = bootstrapServers;
            _logger = logger;

            var producerconfig = new ProducerConfig { BootstrapServers = _bootstrapServers };
            _producer = new ProducerBuilder<string, string>(producerconfig).Build();
        }

        public async Task ProduceAsync(
            string topic,
            Guid key,
            T message,
            CancellationToken cancellationToken
        )
        {
            try
            {
                var serializeMessage = new Message<string, string>
                {
                    Key = key.ToString(),
                    Value = JsonSerializer.Serialize(message)
                };

                var result = await _producer.ProduceAsync(
                    topic,
                    serializeMessage,
                    cancellationToken
                );

                _logger.LogInformation(
                    "Message sent to {Topic} - {TopicPartitionOffset}",
                    result.Topic,
                    result.TopicPartitionOffset
                );
            }
            catch (ProduceException<string, string> e)
            {
                _logger.LogError(
                    "Failed to deliver message. Reason: {ErrorMessage} (Error code: {ErrorCode})",
                    e.Message,
                    e.Error.Code
                );
            }
        }
    }
}
