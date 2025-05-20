using Microsoft.EntityFrameworkCore;
using OrderTracking.API.Middlewares;
using OrderTracking.Application.Interfaces;
using OrderTracking.Application.Services;
using OrderTracking.Infrastructure;
using OrderTracking.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDatabase(builder.Configuration);

builder.Services.AddCors(options =>
{
    var clientUrl = builder.Configuration.GetSection("Client:Url").Value;

    if (string.IsNullOrEmpty(clientUrl))
    {
        throw new ArgumentException("Client URL is not configured");
    }

    options.AddPolicy(
        "client",
        policy =>
        {
            policy.WithOrigins(clientUrl).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
        }
    );
});

// TODO add IServiceCollection extension method for adding services
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    dbContext.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    builder.Environment.EnvironmentName = Environments.Development;
}

app.UseHttpsRedirection();

app.UseCors("client");

app.UseAuthorization();

app.MapControllers();

app.Run();
