# ZBuy Phase 4 Shopping Sessions And History Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build purchase locations, shopping sessions, kanban item processing, immutable purchase history, and continuation lists.

**Architecture:** Extend the existing TypeScript monorepo using the same phase 3 boundaries: shared DTOs in `packages/shared`, Prisma persistence in `apps/api/prisma`, authenticated NestJS modules in `apps/api/src`, and Next.js authenticated screens in `apps/web/src/app`. Sessions snapshot list item data at start, completed history reads from immutable session tables, and the web app uses explicit API client functions in `apps/web/src/lib/resources.ts`.

**Tech Stack:** TypeScript, pnpm workspaces, Prisma, PostgreSQL, NestJS, Next.js, React, Jest, Vitest, Testing Library, Playwright, native HTML drag-and-drop with button fallbacks.

---

## File Structure

- Modify: `packages/shared/src/index.ts`
  - Add purchase location, shopping session, session item, history, filter, and request DTOs.
- Modify: `packages/shared/src/index.test.ts`
  - Add compile-time DTO shape tests for phase 4.
- Modify: `apps/api/prisma/schema.prisma`
  - Add phase 4 enums and models: `PurchaseLocation`, `ShoppingSession`, `ShoppingSessionItem`.
- Create: `apps/api/prisma/migrations/<timestamp>_shopping_sessions_history/migration.sql`
  - Migration for phase 4 tables, indexes, and relations.
- Create: `apps/api/src/purchase-locations/*`
  - Authenticated CRUD/archive API for physical and online locations.
- Create: `apps/api/src/shopping-sessions/*`
  - Session start, active session, status movement, completion, cancellation, continuation list, and tests.
- Create: `apps/api/src/purchase-history/*`
  - Read-only completed history list/detail/item filter API and tests.
- Modify: `apps/api/src/app.module.ts`
  - Register phase 4 modules.
- Modify: `apps/web/src/components/AppShell.tsx`
  - Add navigation links for Purchases and History.
- Modify: `apps/web/src/lib/resources.ts`
  - Add phase 4 API client functions.
- Create: `apps/web/src/app/purchases/page.tsx`
  - Purchases dashboard with active session, start purchase, recent sessions.
- Create: `apps/web/src/app/purchases/StartPurchaseForm.tsx`
  - Client component for list/context/location selection and inline location creation.
- Create: `apps/web/src/app/purchases/[id]/page.tsx`
  - Session detail route.
- Create: `apps/web/src/app/purchases/[id]/SessionBoard.tsx`
  - Kanban board with drag-and-drop and fallback actions.
- Create: `apps/web/src/app/history/page.tsx`
  - Advanced history filters and completed session list.
- Create: `apps/web/src/app/history/[id]/page.tsx`
  - Immutable session detail and continuation list action.
- Modify: `apps/web/src/app/globals.css`
  - Add purchase dashboard, kanban, filters, and history styles.
- Modify: `apps/web/src/app/page.test.tsx`
  - Add frontend tests for purchase/session/history screens.
- Modify: `tests/e2e/auth.spec.ts`
  - Extend Playwright flow through purchase location, session, completion, history, continuation list.
- Create: `docs/development/phase-4-shopping-sessions-history.md`
  - Local setup, API summary, and test commands.
- Modify: `docs/product/implementation-roadmap.md`
  - Mark phase 4 as active and phase 3 as completed.

---

### Task 1: Shared Contracts

**Files:**
- Modify: `packages/shared/src/index.ts`
- Modify: `packages/shared/src/index.test.ts`

- [ ] **Step 1: Add phase 4 DTO types**

Append these exports to `packages/shared/src/index.ts` after the phase 3 types:

```ts
export type PurchaseLocationType = "physical" | "online";
export type ShoppingSessionContext = "physical" | "online";
export type ShoppingSessionStatus = "active" | "completed" | "canceled";
export type ShoppingSessionItemStatus = "pending" | "bought" | "not_found" | "unprocessed";

export interface PurchaseLocationDto {
  id: string;
  type: PurchaseLocationType;
  name: string;
  address: string | null;
  city: string | null;
  websiteOrApp: string | null;
  notes: string | null;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpsertPurchaseLocationRequest {
  type: PurchaseLocationType;
  name: string;
  address?: string | null;
  city?: string | null;
  websiteOrApp?: string | null;
  notes?: string | null;
}

export interface ShoppingSessionItemDto {
  id: string;
  sourceProductId: string | null;
  sourceListItemId: string | null;
  snapshotProductName: string;
  snapshotCategoryLabel: string;
  snapshotBrand: string | null;
  quantity: string;
  unitId: string | null;
  snapshotUnitName: string;
  snapshotUnitAbbreviation: string;
  expectedPrice: string | null;
  actualPrice: string | null;
  status: ShoppingSessionItemStatus;
  priority: ListItemPriority;
  notes: string | null;
  sortOrder: number;
}

export interface ShoppingSessionSummaryDto {
  id: string;
  sourceListId: string;
  sourceListName: string;
  purchaseLocation: PurchaseLocationDto;
  context: ShoppingSessionContext;
  status: ShoppingSessionStatus;
  startedAt: string;
  completedAt: string | null;
  canceledAt: string | null;
  knownTotal: string;
  boughtItemsWithoutPriceCount: number;
  itemCounts: {
    pending: number;
    bought: number;
    notFound: number;
    unprocessed: number;
  };
}

export interface ShoppingSessionDetailDto extends ShoppingSessionSummaryDto {
  items: ShoppingSessionItemDto[];
}

export interface StartShoppingSessionRequest {
  sourceListId: string;
  purchaseLocationId: string;
  context: ShoppingSessionContext;
}

export interface UpdateShoppingSessionItemRequest {
  status?: ShoppingSessionItemStatus;
  actualPrice?: string | null;
  notes?: string | null;
}

export interface PurchaseHistoryFilters {
  dateFrom?: string;
  dateTo?: string;
  locationId?: string;
  locationType?: PurchaseLocationType;
  productQuery?: string;
  sourceListId?: string;
  itemStatus?: ShoppingSessionItemStatus;
  minPrice?: string;
  maxPrice?: string;
  withoutPrice?: boolean;
}

export interface CreateContinuationListRequest {
  name?: string;
}
```

- [ ] **Step 2: Add compile-time DTO test**

Append this test to `packages/shared/src/index.test.ts`:

```ts
import type {
  PurchaseLocationDto,
  ShoppingSessionDetailDto,
  StartShoppingSessionRequest,
  UpdateShoppingSessionItemRequest
} from "./index.js";

test("phase 4 DTO shapes support purchase locations and shopping sessions", () => {
  const location: PurchaseLocationDto = {
    id: "loc-1",
    type: "physical",
    name: "Mercado Central",
    address: null,
    city: null,
    websiteOrApp: null,
    notes: null,
    archivedAt: null,
    createdAt: "2026-05-24T00:00:00.000Z",
    updatedAt: "2026-05-24T00:00:00.000Z"
  };

  const start: StartShoppingSessionRequest = {
    sourceListId: "list-1",
    purchaseLocationId: "loc-1",
    context: "physical"
  };

  const update: UpdateShoppingSessionItemRequest = {
    status: "bought",
    actualPrice: "12.50",
    notes: "Bought on sale"
  };

  const detail: ShoppingSessionDetailDto = {
    id: "session-1",
    sourceListId: start.sourceListId,
    sourceListName: "Compra semanal",
    purchaseLocation: location,
    context: "physical",
    status: "completed",
    startedAt: "2026-05-24T00:00:00.000Z",
    completedAt: "2026-05-24T01:00:00.000Z",
    canceledAt: null,
    knownTotal: "12.50",
    boughtItemsWithoutPriceCount: 0,
    itemCounts: { pending: 0, bought: 1, notFound: 0, unprocessed: 0 },
    items: [
      {
        id: "item-1",
        sourceProductId: "product-1",
        sourceListItemId: "list-item-1",
        snapshotProductName: "Arroz",
        snapshotCategoryLabel: "Mercearia",
        snapshotBrand: null,
        quantity: "2",
        unitId: "unit-kg",
        snapshotUnitName: "Kilogram",
        snapshotUnitAbbreviation: "kg",
        expectedPrice: "10.00",
        actualPrice: update.actualPrice ?? null,
        status: "bought",
        priority: "normal",
        notes: update.notes ?? null,
        sortOrder: 0
      }
    ]
  };

  assert.equal(detail.purchaseLocation.name, "Mercado Central");
  assert.equal(detail.items[0]?.status, "bought");
});
```

- [ ] **Step 3: Run shared tests**

Run:

```powershell
corepack pnpm --filter @zbuy/shared test
```

Expected: all shared package tests pass.

- [ ] **Step 4: Commit**

```powershell
git add packages/shared/src/index.ts packages/shared/src/index.test.ts
git commit -m "feat: add shopping session shared contracts"
```

---

### Task 2: Database Schema

**Files:**
- Modify: `apps/api/prisma/schema.prisma`
- Create: `apps/api/prisma/migrations/<timestamp>_shopping_sessions_history/migration.sql`

- [ ] **Step 1: Add enums and relations**

Update `apps/api/prisma/schema.prisma` with:

```prisma
enum PurchaseLocationType {
  physical
  online
}

enum ShoppingSessionContext {
  physical
  online
}

enum ShoppingSessionStatus {
  active
  completed
  canceled
}

enum ShoppingSessionItemStatus {
  pending
  bought
  not_found
  unprocessed
}
```

Add these relation fields:

```prisma
model User {
  // keep existing fields
  purchaseLocations PurchaseLocation[]
  shoppingSessions  ShoppingSession[]
}

model Unit {
  // keep existing fields
  sessionItems ShoppingSessionItem[]
}

model Product {
  // keep existing fields
  sessionItems ShoppingSessionItem[]
}

model ShoppingList {
  // keep existing fields
  shoppingSessions ShoppingSession[]
}

model ShoppingListItem {
  // keep existing fields
  sessionItems ShoppingSessionItem[]
}
```

- [ ] **Step 2: Add phase 4 models**

Add the models:

```prisma
model PurchaseLocation {
  id               String               @id @default(uuid())
  ownerUserId      String
  type             PurchaseLocationType
  name             String
  address          String?
  city             String?
  websiteOrApp     String?
  notes            String?
  archivedAt       DateTime?
  createdAt        DateTime             @default(now())
  updatedAt        DateTime             @updatedAt
  owner            User                 @relation(fields: [ownerUserId], references: [id], onDelete: Cascade)
  shoppingSessions ShoppingSession[]

  @@index([ownerUserId, type, archivedAt])
  @@index([ownerUserId, name])
}

model ShoppingSession {
  id                           String                @id @default(uuid())
  ownerUserId                  String
  sourceListId                 String
  purchaseLocationId           String
  context                      ShoppingSessionContext
  status                       ShoppingSessionStatus @default(active)
  startedAt                    DateTime              @default(now())
  completedAt                  DateTime?
  canceledAt                   DateTime?
  knownTotal                   Decimal               @default(0) @db.Decimal(12, 2)
  boughtItemsWithoutPriceCount Int                   @default(0)
  createdAt                    DateTime              @default(now())
  updatedAt                    DateTime              @updatedAt
  owner                        User                  @relation(fields: [ownerUserId], references: [id], onDelete: Cascade)
  sourceList                   ShoppingList          @relation(fields: [sourceListId], references: [id], onDelete: Restrict)
  purchaseLocation             PurchaseLocation      @relation(fields: [purchaseLocationId], references: [id], onDelete: Restrict)
  items                        ShoppingSessionItem[]

  @@index([ownerUserId, status])
  @@index([ownerUserId, startedAt])
  @@index([purchaseLocationId])
  @@index([sourceListId])
}

model ShoppingSessionItem {
  id                       String                    @id @default(uuid())
  sessionId                String
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
  actualPrice              Decimal?                  @db.Decimal(10, 2)
  status                   ShoppingSessionItemStatus @default(pending)
  priority                 ListItemPriority          @default(normal)
  notes                    String?
  sortOrder                Int                       @default(0)
  createdAt                DateTime                  @default(now())
  updatedAt                DateTime                  @updatedAt
  session                  ShoppingSession           @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  sourceProduct            Product?                  @relation(fields: [sourceProductId], references: [id], onDelete: SetNull)
  sourceListItem           ShoppingListItem?         @relation(fields: [sourceListItemId], references: [id], onDelete: SetNull)
  unit                     Unit?                     @relation(fields: [unitId], references: [id], onDelete: SetNull)

  @@index([sessionId, status, sortOrder])
  @@index([sourceProductId])
  @@index([sourceListItemId])
}
```

- [ ] **Step 3: Create migration**

Run:

```powershell
$env:DATABASE_URL="postgresql://zbuy:zbuy@127.0.0.1:5432/zbuy?schema=public"
corepack pnpm --filter @zbuy/api prisma:migrate -- --name shopping_sessions_history
```

Expected: Prisma creates a migration and applies it locally.

- [ ] **Step 4: Regenerate Prisma client**

Run:

```powershell
corepack pnpm --filter @zbuy/api prisma:generate
```

Expected: Prisma client generated successfully.

- [ ] **Step 5: Commit**

```powershell
git add apps/api/prisma/schema.prisma apps/api/prisma/migrations
git commit -m "feat: add shopping session database schema"
```

---

### Task 3: Purchase Locations API

**Files:**
- Create: `apps/api/src/purchase-locations/dto.ts`
- Create: `apps/api/src/purchase-locations/purchase-location-response.ts`
- Create: `apps/api/src/purchase-locations/purchase-locations.service.ts`
- Create: `apps/api/src/purchase-locations/purchase-locations.controller.ts`
- Create: `apps/api/src/purchase-locations/purchase-locations.module.ts`
- Create: `apps/api/src/purchase-locations/purchase-locations.service.spec.ts`
- Modify: `apps/api/src/app.module.ts`

- [ ] **Step 1: Add DTOs**

Create `dto.ts`:

```ts
import { IsIn, IsOptional, IsString, MaxLength } from "class-validator";

export class UpsertPurchaseLocationDto {
  @IsIn(["physical", "online"])
  type!: "physical" | "online";

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
  @IsString()
  @MaxLength(160)
  websiteOrApp?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string | null;
}
```

- [ ] **Step 2: Add response mapper**

Create `purchase-location-response.ts`:

```ts
import type { PurchaseLocationDto } from "@zbuy/shared";

export function toPurchaseLocationDto(location: {
  id: string;
  type: "physical" | "online";
  name: string;
  address: string | null;
  city: string | null;
  websiteOrApp: string | null;
  notes: string | null;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}): PurchaseLocationDto {
  return {
    id: location.id,
    type: location.type,
    name: location.name,
    address: location.address,
    city: location.city,
    websiteOrApp: location.websiteOrApp,
    notes: location.notes,
    archivedAt: location.archivedAt?.toISOString() ?? null,
    createdAt: location.createdAt.toISOString(),
    updatedAt: location.updatedAt.toISOString()
  };
}
```

- [ ] **Step 3: Implement service**

Create `purchase-locations.service.ts` with methods:

```ts
@Injectable()
export class PurchaseLocationsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(ownerUserId: string, type?: string, query?: string) {
    const locations = await this.prisma.purchaseLocation.findMany({
      where: {
        ownerUserId,
        archivedAt: null,
        ...(type === "physical" || type === "online" ? { type } : {}),
        ...(query?.trim() ? { name: { contains: query.trim(), mode: "insensitive" as const } } : {})
      },
      orderBy: [{ name: "asc" }]
    });
    return { purchaseLocations: locations.map(toPurchaseLocationDto) };
  }

  async create(ownerUserId: string, dto: UpsertPurchaseLocationDto) {
    const location = await this.prisma.purchaseLocation.create({
      data: cleanLocationInput(ownerUserId, dto)
    });
    return toPurchaseLocationDto(location);
  }

  async get(ownerUserId: string, id: string) {
    const location = await this.findOwned(ownerUserId, id);
    return toPurchaseLocationDto(location);
  }

  async update(ownerUserId: string, id: string, dto: UpsertPurchaseLocationDto) {
    await this.findOwned(ownerUserId, id);
    const location = await this.prisma.purchaseLocation.update({
      where: { id },
      data: cleanLocationInput(ownerUserId, dto)
    });
    return toPurchaseLocationDto(location);
  }

  async archive(ownerUserId: string, id: string) {
    await this.findOwned(ownerUserId, id);
    const location = await this.prisma.purchaseLocation.update({
      where: { id },
      data: { archivedAt: new Date() }
    });
    return toPurchaseLocationDto(location);
  }

  async findOwned(ownerUserId: string, id: string) {
    const location = await this.prisma.purchaseLocation.findFirst({ where: { id, ownerUserId } });
    if (!location) throw new NotFoundException("Purchase location not found");
    return location;
  }
}
```

`cleanLocationInput` must trim optional text and store empty optional values as `null`.

- [ ] **Step 4: Add controller and module**

Create controller endpoints matching the spec and register `PurchaseLocationsModule` in `AppModule`.

- [ ] **Step 5: Add API tests**

Create tests proving:

- User can create/list/update/archive own physical location.
- User can create online location.
- User cannot access another user's location.
- Archived locations are excluded from default list.

- [ ] **Step 6: Run API tests**

```powershell
corepack pnpm --filter @zbuy/api test
```

Expected: API tests pass.

- [ ] **Step 7: Commit**

```powershell
git add apps/api/src/purchase-locations apps/api/src/app.module.ts
git commit -m "feat: add purchase locations API"
```

---

### Task 4: Shopping Sessions API

**Files:**
- Create: `apps/api/src/shopping-sessions/dto.ts`
- Create: `apps/api/src/shopping-sessions/shopping-session-response.ts`
- Create: `apps/api/src/shopping-sessions/shopping-sessions.service.ts`
- Create: `apps/api/src/shopping-sessions/shopping-sessions.controller.ts`
- Create: `apps/api/src/shopping-sessions/shopping-sessions.module.ts`
- Create: `apps/api/src/shopping-sessions/shopping-sessions.service.spec.ts`
- Modify: `apps/api/src/app.module.ts`

- [ ] **Step 1: Add DTOs**

Create DTOs for:

```ts
export class StartShoppingSessionDto {
  @IsUUID()
  sourceListId!: string;

  @IsUUID()
  purchaseLocationId!: string;

  @IsIn(["physical", "online"])
  context!: "physical" | "online";
}

export class UpdateShoppingSessionItemDto {
  @IsOptional()
  @IsIn(["pending", "bought", "not_found"])
  status?: "pending" | "bought" | "not_found";

  @IsOptional()
  @Matches(/^\d+(\.\d{1,2})?$/)
  actualPrice?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string | null;
}

export class CreateContinuationListDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;
}
```

- [ ] **Step 2: Implement response mapper**

Create a mapper that returns `ShoppingSessionSummaryDto` and `ShoppingSessionDetailDto`. It must:

- Convert decimals to strings.
- Convert dates to ISO strings.
- Count item statuses into `{ pending, bought, notFound, unprocessed }`.
- Include purchase location DTO.
- Include `sourceListName`.

- [ ] **Step 3: Implement session start**

`ShoppingSessionsService.start(ownerUserId, dto)` must:

1. Reject when an active session already exists for the user.
2. Load the owned source list with items, product, and unit.
3. Reject empty lists.
4. Load the owned, unarchived purchase location.
5. Reject when `dto.context` differs from `purchaseLocation.type`.
6. Create a `ShoppingSession` with one `ShoppingSessionItem` per list item.

The snapshot create shape must copy:

```ts
{
  sourceProductId: item.productId,
  sourceListItemId: item.id,
  snapshotProductName: item.product.name,
  snapshotCategoryLabel: item.product.categoryLabel,
  snapshotBrand: item.product.brand,
  quantity: item.quantity.toString(),
  unitId: item.unitId,
  snapshotUnitName: item.unit.name,
  snapshotUnitAbbreviation: item.unit.abbreviation,
  expectedPrice: item.expectedPrice?.toString() ?? null,
  priority: item.priority,
  notes: item.notes,
  sortOrder: item.sortOrder
}
```

- [ ] **Step 4: Implement active/list/get**

Add:

- `list(ownerUserId, status?, limit?)`
- `getActive(ownerUserId)`
- `get(ownerUserId, id)`

Default list ordering: newest `startedAt` first.

- [ ] **Step 5: Implement item updates**

`updateItem(ownerUserId, sessionId, itemId, dto)` must:

- Allow only active sessions.
- Allow status changes to `pending`, `bought`, and `not_found`.
- Prevent changing active items to `unprocessed` directly.
- Update `actualPrice` and `notes`.
- Recalculate session `knownTotal` and `boughtItemsWithoutPriceCount`.

- [ ] **Step 6: Implement completion**

`complete(ownerUserId, id)` must:

- Allow only active sessions.
- Convert remaining `pending` items to `unprocessed`.
- Set `status = completed` and `completedAt = now`.
- Recalculate totals after status conversion.
- Return session detail.

- [ ] **Step 7: Implement cancellation**

`cancel(ownerUserId, id)` must:

- Allow only active sessions.
- Set `status = canceled` and `canceledAt = now`.
- Keep items unchanged for audit.
- Exclude canceled sessions from history module totals.

- [ ] **Step 8: Implement continuation list**

`createContinuationList(ownerUserId, sessionId, dto)` must:

- Allow only completed sessions.
- Select `not_found` and `unprocessed` items.
- Reject if there are no continuation items.
- Create a new `ShoppingList` named `dto.name` or `${sourceList.name} - continuação`.
- Create list items using source product, quantity, unit, expected price, priority, notes, and sort order.
- Exclude bought items.

- [ ] **Step 9: Add controller and module**

Expose:

- `GET /shopping-sessions`
- `POST /shopping-sessions`
- `GET /shopping-sessions/active`
- `GET /shopping-sessions/:id`
- `POST /shopping-sessions/:id/cancel`
- `POST /shopping-sessions/:id/complete`
- `PATCH /shopping-sessions/:id/items/:itemId`
- `PATCH /shopping-sessions/:id/items/:itemId/status`
- `POST /shopping-sessions/:id/continuation-list`

- [ ] **Step 10: Add service tests**

Tests must cover:

- Snapshot immutability after product/list edits.
- One active session per user.
- Different users can each have one active session.
- Context/location type mismatch rejection.
- Move item bought/not found/pending.
- Complete session with pending item becoming unprocessed.
- Optional actual price and known total behavior.
- Cancel session.
- Continuation list includes only not found and unprocessed.

- [ ] **Step 11: Run tests and commit**

```powershell
corepack pnpm --filter @zbuy/api test
git add apps/api/src/shopping-sessions apps/api/src/app.module.ts
git commit -m "feat: add shopping sessions API"
```

---

### Task 5: Purchase History API

**Files:**
- Create: `apps/api/src/purchase-history/dto.ts`
- Create: `apps/api/src/purchase-history/purchase-history.service.ts`
- Create: `apps/api/src/purchase-history/purchase-history.controller.ts`
- Create: `apps/api/src/purchase-history/purchase-history.module.ts`
- Create: `apps/api/src/purchase-history/purchase-history.service.spec.ts`
- Modify: `apps/api/src/app.module.ts`

- [ ] **Step 1: Add filter DTO**

Create query DTO supporting:

```ts
dateFrom?: string;
dateTo?: string;
locationId?: string;
locationType?: "physical" | "online";
productQuery?: string;
sourceListId?: string;
itemStatus?: "bought" | "not_found" | "unprocessed";
minPrice?: string;
maxPrice?: string;
withoutPrice?: "true" | "false";
```

- [ ] **Step 2: Implement session history list**

`listSessions(ownerUserId, filters)` must return only `completed` sessions and apply:

- Date range against `completedAt`.
- Location id.
- Location type.
- Source list id.
- Item-level filters via `items: { some: ... }`.

- [ ] **Step 3: Implement session detail**

`getSession(ownerUserId, id)` must return one completed session owned by the user. It must reject active/canceled sessions with `NotFoundException` for history endpoints.

- [ ] **Step 4: Implement item history**

`listItems(ownerUserId, filters)` must return flattened completed session items for product price research. It must include session date, location, source list, item status, actual price, and expected price.

- [ ] **Step 5: Add controller/module/tests**

Expose:

- `GET /purchase-history/sessions`
- `GET /purchase-history/sessions/:id`
- `GET /purchase-history/items`

Tests must prove:

- Canceled sessions are excluded.
- Active sessions are excluded.
- Product query finds snapshot names.
- Without-price filter returns bought items with `actualPrice = null`.
- Price range applies only to actual price values.
- Ownership isolation is enforced.

- [ ] **Step 6: Run tests and commit**

```powershell
corepack pnpm --filter @zbuy/api test
git add apps/api/src/purchase-history apps/api/src/app.module.ts
git commit -m "feat: add purchase history API"
```

---

### Task 6: Web API Client And Navigation

**Files:**
- Modify: `apps/web/src/lib/resources.ts`
- Modify: `apps/web/src/components/AppShell.tsx`
- Modify: `apps/web/src/app/globals.css`

- [ ] **Step 1: Add resource client functions**

Add imports and functions for:

- `listPurchaseLocations(type?, query?)`
- `createPurchaseLocation(input)`
- `updatePurchaseLocation(id, input)`
- `archivePurchaseLocation(id)`
- `listShoppingSessions(status?, limit?)`
- `getActiveShoppingSession()`
- `startShoppingSession(input)`
- `getShoppingSession(id)`
- `updateShoppingSessionItem(sessionId, itemId, input)`
- `completeShoppingSession(id)`
- `cancelShoppingSession(id)`
- `createContinuationList(sessionId, input)`
- `listPurchaseHistorySessions(filters)`
- `getPurchaseHistorySession(id)`
- `listPurchaseHistoryItems(filters)`

- [ ] **Step 2: Add navigation**

Add `Compras` and `Histórico` links to `AppShell`.

- [ ] **Step 3: Add shared styles**

Add classes for:

- `.purchase-summary`
- `.kanban-board`
- `.kanban-column`
- `.session-card`
- `.history-filters`
- `.metric-row`
- `.status-pill`

- [ ] **Step 4: Run web checks and commit**

```powershell
corepack pnpm --filter @zbuy/web typecheck
git add apps/web/src/lib/resources.ts apps/web/src/components/AppShell.tsx apps/web/src/app/globals.css
git commit -m "feat: add purchase web resources"
```

---

### Task 7: Purchases Dashboard And Start Flow

**Files:**
- Create: `apps/web/src/app/purchases/page.tsx`
- Create: `apps/web/src/app/purchases/StartPurchaseForm.tsx`
- Modify: `apps/web/src/app/page.test.tsx`

- [ ] **Step 1: Write frontend tests**

Add tests that mock resource functions and verify:

- Active session is shown with continue/cancel actions.
- Start form lists reusable lists and locations.
- Inline location creation calls `createPurchaseLocation`.
- Start session calls `startShoppingSession`.

- [ ] **Step 2: Implement dashboard page**

`/purchases` must:

- Load active session.
- Load recent sessions.
- Load reusable lists.
- Load purchase locations by selected context.
- Render start form only when there is no active session.
- Render active session card when one exists.

- [ ] **Step 3: Implement start form**

The form must include:

- List select.
- Context segmented control or select.
- Location select.
- Inline create location fields.
- Submit button disabled until list and location exist.

- [ ] **Step 4: Verify and commit**

```powershell
corepack pnpm --filter @zbuy/web test
corepack pnpm --filter @zbuy/web typecheck
git add apps/web/src/app/purchases apps/web/src/app/page.test.tsx
git commit -m "feat: add purchases start screen"
```

---

### Task 8: Session Detail Kanban

**Files:**
- Create: `apps/web/src/app/purchases/[id]/page.tsx`
- Create: `apps/web/src/app/purchases/[id]/SessionBoard.tsx`
- Modify: `apps/web/src/app/page.test.tsx`
- Modify: `apps/web/src/app/globals.css`

- [ ] **Step 1: Write frontend tests**

Test:

- Session detail renders pending/bought/not found columns.
- Button fallback moves pending item to bought.
- Button fallback moves item back to pending.
- Actual price update calls API.
- Complete session button calls API.
- Cancel session button calls API.

- [ ] **Step 2: Implement route page**

`/purchases/[id]` loads session detail and renders `SessionBoard`.

- [ ] **Step 3: Implement kanban board**

`SessionBoard` must:

- Group items by status.
- Implement `onDragStart`, `onDragOver`, and `onDrop`.
- Call `updateShoppingSessionItem` when dropped into another status.
- Provide buttons for status changes.
- Provide actual price input for bought cards.
- Provide notes input or compact edit action.
- Refresh local session state after each API update.

- [ ] **Step 4: Implement completion/cancellation actions**

Completion redirects to `/history/:id` after API success. Cancellation redirects to `/purchases`.

- [ ] **Step 5: Verify and commit**

```powershell
corepack pnpm --filter @zbuy/web test
corepack pnpm --filter @zbuy/web typecheck
git add apps/web/src/app/purchases apps/web/src/app/page.test.tsx apps/web/src/app/globals.css
git commit -m "feat: add shopping session kanban screen"
```

---

### Task 9: History Screens

**Files:**
- Create: `apps/web/src/app/history/page.tsx`
- Create: `apps/web/src/app/history/[id]/page.tsx`
- Modify: `apps/web/src/app/page.test.tsx`
- Modify: `apps/web/src/app/globals.css`

- [ ] **Step 1: Write frontend tests**

Test:

- History filters call API with date, location, type, product, source list, status, price range, and without-price.
- History session rows show known total and missing price warning.
- History detail groups bought, not found, and unprocessed items.
- Continuation list action calls API.

- [ ] **Step 2: Implement history list**

`/history` must render advanced filters and completed session rows.

- [ ] **Step 3: Implement history detail**

`/history/[id]` must render immutable session metadata, item groups, known total, missing price warning, and continuation list action.

- [ ] **Step 4: Verify and commit**

```powershell
corepack pnpm --filter @zbuy/web test
corepack pnpm --filter @zbuy/web typecheck
git add apps/web/src/app/history apps/web/src/app/page.test.tsx apps/web/src/app/globals.css
git commit -m "feat: add purchase history screens"
```

---

### Task 10: E2E Purchase Flow

**Files:**
- Modify: `tests/e2e/auth.spec.ts`
- Modify: `tests/e2e/README.md`

- [x] **Step 1: Extend Playwright flow**

Add steps after the phase 3 list setup:

```ts
await page.goto("/purchases", { waitUntil: "commit" });
await page.getByLabel("Lista").selectOption({ label: "Compra semanal" });
await page.getByLabel("Tipo").selectOption("physical");
await page.getByRole("button", { name: "Novo local" }).click();
await page.getByLabel("Nome do local").fill("Mercado Central");
await page.getByRole("button", { name: "Criar local" }).click();
await page.getByRole("button", { name: "Iniciar compra" }).click();
await expect(page.getByText("Pendente")).toBeVisible();
await page.getByRole("button", { name: /Marcar Arroz como comprado/ }).click();
await page.getByLabel(/Preço real de Arroz/).fill("11.90");
await page.getByRole("button", { name: "Finalizar compra" }).click();
await expect(page.getByText("Total conhecido")).toBeVisible();
await page.getByRole("button", { name: "Criar lista de continuação" }).click();
```

Use the actual accessible names implemented in Tasks 7-9.

- [x] **Step 2: Document E2E prerequisites**

Update README to mention phase 4 migrations and local API/web requirement.

- [x] **Step 3: Run E2E**

```powershell
corepack pnpm e2e
```

Expected: Playwright passes.

- [x] **Step 4: Commit**

```powershell
git add tests/e2e/auth.spec.ts tests/e2e/README.md
git commit -m "test: cover shopping session e2e flow"
```

---

### Task 11: Documentation And Final Verification

**Files:**
- Create: `docs/development/phase-4-shopping-sessions-history.md`
- Modify: `docs/product/implementation-roadmap.md`

- [ ] **Step 1: Add development documentation**

Create a guide covering:

- Migration commands.
- New API endpoints.
- Local services.
- Known total semantics.
- E2E command.

- [ ] **Step 2: Update roadmap status**

Mark phase 3 as completed and phase 4 as active implementation phase.

- [ ] **Step 3: Final verification**

Run:

```powershell
corepack pnpm --recursive lint
corepack pnpm --recursive typecheck
corepack pnpm test
corepack pnpm --recursive build
corepack pnpm e2e
```

Expected: all commands exit with code `0`.

- [ ] **Step 4: Commit**

```powershell
git add docs/development/phase-4-shopping-sessions-history.md docs/product/implementation-roadmap.md
git commit -m "docs: add phase 4 shopping sessions guide"
```

---

## Self-Review Checklist

- Spec coverage:
  - Purchase locations: Tasks 1, 2, 3, 6, 7, 10.
  - One active session per user: Tasks 2, 4, 7.
  - Snapshot at session start: Tasks 2, 4, 10.
  - Kanban with drag-and-drop and fallbacks: Tasks 8 and 10.
  - Optional actual price and known totals: Tasks 1, 4, 5, 8, 9.
  - Completion with unprocessed pending items: Tasks 4, 5, 9, 10.
  - Cancellation: Tasks 4, 7, 8.
  - Advanced history filters: Tasks 5 and 9.
  - Continuation list: Tasks 4, 9, 10.
- Out of scope:
  - Automatic geolocation, layouts, multiple active sessions, completed-history editing, receipt scanning, barcode scanning, indoor positioning, and two-list sessions.
- Placeholder scan:
  - No task intentionally defers required phase 4 behavior.
- Type consistency:
  - Shared DTO names align with API/web function names and spec terminology.
