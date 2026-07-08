using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Reactivity.Domain.Entities;
using Reactivity.Infrastructure.Identity;

namespace Reactivity.Infrastructure.Persistence;

public static class DbInitializer
{
    public static async Task InitializeAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ReactivityDbContext>();
        await dbContext.Database.MigrateAsync();

        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        var demoUser = await userManager.FindByEmailAsync("demo@reactivity.local");
        if (demoUser is null)
        {
            demoUser = new ApplicationUser
            {
                UserName = "demo@reactivity.local",
                Email = "demo@reactivity.local",
                DisplayName = "Utilisateur Démo",
                EmailConfirmed = true
            };
            await userManager.CreateAsync(demoUser, "Demo123!");
        }

        if (!await dbContext.Activities.AnyAsync())
        {
            dbContext.Activities.AddRange(
                new Activity
                {
                    Title = "Randonnée au Mont Royal",
                    Date = DateTime.UtcNow.AddDays(7),
                    Description = "Balade tranquille en groupe avec vue sur la ville.",
                    Category = "Randonnée",
                    City = "Montréal",
                    Venue = "Parc du Mont-Royal",
                    Latitude = 45.5048,
                    Longitude = -73.5878,
                    OwnerId = demoUser.Id
                },
                new Activity
                {
                    Title = "Tournoi de basketball amateur",
                    Date = DateTime.UtcNow.AddDays(14),
                    Description = "Tournoi 3x3 ouvert à tous niveaux.",
                    Category = "Sport collectif",
                    City = "Montréal",
                    Venue = "Centre sportif Côte-des-Neiges",
                    Latitude = 45.4966,
                    Longitude = -73.6280,
                    OwnerId = demoUser.Id
                },
                new Activity
                {
                    Title = "Atelier de peinture",
                    Date = DateTime.UtcNow.AddDays(21),
                    Description = "Initiation à la peinture acrylique, matériel fourni.",
                    Category = "Art",
                    City = "Montréal",
                    Venue = "Maison de la culture Plateau-Mont-Royal",
                    Latitude = 45.5234,
                    Longitude = -73.5820,
                    OwnerId = demoUser.Id
                });

            await dbContext.SaveChangesAsync(CancellationToken.None);
        }
    }
}
