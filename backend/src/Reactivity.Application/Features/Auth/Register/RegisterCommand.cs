using FluentValidation;
using MediatR;
using Reactivity.Application.Common.Interfaces;
using Reactivity.Application.Common.Models;

namespace Reactivity.Application.Features.Auth.Register;

public record RegisterCommand(string Email, string Password, string DisplayName) : IRequest<AuthResult>;

public class RegisterCommandHandler(IIdentityService identityService) : IRequestHandler<RegisterCommand, AuthResult>
{
    public Task<AuthResult> Handle(RegisterCommand request, CancellationToken cancellationToken)
        => identityService.RegisterAsync(request.Email, request.Password, request.DisplayName, cancellationToken);
}

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty().MinimumLength(8);
        RuleFor(x => x.DisplayName).NotEmpty().MaximumLength(50);
    }
}
