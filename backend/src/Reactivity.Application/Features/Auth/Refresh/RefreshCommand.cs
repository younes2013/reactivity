using FluentValidation;
using MediatR;
using Reactivity.Application.Common.Interfaces;
using Reactivity.Application.Common.Models;

namespace Reactivity.Application.Features.Auth.Refresh;

public record RefreshCommand(string AccessToken, string RefreshToken) : IRequest<AuthResult>;

public class RefreshCommandHandler(IIdentityService identityService) : IRequestHandler<RefreshCommand, AuthResult>
{
    public Task<AuthResult> Handle(RefreshCommand request, CancellationToken cancellationToken)
        => identityService.RefreshAsync(request.AccessToken, request.RefreshToken, cancellationToken);
}

public class RefreshCommandValidator : AbstractValidator<RefreshCommand>
{
    public RefreshCommandValidator()
    {
        RuleFor(x => x.AccessToken).NotEmpty();
        RuleFor(x => x.RefreshToken).NotEmpty();
    }
}
