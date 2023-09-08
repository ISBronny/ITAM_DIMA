using Itam.Dima.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Itam.Dima.Infrastructure;

public class AppDbContext : IdentityDbContext<User>
{
	public AppDbContext(DbContextOptions<AppDbContext> options)
		: base(options)
	{
		Database.EnsureCreated();
	}
	public DbSet<Team> Teams { get; set; }
	public DbSet<Team> Hackathons { get; set; }
	public DbSet<Team> HackathonResults { get; set; }
	public DbSet<Team> HackathonSolution { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		//Team
		modelBuilder.Entity<Team>()
			.HasKey(x => x.Id);
		
		modelBuilder.Entity<Team>()
			.HasMany(x => x.Members)
			.WithMany(x => x.Teams);
        
		//Hackathon
		modelBuilder.Entity<Hackathon>()
			.HasKey(x => x.Id);
		
		modelBuilder.Entity<Hackathon>()
			.HasMany(x => x.Teams)
			.WithMany(x => x.Hackathons);

		modelBuilder.Entity<Hackathon>()
			.HasOne(x => x.HackathonResults)
			.WithOne(x => x.Hackathon);
		
		//HackathonResults
		modelBuilder.Entity<HackathonResults>()
			.HasKey(x => x.Id);

		modelBuilder.Entity<HackathonResults>()
			.HasOne(x => x.FirstPlace);
		modelBuilder.Entity<HackathonResults>()
			.HasOne(x => x.SecondPlace);
		modelBuilder.Entity<HackathonResults>()
			.HasOne(x => x.ThirdPlace);
		
		//HackathonSolution
		modelBuilder.Entity<HackathonSolution>()
			.HasKey(x => x.Id);
		
		modelBuilder.Entity<HackathonSolution>()
			.HasOne(x => x.Team);
		modelBuilder.Entity<HackathonSolution>()
			.HasOne(x => x.Hackathon);
	}
}