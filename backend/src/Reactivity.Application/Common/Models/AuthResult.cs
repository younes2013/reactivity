namespace Reactivity.Application.Common.Models;

public record AuthResult(string AccessToken, string RefreshToken, DateTime ExpiresAt);
