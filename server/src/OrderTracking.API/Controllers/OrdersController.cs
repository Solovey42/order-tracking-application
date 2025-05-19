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
    }
}
