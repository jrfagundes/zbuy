# ZBuy E2E tests

These Playwright tests validate user-facing flows against a running local stack.

Expected local services:

- Web: `http://127.0.0.1:3000`
- API: `http://127.0.0.1:3001`
- Postgres migrated with all API Prisma migrations, including phase 5 shopping journeys and supermarket layout tables
- Units seeded with the API Prisma seed script
- Browser geolocation is not required for the manual supermarket path covered by the E2E flow
- API must be reachable on `http://127.0.0.1:3001` and web must be reachable on `http://127.0.0.1:3000`

Start the local API and web stack before running Playwright:

```powershell
corepack pnpm dev
```

Prepare the database:

```powershell
$env:DATABASE_URL="postgresql://zbuy:zbuy@127.0.0.1:5432/zbuy?schema=public"
corepack pnpm --filter @zbuy/api prisma:deploy
corepack pnpm --filter @zbuy/api prisma:seed-units
```

Run:

```powershell
corepack pnpm e2e
```

Use `E2E_BASE_URL` when the web app runs on a different URL.
