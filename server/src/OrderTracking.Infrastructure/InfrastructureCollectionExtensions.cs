using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OrderTracking.Application.Interfaces;
using OrderTracking.Infrastructure.Services;

namespace OrderTracking.Infrastructure
{
    public static class InfrastructureCollectionExtensions
    {
        public static void AddInfrastructureServices(
            this IServiceCollection services,
            IConfiguration configuration
        )
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(connectionString)
            );

            services.AddSingleton(typeof(IProducerService<>), typeof(ProducerService<>));
            services.AddSignalR();
        }
    }
}
