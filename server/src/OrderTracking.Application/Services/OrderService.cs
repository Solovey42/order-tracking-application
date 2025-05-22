using OrderTracking.Application.DTOs;
using OrderTracking.Application.Events;
using OrderTracking.Application.Interfaces;
using OrderTracking.Domain.Entities;
using OrderTracking.Domain.Enums;

namespace OrderTracking.Application.Services
{
    public class OrderService(
        IOrderRepository orderRepository,
        IProducerService<OrderStatusMessage> producerService
    ) : IOrderService
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

        public async Task<OrderDto> GetOrderById(Guid orderId, CancellationToken cancellationToken)
        {
            var order =
                await orderRepository.GetOrderById(orderId, cancellationToken)
                ?? throw new InvalidOperationException("Order not found");

            return new OrderDto(
                order.Id,
                order.OrderNumber,
                order.Description,
                order.Status,
                order.CreatedAt,
                order.UpdatedAt
            );
        }

        public async Task<Guid> CreateOrder(
            CreateOrderDto orderDto,
            CancellationToken cancellationToken
        )
        {
            var newOrder = new Order
            {
                Id = Guid.NewGuid(),
                OrderNumber = orderDto.OrderNumber,
                Description = orderDto.Description,
                Status = OrderStatus.Created,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var orderId = await orderRepository.CreateOrder(newOrder, cancellationToken);

            return orderId;
        }

        public async Task UpdateStatus(
            Guid orderId,
            UpdateOrderDto orderDto,
            CancellationToken cancellationToken
        )
        {
            var order =
                await orderRepository.GetOrderById(orderId, cancellationToken)
                ?? throw new InvalidOperationException("Order not found");

            if (!IsValidStatusTransition(order.Status, orderDto.Status))
            {
                throw new InvalidOperationException(
                    $"Cannot change status from {order.Status} to {orderDto.Status}"
                );
            }

            await orderRepository.UpdateStatus(orderId, orderDto.Status, cancellationToken);

            await producerService.ProduceAsync(
                "order-status-changed",
                order.Id,
                new OrderStatusMessage(
                    order.Id,
                    order.OrderNumber,
                    orderDto.Status,
                    DateTime.UtcNow
                ),
                cancellationToken
            );
        }

        private static bool IsValidStatusTransition(OrderStatus current, OrderStatus next)
        {
            return current switch
            {
                OrderStatus.Created => next == OrderStatus.Sent || next == OrderStatus.Cancelled,
                OrderStatus.Sent => next == OrderStatus.Delivered || next == OrderStatus.Cancelled,
                OrderStatus.Delivered => false,
                OrderStatus.Cancelled => false,
                _ => false
            };
        }
    }
}
