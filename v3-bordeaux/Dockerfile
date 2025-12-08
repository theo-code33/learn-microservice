# Étape 1 : Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Dépendances NPM
COPY package*.json ./
RUN npm ci

# Copie du reste du code source
COPY . .

# Compilation du projet NestJS
RUN npm run build

# Étape 2 : Runner minimal
FROM node:20-alpine AS runner

WORKDIR /app

# Copie des artefacts essentiels
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Copie du script d'entrypoint
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENV DB_USERNAME=user
ENV DB_PASSWORD=password
ENV DB_NAME=v3_bordeaux
ENV DB_HOST=postgres-service
ENV NODE_ENV=production
ENV PORT=4001

EXPOSE 4001

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "dist/main.js"]