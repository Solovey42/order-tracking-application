using Microsoft.AspNetCore.Mvc;
using OrderTracking.Application.DTOs;
using OrderTracking.Application.Services;

namespace OrderTracking.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController(IOrderService orderService) : ControllerBase
    {
        [HttpGet]
        public async Task<IEnumerable<OrderDto>> GetAllOrders(CancellationToken cancellationToken)
        {
            return await orderService.GetAllOrders(cancellationToken);
        }
    }
}
