using System.Net;
using Microsoft.AspNetCore.Mvc;
using Reactivity.Application.Common.Exceptions;
using ValidationException = Reactivity.Application.Common.Exceptions.ValidationException;

namespace Reactivity.Api.Middleware;

public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception exception)
        {
            await HandleExceptionAsync(context, exception);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var problemDetails = exception switch
        {
            ValidationException validationException => new ProblemDetails
            {
                Status = (int)HttpStatusCode.BadRequest,
                Title = "Erreur de validation",
                Extensions = { ["errors"] = validationException.Errors }
            },
            NotFoundException => new ProblemDetails
            {
                Status = (int)HttpStatusCode.NotFound,
                Title = exception.Message
            },
            AuthenticationException => new ProblemDetails
            {
                Status = (int)HttpStatusCode.Unauthorized,
                Title = exception.Message
            },
            _ => new ProblemDetails
            {
                Status = (int)HttpStatusCode.InternalServerError,
                Title = "Une erreur inattendue s'est produite."
            }
        };

        if (problemDetails.Status == (int)HttpStatusCode.InternalServerError)
        {
            logger.LogError(exception, "Erreur non gérée");
        }

        context.Response.ContentType = "application/problem+json";
        context.Response.StatusCode = problemDetails.Status ?? (int)HttpStatusCode.InternalServerError;
        await context.Response.WriteAsJsonAsync(problemDetails);
    }
}
