using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Itam.Dima.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class StudentsController : ControllerBase
{
	private readonly IMediator _mediator;
	private readonly IMapper _mapper;

	public StudentsController(IMediator mediator, IMapper mapper)
	{
		_mediator = mediator;
		_mapper = mapper;
	}
}