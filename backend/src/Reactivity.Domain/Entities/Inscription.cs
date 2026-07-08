namespace Reactivity.Domain.Entities;

public class Inscription
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string ActivityId { get; set; }
    public required string UserId { get; set; }
    public DateTime RegisteredAt { get; set; } = DateTime.UtcNow;

    public Activity Activity { get; set; } = null!;
}
