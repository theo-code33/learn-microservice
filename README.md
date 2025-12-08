# Efrei - Cours Micro services / DevOps

## Architecture du projet
Le projet est structuré en plusieurs microservices, chacun gérant une fonctionnalité spécifique de l'application.

- **v3-bordeaux** : Microservice gérant les opérations liées aux VCub de Bordeaux. (affichage des stations, disponibilités, avis, etc.)
- **auth-service** : Microservice responsable de l'authentification des utilisateurs.
- **frontend** : Application front-end en NextJS pour l'interface utilisateur.
- **k8s** : Fichiers de configuration Kubernetes pour le déploiement des microservices.

## Lançement du projet
Pour lancer le projet, assurez-vous d'avoir Docker et Kubernetes installés sur votre machine.
1. **Démarrer les services avec Docker Compose** :
   ```bash
   docker-compose up --build
   ```
2. **Accéder à l'application** :
   Ouvrez votre navigateur et allez à `http://localhost:3000` pour accéder à l'application front-end.
3. **Déployer sur Kubernetes** :
   Appliquez les configurations Kubernetes dans le dossier `k8s` :
   ```bash
   kubectl apply -f k8s/ -R
    ```

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