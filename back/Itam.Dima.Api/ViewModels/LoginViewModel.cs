using System.ComponentModel.DataAnnotations;

namespace Itam.Dima.Api.Controllers;

public class LoginViewModel
{
	[Required]
	public string Telegram { get; set; }
         
	[Required]
	[DataType(DataType.Password)]
	public string Password { get; set; }

	public bool RememberMe { get; set; } = true;
}