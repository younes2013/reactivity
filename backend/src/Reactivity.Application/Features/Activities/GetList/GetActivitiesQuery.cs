using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivity.Application.Common.Interfaces;

namespace Reactivity.Application.Features.Activities.GetList;

public record GetActivitiesQuery : IRequest<List<ActivityDto>>;

public class GetActivitiesQueryHandler(IApplicationDbContext context)
    : IRequestHandler<GetActivitiesQuery, List<ActivityDto>>
{
    public Task<List<ActivityDto>> Handle(GetActivitiesQuery request, CancellationToken cancellationToken)
        => context.Activities
            .OrderBy(a => a.Date)
            .Select(a => new ActivityDto(
                a.Id, a.Title, a.Date, a.Description, a.Category, a.IsCancelled,
                a.City, a.Venue, a.Latitude, a.Longitude, a.OwnerId, a.Inscriptions.Count))
            .ToListAsync(cancellationToken);
}
