using Itam.Dima.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

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
	
	[HttpPost]
	public async Task<IActionResult> Register(RegisterViewModel model)
	{
		if (!ModelState.IsValid) return BadRequest(ModelState);
		
		var user = new User
		{
			Email = model.Email, 
			UserName = model.Email, 
			NormalizedUserName = model.FullName,
			PhoneNumber = model.PhoneNumber,
			Telegram = model.Telegram
		};
			
		var result = await _userManager.CreateAsync(user, model.Password);
		if (result.Succeeded)
		{
			await _signInManager.SignInAsync(user, false);
			return Ok();
		}

		foreach (var error in result.Errors)
		{
			ModelState.AddModelError(string.Empty, error.Description);
		}

		return BadRequest(ModelState);
	}
	
	[HttpPost]
	public async Task<IActionResult> Login(LoginViewModel model)
	{
		if (ModelState.IsValid)
		{
			var result = 
				await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, false);
			if (result.Succeeded)
			{
				return Ok();
			}
			else
			{
				ModelState.AddModelError("", "Неправильный логин и (или) пароль");
			}
		}
		return BadRequest(model);
	}
 
	[HttpPost]
	public async Task<IActionResult> Logout()
	{
		await _signInManager.SignOutAsync();
		return Ok();
	}
}