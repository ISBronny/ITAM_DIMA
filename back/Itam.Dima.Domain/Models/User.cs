using Microsoft.AspNetCore.Identity;

namespace Itam.Dima.Domain.Models;

public class User : IdentityUser
{
	public List<Team> Teams { get; set; }
	public List<Specialization> Specializations { get; set; }
	public string Telegram { get; set; }
	public UserType Type { get; set; }
}

public enum UserType
{
	Admin,
	Participant
}

public class Team
{
	public Guid Id { get; set; }
	public string Name { get; set; }
	public User Leader { get; set; }
	public List<User> Members { get; set; }
	public List<Hackathon> Hackathons { get; set; }

}

public enum Specialization
{
	Backend,
	Frontend,
	Design,
	Ml
}

public class Hackathon
{
	public Guid Id { get; set; }
	public string Name { get; set; }
	public string Description { get; set; }
	public List<Team> Teams { get; set; }
	public DateTime StartDate { get; set; }
	public DateTime EndDate { get; set; }
	public HackathonResults? HackathonResults { get; set; }
}

public class HackathonResults
{
	public Guid Id { get; set; }
	public Hackathon Hackathon { get; set; }
	public HackathonSolution FirstPlace { get; set; }
	public HackathonSolution SecondPlace { get; set; }
	public HackathonSolution ThirdPlace { get; set; }
}

public class HackathonSolution
{
	public Guid Id { get; set; }
	public Team Team { get; set; }
	public Hackathon Hackathon { get; set; }
	public string Description { get; set; }
	public string Link { get; set; }
	public DateTime DispatchTime { get; set; }
}
