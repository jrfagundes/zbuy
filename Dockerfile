# syntax=docker/dockerfile:1
#
# Dockerfile para o backend (@zbuy/api) — monorepo pnpm.
# Compila @zbuy/shared, gera o Prisma Client e o build do NestJS.
# Em runtime aplica as migrations e sobe a API.
#
# NÃO defina NODE_ENV=production no build (pnpm precisa das devDependencies
# como nest-cli, typescript e prisma). Defina NODE_ENV=production só no runtime,
# via variável de ambiente do Render.

FROM node:22-slim AS build
WORKDIR /app

# openssl é necessário para o Prisma Client; ca-certificates para TLS (Neon).
RUN apt-get update -y \
 && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*
RUN corepack enable

# Copia o monorepo inteiro (exclusões em .dockerignore).
COPY . .

# Instala apenas o @zbuy/api e suas dependências de workspace (pula web/mobile).
RUN corepack pnpm install --frozen-lockfile --filter "@zbuy/api..."

# Build da lib compartilhada -> Prisma Client -> build da API.
RUN corepack pnpm --filter @zbuy/shared build \
 && corepack pnpm --filter @zbuy/api exec prisma generate \
 && corepack pnpm --filter @zbuy/api build

WORKDIR /app/apps/api
EXPOSE 3001

# Render injeta $PORT; bootstrap.ts faz o bind nele.
# Aplica migrations pendentes e então sobe a API.
CMD ["sh", "-c", "corepack pnpm exec prisma migrate deploy && node dist/main.js"]
