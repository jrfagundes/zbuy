# ZBuy Phase 3 Lists And Products

Phase 3 adds the reusable product catalog, flexible units, and reusable shopping lists on top of the production foundation.

## Database

Run migrations and seed units:

```powershell
$env:DATABASE_URL="postgresql://zbuy:zbuy@127.0.0.1:5432/zbuy?schema=public"
corepack pnpm --filter @zbuy/api prisma:deploy
corepack pnpm --filter @zbuy/api prisma:seed-units
```

The unit seed is required before using product and list screens because products and list items reference active units.

## API

Authenticated resources:

- `GET /units`
- `GET|POST /products`
- `GET|PATCH /products/:id`
- `POST /products/:id/archive`
- `GET|POST /shopping-lists`
- `GET|PATCH|DELETE /shopping-lists/:id`
- `POST /shopping-lists/:id/archive`
- `POST /shopping-lists/:id/duplicate`
- `POST /shopping-lists/:id/items`
- `PATCH|DELETE /shopping-lists/:id/items/:itemId`
- `PATCH /shopping-lists/:id/items/reorder`

## Web

User-facing screens:

- `/products`: create products with category, brand, notes, default unit, and optional estimated price.
- `/lists`: create, edit, archive, delete, and duplicate reusable shopping lists.
- `/lists/:id`: add, edit, remove, and reorder list items with quantity, unit, expected price, priority, and notes.

## Tests

Run the local stack first, then verify:

```powershell
corepack pnpm --recursive lint
corepack pnpm --recursive typecheck
corepack pnpm test
corepack pnpm --recursive build
corepack pnpm e2e
```

The E2E suite expects the web app at `http://127.0.0.1:3000`, the API at `http://127.0.0.1:3001`, migrated Postgres, and seeded units.
