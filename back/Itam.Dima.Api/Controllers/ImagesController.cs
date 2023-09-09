using Microsoft.AspNetCore.Mvc;
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