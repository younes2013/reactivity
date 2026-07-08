using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivity.Application.Common.Exceptions;
using Reactivity.Application.Common.Interfaces;
using Reactivity.Domain.Entities;

namespace Reactivity.Application.Features.Inscriptions.Unregister;

public record UnregisterFromActivityCommand(string ActivityId) : IRequest;

public class UnregisterFromActivityCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
    : IRequestHandler<UnregisterFromActivityCommand>
{
    public async Task Handle(UnregisterFromActivityCommand request, CancellationToken cancellationToken)
    {
        var userId = currentUser.UserId!;

        var inscription = await context.Inscriptions
            .FirstOrDefaultAsync(i => i.ActivityId == request.ActivityId && i.UserId == userId, cancellationToken)
            ?? throw new NotFoundException(nameof(Inscription), request.ActivityId);

        context.Inscriptions.Remove(inscription);
        await context.SaveChangesAsync(cancellationToken);
    }
}

public class UnregisterFromActivityCommandValidator : AbstractValidator<UnregisterFromActivityCommand>
{
    public UnregisterFromActivityCommandValidator()
    {
        RuleFor(x => x.ActivityId).NotEmpty();
    }
}
