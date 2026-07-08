using Microsoft.AspNetCore.Identity;

namespace Reactivity.Infrastructure.Identity;

public class ApplicationUser : IdentityUser
{
    public required string DisplayName { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiresAt { get; set; }
}
