using System.ComponentModel.DataAnnotations;

namespace Itam.Dima.Api.Controllers;

public class RegisterViewModel
{
	[Required]
	public string FullName { get; set; }
	
	[Required]
	public string Telegram { get; set; }
    
	public string? Email { get; set; }
	
	public string? PhoneNumber { get; set; }
	
	[Required]
	[DataType(DataType.Password)]
	public string Password { get; set; }
 
	[Required]
	[Compare("Password", ErrorMessage = "Пароли не совпадают")]
	[DataType(DataType.Password)]
	public string PasswordConfirm { get; set; }
}