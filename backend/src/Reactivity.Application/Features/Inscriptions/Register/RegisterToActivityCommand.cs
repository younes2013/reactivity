using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivity.Application.Common.Exceptions;
using Reactivity.Application.Common.Interfaces;
using Reactivity.Domain.Entities;

namespace Reactivity.Application.Features.Inscriptions.Register;

public record RegisterToActivityCommand(string ActivityId) : IRequest<string>;

public class RegisterToActivityCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
    : IRequestHandler<RegisterToActivityCommand, string>
{
    public async Task<string> Handle(RegisterToActivityCommand request, CancellationToken cancellationToken)
    {
        var activityExists = await context.Activities.AnyAsync(a => a.Id == request.ActivityId, cancellationToken);
        if (!activityExists)
        {
            throw new NotFoundException(nameof(Activity), request.ActivityId);
        }

        var userId = currentUser.UserId!;

        var alreadyRegistered = await context.Inscriptions
            .AnyAsync(i => i.ActivityId == request.ActivityId && i.UserId == userId, cancellationToken);
        if (alreadyRegistered)
        {
            throw new ConflictException("Vous êtes déjà inscrit à cette activité.");
        }

        var inscription = new Inscription
        {
            ActivityId = request.ActivityId,
            UserId = userId
        };

        context.Inscriptions.Add(inscription);
        await context.SaveChangesAsync(cancellationToken);

        return inscription.Id;
    }
}

public class RegisterToActivityCommandValidator : AbstractValidator<RegisterToActivityCommand>
{
    public RegisterToActivityCommandValidator()
    {
        RuleFor(x => x.ActivityId).NotEmpty();
    }
}
