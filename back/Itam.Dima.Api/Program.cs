using Itam.Dima.Domain.Models;
using Itam.Dima.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Minio;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddProblemDetails(options =>
{

});
builder.Services.AddSingleton<MinioClient>(x => new MinioClient()
	.WithCredentials(
		builder.Configuration.GetValue<string>("MinIO:AccessKey"),
		builder.Configuration.GetValue<string>("MinIO:SecretKey"))
	.WithEndpoint(builder.Configuration.GetValue<string>("MinIO:Endpoint"))
	.Build()
);
builder.Services.AddDbContext<AppDbContext>(options =>
	options.UseNpgsql(builder.Configuration.GetConnectionString("Postgres")));

builder.Services.AddIdentity<User, IdentityRole>(options =>
	{
		options.SignIn.RequireConfirmedAccount = false;
		options.SignIn.RequireConfirmedEmail = false;
		options.SignIn.RequireConfirmedPhoneNumber = false;

	})
	.AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
{
	builder.AllowAnyOrigin()
		.AllowAnyMethod()
		.AllowAnyHeader();
}));

builder.Services.AddSerilog(configuration => configuration.WriteTo.Console());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();   
app.UseAuthorization();

app.UseCors("MyPolicy");

app.MapControllers();

using (var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
{
	var context = serviceScope.ServiceProvider.GetRequiredService<AppDbContext>();
	await context.Database.EnsureCreatedAsync();
	await context.Database.MigrateAsync();
}

app.Run();