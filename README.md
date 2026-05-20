# Job Aggregator : Jaggr

Projet full stack pour lister des offres techs, postuler et suivre ses candidatures. Inclus un dashboard utilisateur avec des stats avancées et des recommandations IA.
Le site est inspiré du swipe "Tinder" pour les offres d'emploi. Voir [Market and Product Discovery](<docs/Market and Product Discovery.md>).

## Ce que fait le projet

- Affiche une liste d'offres.
- Permet de creer un compte et se connecter.
- Permet de postuler a une offre.
- Permet d'envoyer un CV.
- Donne quelques stats et recommendations IA.

## Techs

- Backend: Node.js + Express.
- Base de donnees: MySQL.
- Frontend: site statique (Nginx).
- Docker Compose pour lancer tout.

## Prerequis

- Docker et Docker Compose.
- Un fichier `.env` a la racine.

## .env (exemple)

Creer un fichier `.env` a la racine:

```bash
DB_NAME=jobaggregator
DB_ROOT_PASSWORD=change-me
JWT_SECRET=change-me
API_KEY=we-love-devs-api-key
PORT=3000
```

Notes:
- `API_KEY` correspond a la clef WeLoveDevs.
- `PORT` est le port du backend.

## Lancer le projet

```bash
docker compose up --build
```

Services:

- Backend: http://localhost:3000
- Frontend: http://localhost:8080
- MySQL: localhost:3306

## API

Base URL: `http://localhost:3000`

- `POST /api/register` creer un compte
- `POST /api/login` se connecter (retourne un token)
- `GET /api/jobs` liste des offres
- `POST /api/jobs/apply` postuler (token requis)
- `GET /api/user` profil (token requis)
- `POST /api/user/cv` envoyer un CV (token requis)
- `GET /api/datafeature` stats (token requis)
- `GET /api/recommendations` IA (token requis)
- `GET /api/favorites` liste des favoris (token requis)
- `POST /api/favorites` ajouter un favori (token requis)
- `DELETE /api/favorites/:id` supprimer un favori (token requis)

## Base de données

Le fichier `init.sql` crée 3 tables:

- `users` (utilisateurs)
- `applied_offers` (candidatures)
- `favorites` (favoris)

## Structure

```
.github/           github actions
backend/           API Node.js
frontend/          site statique
docs/              documentation, readme business et figma
init.sql           schema MySQL
docker-compose.yml docker local
```

## Documentation

- [Market and Product Discovery](<docs/Market and Product Discovery.md>)
- [Innovation Justification](<docs/Innovation Justification.md>)
- [Documentation of Choices](<docs/Documentation of Choices.md>)
- [Cybersecurity](<docs/Cybersecurity.md>)
- [Mockups wireframes](<docs/figma/>)