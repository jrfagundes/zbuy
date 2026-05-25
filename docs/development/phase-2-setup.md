# ZBuy Phase 2 Local Setup

This guide starts the production foundation implemented in phase 2: PostgreSQL, API, web authentication screens, Playwright E2E tests, and local OpenTelemetry export to SigNoz.

## Requirements

- Node.js 22+
- Corepack enabled
- pnpm 9 through Corepack
- Docker Desktop

## Environment

Copy `.env.example` to `.env` and keep local-only secrets out of commits.

Important local defaults:

```dotenv
DATABASE_URL=postgresql://zbuy:zbuy@localhost:5432/zbuy?schema=public
WEB_ORIGIN=http://localhost:3000,http://127.0.0.1:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
SIGNOZ_PORT=3301
```

Use `127.0.0.1` instead of `localhost` if Windows resolves `localhost` to an unavailable IPv6 listener.

## Install

```powershell
corepack pnpm install
corepack pnpm db:generate
```

## Start Local Infrastructure

```powershell
docker compose up -d postgres signoz
```

Open SigNoz at `http://localhost:3301`.

## Apply Database Migrations

```powershell
$env:DATABASE_URL="postgresql://zbuy:zbuy@localhost:5432/zbuy?schema=public"
corepack pnpm --filter @zbuy/api prisma:deploy
```

Use `127.0.0.1` in `DATABASE_URL` if needed.

## Start API

```powershell
$env:DATABASE_URL="postgresql://zbuy:zbuy@127.0.0.1:5432/zbuy?schema=public"
$env:WEB_ORIGIN="http://127.0.0.1:3000,http://localhost:3000"
$env:API_PORT="3001"
$env:OTEL_EXPORTER_OTLP_ENDPOINT="http://127.0.0.1:4318"
$env:OTEL_SERVICE_NAME="zbuy-api"
$env:OTEL_ENVIRONMENT="local"
corepack pnpm --filter @zbuy/api dev
```

Verify:

```powershell
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:3001/health/live
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:3001/health/ready
```

## Start Web

In another terminal:

```powershell
$env:NEXT_PUBLIC_API_URL="http://127.0.0.1:3001"
corepack pnpm --filter @zbuy/web dev
```

Open `http://127.0.0.1:3000`.

## Run Tests

Fast checks:

```powershell
corepack pnpm --recursive lint
corepack pnpm --recursive typecheck
corepack pnpm test
corepack pnpm --recursive build
```

End-to-end authentication flow:

```powershell
corepack pnpm e2e
```

The E2E test expects:

- Web on `http://127.0.0.1:3000`
- API on `http://127.0.0.1:3001`
- PostgreSQL migrated and reachable

## Docker Compose Note

The current Compose file is reliable for `postgres` and `signoz`. Run API and web on the Windows host for local development. Running API and web inside Linux containers with the workspace mounted from Windows can fail when container Node resolves host-created `node_modules` symlinks or binaries.

## Troubleshooting

If Docker commands fail with access denied, run them from an elevated shell or ensure Docker Desktop is running with the current user.

If `localhost` refuses connections while the service is running, retry the same command with `127.0.0.1`.

If E2E fails at `page.goto`, verify the web process is listening on port `3000` and the API health endpoint returns `200`.
