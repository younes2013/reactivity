using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Reactivity.Application.Common.Exceptions;
using Reactivity.Application.Common.Interfaces;
using Reactivity.Application.Common.Models;

namespace Reactivity.Infrastructure.Identity;

public class IdentityService(
    UserManager<ApplicationUser> userManager,
    JwtTokenGenerator tokenGenerator,
    JwtSettings jwtSettings) : IIdentityService
{
    public async Task<AuthResult> RegisterAsync(string email, string password, string displayName, CancellationToken cancellationToken)
    {
        var existing = await userManager.FindByEmailAsync(email);
        if (existing is not null)
        {
            throw new AuthenticationException("Un compte existe déjà avec cet email.");
        }

        var user = new ApplicationUser
        {
            UserName = email,
            Email = email,
            DisplayName = displayName
        };

        var result = await userManager.CreateAsync(user, password);
        if (!result.Succeeded)
        {
            throw new AuthenticationException(string.Join(" ", result.Errors.Select(e => e.Description)));
        }

        return await IssueTokensAsync(user);
    }

    public async Task<AuthResult> LoginAsync(string email, string password, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(email);
        if (user is null || !await userManager.CheckPasswordAsync(user, password))
        {
            throw new AuthenticationException("Email ou mot de passe incorrect.");
        }

        return await IssueTokensAsync(user);
    }

    public async Task<AuthResult> RefreshAsync(string accessToken, string refreshToken, CancellationToken cancellationToken)
    {
        var principal = tokenGenerator.GetPrincipalFromExpiredToken(accessToken);
        var userId = principal.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (userId is null)
        {
            throw new AuthenticationException("Token invalide.");
        }

        var user = await userManager.FindByIdAsync(userId);
        if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiresAt <= DateTime.UtcNow)
        {
            throw new AuthenticationException("Refresh token invalide ou expiré.");
        }

        return await IssueTokensAsync(user);
    }

    public async Task LogoutAsync(string userId, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByIdAsync(userId);
        if (user is null)
        {
            return;
        }

        user.RefreshToken = null;
        user.RefreshTokenExpiresAt = null;
        await userManager.UpdateAsync(user);
    }

    private async Task<AuthResult> IssueTokensAsync(ApplicationUser user)
    {
        var (accessToken, expiresAt) = tokenGenerator.CreateToken(user);
        var refreshToken = JwtTokenGenerator.CreateRefreshToken();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(jwtSettings.RefreshTokenExpiryDays);
        await userManager.UpdateAsync(user);

        return new AuthResult(accessToken, refreshToken, expiresAt);
    }
}
