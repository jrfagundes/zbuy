# ZBuy E2E tests

These Playwright tests validate user-facing flows against a running local stack.

Expected local services:

- Web: `http://127.0.0.1:3000`
- API: `http://127.0.0.1:3001`
- Postgres migrated with the API Prisma migrations
- Units seeded with the API Prisma seed script

Run:

```powershell
corepack pnpm --filter @zbuy/api prisma:seed-units
corepack pnpm e2e
```

Use `E2E_BASE_URL` when the web app runs on a different URL.
