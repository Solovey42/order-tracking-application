using Microsoft.AspNetCore.Mvc;
using OrderTracking.Application.DTOs;
using OrderTracking.Application.Services;

namespace OrderTracking.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController(IOrderService orderService) : ControllerBase
    {
        [HttpGet]
        public async Task<IEnumerable<OrderDto>> GetAllOrders(CancellationToken cancellationToken)
        {
            return await orderService.GetAllOrders(cancellationToken);
        }

        [HttpGet("{orderId:guid}")]
        public async Task<OrderDto> GetOrderById(Guid orderId, CancellationToken cancellationToken)
        {
            return await orderService.GetOrderById(orderId, cancellationToken);
        }

        [HttpPost]
        public async Task<Guid> CreateOrder(
            [FromBody] CreateOrderDto order,
            CancellationToken cancellationToken
        )
        {
            return await orderService.CreateOrder(order, cancellationToken);
        }

        [HttpPatch("{orderId:guid}")]
        public async Task UpdateOrderStatus(
            Guid orderId,
            [FromBody] UpdateOrderDto order,
            CancellationToken cancellationToken
        )
        {
            await orderService.UpdateStatus(orderId, order, cancellationToken);
        }
    }
}
