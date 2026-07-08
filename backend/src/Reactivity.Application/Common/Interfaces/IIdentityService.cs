using Reactivity.Application.Common.Models;

namespace Reactivity.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<AuthResult> RegisterAsync(string email, string password, string displayName, CancellationToken cancellationToken);
    Task<AuthResult> LoginAsync(string email, string password, CancellationToken cancellationToken);
    Task<AuthResult> RefreshAsync(string accessToken, string refreshToken, CancellationToken cancellationToken);
    Task LogoutAsync(string userId, CancellationToken cancellationToken);
}
