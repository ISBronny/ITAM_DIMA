using AutoMapper;
using Itam.Dima.Domain.Models;
using Itam.Dima.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Itam.Dima.Api.Controllers;

[ApiController]
public class ParticipantsController : Controller
{
	private readonly AppDbContext _context;
	private readonly UserManager<User> _userManager;

	public ParticipantsController(AppDbContext context, UserManager<User> userManager)
	{
		_context = context;
		_userManager = userManager;
	}

	[HttpGet("participants")]
	public async Task<IActionResult> GetAllParticipants()
	{
		var users = await _context.Users.Where(x => x.Type == UserType.Participant)
			.Include(x=>x.Teams)
			.ThenInclude(x=>x.Leader)
			.Select(x=>new
			{
				name=x.FullName,
				id=x.Id,
				telegram=x.Telegram,
				participations=_context.Hackathons.Count(h => h.Teams.Any(t => t.Leader.Telegram == x.Telegram || t.Members.Any(m => m.Telegram == x.Telegram))),
				teams= x.Teams.Select(t=>new
				{
					id=t.Id,
					name=t.Name,
					cratedAt=t.CreatedAt,
					leader=t.Leader
				})
			})
			.ToListAsync();
		
		return Ok(users);
	}

	[HttpGet("participant/{login}")]
	public async Task<IActionResult> GetParticipant(string login)
	{
		var user = await _context.Users
			.Include(x => x.Teams)
			.ThenInclude(x => x.Leader)
			.Where(x => x.Type == UserType.Participant)
			.FirstAsync(x => x.Telegram == login);

		var hacks = await _context.Hackathons.Where(h =>
				h.Teams.Any(t => t.Leader.Telegram == user.Telegram || t.Members.Any(m => m.Telegram == user.Telegram)))
			.Include(hackathon => hackathon.HackathonResults).ToListAsync();

		return Ok(new
		{
			name = user.FullName,
			id = user.Id,
			telegram = user.Telegram,
			teams = user.Teams.Select(t => new
			{
				id = t.Id,
				name = t.Name,
				cratedAt = t.CreatedAt,
				leader = t.Leader.Telegram
			}),
			hacks = hacks.Select(h =>new {
				id=h.Id,
				name=h.Name,
				startDate=h.StartDate,
				endDate=h.EndDate
			})
		});
	}
	
	
	[HttpGet("participant/team/{team}")]
	public async Task<IActionResult> GetParticipantByTeam([FromRoute] string team)
	{
		var id = Guid.Parse(team);
		var t = await _context.Teams
			.Include(x=>x.Leader)
			.Include(x=>x.Members)
			.FirstAsync(x => x.Id == id);

		return Ok(t.Members.Select(x => new
		{
			name = x.FullName,
			id = x.Id,
			telegram = x.Telegram,
		}));
	}
}