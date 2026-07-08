using FluentValidation;
using MediatR;
using Reactivity.Application.Common.Interfaces;
using Reactivity.Domain.Entities;

namespace Reactivity.Application.Features.Activities.Create;

public record CreateActivityCommand(
    string Title,
    DateTime Date,
    string Description,
    string Category,
    string City,
    string Venue,
    double Latitude,
    double Longitude) : IRequest<string>;

public class CreateActivityCommandHandler(IApplicationDbContext context, ICurrentUserService currentUser)
    : IRequestHandler<CreateActivityCommand, string>
{
    public async Task<string> Handle(CreateActivityCommand request, CancellationToken cancellationToken)
    {
        var activity = new Activity
        {
            Title = request.Title,
            Date = request.Date,
            Description = request.Description,
            Category = request.Category,
            City = request.City,
            Venue = request.Venue,
            Latitude = request.Latitude,
            Longitude = request.Longitude,
            OwnerId = currentUser.UserId!
        };

        context.Activities.Add(activity);
        await context.SaveChangesAsync(cancellationToken);

        return activity.Id;
    }
}

public class CreateActivityCommandValidator : AbstractValidator<CreateActivityCommand>
{
    public CreateActivityCommandValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Description).NotEmpty().MaximumLength(2000);
        RuleFor(x => x.Category).NotEmpty().MaximumLength(50);
        RuleFor(x => x.City).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Venue).NotEmpty().MaximumLength(200);
        RuleFor(x => x.Date).GreaterThan(DateTime.UtcNow).WithMessage("La date doit être dans le futur.");
        RuleFor(x => x.Latitude).InclusiveBetween(-90, 90);
        RuleFor(x => x.Longitude).InclusiveBetween(-180, 180);
    }
}
