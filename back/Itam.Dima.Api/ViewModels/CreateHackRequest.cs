using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

namespace Itam.Dima.Api.Controllers;

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