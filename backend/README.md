# Reactivity — Back-end

API RESTful en .NET 9, organisée en Clean Architecture avec CQRS (MediatR).

## Structure du projet

```
backend/
├── Reactivity.sln
└── src/
    ├── Reactivity.Domain          Entités métier (Activity, Inscription) — aucune dépendance externe
    ├── Reactivity.Application     CQRS (Commands/Queries), validation (FluentValidation), interfaces
    ├── Reactivity.Infrastructure  EF Core (SQLite), Identity, JWT, implémentation des interfaces Application
    └── Reactivity.Api             Controllers, middleware, configuration, point d'entrée
```

Chaque fonctionnalité de `Reactivity.Application` est organisée par feature (vertical slice), par exemple :

```
Features/
├── Auth/{Register,Login,Refresh,Logout}
├── Activities/{Create,Update,GetList,GetDetail}
└── Inscriptions/{Register,Unregister,GetForActivity,GetMine}
```

## Installation

Prérequis : [SDK .NET 9](https://dotnet.microsoft.com/download)

```powershell
cd backend
dotnet restore
dotnet ef database update --project src/Reactivity.Infrastructure --startup-project src/Reactivity.Api
dotnet run --project src/Reactivity.Api
```

L'API écoute par défaut sur `http://localhost:5232`. La base SQLite (`reactivity.db`) et un jeu de données de démonstration sont créés automatiquement au premier démarrage (voir `DbInitializer`).

Compte de démonstration créé au démarrage :
- Email : `demo@reactivity.local`
- Mot de passe : `Demo123!`

## Documentation interactive de l'API

Une fois l'API démarrée en environnement de développement, la documentation Scalar est disponible sur :

```
http://localhost:5232/scalar/v1
```

## Endpoints principaux

### Authentification (`/api/auth`)

| Méthode | Route | Description | Auth requise |
|---|---|---|---|
| POST | `/api/auth/register` | Créer un compte | Non |
| POST | `/api/auth/login` | Connexion | Non |
| POST | `/api/auth/refresh` | Rafraîchir le token | Non |
| POST | `/api/auth/logout` | Déconnexion | Oui |

### Activités (`/api/activity`)

| Méthode | Route | Description | Auth requise |
|---|---|---|---|
| GET | `/api/activity` | Liste des activités | Non |
| GET | `/api/activity/{id}` | Détail d'une activité | Non |
| POST | `/api/activity` | Créer une activité | Oui |
| PUT | `/api/activity/{id}` | Modifier une activité (créateur uniquement) | Oui |

### Inscriptions (`/api/Inscription`)

| Méthode | Route | Description | Auth requise |
|---|---|---|---|
| POST | `/api/Inscription` | S'inscrire à une activité | Oui |
| DELETE | `/api/Inscription?activityId={id}` | Se désinscrire | Oui |
| GET | `/api/Inscription?activityId={id}` | Liste des inscrits à une activité | Non |
| GET | `/api/Inscription/me` | Mes inscriptions | Oui |

## Configuration

Les paramètres se trouvent dans `src/Reactivity.Api/appsettings.json` :
- `ConnectionStrings:DefaultConnection` — chaîne de connexion SQLite
- `Jwt` — secret, issuer, audience, durée de vie des tokens

## Gestion des erreurs

Un middleware global (`ExceptionHandlingMiddleware`) intercepte les exceptions métier et renvoie des réponses au format `ProblemDetails` :

| Exception | Code HTTP |
|---|---|
| `ValidationException` | 400 |
| `AuthenticationException` | 401 |
| `ForbiddenAccessException` | 403 |
| `NotFoundException` | 404 |
| `ConflictException` | 409 |
