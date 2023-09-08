using AutoMapper;
using Itam.Dima.Domain.Models;
using Itam.Dima.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace Itam.Dima.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class StudentsController : Controller
{
	private readonly AppDbContext _context;
	private readonly IMapper _mapper;

	public StudentsController(AppDbContext context, IMapper mapper)
	{
		_context = context;
		_mapper = mapper;
		
	}

	[HttpGet]
	public ActionResult<IEnumerable<ParticipantViewModel>> GetAllParticipants()
	{
		var users = _context.Users.Where(x => x.Type == UserType.Participant).ToList();
		var response = _mapper.Map<IEnumerable<ParticipantViewModel>>(users);

		return Ok(response);

	}
}

public class ParticipantViewModel
{
	public string Telegram { get; set; }
	public string Email { get; set; }
	public string PhoneNumber { get; set; }
	public string FullName { get; set; }
}