# Observability Local

ZBuy starts with OpenTelemetry instrumentation in the API and a local open-source APM target using SigNoz.

## Runtime Configuration

The API starts tracing in `apps/api/src/observability/tracing.ts` before NestJS bootstraps. Configure it with:

```dotenv
OTEL_SERVICE_NAME=zbuy-api
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
OTEL_ENVIRONMENT=local
LOG_LEVEL=info
```

When running through Docker Compose, the API uses `http://signoz:4318` so traces stay on the Compose network. On the host, use `http://localhost:4318`.

## Start Locally

```powershell
docker compose up -d postgres signoz
corepack pnpm db:generate
corepack pnpm db:migrate
corepack pnpm --filter @zbuy/api dev
```

Open SigNoz at `http://localhost:3301` unless `SIGNOZ_PORT` is changed.

For the current Windows local setup, prefer running only `postgres` and `signoz` in Docker, then run API and web on the host with `corepack pnpm`. This avoids Linux containers reading Windows-created workspace `node_modules`.

## Generate Traffic

```powershell
Invoke-WebRequest -UseBasicParsing http://localhost:3001/health/live
Invoke-WebRequest -UseBasicParsing http://localhost:3001/health/ready
```

Then use the authentication endpoints to generate application traces:

- `POST /auth/signup`
- `POST /auth/login`
- `GET /me`
- `POST /auth/logout`

## Correlation

Every API response includes `x-request-id`. The request middleware logs one JSON event named `http_request_completed` with:

- `requestId`
- `method`
- `path`
- `statusCode`
- `durationMs`
- `traceId` and `spanId` when an OpenTelemetry span is active

Use `requestId` for support/debugging across API responses and logs. Use `traceId` in SigNoz to inspect the distributed trace for the same request.

## Switching OTLP Endpoint

For another OpenTelemetry collector or a managed SigNoz endpoint, change:

```dotenv
OTEL_EXPORTER_OTLP_ENDPOINT=https://collector.example.com
```

The API appends `/v1/traces` for trace export.

## Notes

SigNoz’s current self-hosted Docker documentation exposes OTLP on ports `4317` and `4318`; ZBuy uses OTLP HTTP on `4318`.
