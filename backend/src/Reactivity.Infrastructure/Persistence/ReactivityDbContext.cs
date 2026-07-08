using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Reactivity.Application.Common.Interfaces;
using Reactivity.Domain.Entities;
using Reactivity.Infrastructure.Identity;

namespace Reactivity.Infrastructure.Persistence;

public class ReactivityDbContext(DbContextOptions<ReactivityDbContext> options)
    : IdentityDbContext<ApplicationUser>(options), IApplicationDbContext
{
    public DbSet<Activity> Activities => Set<Activity>();
    public DbSet<Inscription> Inscriptions => Set<Inscription>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Activity>(entity =>
        {
            entity.HasMany(a => a.Inscriptions)
                .WithOne(i => i.Activity)
                .HasForeignKey(i => i.ActivityId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        builder.Entity<Inscription>(entity =>
        {
            entity.HasIndex(i => new { i.ActivityId, i.UserId }).IsUnique();
        });
    }
}
