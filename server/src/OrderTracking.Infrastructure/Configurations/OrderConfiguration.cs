using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OrderTracking.Domain.Entities;

namespace OrderTracking.Infrastructure.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(o => o.Id);
            builder.Property(o => o.OrderNumber).IsRequired().HasMaxLength(50);
            builder.Property(o => o.Description).HasMaxLength(1000);
        }
    }
}
