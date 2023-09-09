using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Itam.Dima.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Itam.Dima.Api.Controllers;

[AllowAnonymous]
public class AccountController : Controller
{
	private readonly UserManager<User> _userManager;
	private readonly SignInManager<User> _signInManager;
 
	public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
	{
		_userManager = userManager;
		_signInManager = signInManager;
	}
	
	[HttpPost("register")]
	public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
	{
		if (!ModelState.IsValid) return BadRequest(ModelState);
		
		var user = new User
		{
			Email = model.Email, 
			UserName = model.Telegram, 
			FullName = model.FullName,
			NormalizedUserName = model.FullName,
			PhoneNumber = model.PhoneNumber,
			Telegram = model.Telegram,
			Type = UserType.Participant
		};
			
		var result = await _userManager.CreateAsync(user, model.Password);
		if (result.Succeeded)
		{
			await _signInManager.SignInAsync(user, false);
			return Ok(GetToken(user.Type));
		}

		foreach (var error in result.Errors)
		{
			ModelState.AddModelError(string.Empty, error.Description);
		}

		return BadRequest(ModelState);
	}
	
	[HttpPost("login")]
	public async Task<IActionResult> Login([FromBody] LoginViewModel model)
	{
		if (!ModelState.IsValid) return BadRequest(model);
		
		var result = 
			await _signInManager.PasswordSignInAsync(model.Telegram, model.Password, model.RememberMe, false);
		
		if (result.Succeeded)
			return Ok(GetToken(_userManager.Users.First(x=>x.UserName == model.Telegram).Type));
		
		ModelState.AddModelError("", "Неправильный логин и (или) пароль");
		
		return BadRequest(model);
	}
 
	[HttpPost]
	public async Task<IActionResult> Logout()
	{
		await _signInManager.SignOutAsync();
		return Ok();
	}
	
	private static string GetToken(UserType type)
	{

		var token = new JwtSecurityToken(
			new JwtHeader(),
			new JwtPayload(AuthOptions.ISSUER, AuthOptions.AUDIENCE, Array.Empty<Claim>(),  null, DateTime.Now.AddYears(1))
		);

		token.Payload["type"] = type.ToString();

		return new JwtSecurityTokenHandler().WriteToken(token);;
	}
}