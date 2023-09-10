using System.Text.Json.Serialization;
using Bogus;
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

builder.Services.ConfigureHttpJsonOptions(x =>
{
	x.SerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
});

builder.Services.AddIdentity<User, IdentityRole>(options =>
	{
		options.SignIn.RequireConfirmedAccount = false;
		options.SignIn.RequireConfirmedEmail = false;
		options.SignIn.RequireConfirmedPhoneNumber = false;
		options.Password.RequireDigit = false;
		options.Password.RequireNonAlphanumeric = false;
		options.Password.RequireLowercase = false;
		options.Password.RequiredLength = 4;
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
			Type = UserType.Admin,
		}, "ITAM_ADMIN228");
		
		
	}
	catch (Exception)
	{
		// ignored
	}

	try
	{
		var users = Enumerable.Range(0, 40).Select(i => new User()
		{
			UserName = $"TestUser{i}",
			FullName = Faker.Name.FullName(),
			Telegram = $"TestUser{i}",
			Type = UserType.Participant
		}).ToList();
		foreach (var user in users)
		{
			var result = await userManager.CreateAsync(user, "MrBen228_");
		}
		
		context.Teams.AddRange(context.Users.Where(x=>x.Type == UserType.Participant).ToList().ChunkRandom(5).Select((members, i) =>
		{
			var enumerable = members as User[] ?? members.ToArray();
			var team = new Team()
			{
				Id = Guid.NewGuid(),
				Leader = enumerable.First(),
				Members = enumerable.Skip(1).ToList(),
				Name = Faker.Company.Name(),
				CreatedAt = DateTime.UtcNow,
			};
				
			enumerable.First().Teams.Add(team);

			return team;
		}));

		await context.SaveChangesAsync();

		foreach (var arr in context.Teams.ToList().OrderBy(_ => Guid.NewGuid()).Chunk(8))
		{
			var team = arr.ToArray();
			if(team.Length < 3)
				break;
			var date = DateTime.UtcNow.AddDays(-Random.Shared.Next(1000));
			var id = Guid.NewGuid();
			context.Hackathons.Add(new Hackathon()
			{
				Id = id,
				Name = $"ITAM - {Faker.Country.Name()}",
				Description = Faker.Lorem.Paragraph(),
				StartDate = date,
				EndDate = date.AddDays(Random.Shared.Next(10)),
				HackathonResults = new HackathonResults()
				{
					Id = Guid.NewGuid(),
					FirstPlace = new HackathonSolution()
					{
						Id = Guid.NewGuid(),
						 Team = team[0],
						 Description = Faker.Lorem.Paragraph(),
						 Link = "https://github.com/ISBronny/FlueFlame",
						 DispatchTime = date.AddDays(1),
						 HackathonId = id,
						 
					},
					SecondPlace = new HackathonSolution()
					{
						Id = Guid.NewGuid(),
						Team = team[1],
						Description = Faker.Lorem.Paragraph(),
						Link = "https://github.com/ISBronny/FlueFlame",
						DispatchTime = date.AddDays(1),
						HackathonId = id,
					},
					ThirdPlace = new HackathonSolution()
					{
						Id = Guid.NewGuid(),
						Team = team[2],
						Description = Faker.Lorem.Paragraph(),
						Link = "https://github.com/ISBronny/FlueFlame",
						DispatchTime = date.AddDays(1),
						HackathonId = id,
					}
				},
				ImageObjectName = "",
				Teams = team.ToList()
			});
		}

		await context.SaveChangesAsync();
	}
	catch (Exception)
	{
		// ignored
	}
}

app.Run();

public static class EnumerableExtensions
{
	public static IEnumerable<IEnumerable<T>> ChunkRandom<T>(this IEnumerable<T> array, int size)
	{
		var list = array.ToList();
		var pointer = 0;
		while (pointer < list.Count)
		{
			var take = 1 + Random.Shared.Next(size - 1);
			yield return list.Skip(pointer).Take(take);
			pointer += take;
		}

	}
}