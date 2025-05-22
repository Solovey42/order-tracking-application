using OrderTracking.Application.Interfaces;
using OrderTracking.Application.Services;
using OrderTracking.Infrastructure.Repositories;
using OrderTracking.Infrastructure.Services;

namespace OrderTracking.API
{
    public static class ServiceCollectionExtension
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddHostedService<ConsumerService>();
            services.AddSingleton<IOrderNotificationService, OrderNotificationService>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IOrderService, OrderService>();
        }
    }
}
