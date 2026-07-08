namespace Reactivity.Application.Features.Activities;

public record ActivityDto(
    string Id,
    string Title,
    DateTime Date,
    string Description,
    string Category,
    bool IsCancelled,
    string City,
    string Venue,
    double Latitude,
    double Longitude,
    string OwnerId,
    int InscriptionsCount);
