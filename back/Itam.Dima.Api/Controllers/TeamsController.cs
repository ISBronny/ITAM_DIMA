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
		var hacks = await _context.Hackathons.ToListAsync();
		hacks.Reverse();
		return Ok(hacks);
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

		return Ok(team);
	}
}