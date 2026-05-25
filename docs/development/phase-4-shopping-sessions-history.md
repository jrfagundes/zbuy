# ZBuy Phase 4 Shopping Sessions And History

Phase 4 adds purchase locations, one active shopping session per user, item processing, immutable completed history, and continuation lists for items not found or not processed.

## Database

Run migrations and seed units before using the phase 4 screens:

```powershell
$env:DATABASE_URL="postgresql://zbuy:zbuy@127.0.0.1:5432/zbuy?schema=public"
corepack pnpm --filter @zbuy/api prisma:deploy
corepack pnpm --filter @zbuy/api prisma:seed-units
```

Phase 4 migrations add:

- `PurchaseLocation`
- `ShoppingSession`
- `ShoppingSessionItem`
- Purchase location, session, and session item enums

## Local Services

Start local infrastructure:

```powershell
docker compose up -d postgres signoz
```

Run API on the host:

```powershell
$env:DATABASE_URL="postgresql://zbuy:zbuy@127.0.0.1:5432/zbuy?schema=public"
$env:WEB_ORIGIN="http://127.0.0.1:3000,http://localhost:3000"
$env:API_PORT="3001"
$env:OTEL_EXPORTER_OTLP_ENDPOINT="http://127.0.0.1:4318"
corepack pnpm --filter @zbuy/api dev
```

Run web in another terminal:

```powershell
$env:NEXT_PUBLIC_API_URL="http://127.0.0.1:3001"
corepack pnpm --filter @zbuy/web dev
```

Open:

- Web: `http://127.0.0.1:3000`
- API health: `http://127.0.0.1:3001/health/live`
- SigNoz: `http://127.0.0.1:3301`

## API

Authenticated purchase location resources:

- `GET|POST /purchase-locations`
- `GET|PATCH /purchase-locations/:id`
- `POST /purchase-locations/:id/archive`

Authenticated shopping session resources:

- `GET|POST /shopping-sessions`
- `GET /shopping-sessions/active`
- `GET /shopping-sessions/:id`
- `POST /shopping-sessions/:id/cancel`
- `POST /shopping-sessions/:id/complete`
- `PATCH /shopping-sessions/:id/items/:itemId`
- `PATCH /shopping-sessions/:id/items/:itemId/status`
- `POST /shopping-sessions/:id/continuation-list`

Authenticated purchase history resources:

- `GET /purchase-history/sessions`
- `GET /purchase-history/sessions/:id`
- `GET /purchase-history/items`

## Web

User-facing screens:

- `/purchases`: active session dashboard, start purchase flow, recent completed/canceled sessions.
- `/purchases/:id`: session kanban with pending, bought, and not found items.
- `/history`: completed session history with filters.
- `/history/:id`: immutable session detail and continuation list action.

## Session Rules

- A user can have only one active shopping session at a time.
- Starting a session snapshots product, unit, quantity, expected price, priority, and notes from the selected list.
- Later edits to products or reusable lists do not change completed session history.
- Completing a session converts remaining pending items to `unprocessed`.
- Continuation lists include only `not_found` and `unprocessed` items.
- Canceled sessions remain auditable but are excluded from completed purchase history.

## Known Total Semantics

`knownTotal` is the sum of `actualPrice` for bought items that have a price.

Bought items without an actual price:

- Do not contribute to `knownTotal`.
- Increase `boughtItemsWithoutPriceCount`.
- Can be found in history item filters with `withoutPrice=true`.

Pending, not found, unprocessed, and canceled-session items do not contribute to completed history totals.

## Tests

Fast verification:

```powershell
corepack pnpm --recursive lint
corepack pnpm --recursive typecheck
corepack pnpm test
corepack pnpm --recursive build
```

End-to-end purchase flow:

```powershell
corepack pnpm e2e
```

The E2E suite expects:

- Web on `http://127.0.0.1:3000`
- API on `http://127.0.0.1:3001`
- PostgreSQL migrated
- Units seeded

