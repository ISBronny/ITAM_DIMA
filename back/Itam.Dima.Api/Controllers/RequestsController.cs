using Itam.Dima.Domain.Models;
using Itam.Dima.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Itam.Dima.Api.Controllers;

[ApiController]
[Route("requests")]
public class RequestsController : Controller
{
	private readonly AppDbContext _context;

	public RequestsController(AppDbContext context)
	{
		_context = context;
	}
	
	[HttpGet]
	public async Task<IActionResult> GetRequests()
	{
		IQueryable<Request> query = _context.Requests.Include(x => x.User);

		return Ok(await query.ToListAsync());
	}
	
	[HttpGet("{user}")]
	public async Task<IActionResult> GetRequestsForUser([FromRoute] string? user = null)
	{
		if (string.IsNullOrWhiteSpace(user))
			return BadRequest();

		var query = _context.Requests.Include(x => x.User)
			.Where(x => x.User.Telegram == user);

		return Ok(await query.ToListAsync());
	}
	

	[HttpPost]
	public async Task<IActionResult> CreatRequest([FromBody] CreateRequestViewModel request)
	{
		var user = await _context.Users.FirstAsync(x => x.Telegram == request.UserLogin);
		_context.Requests.Add(new Request()
		{
			Id = Guid.NewGuid(),
			Name = request.Name,
			Description = request.Description,
			User = user,
			CreatedAt = DateTime.UtcNow,
			Status = RequestStatus.Pending
		});

		await _context.SaveChangesAsync();
		
		return Ok();
	}
}

public class CreateRequestViewModel
{
	public string Name { get; set; }
	public string Description { get; set; }
	public string UserLogin { get; set; }
}
