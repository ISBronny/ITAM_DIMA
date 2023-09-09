using System.ComponentModel.DataAnnotations;

namespace Itam.Dima.Api.Controllers;

public class CreateTeamRequest
{
	[Required]
	public string Name { get; set; }
	
	[Required]
	public string LeaderUserName { get; set; }
	
	
	[Required]
	public string[] MemberUserNames { get; set; }
}