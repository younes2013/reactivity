using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reactivity.Application.Features.Inscriptions.GetForActivity;
using Reactivity.Application.Features.Inscriptions.GetMine;
using Reactivity.Application.Features.Inscriptions.Register;
using Reactivity.Application.Features.Inscriptions.Unregister;

namespace Reactivity.Api.Controllers;

[ApiController]
[Route("api/Inscription")]
public class InscriptionsController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<string>> Register(RegisterToActivityCommand command, CancellationToken cancellationToken)
        => await mediator.Send(command, cancellationToken);

    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> Unregister([FromQuery] string activityId, CancellationToken cancellationToken)
    {
        await mediator.Send(new UnregisterFromActivityCommand(activityId), cancellationToken);
        return NoContent();
    }

    [HttpGet]
    public async Task<ActionResult<List<InscriptionDto>>> GetForActivity([FromQuery] string activityId, CancellationToken cancellationToken)
        => await mediator.Send(new GetInscriptionsForActivityQuery(activityId), cancellationToken);

    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<List<MyInscriptionDto>>> GetMine(CancellationToken cancellationToken)
        => await mediator.Send(new GetMyInscriptionsQuery(), cancellationToken);
}
