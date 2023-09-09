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