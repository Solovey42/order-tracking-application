using Microsoft.EntityFrameworkCore;
using OrderTracking.API;
using OrderTracking.API.Middlewares;
using OrderTracking.Infrastructure;
using OrderTracking.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddServices();

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

app.MapHub<OrderHub>("/orderHub");

app.Run();
