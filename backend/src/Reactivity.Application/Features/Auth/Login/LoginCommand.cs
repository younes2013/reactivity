using FluentValidation;
using MediatR;
using Reactivity.Application.Common.Interfaces;
using Reactivity.Application.Common.Models;

namespace Reactivity.Application.Features.Auth.Login;

public record LoginCommand(string Email, string Password) : IRequest<AuthResult>;

public class LoginCommandHandler(IIdentityService identityService) : IRequestHandler<LoginCommand, AuthResult>
{
    public Task<AuthResult> Handle(LoginCommand request, CancellationToken cancellationToken)
        => identityService.LoginAsync(request.Email, request.Password, cancellationToken);
}

public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty();
    }
}
