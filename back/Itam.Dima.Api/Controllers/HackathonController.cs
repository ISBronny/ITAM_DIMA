using System.Runtime.InteropServices.JavaScript;
using Itam.Dima.Domain.Models;
using Itam.Dima.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Itam.Dima.Api.Controllers;

[ApiController]
[Route("hackathon")]
public class HackathonController : Controller
{
	private readonly AppDbContext _context;

	public HackathonController(AppDbContext context)
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
	
	[HttpGet("user/{login}")]
	[AllowAnonymous]
	public async Task<ActionResult> GetForUser([FromRoute(Name = "login")] string login)
	{
		var u = await _context.Users
			.Include(x=>x.Teams)
			.ThenInclude(x=>x.Hackathons)
			.ThenInclude(x=>x.HackathonResults)
			.FirstAsync(x => x.Telegram == login);
		
		return Ok(u.Teams.Where(t=>t.Leader.Telegram == u.Telegram).SelectMany(x=>x.Hackathons).Select(h=> new
		{
			id=h.Id,
			results=h.HackathonResults,
			name=h.Name,
			role="leader",
			startDate=h.StartDate,
			endDate=h.EndDate
		}).Concat(u.Teams.Where(t=>t.Leader.Telegram != u.Telegram).SelectMany(x=>x.Hackathons).Select(h=> new
		{
			id=h.Id,
			results=h.HackathonResults,
			name=h.Name,
			role="member",
			startDate=h.StartDate,
			endDate=h.EndDate
		})));
	}
	
	[HttpPost]
	public async Task<IActionResult> Create(CreateHackRequest request)
	{
		if (!ModelState.IsValid) return BadRequest(ModelState);
			
		var hack = _context.Hackathons.Add(new Hackathon
		{
			Id = Guid.NewGuid(),
			Name = request.Name,
			Description = request.Description,
			StartDate = request.StartDate,
			EndDate = request.EndDate,
			ImageObjectName = request.ObjectName
		});

		await _context.SaveChangesAsync();

		return Ok(hack.Entity.Id);
	}
}