using Itam.Dima.Domain.Models;
using Itam.Dima.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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

builder.Services.AddAuthentication(options =>
	{
		options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
		options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
		options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
	})

// Adding Jwt Bearer
	.AddJwtBearer(options =>
	{
		options.SaveToken = true;
		options.RequireHttpsMetadata = false;
		options.TokenValidationParameters = new TokenValidationParameters()
		{
			ValidateIssuer = true,
			ValidateAudience = true,
			ValidAudience = AuthOptions.AUDIENCE,
			ValidIssuer = AuthOptions.ISSUER,
		};
	});

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

using (var serviceScope = app.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
{
	var context = serviceScope.ServiceProvider.GetRequiredService<AppDbContext>();
	var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<User>>();
	try
	{
		await userManager.CreateAsync(new User()
		{
			UserName = "Admin",
			FullName = "Админ Админович",
			Telegram = "Admin",
			Type = UserType.Admin
		});
	}
	catch (Exception)
	{
		// ignored
	}

	try
	{
		var users = Enumerable.Range(0, 20).Select(i => new User()
		{
			UserName = $"TestUser{i}",
			FullName = "Тест Тестович",
			Telegram = $"TestUser{i}",
			Type = UserType.Participant
		}).ToList();
		foreach (var user in users)
		{
			await userManager.CreateAsync(user);
			await context.Teams.AddRangeAsync(Enumerable.Range(0, users.Count / 5).Select(i =>
			{
				var members = users.Skip(i * 5).Take(5).ToArray();
				return new Team()
				{
					Id = Guid.NewGuid(),
					Leader = members.First(),
					Members = members.Skip(1).ToList(),
					Name = $"TestTeam{i}",
					CreatedAt = DateTime.UtcNow,
				};
			}));
		}
		
	}
	catch (Exception)
	{
		// ignored
	}
}

app.Run();