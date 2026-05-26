# ZBuy Phase 5 Supermarket Detection And Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add GPS-assisted supermarket detection, multi-stop physical shopping journeys, editable private aisle layouts, shared suggestions, and contribution consent.

**Architecture:** Keep phase 4 `shopping-sessions` intact for the existing online and single-location history flow, and add phase 5 physical-shopping modules around `shopping-journeys`, `supermarkets`, and `supermarket-layouts`. Shared contracts live in `packages/shared`; persistence lives in Prisma; NestJS modules expose authenticated APIs; Next.js screens consume explicit resource functions and keep all layout learning user-controlled.

**Tech Stack:** TypeScript, pnpm workspaces, Prisma, PostgreSQL, NestJS, Next.js, React, Jest, Vitest, Testing Library, Playwright, browser geolocation API with manual fallback.

---

## File Structure

- Modify: `packages/shared/src/index.ts`
  - Add supermarket, detection, journey, stop, layout, suggestion, and consent DTOs.
- Modify: `packages/shared/src/index.test.ts`
  - Add compile-time DTO shape coverage for phase 5.
- Modify: `apps/api/prisma/schema.prisma`
  - Add phase 5 models and enums while preserving phase 4 tables.
- Create: `apps/api/prisma/migrations/<timestamp>_supermarket_detection_layout/migration.sql`
  - Migration for supermarkets, journeys, stops, stop items, corridors, placements, suggestions, and consent.
- Create: `apps/api/src/supermarkets/*`
  - Supermarket CRUD, archive, detection, and distance/radius logic.
- Create: `apps/api/src/supermarket-layouts/*`
  - Private corridors, product placements, shared suggestions, and per-supermarket consent override.
- Create: `apps/api/src/layout-consent/*`
  - Account-level shared contribution consent.
- Create: `apps/api/src/shopping-journeys/*`
  - Physical journey start, active journey, stops, item outcomes, stop switching, completion, cancellation, and tests.
- Modify: `apps/api/src/purchase-history/*`
  - Add phase 5 journey-history endpoints through the existing purchase-history module.
- Modify: `apps/api/src/app.module.ts`
  - Register phase 5 modules.
- Modify: `apps/web/src/lib/resources.ts`
  - Add phase 5 API client functions.
- Modify: `apps/web/src/components/AppShell.tsx`
  - Add Supermercados navigation.
- Modify: `apps/web/src/app/purchases/page.tsx`
  - Route physical starts to shopping journeys; keep online starts on phase 4 sessions.
- Create: `apps/web/src/app/purchases/PhysicalJourneyStartForm.tsx`
  - Location-aware start flow with detected/manual/create supermarket paths.
- Create: `apps/web/src/app/journeys/[id]/page.tsx`
  - Active physical journey route.
- Create: `apps/web/src/app/journeys/[id]/JourneyBoard.tsx`
  - Corridor-grouped active items, stop actions, and item outcome actions.
- Create: `apps/web/src/app/supermarkets/page.tsx`
  - Supermarket list and create entry point.
- Create: `apps/web/src/app/supermarkets/[id]/layout/page.tsx`
  - Dedicated layout screen with corridor editing, radius setting, suggestions, and consent override.
- Modify: `apps/web/src/app/account/page.tsx`
  - Add global shared layout contribution consent.
- Modify: `apps/web/src/app/page.test.tsx`
  - Add frontend tests for phase 5 screens and flows.
- Modify: `apps/web/src/app/globals.css`
  - Add journey, supermarket, corridor, suggestion, and consent styles.
- Modify: `tests/e2e/auth.spec.ts`
  - Extend E2E with a phase 5 physical multi-stop shopping flow.
- Modify: `tests/e2e/README.md`
  - Document geolocation and phase 5 local setup notes.
- Create: `docs/development/phase-5-supermarket-detection-layout.md`
  - Implementation notes, commands, and API summary.
- Modify: `docs/product/implementation-roadmap.md`
  - Mark phase 4 completed and phase 5 active implementation phase.

---

### Task 1: Shared Phase 5 Contracts

**Files:**
- Modify: `packages/shared/src/index.ts`
- Modify: `packages/shared/src/index.test.ts`

- [x] **Step 1: Write the failing shared DTO test**

Append this test to `packages/shared/src/index.test.ts`:

```ts
import type {
  AcceptSharedLayoutSuggestionRequest,
  DetectSupermarketRequest,
  DetectSupermarketResponse,
  LayoutContributionConsentDto,
  ShoppingJourneyDetailDto,
  StartShoppingJourneyRequest,
  SupermarketLayoutDto,
  UpsertSupermarketRequest
} from "./index.js";

test("phase 5 DTO shapes support supermarkets, journeys, layouts, and consent", () => {
  const supermarketInput: UpsertSupermarketRequest = {
    name: "Mercado Central",
    address: "Rua Principal, 100",
    city: "Sao Paulo",
    latitude: "-23.55052",
    longitude: "-46.63331",
    presenceRadiusMeters: 500
  };

  const detectionRequest: DetectSupermarketRequest = {
    latitude: "-23.55052",
    longitude: "-46.63331"
  };

  const detectionResponse: DetectSupermarketResponse = {
    status: "detected",
    candidates: [
      {
        id: "market-1",
        name: supermarketInput.name,
        address: supermarketInput.address ?? null,
        city: supermarketInput.city ?? null,
        latitude: supermarketInput.latitude ?? null,
        longitude: supermarketInput.longitude ?? null,
        presenceRadiusMeters: 500,
        distanceMeters: 12,
        archivedAt: null,
        createdAt: "2026-05-26T00:00:00.000Z",
        updatedAt: "2026-05-26T00:00:00.000Z"
      }
    ]
  };

  const start: StartShoppingJourneyRequest = {
    sourceListId: "list-1",
    supermarketId: "market-1",
    latitude: detectionRequest.latitude,
    longitude: detectionRequest.longitude
  };

  const layout: SupermarketLayoutDto = {
    supermarketId: "market-1",
    presenceRadiusMeters: 500,
    corridors: [{ id: "corridor-1", name: "Corredor 1", sortOrder: 0, productCount: 1 }],
    placements: [{ productId: "product-1", corridorId: "corridor-1", lastConfirmedAt: "2026-05-26T00:00:00.000Z" }],
    suggestions: [{ id: "suggestion-1", productId: "product-2", suggestedCorridorName: "Corredor 2", confidenceScore: "0.80", sourceContributionCount: 3 }]
  };

  const consent: LayoutContributionConsentDto = {
    globalSharedLayoutContributionEnabled: false,
    supermarketOverride: null,
    effectiveSharedLayoutContributionEnabled: false
  };

  const accept: AcceptSharedLayoutSuggestionRequest = {
    corridorId: "corridor-1"
  };

  const journey: ShoppingJourneyDetailDto = {
    id: "journey-1",
    sourceListId: start.sourceListId,
    sourceListName: "Compra semanal",
    context: "physical",
    status: "active",
    startedAt: "2026-05-26T00:00:00.000Z",
    completedAt: null,
    canceledAt: null,
    knownTotal: "0",
    boughtItemsWithoutPriceCount: 0,
    activeStop: {
      id: "stop-1",
      supermarketId: "market-1",
      supermarketName: "Mercado Central",
      status: "active",
      startedAt: "2026-05-26T00:00:00.000Z",
      finishedAt: null,
      exitDetectedAt: null,
      continuedOutsideRadiusAt: null
    },
    items: [
      {
        id: "journey-item-1",
        sourceProductId: "product-1",
        snapshotProductName: "Arroz",
        snapshotCategoryLabel: "Mercearia",
        snapshotBrand: null,
        quantity: "1",
        unitId: "unit-1",
        snapshotUnitName: "Unidade",
        snapshotUnitAbbreviation: "un",
        expectedPrice: null,
        finalActualPrice: null,
        finalStatus: "active",
        priority: "normal",
        notes: null,
        sortOrder: 0,
        activeStopItem: null,
        placement: { corridorId: "corridor-1", corridorName: "Corredor 1" }
      }
    ],
    layout
  };

  assert.equal(detectionResponse.status, "detected");
  assert.equal(journey.items[0]?.placement?.corridorName, "Corredor 1");
  assert.equal(consent.effectiveSharedLayoutContributionEnabled, false);
  assert.equal(accept.corridorId, "corridor-1");
});
```

- [x] **Step 2: Run the shared test and verify it fails**

Run:

```powershell
corepack pnpm --filter @zbuy/shared test
```

Expected: FAIL because the phase 5 DTOs are not exported.

- [x] **Step 3: Add phase 5 shared exports**

Append these exports to `packages/shared/src/index.ts`:

```ts
export type SupermarketDetectionStatus = "detected" | "ambiguous" | "unknown";
export type ShoppingJourneyContext = "physical" | "online";
export type ShoppingJourneyStatus = "active" | "completed" | "canceled";
export type ShoppingJourneyStopStatus = "active" | "finished" | "canceled";
export type ShoppingJourneyItemFinalStatus = "active" | "bought" | "not_found" | "unprocessed";

export interface SupermarketDto {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  latitude: string | null;
  longitude: string | null;
  presenceRadiusMeters: number;
  distanceMeters?: number;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpsertSupermarketRequest {
  name: string;
  address?: string | null;
  city?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  presenceRadiusMeters?: number;
}

export interface DetectSupermarketRequest {
  latitude: string;
  longitude: string;
  radiusMeters?: number;
}

export interface DetectSupermarketResponse {
  status: SupermarketDetectionStatus;
  candidates: SupermarketDto[];
}

export interface SupermarketCorridorDto {
  id: string;
  name: string;
  sortOrder: number;
  productCount: number;
}

export interface PrivateProductPlacementDto {
  productId: string;
  corridorId: string;
  lastConfirmedAt: string;
}

export interface SharedLayoutSuggestionDto {
  id: string;
  productId: string;
  suggestedCorridorName: string;
  confidenceScore: string;
  sourceContributionCount: number;
}

export interface SupermarketLayoutDto {
  supermarketId: string;
  presenceRadiusMeters: number;
  corridors: SupermarketCorridorDto[];
  placements: PrivateProductPlacementDto[];
  suggestions: SharedLayoutSuggestionDto[];
}

export interface UpsertCorridorRequest {
  name: string;
}

export interface ReorderCorridorsRequest {
  corridorIds: string[];
}

export interface UpsertPrivateProductPlacementRequest {
  corridorId: string;
}

export interface AcceptSharedLayoutSuggestionRequest {
  corridorId?: string;
  corridorName?: string;
}

export interface LayoutContributionConsentDto {
  globalSharedLayoutContributionEnabled: boolean;
  supermarketOverride: boolean | null;
  effectiveSharedLayoutContributionEnabled: boolean;
}

export interface UpdateLayoutContributionConsentRequest {
  globalSharedLayoutContributionEnabled?: boolean;
  supermarketOverride?: boolean | null;
}

export interface ShoppingJourneyStopDto {
  id: string;
  supermarketId: string;
  supermarketName: string;
  status: ShoppingJourneyStopStatus;
  startedAt: string;
  finishedAt: string | null;
  exitDetectedAt: string | null;
  continuedOutsideRadiusAt: string | null;
}

export interface ShoppingJourneyStopItemDto {
  id: string;
  stopId: string;
  journeyItemId: string;
  status: ShoppingSessionItemStatus;
  actualPrice: string | null;
  corridorId: string | null;
  notes: string | null;
}

export interface ShoppingJourneyItemDto {
  id: string;
  sourceProductId: string | null;
  snapshotProductName: string;
  snapshotCategoryLabel: string;
  snapshotBrand: string | null;
  quantity: string;
  unitId: string | null;
  snapshotUnitName: string;
  snapshotUnitAbbreviation: string;
  expectedPrice: string | null;
  finalActualPrice: string | null;
  finalStatus: ShoppingJourneyItemFinalStatus;
  priority: ListItemPriority;
  notes: string | null;
  sortOrder: number;
  activeStopItem: ShoppingJourneyStopItemDto | null;
  placement: { corridorId: string; corridorName: string } | null;
}

export interface ShoppingJourneySummaryDto {
  id: string;
  sourceListId: string;
  sourceListName: string;
  context: ShoppingJourneyContext;
  status: ShoppingJourneyStatus;
  startedAt: string;
  completedAt: string | null;
  canceledAt: string | null;
  knownTotal: string;
  boughtItemsWithoutPriceCount: number;
  activeStop: ShoppingJourneyStopDto | null;
}

export interface ShoppingJourneyDetailDto extends ShoppingJourneySummaryDto {
  items: ShoppingJourneyItemDto[];
  layout: SupermarketLayoutDto | null;
}

export interface StartShoppingJourneyRequest {
  sourceListId: string;
  supermarketId: string;
  latitude?: string | null;
  longitude?: string | null;
}

export interface StartJourneyStopRequest {
  supermarketId: string;
}

export interface UpdateShoppingJourneyStopItemRequest {
  status?: "pending" | "bought" | "not_found";
  actualPrice?: string | null;
  corridorId?: string | null;
  notes?: string | null;
}
```

- [x] **Step 4: Run shared tests and commit**

Run:

```powershell
corepack pnpm --filter @zbuy/shared test
git add packages/shared/src/index.ts packages/shared/src/index.test.ts
git commit -m "feat: add phase 5 shared contracts"
```

Expected: PASS.

---

### Task 2: Database Schema

**Files:**
- Modify: `apps/api/prisma/schema.prisma`
- Create: `apps/api/prisma/migrations/<timestamp>_supermarket_detection_layout/migration.sql`

- [x] **Step 1: Add phase 5 Prisma enums and relations**

Add these enums to `apps/api/prisma/schema.prisma`:

```prisma
enum ShoppingJourneyContext {
  physical
  online
}

enum ShoppingJourneyStatus {
  active
  completed
  canceled
}

enum ShoppingJourneyStopStatus {
  active
  finished
  canceled
}

enum ShoppingJourneyItemFinalStatus {
  active
  bought
  not_found
  unprocessed
}
```

Add relation fields to existing models:

```prisma
model User {
  supermarkets                       Supermarket[]
  shoppingJourneys                   ShoppingJourney[]
  supermarketCorridors               SupermarketCorridor[]
  privateProductPlacements           PrivateProductPlacement[]
  layoutContributionConsent          LayoutContributionConsent?
  supermarketLayoutConsentOverrides  SupermarketLayoutConsentOverride[]
}

model Product {
  journeyItems              ShoppingJourneyItem[]
  privateProductPlacements  PrivateProductPlacement[]
  sharedLayoutSuggestions   SharedLayoutSuggestion[]
}

model ShoppingList {
  shoppingJourneys ShoppingJourney[]
}

model ShoppingListItem {
  journeyItems ShoppingJourneyItem[]
}

model Unit {
  journeyItems ShoppingJourneyItem[]
}
```

- [x] **Step 2: Add phase 5 Prisma models**

Add these models to `apps/api/prisma/schema.prisma`:

```prisma
model Supermarket {
  id               String    @id @default(uuid())
  ownerUserId      String
  name             String
  address          String?
  city             String?
  latitude         Decimal?  @db.Decimal(10, 7)
  longitude        Decimal?  @db.Decimal(10, 7)
  presenceRadiusMeters Int   @default(500)
  archivedAt       DateTime?
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt
  owner            User      @relation(fields: [ownerUserId], references: [id], onDelete: Cascade)
  stops            ShoppingJourneyStop[]
  corridors        SupermarketCorridor[]
  privatePlacements PrivateProductPlacement[]
  sharedSuggestions SharedLayoutSuggestion[]
  consentOverrides SupermarketLayoutConsentOverride[]

  @@index([ownerUserId, archivedAt])
  @@index([latitude, longitude])
  @@index([name])
}

model ShoppingJourney {
  id                           String                @id @default(uuid())
  ownerUserId                  String
  sourceListId                 String
  snapshotSourceListName       String
  context                      ShoppingJourneyContext @default(physical)
  status                       ShoppingJourneyStatus @default(active)
  startedAt                    DateTime              @default(now())
  completedAt                  DateTime?
  canceledAt                   DateTime?
  knownTotal                   Decimal               @default(0) @db.Decimal(12, 2)
  boughtItemsWithoutPriceCount Int                   @default(0)
  createdAt                    DateTime              @default(now())
  updatedAt                    DateTime              @updatedAt
  owner                        User                  @relation(fields: [ownerUserId], references: [id], onDelete: Cascade)
  sourceList                   ShoppingList          @relation(fields: [sourceListId], references: [id], onDelete: Restrict)
  items                        ShoppingJourneyItem[]
  stops                        ShoppingJourneyStop[]

  @@index([ownerUserId, status])
  @@index([ownerUserId, startedAt])
  @@index([sourceListId])
}

model ShoppingJourneyItem {
  id                       String                    @id @default(uuid())
  journeyId                String
  sourceProductId          String?
  sourceListItemId         String?
  snapshotProductName      String
  snapshotCategoryLabel    String
  snapshotBrand            String?
  quantity                 Decimal                   @db.Decimal(10, 3)
  unitId                   String?
  snapshotUnitName         String
  snapshotUnitAbbreviation String
  expectedPrice            Decimal?                  @db.Decimal(10, 2)
  finalActualPrice         Decimal?                  @db.Decimal(10, 2)
  finalStatus              ShoppingJourneyItemFinalStatus @default(active)
  priority                 ListItemPriority          @default(normal)
  notes                    String?
  sortOrder                Int                       @default(0)
  createdAt                DateTime                  @default(now())
  updatedAt                DateTime                  @updatedAt
  journey                  ShoppingJourney           @relation(fields: [journeyId], references: [id], onDelete: Cascade)
  sourceProduct            Product?                  @relation(fields: [sourceProductId], references: [id], onDelete: SetNull)
  sourceListItem           ShoppingListItem?         @relation(fields: [sourceListItemId], references: [id], onDelete: SetNull)
  unit                     Unit?                     @relation(fields: [unitId], references: [id], onDelete: SetNull)
  stopItems                ShoppingJourneyStopItem[]

  @@index([journeyId, finalStatus, sortOrder])
  @@index([sourceProductId])
  @@index([sourceListItemId])
}

model ShoppingJourneyStop {
  id                       String                    @id @default(uuid())
  journeyId                String
  supermarketId            String
  status                   ShoppingJourneyStopStatus @default(active)
  startedAt                DateTime                  @default(now())
  finishedAt               DateTime?
  exitDetectedAt           DateTime?
  continuedOutsideRadiusAt DateTime?
  createdAt                DateTime                  @default(now())
  updatedAt                DateTime                  @updatedAt
  journey                  ShoppingJourney           @relation(fields: [journeyId], references: [id], onDelete: Cascade)
  supermarket              Supermarket               @relation(fields: [supermarketId], references: [id], onDelete: Restrict)
  items                    ShoppingJourneyStopItem[]

  @@index([journeyId, status])
  @@index([supermarketId])
}

model ShoppingJourneyStopItem {
  id            String                    @id @default(uuid())
  stopId        String
  journeyItemId String
  status        ShoppingSessionItemStatus @default(pending)
  actualPrice   Decimal?                  @db.Decimal(10, 2)
  corridorId    String?
  notes         String?
  createdAt     DateTime                  @default(now())
  updatedAt     DateTime                  @updatedAt
  stop          ShoppingJourneyStop       @relation(fields: [stopId], references: [id], onDelete: Cascade)
  journeyItem   ShoppingJourneyItem       @relation(fields: [journeyItemId], references: [id], onDelete: Cascade)
  corridor      SupermarketCorridor?      @relation(fields: [corridorId], references: [id], onDelete: SetNull)

  @@unique([stopId, journeyItemId])
  @@index([stopId, status])
  @@index([journeyItemId])
  @@index([corridorId])
}

model SupermarketCorridor {
  id          String   @id @default(uuid())
  ownerUserId String
  supermarketId String
  name        String
  sortOrder   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  owner       User     @relation(fields: [ownerUserId], references: [id], onDelete: Cascade)
  supermarket Supermarket @relation(fields: [supermarketId], references: [id], onDelete: Cascade)
  placements  PrivateProductPlacement[]
  stopItems   ShoppingJourneyStopItem[]

  @@index([ownerUserId, supermarketId, sortOrder])
}

model PrivateProductPlacement {
  id              String   @id @default(uuid())
  ownerUserId     String
  supermarketId   String
  productId       String
  corridorId      String
  lastConfirmedAt DateTime @default(now())
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  owner           User     @relation(fields: [ownerUserId], references: [id], onDelete: Cascade)
  supermarket     Supermarket @relation(fields: [supermarketId], references: [id], onDelete: Cascade)
  product         Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  corridor        SupermarketCorridor @relation(fields: [corridorId], references: [id], onDelete: Cascade)

  @@unique([ownerUserId, supermarketId, productId])
  @@index([supermarketId, corridorId])
}

model SharedLayoutSuggestion {
  id                      String   @id @default(uuid())
  supermarketId            String
  productId                String
  suggestedCorridorName    String
  confidenceScore          Decimal  @db.Decimal(4, 2)
  sourceContributionCount  Int      @default(0)
  lastConfirmedAt          DateTime?
  createdAt                DateTime @default(now())
  updatedAt                DateTime @updatedAt
  supermarket              Supermarket @relation(fields: [supermarketId], references: [id], onDelete: Cascade)
  product                  Product  @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@index([supermarketId, productId])
}

model LayoutContributionConsent {
  id                                     String   @id @default(uuid())
  ownerUserId                            String   @unique
  globalSharedLayoutContributionEnabled  Boolean  @default(false)
  createdAt                              DateTime @default(now())
  updatedAt                              DateTime @updatedAt
  owner                                  User     @relation(fields: [ownerUserId], references: [id], onDelete: Cascade)
}

model SupermarketLayoutConsentOverride {
  id                              String   @id @default(uuid())
  ownerUserId                     String
  supermarketId                   String
  sharedLayoutContributionEnabled Boolean
  createdAt                       DateTime @default(now())
  updatedAt                       DateTime @updatedAt
  owner                           User     @relation(fields: [ownerUserId], references: [id], onDelete: Cascade)
  supermarket                     Supermarket @relation(fields: [supermarketId], references: [id], onDelete: Cascade)

  @@unique([ownerUserId, supermarketId])
}
```

- [x] **Step 3: Create and apply the migration**

Run:

```powershell
$env:DATABASE_URL="postgresql://zbuy:zbuy@127.0.0.1:5432/zbuy?schema=public"
corepack pnpm --filter @zbuy/api prisma:migrate -- --name supermarket_detection_layout
corepack pnpm --filter @zbuy/api prisma:generate
```

Expected: Prisma creates a migration, applies it locally, and regenerates the client.

- [x] **Step 4: Commit**

```powershell
git add apps/api/prisma/schema.prisma apps/api/prisma/migrations
git commit -m "feat: add supermarket layout database schema"
```

---

### Task 3: Supermarkets API

**Files:**
- Create: `apps/api/src/supermarkets/dto.ts`
- Create: `apps/api/src/supermarkets/supermarket-response.ts`
- Create: `apps/api/src/supermarkets/supermarkets.service.ts`
- Create: `apps/api/src/supermarkets/supermarkets.controller.ts`
- Create: `apps/api/src/supermarkets/supermarkets.module.ts`
- Create: `apps/api/src/supermarkets/supermarkets.service.spec.ts`
- Modify: `apps/api/src/app.module.ts`

- [x] **Step 1: Write service tests**

Create `apps/api/src/supermarkets/supermarkets.service.spec.ts` using the existing Prisma mocking style from `apps/api/src/purchase-locations/purchase-locations.service.spec.ts`.

The tests must assert:

- `create(ownerUserId, { name: "Mercado Central" })` returns `presenceRadiusMeters: 500`.
- `list(ownerUserId, "central")` calls Prisma with `ownerUserId`, `archivedAt: null`, and a case-insensitive name filter.
- `update(ownerUserId, id, { presenceRadiusMeters: 250, latitude: "-23.5", longitude: "-46.6" })` persists the radius and coordinates.
- `archive(ownerUserId, id)` sets `archivedAt`.
- `detect(ownerUserId, { latitude, longitude })` returns `status: "detected"` when exactly one owned active supermarket is inside its own radius.
- `detect(ownerUserId, { latitude, longitude })` returns `status: "ambiguous"` when two owned active supermarkets are inside their radius.
- `detect(ownerUserId, { latitude, longitude })` returns `status: "unknown"` when no owned active supermarket matches.
- `get(otherUserId, supermarketId)` throws `NotFoundException` for a supermarket owned by another user.

- [x] **Step 2: Run the test and verify it fails**

Run:

```powershell
corepack pnpm --filter @zbuy/api test -- supermarkets.service.spec.ts
```

Expected: FAIL because the module does not exist.

- [x] **Step 3: Add DTOs and response mapper**

Create `apps/api/src/supermarkets/dto.ts`:

```ts
import { IsInt, IsNumberString, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class UpsertSupermarketDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(240)
  address?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  city?: string | null;

  @IsOptional()
  @IsNumberString()
  latitude?: string | null;

  @IsOptional()
  @IsNumberString()
  longitude?: string | null;

  @IsOptional()
  @IsInt()
  @Min(50)
  @Max(5000)
  presenceRadiusMeters?: number;
}

export class DetectSupermarketDto {
  @IsNumberString()
  latitude!: string;

  @IsNumberString()
  longitude!: string;

  @IsOptional()
  @IsInt()
  @Min(50)
  @Max(5000)
  radiusMeters?: number;
}
```

Create `apps/api/src/supermarkets/supermarket-response.ts` with `toSupermarketDto(supermarket, distanceMeters?)`.

- [x] **Step 4: Implement service detection logic**

Implement `SupermarketsService` with:

- `list(ownerUserId, query?, lat?, lng?, radiusMeters?)`
- `create(ownerUserId, dto)`
- `get(ownerUserId, id)`
- `update(ownerUserId, id, dto)`
- `archive(ownerUserId, id)`
- `detect(ownerUserId, dto)`
- `findOwnedActive(ownerUserId, id)`

The distance helper must use the haversine formula:

```ts
export function distanceMeters(a: { latitude: number; longitude: number }, b: { latitude: number; longitude: number }) {
  const earthRadiusMeters = 6371000;
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const dLat = toRadians(b.latitude - a.latitude);
  const dLng = toRadians(b.longitude - a.longitude);
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);
  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return Math.round(2 * earthRadiusMeters * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));
}
```

Detection returns:

- `detected` when exactly one active supermarket is within its own `presenceRadiusMeters`.
- `ambiguous` when two or more active supermarkets are within their radius.
- `unknown` when none match.

- [x] **Step 5: Add controller/module and register module**

Expose the endpoints from the spec under `/supermarkets` and register `SupermarketsModule` in `AppModule`.

- [x] **Step 6: Verify and commit**

```powershell
corepack pnpm --filter @zbuy/api test -- supermarkets.service.spec.ts
corepack pnpm --filter @zbuy/api typecheck
git add apps/api/src/supermarkets apps/api/src/app.module.ts
git commit -m "feat: add supermarkets API"
```

---

### Task 4: Layout Consent API

**Files:**
- Create: `apps/api/src/layout-consent/dto.ts`
- Create: `apps/api/src/layout-consent/layout-consent-response.ts`
- Create: `apps/api/src/layout-consent/layout-consent.service.ts`
- Create: `apps/api/src/layout-consent/layout-consent.controller.ts`
- Create: `apps/api/src/layout-consent/layout-consent.module.ts`
- Create: `apps/api/src/layout-consent/layout-consent.service.spec.ts`
- Modify: `apps/api/src/app.module.ts`

- [ ] **Step 1: Write consent tests**

Create tests proving:

- Missing global consent defaults to false.
- Updating global consent persists true and false.
- Missing supermarket override returns `supermarketOverride: null`.
- Setting a supermarket override changes the effective value.
- Clearing a supermarket override falls back to global consent.
- Users cannot read or update consent for another user's supermarket.

- [ ] **Step 2: Add DTO and mapper**

Create `dto.ts`:

```ts
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateLayoutContributionConsentDto {
  @IsOptional()
  @IsBoolean()
  globalSharedLayoutContributionEnabled?: boolean;

  @IsOptional()
  supermarketOverride?: boolean | null;
}
```

Create mapper returning `LayoutContributionConsentDto`.

- [ ] **Step 3: Implement service**

Implement:

- `getGlobal(ownerUserId)`
- `updateGlobal(ownerUserId, enabled)`
- `getForSupermarket(ownerUserId, supermarketId)`
- `updateForSupermarket(ownerUserId, supermarketId, override)`

`updateForSupermarket(..., null)` deletes the override row.

- [ ] **Step 4: Add controller/module and verify**

Expose:

- `GET /layout-consent`
- `PATCH /layout-consent`
- `GET /supermarkets/:id/layout-consent`
- `PATCH /supermarkets/:id/layout-consent`

Run:

```powershell
corepack pnpm --filter @zbuy/api test -- layout-consent.service.spec.ts
corepack pnpm --filter @zbuy/api typecheck
git add apps/api/src/layout-consent apps/api/src/app.module.ts
git commit -m "feat: add layout contribution consent API"
```

---

### Task 5: Supermarket Layout API

**Files:**
- Create: `apps/api/src/supermarket-layouts/dto.ts`
- Create: `apps/api/src/supermarket-layouts/supermarket-layout-response.ts`
- Create: `apps/api/src/supermarket-layouts/supermarket-layouts.service.ts`
- Create: `apps/api/src/supermarket-layouts/supermarket-layouts.controller.ts`
- Create: `apps/api/src/supermarket-layouts/supermarket-layouts.module.ts`
- Create: `apps/api/src/supermarket-layouts/supermarket-layouts.service.spec.ts`
- Modify: `apps/api/src/app.module.ts`

- [ ] **Step 1: Write layout tests**

Tests must prove:

- Creating corridors assigns increasing `sortOrder`.
- Renaming a corridor trims the name.
- Reordering corridors persists the requested order.
- Deleting a corridor deletes or nulls associated private placements so products return to `Sem corredor definido`.
- Setting a product placement upserts one placement per user/supermarket/product.
- A placement cannot point to another user's corridor.
- Suggestions are listed separately from private placements.
- Accepting a suggestion creates or reuses a private corridor and creates a private placement.

- [ ] **Step 2: Add DTOs**

Create:

```ts
export class UpsertCorridorDto {
  @IsString()
  @MaxLength(80)
  name!: string;
}

export class ReorderCorridorsDto {
  @IsArray()
  @IsUUID(undefined, { each: true })
  corridorIds!: string[];
}

export class UpsertPrivateProductPlacementDto {
  @IsUUID()
  corridorId!: string;
}

export class AcceptSharedLayoutSuggestionDto {
  @IsOptional()
  @IsUUID()
  corridorId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  corridorName?: string;
}
```

- [ ] **Step 3: Implement service**

Implement:

- `getLayout(ownerUserId, supermarketId)`
- `createCorridor(ownerUserId, supermarketId, dto)`
- `updateCorridor(ownerUserId, supermarketId, corridorId, dto)`
- `reorderCorridors(ownerUserId, supermarketId, dto)`
- `deleteCorridor(ownerUserId, supermarketId, corridorId)`
- `setProductPlacement(ownerUserId, supermarketId, productId, dto)`
- `deleteProductPlacement(ownerUserId, supermarketId, productId)`
- `listSuggestions(ownerUserId, supermarketId)`
- `acceptSuggestion(ownerUserId, supermarketId, suggestionId, dto)`

`acceptSuggestion` creates a corridor named `dto.corridorName` or `suggestion.suggestedCorridorName` when `dto.corridorId` is absent.

- [ ] **Step 4: Add controller/module and verify**

Run:

```powershell
corepack pnpm --filter @zbuy/api test -- supermarket-layouts.service.spec.ts
corepack pnpm --filter @zbuy/api typecheck
git add apps/api/src/supermarket-layouts apps/api/src/app.module.ts
git commit -m "feat: add supermarket layout API"
```

---

### Task 6: Shopping Journeys API

**Files:**
- Create: `apps/api/src/shopping-journeys/dto.ts`
- Create: `apps/api/src/shopping-journeys/shopping-journey-response.ts`
- Create: `apps/api/src/shopping-journeys/shopping-journeys.service.ts`
- Create: `apps/api/src/shopping-journeys/shopping-journeys.controller.ts`
- Create: `apps/api/src/shopping-journeys/shopping-journeys.module.ts`
- Create: `apps/api/src/shopping-journeys/shopping-journeys.service.spec.ts`
- Modify: `apps/api/src/app.module.ts`

- [ ] **Step 1: Write journey service tests**

Tests must cover:

- Starting a physical journey snapshots list items and starts the first supermarket stop.
- User cannot start a second active journey.
- Starting rejects empty lists.
- Starting rejects archived supermarkets.
- Active journey detail groups active items with placement metadata.
- Finishing a stop keeps the journey active.
- Bought stop items set journey item `finalStatus = bought`.
- Not-found stop items keep journey item `finalStatus = active`.
- Switching supermarkets finishes the old stop and starts a new stop.
- Not-found items from the old stop appear active in the new stop.
- Completing a journey converts remaining active items to `unprocessed`.
- Canceling a journey cancels the active stop and keeps audit rows.

- [ ] **Step 2: Add DTOs**

Create DTOs:

```ts
export class StartShoppingJourneyDto {
  @IsUUID()
  sourceListId!: string;

  @IsUUID()
  supermarketId!: string;

  @IsOptional()
  @IsNumberString()
  latitude?: string | null;

  @IsOptional()
  @IsNumberString()
  longitude?: string | null;
}

export class StartJourneyStopDto {
  @IsUUID()
  supermarketId!: string;
}

export class UpdateShoppingJourneyStopItemDto {
  @IsOptional()
  @IsIn(["pending", "bought", "not_found"])
  status?: "pending" | "bought" | "not_found";

  @IsOptional()
  @Matches(/^\d+(\.\d{1,2})?$/)
  actualPrice?: string | null;

  @IsOptional()
  @IsUUID()
  corridorId?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string | null;
}
```

- [ ] **Step 3: Implement journey start and active retrieval**

`start(ownerUserId, dto)` must:

1. Reject an existing active `ShoppingJourney`.
2. Load the owned source list with product/unit item details.
3. Reject empty source lists.
4. Load the active supermarket.
5. Create the `ShoppingJourney`.
6. Create one `ShoppingJourneyItem` per list item.
7. Create the first active `ShoppingJourneyStop`.
8. Create pending `ShoppingJourneyStopItem` rows for every active journey item.

- [ ] **Step 4: Implement stop and item transitions**

Implement:

- `finishStop(ownerUserId, journeyId, stopId)`
- `continueOutsideRadius(ownerUserId, journeyId, stopId)`
- `switchSupermarket(ownerUserId, journeyId, stopId, dto)`
- `updateStopItem(ownerUserId, journeyId, stopId, itemId, dto)`

Rules:

- Only active journeys and active stops can mutate.
- `bought` stop items set the journey item final status to `bought` and persist `finalActualPrice`.
- `not_found` stop items keep the journey item final status as `active`.
- `pending` stop items keep the journey item final status as `active`.
- Setting a corridor for a product updates `PrivateProductPlacement` automatically.
- Actual price is accepted only when the final stop item status is `bought`.

- [ ] **Step 5: Implement completion and cancellation**

`complete(ownerUserId, journeyId)` must:

- Finish any active stop.
- Convert remaining active journey items to `unprocessed`.
- Recalculate `knownTotal` from bought items with known actual price.
- Set `status = completed`.

`cancel(ownerUserId, journeyId)` must:

- Cancel any active stop.
- Set `status = canceled`.

- [ ] **Step 6: Add controller/module and verify**

Expose the routes from the spec. Run:

```powershell
corepack pnpm --filter @zbuy/api test -- shopping-journeys.service.spec.ts
corepack pnpm --filter @zbuy/api typecheck
git add apps/api/src/shopping-journeys apps/api/src/app.module.ts
git commit -m "feat: add physical shopping journeys API"
```

---

### Task 7: Purchase History Integration

**Files:**
- Modify: `apps/api/src/purchase-history/purchase-history.service.ts`
- Modify: `apps/api/src/purchase-history/purchase-history.controller.ts`
- Modify: `apps/api/src/purchase-history/purchase-history.service.spec.ts`
- Modify: `packages/shared/src/index.ts`

- [ ] **Step 1: Add history contract for journey stops**

Add a shared DTO:

```ts
export interface ShoppingJourneyHistoryStopDto extends ShoppingJourneyStopDto {
  journeyId: string;
  sourceListId: string;
  sourceListName: string;
  knownTotal: string;
  boughtItemsWithoutPriceCount: number;
  itemCounts: {
    bought: number;
    notFound: number;
    unprocessed: number;
  };
}
```

- [ ] **Step 2: Add history tests**

Add tests proving:

- Completed journeys appear in purchase history.
- Active/canceled journeys do not appear as completed history.
- A not-found item from one stop and a bought item from another stop both appear with their own supermarket context.
- Price filters include bought journey stop items only.
- Ownership isolation is enforced.

- [ ] **Step 3: Implement history queries**

Extend `PurchaseHistoryService` with:

- `listJourneyStops(ownerUserId, filters)`
- `getJourney(ownerUserId, id)`
- `listJourneyItems(ownerUserId, filters)`

Keep existing phase 4 session history endpoints stable and add:

- `GET /purchase-history/journey-stops`
- `GET /purchase-history/journeys/:id`
- `GET /purchase-history/journey-items`

- [ ] **Step 4: Verify and commit**

```powershell
corepack pnpm --filter @zbuy/api test -- purchase-history.service.spec.ts
corepack pnpm --filter @zbuy/api typecheck
git add packages/shared/src/index.ts apps/api/src/purchase-history
git commit -m "feat: include shopping journeys in purchase history"
```

---

### Task 8: Web Resources And Navigation

**Files:**
- Modify: `apps/web/src/lib/resources.ts`
- Modify: `apps/web/src/components/AppShell.tsx`
- Modify: `apps/web/src/app/globals.css`

- [ ] **Step 1: Add resource client functions**

Add imports for phase 5 shared DTOs and implement:

- `listSupermarkets(query?, latitude?, longitude?)`
- `createSupermarket(input)`
- `updateSupermarket(id, input)`
- `archiveSupermarket(id)`
- `detectSupermarket(input)`
- `getSupermarketLayout(id)`
- `createSupermarketCorridor(supermarketId, input)`
- `updateSupermarketCorridor(supermarketId, corridorId, input)`
- `reorderSupermarketCorridors(supermarketId, input)`
- `deleteSupermarketCorridor(supermarketId, corridorId)`
- `setPrivateProductPlacement(supermarketId, productId, input)`
- `deletePrivateProductPlacement(supermarketId, productId)`
- `listSharedLayoutSuggestions(supermarketId)`
- `acceptSharedLayoutSuggestion(supermarketId, suggestionId, input)`
- `getLayoutContributionConsent()`
- `updateLayoutContributionConsent(input)`
- `getSupermarketLayoutConsent(supermarketId)`
- `updateSupermarketLayoutConsent(supermarketId, input)`
- `listShoppingJourneys(status?, limit?)`
- `getActiveShoppingJourney()`
- `startShoppingJourney(input)`
- `getShoppingJourney(id)`
- `finishJourneyStop(journeyId, stopId)`
- `continueJourneyStopOutsideRadius(journeyId, stopId)`
- `switchJourneyStopSupermarket(journeyId, stopId, input)`
- `updateShoppingJourneyStopItem(journeyId, stopId, itemId, input)`
- `completeShoppingJourney(id)`
- `cancelShoppingJourney(id)`

- [ ] **Step 2: Add navigation and styles**

Add `Supermercados` to `AppShell`.

Add CSS classes for:

- `.journey-shell`
- `.journey-stop-banner`
- `.corridor-group`
- `.undefined-corridor`
- `.supermarket-grid`
- `.layout-editor`
- `.suggestion-row`
- `.consent-panel`

- [ ] **Step 3: Verify and commit**

```powershell
corepack pnpm --filter @zbuy/web typecheck
git add apps/web/src/lib/resources.ts apps/web/src/components/AppShell.tsx apps/web/src/app/globals.css
git commit -m "feat: add phase 5 web resources"
```

---

### Task 9: Physical Journey Start Flow

**Files:**
- Modify: `apps/web/src/app/purchases/page.tsx`
- Create: `apps/web/src/app/purchases/PhysicalJourneyStartForm.tsx`
- Modify: `apps/web/src/app/page.test.tsx`

- [ ] **Step 1: Write frontend tests**

Tests must verify:

- Physical context renders the journey start form.
- Clicking detect calls `detectSupermarket` with coordinates from a geolocation provider prop.
- Detected supermarket can start a journey.
- Ambiguous detection shows candidate selection.
- Unknown detection shows create-supermarket fields.
- Online context still uses the existing phase 4 session start flow.

- [ ] **Step 2: Implement form**

`PhysicalJourneyStartForm` props:

```ts
interface PhysicalJourneyStartFormProps {
  lists: ShoppingListSummaryDto[];
  onStarted: (journeyId: string) => void;
  getCurrentPosition?: () => Promise<{ latitude: string; longitude: string }>;
}
```

The default `getCurrentPosition` wraps `navigator.geolocation.getCurrentPosition`.

Render:

- List select.
- Detect supermarket button.
- Candidate list when detected or ambiguous.
- Manual supermarket create form when unknown or user chooses create.
- Start journey button.

- [ ] **Step 3: Wire Purchases page**

The page should:

- Load active phase 4 session and active phase 5 journey.
- Show active physical journey first when present.
- Show active online session when present.
- Let physical starts call `startShoppingJourney`.
- Let online starts keep calling `startShoppingSession`.

- [ ] **Step 4: Verify and commit**

```powershell
corepack pnpm --filter @zbuy/web test
corepack pnpm --filter @zbuy/web typecheck
git add apps/web/src/app/purchases apps/web/src/app/page.test.tsx
git commit -m "feat: add physical journey start flow"
```

---

### Task 10: Active Journey Board

**Files:**
- Create: `apps/web/src/app/journeys/[id]/page.tsx`
- Create: `apps/web/src/app/journeys/[id]/JourneyBoard.tsx`
- Modify: `apps/web/src/app/page.test.tsx`
- Modify: `apps/web/src/app/globals.css`

- [ ] **Step 1: Write frontend tests**

Tests must verify:

- Items group by corridor order.
- Items without placement appear in `Sem corredor definido`.
- Marking bought with a corridor calls `updateShoppingJourneyStopItem`.
- Marking not found keeps the item visible as recoverable for the next stop after stop finish.
- Finish stop calls the API and shows next-supermarket setup state.
- Switch supermarket prompt calls the switch API.
- Complete journey calls the completion API.

- [ ] **Step 2: Implement page**

`/journeys/[id]` loads the journey by id and renders `JourneyBoard`.

If no active stop exists and the journey is active, render controls to detect/select/create the next supermarket.

- [ ] **Step 3: Implement board grouping**

`JourneyBoard` groups `journey.items` by:

1. `item.placement.corridorId` matching layout corridors.
2. `Sem corredor definido` for null placement.

For each item render:

- Product name.
- Quantity and unit.
- Expected price.
- Corridor select.
- Actual price input for bought action.
- Mark bought.
- Mark not found.
- Move back to pending.

- [ ] **Step 4: Implement stop controls**

Add actions:

- Finish current supermarket stop.
- Continue outside radius.
- Switch supermarket.
- Finish overall journey.

- [ ] **Step 5: Verify and commit**

```powershell
corepack pnpm --filter @zbuy/web test
corepack pnpm --filter @zbuy/web typecheck
git add apps/web/src/app/journeys apps/web/src/app/page.test.tsx apps/web/src/app/globals.css
git commit -m "feat: add active physical journey board"
```

---

### Task 11: Supermarket Layout Screens

**Files:**
- Create: `apps/web/src/app/supermarkets/page.tsx`
- Create: `apps/web/src/app/supermarkets/[id]/layout/page.tsx`
- Modify: `apps/web/src/app/account/page.tsx`
- Modify: `apps/web/src/app/page.test.tsx`
- Modify: `apps/web/src/app/globals.css`

- [ ] **Step 1: Write frontend tests**

Tests must verify:

- Supermarket list renders active supermarkets.
- Layout page creates, renames, reorders, and deletes corridors.
- Radius update calls `updateSupermarket`.
- Shared suggestion acceptance calls `acceptSharedLayoutSuggestion`.
- Global consent setting updates from account page.
- Supermarket consent override updates from layout page.

- [ ] **Step 2: Implement supermarket list**

`/supermarkets` renders:

- Search.
- Supermarket cards.
- Create supermarket form.
- Link to each layout screen.

- [ ] **Step 3: Implement layout page**

`/supermarkets/[id]/layout` renders:

- Supermarket radius form.
- Corridor editor.
- Products grouped by corridor.
- `Sem corredor definido`.
- Suggestions with accept buttons.
- Per-supermarket contribution consent override.

- [ ] **Step 4: Add global consent to account page**

Add a section to `/account`:

- Toggle global shared layout contribution.
- Text explaining private layouts remain private.
- Save action calling `updateLayoutContributionConsent`.

- [ ] **Step 5: Verify and commit**

```powershell
corepack pnpm --filter @zbuy/web test
corepack pnpm --filter @zbuy/web typecheck
git add apps/web/src/app/supermarkets apps/web/src/app/account/page.tsx apps/web/src/app/page.test.tsx apps/web/src/app/globals.css
git commit -m "feat: add supermarket layout screens"
```

---

### Task 12: API E2E And Browser E2E

**Files:**
- Create: `apps/api/test/shopping-journeys.e2e-spec.ts`
- Modify: `apps/api/test/jest-e2e.json`
- Modify: `tests/e2e/auth.spec.ts`
- Modify: `tests/e2e/README.md`

- [ ] **Step 1: Add API E2E**

Create an API E2E that:

1. Signs up a user.
2. Creates a product and list.
3. Creates two supermarkets.
4. Starts a physical journey in the first supermarket.
5. Marks one item bought with a corridor.
6. Marks one item not found.
7. Finishes the first stop.
8. Switches to the second supermarket.
9. Verifies the not-found item is active in the second stop.
10. Completes the journey.
11. Reads journey history.

- [ ] **Step 2: Extend Playwright E2E**

Extend `tests/e2e/auth.spec.ts` after the phase 4 list/product setup:

```ts
await page.goto("/purchases", { waitUntil: "commit" });
await page.getByLabel("Lista").selectOption({ label: "Compra semanal" });
await page.getByLabel("Tipo").selectOption("physical");
await page.getByRole("button", { name: "Criar supermercado manualmente" }).click();
await page.getByLabel("Nome do supermercado").fill("Mercado Central");
await page.getByRole("button", { name: "Criar e iniciar compra" }).click();
await expect(page.getByText("Sem corredor definido")).toBeVisible();
await page.getByRole("button", { name: "Novo corredor" }).click();
await page.getByLabel("Nome do corredor").fill("Corredor 1");
await page.getByRole("button", { name: "Salvar corredor" }).click();
await page.getByLabel("Corredor de Arroz").selectOption({ label: "Corredor 1" });
await page.getByRole("button", { name: "Marcar Arroz como comprado" }).click();
await page.getByRole("button", { name: "Finalizar parada neste supermercado" }).click();
```

- [ ] **Step 3: Document prerequisites**

Update `tests/e2e/README.md` with:

- Browser geolocation is not required for the manual supermarket path.
- Phase 5 migrations must be applied.
- API must run on `3001` and web on `3000`.

- [ ] **Step 4: Verify and commit**

```powershell
corepack pnpm --filter @zbuy/api test:e2e
corepack pnpm e2e
git add apps/api/test tests/e2e
git commit -m "test: cover phase 5 shopping journey flow"
```

---

### Task 13: Documentation And Roadmap

**Files:**
- Create: `docs/development/phase-5-supermarket-detection-layout.md`
- Modify: `docs/product/implementation-roadmap.md`

- [ ] **Step 1: Add development guide**

Create a guide covering:

- Migration commands.
- Supermarket detection behavior.
- 500 meter default radius.
- Journey versus stop distinction.
- Corridor grouping.
- Private layout learning.
- Shared suggestion consent.
- Local test commands.

- [ ] **Step 2: Update roadmap**

Update `docs/product/implementation-roadmap.md`:

- Phase 4 status: completed.
- Phase 5 status: active implementation phase.
- Phase 5 deliverables aligned with the approved spec.

- [ ] **Step 3: Verify and commit**

```powershell
git add docs/development/phase-5-supermarket-detection-layout.md docs/product/implementation-roadmap.md
git commit -m "docs: add phase 5 supermarket layout guide"
```

---

### Task 14: Final Verification

**Files:**
- No planned source edits.

- [ ] **Step 1: Run full verification**

Run:

```powershell
corepack pnpm --recursive lint
corepack pnpm --recursive typecheck
corepack pnpm test
corepack pnpm --recursive build
corepack pnpm --filter @zbuy/api test:e2e
corepack pnpm e2e
```

Expected: all commands exit with code `0`.

- [ ] **Step 2: Record completion evidence**

Create `docs/development/phase-5-completion-evidence.md` with:

- Date.
- Branch.
- Scope closed.
- Commit list.
- Verification commands.
- Verification results.
- Remaining product work explicitly outside phase 5.

- [ ] **Step 3: Commit evidence**

```powershell
git add docs/development/phase-5-completion-evidence.md
git commit -m "docs: record phase 5 completion evidence"
```

---

## Self-Review Checklist

- Spec coverage:
  - GPS-assisted supermarket detection: Tasks 3, 9, 12.
  - Configurable 500 meter radius: Tasks 2, 3, 11.
  - Unknown supermarket creation: Tasks 3, 9, 12.
  - Multi-stop shopping journey: Tasks 2, 6, 10, 12.
  - Stop finish without finishing overall journey: Tasks 6, 10, 12.
  - Not-found items returning for the next supermarket: Tasks 6, 10, 12.
  - Automatic regrouping by new layout: Tasks 5, 6, 10.
  - `Sem corredor definido`: Tasks 5, 10, 11.
  - Corridor editing in shopping and dedicated screen: Tasks 5, 10, 11.
  - Private layout automatic learning: Tasks 5, 6, 10.
  - Shared suggestions with explicit acceptance: Tasks 5, 11.
  - Global and per-supermarket consent: Tasks 4, 11.
  - Online shopping exclusion from layout behavior: Tasks 9 and regression checks in Task 12.
- Out of scope:
  - Indoor positioning infrastructure, multiple simultaneous journeys, two-list journeys, barcode scanning, receipt scanning, and supermarket-admin managed layouts.
- Deferred-work scan:
  - No task contains a deferred requirement or an undefined deliverable.
- Type consistency:
  - Shared DTO names match API route intent and web resource function names.

---

Plan complete and saved to `docs/superpowers/plans/2026-05-26-zbuy-phase-5-supermarket-detection-layout.md`.

Two execution options:

**1. Subagent-Driven (recommended)** - Dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
