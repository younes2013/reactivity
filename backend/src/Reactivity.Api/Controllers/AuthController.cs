using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reactivity.Application.Common.Models;
using Reactivity.Application.Features.Auth.Login;
using Reactivity.Application.Features.Auth.Logout;
using Reactivity.Application.Features.Auth.Refresh;
using Reactivity.Application.Features.Auth.Register;

namespace Reactivity.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IMediator mediator) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResult>> Register(RegisterCommand command, CancellationToken cancellationToken)
        => await mediator.Send(command, cancellationToken);

    [HttpPost("login")]
    public async Task<ActionResult<AuthResult>> Login(LoginCommand command, CancellationToken cancellationToken)
        => await mediator.Send(command, cancellationToken);

    [HttpPost("refresh")]
    public async Task<ActionResult<AuthResult>> Refresh(RefreshCommand command, CancellationToken cancellationToken)
        => await mediator.Send(command, cancellationToken);

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout(CancellationToken cancellationToken)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
        await mediator.Send(new LogoutCommand(userId), cancellationToken);
        return NoContent();
    }
}
