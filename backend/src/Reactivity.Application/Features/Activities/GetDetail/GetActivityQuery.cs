using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivity.Application.Common.Exceptions;
using Reactivity.Application.Common.Interfaces;
using Reactivity.Domain.Entities;

namespace Reactivity.Application.Features.Activities.GetDetail;

public record GetActivityQuery(string Id) : IRequest<ActivityDto>;

public class GetActivityQueryHandler(IApplicationDbContext context)
    : IRequestHandler<GetActivityQuery, ActivityDto>
{
    public async Task<ActivityDto> Handle(GetActivityQuery request, CancellationToken cancellationToken)
    {
        var activity = await context.Activities
            .Where(a => a.Id == request.Id)
            .Select(a => new ActivityDto(
                a.Id, a.Title, a.Date, a.Description, a.Category, a.IsCancelled,
                a.City, a.Venue, a.Latitude, a.Longitude, a.OwnerId, a.Inscriptions.Count))
            .FirstOrDefaultAsync(cancellationToken);

        return activity ?? throw new NotFoundException(nameof(Activity), request.Id);
    }
}
