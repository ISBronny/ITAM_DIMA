using Itam.Dima.Domain.Models;
using Itam.Dima.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Itam.Dima.Api.Controllers;

[ApiController]
[Route("teams")]
public class TeamsController : Controller
{
	private readonly AppDbContext _context;

	public TeamsController(AppDbContext context)
	{
		_context = context;
	}

	[HttpGet]
	[AllowAnonymous]
	public async Task<ActionResult> GetAll()
	{
		var teams = await _context.Teams.Include(x => x.Hackathons)
			.Include(team => team.Leader)
			.Include(team => team.Members)
			.OrderBy(x=>x.Name)
			.ToListAsync();
		
		return Ok(teams.Select(t=> new
		{
			id=t.Id,
			name=t.Name,
			leader=t.Leader.Telegram,
			createdAt=t.CreatedAt,
			membersCount = t.Members.Count,
			members = t.Members.Select(x => new
			{
				telegram=x.Telegram,
				fullName=x.FullName,
				email=x.Email,
				number=x.PhoneNumber
			})
		}));
	}
	
	[HttpGet("user/{login}")]
	[AllowAnonymous]
	public async Task<ActionResult> GetForUser([FromRoute] string login)
	{
		var teams = await _context.Users.Where(x => x.Telegram == login)
			.Include(x => x.Teams)
			.ThenInclude(x=>x.Leader)
			.Include(x => x.Teams)
			.ThenInclude(x=>x.Members)
			.SelectMany(x => x.Teams)
			.ToListAsync();
			
		
		return Ok(teams.Select(t=> new
		{
			id=t.Id,
			name=t.Name,
			leader=t.Leader.Telegram,
			createdAt=t.CreatedAt,
			membersCount = t.Members.Count,
			members = t.Members.Select(x => new
			{
				telegram=x.Telegram,
				fullName=x.FullName,
				email=x.Email,
				number=x.PhoneNumber
			})
		}));
	}
	
	[HttpGet("{id}")]
	[AllowAnonymous]
	public async Task<ActionResult> GetTeam([FromRoute] string id)
	{
		var guid = Guid.Parse(id);
		var team = await _context.Teams
			.Include(x=>x.Members)
			.Include(x=>x.Leader)
			.FirstAsync(x => x.Id == guid);

		team.Leader.Teams = null;
		foreach (var teamMember in team.Members)
		{
			teamMember.Teams = null;
		}
            
		return Ok(team);
	}
	
	[HttpPost]
	[AllowAnonymous]
	public async Task<IActionResult> Create(CreateTeamRequest request)
	{
		if (!ModelState.IsValid) return BadRequest(ModelState);

		var leader = await _context.Users.FirstAsync(x => x.UserName == request.LeaderUserName);

		var members = await _context.Users.Where(x => request.MemberUserNames.Contains(x.UserName)).ToListAsync();
        
		var team = _context.Teams.Add(new Team()
		{
			Id = Guid.NewGuid(),
			Name = request.Name,
			Leader = leader,
			Members = members,
		});

		await _context.SaveChangesAsync();

		return Ok();
	}
}