using Microsoft.EntityFrameworkCore;
using Reactivity.Domain.Entities;

namespace Reactivity.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Activity> Activities { get; }
    DbSet<Inscription> Inscriptions { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
