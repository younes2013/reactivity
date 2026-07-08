using MediatR;
using Reactivity.Application.Common.Interfaces;

namespace Reactivity.Application.Features.Auth.Logout;

public record LogoutCommand(string UserId) : IRequest;

public class LogoutCommandHandler(IIdentityService identityService) : IRequestHandler<LogoutCommand>
{
    public Task Handle(LogoutCommand request, CancellationToken cancellationToken)
        => identityService.LogoutAsync(request.UserId, cancellationToken);
}
