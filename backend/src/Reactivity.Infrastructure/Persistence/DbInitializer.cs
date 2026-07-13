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
                    Title = "Randonnée dans la Vallée de l'Ourika",
                    Date = DateTime.UtcNow.AddDays(7),
                    Description = "Balade tranquille en groupe avec vue sur l'Atlas.",
                    Category = "Randonnée",
                    City = "Marrakech",
                    Venue = "Vallée de l'Ourika",
                    Latitude = 31.5167,
                    Longitude = -7.6667,
                    OwnerId = demoUser.Id
                },
                new Activity
                {
                    Title = "Tournoi de basketball amateur",
                    Date = DateTime.UtcNow.AddDays(14),
                    Description = "Tournoi 3x3 ouvert à tous niveaux.",
                    Category = "Sport collectif",
                    City = "Rabat",
                    Venue = "Complexe sportif Prince Moulay Abdellah",
                    Latitude = 34.0084,
                    Longitude = -6.8362,
                    OwnerId = demoUser.Id
                },
                new Activity
                {
                    Title = "Atelier de peinture",
                    Date = DateTime.UtcNow.AddDays(21),
                    Description = "Initiation à la peinture acrylique, matériel fourni.",
                    Category = "Art",
                    City = "Casablanca",
                    Venue = "Villa des Arts de Casablanca",
                    Latitude = 33.5928,
                    Longitude = -7.6192,
                    OwnerId = demoUser.Id
                });

            await dbContext.SaveChangesAsync(CancellationToken.None);
        }
    }
}
