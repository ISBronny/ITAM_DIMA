using System.Text;
using Microsoft.IdentityModel.Tokens;

public class AuthOptions
{
	public const string ISSUER = "ITAM_DIMA"; // издатель токена
	public const string AUDIENCE = "ITAM_FRONT"; // потребитель токена
	const string KEY = "mysupersecret_secretkey!123";   // ключ для шифрации
	public const int LIFETIME = 1; // время жизни токена - 1 минута
	public static SymmetricSecurityKey GetSymmetricSecurityKey()
	{
		return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
	}
}