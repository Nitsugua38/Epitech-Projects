# Job Aggregator

Petit projet full stack pour lister des offres et suivre les candidatures.

## Ce que fait le projet

- Affiche une liste d'offres.
- Permet de creer un compte et se connecter.
- Permet de postuler a une offre.
- Permet d'envoyer un CV.
- Donne quelques stats simples.

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

## API (vite fait)

Base URL: `http://localhost:3000`

- `POST /api/register` creer un compte
- `POST /api/login` se connecter (retourne un token)
- `GET /api/jobs` liste des offres
- `POST /api/jobs/apply` postuler (token requis)
- `GET /api/user` profil (token requis)
- `POST /api/user/cv` envoyer un CV (token requis)
- `GET /api/datafeature` stats (token requis)

## Base de donnees

Le fichier `init.sql` cree 2 tables:

- `users` (utilisateurs)
- `applied_offers` (candidatures)

## Structure

```
backend/           API Node.js
frontend/          site statique
init.sql           schema MySQL
docker-compose.yml docker local
```