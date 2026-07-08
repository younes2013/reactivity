using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Reactivity.Application.Features.Activities;
using Reactivity.Application.Features.Activities.Create;
using Reactivity.Application.Features.Activities.GetDetail;
using Reactivity.Application.Features.Activities.GetList;
using Reactivity.Application.Features.Activities.Update;

namespace Reactivity.Api.Controllers;

[ApiController]
[Route("api/activity")]
public class ActivitiesController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<ActivityDto>>> GetAll(CancellationToken cancellationToken)
        => await mediator.Send(new GetActivitiesQuery(), cancellationToken);

    [HttpGet("{id}")]
    public async Task<ActionResult<ActivityDto>> GetById(string id, CancellationToken cancellationToken)
        => await mediator.Send(new GetActivityQuery(id), cancellationToken);

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<string>> Create(CreateActivityCommand command, CancellationToken cancellationToken)
        => await mediator.Send(command, cancellationToken);

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(string id, UpdateActivityCommand command, CancellationToken cancellationToken)
    {
        if (id != command.Id)
        {
            return BadRequest();
        }

        await mediator.Send(command, cancellationToken);
        return NoContent();
    }
}
