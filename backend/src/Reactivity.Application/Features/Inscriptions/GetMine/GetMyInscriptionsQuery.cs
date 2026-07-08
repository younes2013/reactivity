using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivity.Application.Common.Interfaces;

namespace Reactivity.Application.Features.Inscriptions.GetMine;

public record MyInscriptionDto(string InscriptionId, string ActivityId, string ActivityTitle, DateTime ActivityDate, DateTime RegisteredAt);

public record GetMyInscriptionsQuery : IRequest<List<MyInscriptionDto>>;

public class GetMyInscriptionsQueryHandler(IApplicationDbContext context, ICurrentUserService currentUser)
    : IRequestHandler<GetMyInscriptionsQuery, List<MyInscriptionDto>>
{
    public Task<List<MyInscriptionDto>> Handle(GetMyInscriptionsQuery request, CancellationToken cancellationToken)
    {
        var userId = currentUser.UserId!;

        return context.Inscriptions
            .Where(i => i.UserId == userId)
            .OrderBy(i => i.Activity.Date)
            .Select(i => new MyInscriptionDto(i.Id, i.ActivityId, i.Activity.Title, i.Activity.Date, i.RegisteredAt))
            .ToListAsync(cancellationToken);
    }
}
