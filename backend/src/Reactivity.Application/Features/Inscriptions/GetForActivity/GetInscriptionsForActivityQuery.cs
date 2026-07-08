using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivity.Application.Common.Interfaces;

namespace Reactivity.Application.Features.Inscriptions.GetForActivity;

public record InscriptionDto(string Id, string ActivityId, string UserId, DateTime RegisteredAt);

public record GetInscriptionsForActivityQuery(string ActivityId) : IRequest<List<InscriptionDto>>;

public class GetInscriptionsForActivityQueryHandler(IApplicationDbContext context)
    : IRequestHandler<GetInscriptionsForActivityQuery, List<InscriptionDto>>
{
    public Task<List<InscriptionDto>> Handle(GetInscriptionsForActivityQuery request, CancellationToken cancellationToken)
        => context.Inscriptions
            .Where(i => i.ActivityId == request.ActivityId)
            .Select(i => new InscriptionDto(i.Id, i.ActivityId, i.UserId, i.RegisteredAt))
            .ToListAsync(cancellationToken);
}
