using System.Text.Json;
using Confluent.Kafka;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using OrderTracking.Application.Events;
using OrderTracking.Application.Interfaces;

namespace OrderTracking.Infrastructure.Services
{
    public class ConsumerService : BackgroundService, IConsumerService
    {
        private readonly IConsumer<string, string> _consumer;
        private readonly ILogger<ConsumerService> _logger;
        private readonly IOrderNotificationService _orderNotificationService;
        private readonly string _topic;
        private readonly int _timeOut = 100;

        public ConsumerService(
            IConfiguration configuration,
            ILogger<ConsumerService> logger,
            IOrderNotificationService orderNotificationService
        )
        {
            _logger = logger;
            _orderNotificationService = orderNotificationService;

            var bootstrapServers = configuration.GetSection("Kafka:BootstrapServers").Value;
            if (string.IsNullOrEmpty(bootstrapServers))
            {
                throw new NullReferenceException("Bootstrap servers are not configured");
            }

            var groupId = configuration.GetSection("Kafka:GroupId").Value;
            if (string.IsNullOrEmpty(groupId))
            {
                throw new NullReferenceException("Kafka group ID is not configured");
            }

            var topic = configuration.GetSection("Kafka:Topic").Value;
            if (string.IsNullOrEmpty(topic))
            {
                throw new NullReferenceException("Kafka topic is not configured");
            }

            var consumerConfig = new ConsumerConfig
            {
                BootstrapServers = bootstrapServers,
                GroupId = groupId,
                AutoOffsetReset = AutoOffsetReset.Earliest
            };

            _topic = topic;
            _consumer = new ConsumerBuilder<string, string>(consumerConfig).Build();
        }

        protected override async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            await Task.Run(
                async () =>
                {
                    _consumer.Subscribe(_topic);

                    while (!cancellationToken.IsCancellationRequested)
                    {
                        await ConsumeMessage(cancellationToken);
                    }

                    _consumer.Close();
                },
                cancellationToken
            );
        }

        public async Task ConsumeMessage(CancellationToken cancellationToken)
        {
            try
            {
                var consumeResult = _consumer.Consume(_timeOut);

                if (consumeResult == null)
                {
                    return;
                }

                var message = consumeResult.Message.Value;
                var deserializedMessage = JsonSerializer.Deserialize<OrderStatusMessage>(message);

                if (deserializedMessage == null)
                {
                    _logger.LogWarning("Deserialized message is null.");
                    return;
                }

                _logger.LogInformation("Received message: {Message}", message);

                await _orderNotificationService.NotifyOrderStatusChanged(
                    deserializedMessage,
                    cancellationToken
                );
            }
            catch (KafkaException ex)
            {
                _logger.LogError("Error processing message: {ErrorMessage}", ex.Message);
            }
        }

        public override async Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Consumer service is stopping.");

            await base.StopAsync(stoppingToken);
        }
    }
}
