# Reactivity — Front-end

SPA React 19 + TypeScript, construite avec Vite. Gestion d'état via MobX, appels API via Axios, interface Material UI.

## Structure du projet

```
src/
├── App/
│   ├── Api/           Clients Axios par domaine (authApi, activityApi, inscriptionApi)
│   ├── Common/         Constantes, routes protégées
│   ├── Layout/         Mise en page générale (NavBar, Footer, Outlet)
│   ├── Models/          Types et interfaces TypeScript
│   ├── Services/        Validation de formulaires, décodage JWT
│   └── Stores/           Stores MobX (AuthStore, ActivityStore)
├── Features/
│   ├── Auth/             Pages Login, Register, Profile
│   ├── Activities/       Pages Liste, Détail, Création, Mes inscriptions
│   ├── HomePage/         Page d'accueil
│   ├── Nav/              Barre de navigation
│   └── Footer/           Pied de page
├── App.tsx               Déclaration des routes
└── main.tsx              Point d'entrée
```

## Installation

Prérequis : Node.js ≥ 18

```powershell
cd frontend
npm install
cp .env.example .env   # ajuster VITE_API_URL si besoin
npm run dev
```

L'application est servie sur `http://localhost:5173` et communique avec l'API sur l'URL définie dans `VITE_API_URL` (par défaut `http://localhost:5232/api`).

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Démarrage en mode développement |
| `npm run build` | Build de production (`tsc -b && vite build`) |
| `npm run lint` | Vérification du code (Oxlint) |
| `npm run preview` | Prévisualisation du build de production |

## Authentification

L'accès et le rafraîchissement de session sont gérés par `AuthStore` (MobX) : le token d'accès et le refresh token sont stockés dans `localStorage`, et un intercepteur Axios (`axiosClient.ts`) rafraîchit automatiquement le token d'accès en cas de réponse `401`.

## Routes principales

| Route | Description | Protégée |
|---|---|---|
| `/` | Accueil | Non |
| `/login`, `/register` | Authentification | Non |
| `/activities` | Liste des activités | Non |
| `/activities/:id` | Détail d'une activité, inscription/désinscription | Non (l'inscription nécessite un compte) |
| `/activities/new` | Créer une activité | Oui |
| `/my-inscriptions` | Mes inscriptions | Oui |
| `/profile` | Profil utilisateur | Oui |
