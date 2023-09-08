using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Itam.Dima.Domain.Models;
using Itam.Dima.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Minio;

namespace Itam.Dima.Api.Controllers;

[ApiController]
[Route("images")]
public class ImagesController : Controller
{
	private readonly MinioClient _minioClient;

	public ImagesController(MinioClient minioClient)
	{
		_minioClient = minioClient;
	}

	private const string BucketName = "hackimages";

	[HttpGet("{id}")]
	public async Task<IActionResult> GetImage([FromRoute] string id)
	{
		Stream stream = new MemoryStream();
		var file = await _minioClient.GetObjectAsync(new GetObjectArgs()
			.WithObject(id)
			.WithBucket(BucketName)
			.WithCallbackStream(x=>x.CopyTo(stream)));

		stream.Position = 0;
		return File(stream, file.ContentType);
	}

	[HttpPost]
	public async Task<IActionResult> CreateImage(IFormFile file)
	{
		if (!ModelState.IsValid) return BadRequest(ModelState);
        
		var beArgs = new BucketExistsArgs()
			.WithBucket(BucketName);
		
		var found = await _minioClient.BucketExistsAsync(beArgs).ConfigureAwait(false);
		if (!found)
		{
			var mbArgs = new MakeBucketArgs()
				.WithBucket(BucketName);
			await _minioClient.MakeBucketAsync(mbArgs).ConfigureAwait(false);
		}
		
		// Upload a file to bucket.
		var putObjectArgs = new PutObjectArgs()
			.WithObject(Path.GetRandomFileName())
			.WithBucket(BucketName)
			.WithObjectSize(file.Length)
			.WithStreamData(file.OpenReadStream())
			.WithContentType(file.ContentType);

		var response = await _minioClient.PutObjectAsync(putObjectArgs);
		
		return Ok(response.ObjectName);
	}
}

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

public class CreateHackRequest
{
	[FromForm(Name = "name")]
	[JsonPropertyName("name")]
	public string Name { get; set; }
	
	[FromForm(Name = "description")]
	[JsonPropertyName("description")]
	public string Description { get; set; }
	
	[JsonPropertyName("startDate")]
	public DateTime StartDate { get; set; }
	
	[JsonPropertyName("endDate")]
	public DateTime EndDate { get; set; } 
	
	[JsonPropertyName("objectName")]
	public string ObjectName { get; set; }
}