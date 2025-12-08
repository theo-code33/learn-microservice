# Efrei - Cours Micro services / DevOps

## Description du projet
Application démonstrative de microservices pour gérer des stations VCub de Bordeaux, l'authentification et une interface Next.js. Chaque service est containerisé et peut être lancé en local (Docker Compose) ou déployé sur Kubernetes.

## Architecture globale
- `v3-bordeaux` : NestJS + PostgreSQL, expose les stations, disponibilités, avis.
- `auth-service` : FastAPI + SQLite, gère l'inscription, login, refresh JWT.
- `frontend` : Next.js (App Router), consomme les API précédentes.
- `k8s/` : manifestes de déploiement (Deployments, Services, Ingress).

## Installation locale (hors conteneurs)
Prérequis : Node 20+, Python 3.10+, PostgreSQL local si vous lancez `v3-bordeaux` hors Docker.

```bash
# frontend
cd frontend
npm install

# v3-bordeaux (NestJS)
cd ../v3-bordeaux
npm install

# auth-service (FastAPI)
cd ../auth-service
pip install -r requirements.txt
```

## Lancement via Docker Compose
```bash
docker-compose up --build
# Frontend : http://localhost:3000
# Auth      : http://localhost:8000
# Orders    : http://localhost:4000
# v3-bordeaux API (si exposée) : http://localhost:4001
```

## Déploiement Kubernetes (minikube/ingress-nginx)
```bash
# Appliquer tous les manifestes
kubectl apply -f k8s/ -R

# Ajouter l'entrée /etc/hosts (minikube IP)
echo "$(minikube ip) devops.local" | sudo tee -a /etc/hosts

# Accès via ingress
# http://devops.local/           -> frontend
# http://devops.local/auth       -> auth-service
# http://devops.local/orders     -> order-service
# http://devops.local/v3-bordeaux -> v3-bordeaux
```

## Variables d'environnement (exemples)
`frontend/.env` (si requis par les appels API) :
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4001
```

`v3-bordeaux/.env` :
```
PORT=4001

DB_USERNAME=user
DB_PASSWORD=password
DB_NAME=v3_bordeaux
DB_HOST=127.0.0.1
```

`auth-service/.env` (exemple) :
```
# JWT variables
JWT_SECRET=change-me
JWT_ALGO=HS256
ACCESS_TOKEN_EXPIRES_MIN=60
REFRESH_TOKEN_EXPIRES_MIN=43200

# Build variables
CORS_ORIGINS=http://localhost:3000

# SQLite variables
DATABASE_URL=sqlite:///db/auth.db
```

## Appels API principaux (exemple)
- Auth :
   - `POST /auth/login` : body `{username, password}` → token JWT.
   - `POST /auth/register` : body `{username, password}`.
- v3-bordeaux :
   - `GET /v3-bordeaux/stations` : liste des stations.
   - `GET /v3-bordeaux/reviews/stations/avg` : moyennes d'avis par station.
- Order-service (si exposé) :
   - `GET /orders/health` : vérification de santé.

## Technologies utilisées
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803.svg?style=for-the-badge&logo=typeorm&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)