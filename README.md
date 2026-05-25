# ZBuy

ZBuy is a shopping-list and supermarket-layout application. The current implementation contains the production foundation for account authentication, persistence, local observability, and automated test coverage.

## Product Documentation

- [Product overview](docs/product/README.md)
- [Implementation roadmap](docs/product/implementation-roadmap.md)
- [Journeys](docs/product/journeys.md)
- [Screens](docs/product/screens.md)
- [Business rules](docs/product/business-rules.md)
- [Conceptual data model](docs/product/data-model.md)

## Development

- [Phase 2 local setup](docs/development/phase-2-setup.md)
- [Observability with OpenTelemetry and SigNoz](docs/development/observability.md)

## Quick Verification

```powershell
corepack pnpm --recursive lint
corepack pnpm --recursive typecheck
corepack pnpm test
corepack pnpm --recursive build
```

Run `corepack pnpm e2e` after Postgres, API, and web are running locally.
