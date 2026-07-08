using FluentValidation;
using MediatR;
using Reactivity.Application.Common.Exceptions;
using Reactivity.Application.Common.Interfaces;
using Reactivity.Domain.Entities;

namespace Reactivity.Application.Features.Activities.Update;

public record UpdateActivityCommand(
    string Id,
    string Title,
    DateTime Date,
    string Description,
    string Category,
    bool IsCancelled,
    string City,
    string Venue,
    double Latitude,
    double Longitude) : IRequest;

public class UpdateActivityCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
    : IRequestHandler<UpdateActivityCommand>
{
    public async Task Handle(UpdateActivityCommand request, CancellationToken cancellationToken)
    {
        var activity = await context.Activities.FindAsync([request.Id], cancellationToken)
            ?? throw new NotFoundException(nameof(Activity), request.Id);

        if (activity.OwnerId != currentUser.UserId)
        {
            throw new ForbiddenAccessException("Seul le créateur de l'activité peut la modifier.");
        }

        activity.Title = request.Title;
        activity.Date = request.Date;
        activity.Description = request.Description;
        activity.Category = request.Category;
        activity.IsCancelled = request.IsCancelled;
        activity.City = request.City;
        activity.Venue = request.Venue;
        activity.Latitude = request.Latitude;
        activity.Longitude = request.Longitude;

        await context.SaveChangesAsync(cancellationToken);
    }
}

public class UpdateActivityCommandValidator : AbstractValidator<UpdateActivityCommand>
{
    public UpdateActivityCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Title).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Description).NotEmpty().MaximumLength(2000);
        RuleFor(x => x.Category).NotEmpty().MaximumLength(50);
        RuleFor(x => x.City).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Venue).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Latitude).InclusiveBetween(-90, 90);
        RuleFor(x => x.Longitude).InclusiveBetween(-180, 180);
    }
}
