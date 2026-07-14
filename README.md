# Reactivity

Application web de gestion d'activités de loisir : créer une activité, s'inscrire, consulter et gérer ses inscriptions.

## Structure du dépôt

```
reactivity/
├── backend/    API .NET 9 (Clean Architecture + CQRS)
└── frontend/   SPA React 19 + TypeScript
```

Chaque dossier a sa propre documentation :
- [backend/README.md](backend/README.md) — architecture, installation, endpoints API
- [frontend/README.md](frontend/README.md) — structure, installation, scripts

## Démarrage rapide

1. Lancer le back-end (voir `backend/README.md`) — écoute sur `http://localhost:5232`
2. Lancer le front-end (voir `frontend/README.md`) — écoute sur `http://localhost:5173`

Un compte de démonstration est créé automatiquement au premier démarrage du back-end :
- Email : `demo@reactivity.local`
- Mot de passe : `Demo123!`

## Stack technique

| Couche | Technologies |
|---|---|
| Front-end | Vite, React 19, TypeScript, MobX, Axios, Material UI |
| Back-end | .NET 9, Clean Architecture, CQRS (MediatR), Entity Framework Core, ASP.NET Core Identity, SQLite |
| Authentification | JWT (access token + refresh token) |
