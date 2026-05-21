# ZBuy Phase 3 Lists And Products Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build authenticated product catalog, flexible units, reusable shopping lists, list items, and list duplication.

**Architecture:** Extend the existing TypeScript monorepo. Prisma owns persistence, NestJS exposes authenticated resource APIs, `packages/shared` owns DTO contracts, and Next.js renders authenticated products/lists screens through the existing API client.

**Tech Stack:** TypeScript, pnpm workspaces, Prisma, PostgreSQL, NestJS, Next.js, React, Jest, Vitest, Testing Library, Playwright.

---

## File Structure

- Modify: `packages/shared/src/index.ts`
  - Add unit, product, shopping-list, and list-item DTOs and request types.
- Modify: `packages/shared/src/index.test.ts`
  - Compile-time checks for new DTO contracts.
- Modify: `apps/api/prisma/schema.prisma`
  - Add `Unit`, `Product`, `ShoppingList`, and `ShoppingListItem`.
- Create: `apps/api/prisma/migrations/<timestamp>_lists_products/migration.sql`
  - Database migration for phase 3 tables and enums.
- Create: `apps/api/prisma/seed-units.ts`
  - Idempotent unit seed script.
- Modify: `apps/api/package.json`
  - Add `prisma:seed-units` script.
- Create: `apps/api/src/units/*`
  - Unit read API.
- Create: `apps/api/src/products/*`
  - Product CRUD/archive API and tests.
- Create: `apps/api/src/shopping-lists/*`
  - List CRUD/archive/delete/duplicate/item API and tests.
- Modify: `apps/api/src/app.module.ts`
  - Register new modules.
- Create: `apps/web/src/components/AppShell.tsx`
  - Authenticated app shell/navigation.
- Create: `apps/web/src/lib/resources.ts`
  - Product/list/unit API client functions.
- Create: `apps/web/src/app/products/page.tsx`
  - Product catalog screen.
- Create: `apps/web/src/app/products/ProductForm.tsx`
  - Product create/edit form component.
- Create: `apps/web/src/app/lists/page.tsx`
  - Reusable lists screen.
- Create: `apps/web/src/app/lists/ListForm.tsx`
  - List create/edit form component.
- Create: `apps/web/src/app/lists/[id]/page.tsx`
  - List detail and list-item management screen.
- Create: `apps/web/src/app/lists/[id]/ListItemsEditor.tsx`
  - Client component for add/edit/reorder/delete list items.
- Modify: `apps/web/src/app/globals.css`
  - Add app shell, table/list, form, and compact action styles.
- Modify: `apps/web/src/app/page.test.tsx`
  - Add frontend tests for product/list screens.
- Modify: `tests/e2e/auth.spec.ts`
  - Extend authenticated E2E coverage to products and lists.
- Create: `docs/development/phase-3-lists-products.md`
  - Local commands, seed, and API notes for phase 3.

---

### Task 1: Shared Contracts

**Files:**
- Modify: `packages/shared/src/index.ts`
- Modify: `packages/shared/src/index.test.ts`

- [ ] **Step 1: Add DTO and request types**

Update `packages/shared/src/index.ts` with the existing auth exports plus:

```ts
export type UnitType = "weight" | "volume" | "count" | "package" | "custom";
export type ShoppingListStatus = "active" | "archived";
export type ListItemPriority = "low" | "normal" | "high";

export interface UnitDto {
  id: string;
  name: string;
  abbreviation: string;
  type: UnitType;
  allowsDecimals: boolean;
  sortOrder: number;
}

export interface ProductDto {
  id: string;
  name: string;
  categoryLabel: string;
  brand: string | null;
  defaultUnitId: string;
  defaultUnit: UnitDto;
  estimatedPrice: string | null;
  notes: string | null;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpsertProductRequest {
  name: string;
  categoryLabel: string;
  brand?: string | null;
  defaultUnitId: string;
  estimatedPrice?: string | null;
  notes?: string | null;
}

export interface ShoppingListItemDto {
  id: string;
  productId: string;
  productName: string;
  categoryLabel: string;
  quantity: string;
  unitId: string;
  unit: UnitDto;
  expectedPrice: string | null;
  priority: ListItemPriority;
  notes: string | null;
  sortOrder: number;
}

export interface ShoppingListSummaryDto {
  id: string;
  name: string;
  description: string | null;
  status: ShoppingListStatus;
  duplicatedFromListId: string | null;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingListDetailDto extends ShoppingListSummaryDto {
  items: ShoppingListItemDto[];
}

export interface UpsertShoppingListRequest {
  name: string;
  description?: string | null;
}

export interface UpsertShoppingListItemRequest {
  productId: string;
  quantity: string;
  unitId: string;
  expectedPrice?: string | null;
  priority?: ListItemPriority;
  notes?: string | null;
}

export interface ReorderShoppingListItemsRequest {
  itemIds: string[];
}
```

- [ ] **Step 2: Add compile-time contract test**

Append to `packages/shared/src/index.test.ts`:

```ts
import type {
  ProductDto,
  ShoppingListDetailDto,
  UnitDto,
  UpsertShoppingListItemRequest
} from "./index.js";

test("phase 3 DTO shapes support products, units, and list items", () => {
  const unit: UnitDto = {
    id: "unit-kg",
    name: "Kilogram",
    abbreviation: "kg",
    type: "weight",
    allowsDecimals: true,
    sortOrder: 10
  };

  const product: ProductDto = {
    id: "product-1",
    name: "Rice",
    categoryLabel: "Pantry",
    brand: null,
    defaultUnitId: unit.id,
    defaultUnit: unit,
    estimatedPrice: "12.50",
    notes: null,
    archivedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const item: UpsertShoppingListItemRequest = {
    productId: product.id,
    quantity: "2",
    unitId: unit.id,
    priority: "normal"
  };

  const list: ShoppingListDetailDto = {
    id: "list-1",
    name: "Weekly",
    description: null,
    status: "active",
    duplicatedFromListId: null,
    itemCount: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: "item-1",
        productId: product.id,
        productName: product.name,
        categoryLabel: product.categoryLabel,
        quantity: item.quantity,
        unitId: unit.id,
        unit,
        expectedPrice: null,
        priority: "normal",
        notes: null,
        sortOrder: 0
      }
    ]
  };

  assert.equal(list.items[0].productName, "Rice");
});
```

- [ ] **Step 3: Verify shared package**

Run:

```powershell
corepack pnpm --filter @zbuy/shared test
corepack pnpm --filter @zbuy/shared typecheck
```

Expected: both commands exit with code `0`.

- [ ] **Step 4: Commit**

```powershell
git add packages/shared
git commit -m "feat: add product and list shared contracts"
```

---

### Task 2: Prisma Schema And Unit Seed

**Files:**
- Modify: `apps/api/prisma/schema.prisma`
- Create: `apps/api/prisma/seed-units.ts`
- Modify: `apps/api/package.json`

- [ ] **Step 1: Extend Prisma schema**

Add these enums and models to `apps/api/prisma/schema.prisma`:

```prisma
enum UnitType {
  weight
  volume
  count
  package
  custom
}

enum ShoppingListStatus {
  active
  archived
}

enum ListItemPriority {
  low
  normal
  high
}

model Unit {
  id              String             @id @default(uuid())
  name            String
  abbreviation    String
  type            UnitType
  allowsDecimals  Boolean            @default(false)
  active          Boolean            @default(true)
  sortOrder       Int                @default(0)
  createdAt       DateTime           @default(now())
  updatedAt       DateTime           @updatedAt
  products        Product[]
  listItems       ShoppingListItem[]

  @@unique([abbreviation, type])
  @@index([active, sortOrder])
}

model Product {
  id             String             @id @default(uuid())
  ownerUserId    String
  name           String
  categoryLabel  String
  brand          String?
  defaultUnitId  String
  estimatedPrice Decimal?           @db.Decimal(10, 2)
  notes          String?
  archivedAt     DateTime?
  createdAt      DateTime           @default(now())
  updatedAt      DateTime           @updatedAt
  owner          User               @relation(fields: [ownerUserId], references: [id], onDelete: Cascade)
  defaultUnit    Unit               @relation(fields: [defaultUnitId], references: [id])
  listItems      ShoppingListItem[]

  @@index([ownerUserId, archivedAt])
  @@index([ownerUserId, name])
}

model ShoppingList {
  id                   String             @id @default(uuid())
  ownerUserId           String
  name                 String
  description          String?
  status               ShoppingListStatus @default(active)
  duplicatedFromListId String?
  createdAt            DateTime           @default(now())
  updatedAt            DateTime           @updatedAt
  owner                User               @relation(fields: [ownerUserId], references: [id], onDelete: Cascade)
  duplicatedFrom       ShoppingList?      @relation("ShoppingListDuplication", fields: [duplicatedFromListId], references: [id], onDelete: SetNull)
  duplicates           ShoppingList[]     @relation("ShoppingListDuplication")
  items                ShoppingListItem[]

  @@index([ownerUserId, status])
  @@index([ownerUserId, name])
}

model ShoppingListItem {
  id            String           @id @default(uuid())
  listId        String
  productId     String
  quantity      Decimal          @db.Decimal(10, 3)
  unitId        String
  expectedPrice Decimal?         @db.Decimal(10, 2)
  priority      ListItemPriority @default(normal)
  notes         String?
  sortOrder     Int              @default(0)
  createdAt     DateTime         @default(now())
  updatedAt     DateTime         @updatedAt
  list          ShoppingList     @relation(fields: [listId], references: [id], onDelete: Cascade)
  product       Product          @relation(fields: [productId], references: [id], onDelete: Restrict)
  unit          Unit             @relation(fields: [unitId], references: [id])

  @@index([listId, sortOrder])
  @@index([productId])
}
```

Add relations to `User`:

```prisma
products      Product[]
shoppingLists ShoppingList[]
```

- [ ] **Step 2: Create unit seed script**

Create `apps/api/prisma/seed-units.ts`:

```ts
import { PrismaClient, UnitType } from "@prisma/client";

const prisma = new PrismaClient();

const units: Array<{
  name: string;
  abbreviation: string;
  type: UnitType;
  allowsDecimals: boolean;
  sortOrder: number;
}> = [
  { name: "Kilogram", abbreviation: "kg", type: "weight", allowsDecimals: true, sortOrder: 10 },
  { name: "Gram", abbreviation: "g", type: "weight", allowsDecimals: true, sortOrder: 20 },
  { name: "Liter", abbreviation: "L", type: "volume", allowsDecimals: true, sortOrder: 30 },
  { name: "Milliliter", abbreviation: "ml", type: "volume", allowsDecimals: true, sortOrder: 40 },
  { name: "Unit", abbreviation: "unit", type: "count", allowsDecimals: false, sortOrder: 50 },
  { name: "Dozen", abbreviation: "dozen", type: "count", allowsDecimals: false, sortOrder: 60 },
  { name: "Box", abbreviation: "box", type: "package", allowsDecimals: false, sortOrder: 70 },
  { name: "Package", abbreviation: "package", type: "package", allowsDecimals: false, sortOrder: 80 },
  { name: "Bundle", abbreviation: "bundle", type: "package", allowsDecimals: false, sortOrder: 90 },
  { name: "Tray", abbreviation: "tray", type: "package", allowsDecimals: false, sortOrder: 100 },
  { name: "Can", abbreviation: "can", type: "package", allowsDecimals: false, sortOrder: 110 },
  { name: "Bottle", abbreviation: "bottle", type: "package", allowsDecimals: false, sortOrder: 120 }
];

async function main() {
  for (const unit of units) {
    await prisma.unit.upsert({
      where: { abbreviation_type: { abbreviation: unit.abbreviation, type: unit.type } },
      update: unit,
      create: unit
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
```

- [ ] **Step 3: Add seed script**

Modify `apps/api/package.json`:

```json
"prisma:seed-units": "ts-node prisma/seed-units.ts"
```

- [ ] **Step 4: Generate migration and seed locally**

Run:

```powershell
$env:DATABASE_URL="postgresql://zbuy:zbuy@127.0.0.1:5432/zbuy?schema=public"
corepack pnpm --filter @zbuy/api prisma:migrate -- --name lists_products
corepack pnpm --filter @zbuy/api prisma:seed-units
```

Expected: migration folder is created and seed script exits with code `0`.

- [ ] **Step 5: Verify API typecheck**

Run:

```powershell
corepack pnpm --filter @zbuy/api typecheck
```

Expected: command exits with code `0`.

- [ ] **Step 6: Commit**

```powershell
git add apps/api/prisma apps/api/package.json pnpm-lock.yaml
git commit -m "feat: add product and list database schema"
```

---

### Task 3: Units API

**Files:**
- Create: `apps/api/src/units/units.module.ts`
- Create: `apps/api/src/units/units.controller.ts`
- Create: `apps/api/src/units/units.service.ts`
- Create: `apps/api/src/units/unit-response.ts`
- Modify: `apps/api/src/app.module.ts`
- Create: `apps/api/test/units.e2e-spec.ts`

- [ ] **Step 1: Write Units API E2E test**

Create `apps/api/test/units.e2e-spec.ts` that signs up a user, seeds one unit through Prisma, calls `GET /units`, and expects the unit shape:

```ts
expect(response.body.units[0]).toMatchObject({
  name: "Kilogram",
  abbreviation: "kg",
  type: "weight",
  allowsDecimals: true
});
```

- [ ] **Step 2: Implement unit mapper**

Create `apps/api/src/units/unit-response.ts`:

```ts
import type { UnitDto } from "@zbuy/shared";
import type { Unit } from "@prisma/client";

export function toUnitDto(unit: Unit): UnitDto {
  return {
    id: unit.id,
    name: unit.name,
    abbreviation: unit.abbreviation,
    type: unit.type,
    allowsDecimals: unit.allowsDecimals,
    sortOrder: unit.sortOrder
  };
}
```

- [ ] **Step 3: Implement service and controller**

Create `apps/api/src/units/units.service.ts`:

```ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { toUnitDto } from "./unit-response";

@Injectable()
export class UnitsService {
  constructor(private readonly prisma: PrismaService) {}

  async listActive() {
    const units = await this.prisma.unit.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }]
    });
    return { units: units.map(toUnitDto) };
  }
}
```

Create `apps/api/src/units/units.controller.ts`:

```ts
import { Controller, Get, UseGuards } from "@nestjs/common";
import { SessionGuard } from "../auth/session.guard";
import { UnitsService } from "./units.service";

@Controller("units")
@UseGuards(SessionGuard)
export class UnitsController {
  constructor(private readonly units: UnitsService) {}

  @Get()
  list() {
    return this.units.listActive();
  }
}
```

Create `apps/api/src/units/units.module.ts`:

```ts
import { Module } from "@nestjs/common";
import { UnitsController } from "./units.controller";
import { UnitsService } from "./units.service";

@Module({
  controllers: [UnitsController],
  providers: [UnitsService]
})
export class UnitsModule {}
```

- [ ] **Step 4: Register module**

Add `UnitsModule` to `apps/api/src/app.module.ts`.

- [ ] **Step 5: Verify units API**

Run:

```powershell
corepack pnpm --filter @zbuy/api test:e2e -- units
corepack pnpm --filter @zbuy/api typecheck
```

Expected: both commands exit with code `0`.

- [ ] **Step 6: Commit**

```powershell
git add apps/api/src/units apps/api/src/app.module.ts apps/api/test/units.e2e-spec.ts
git commit -m "feat: add units API"
```

---

### Task 4: Products API

**Files:**
- Create: `apps/api/src/products/products.module.ts`
- Create: `apps/api/src/products/products.controller.ts`
- Create: `apps/api/src/products/products.service.ts`
- Create: `apps/api/src/products/dto.ts`
- Create: `apps/api/src/products/product-response.ts`
- Create: `apps/api/test/products.e2e-spec.ts`
- Modify: `apps/api/src/app.module.ts`

- [ ] **Step 1: Write Products API E2E tests**

Create tests for:

- create product with name, category, default unit, brand, estimated price, notes;
- list products excludes archived by default;
- search filters by name/category/brand;
- edit product changes estimated price and unit;
- archive hides product from default list;
- user A cannot read, edit, or archive user B's product.

- [ ] **Step 2: Implement DTO validation**

Create `apps/api/src/products/dto.ts`:

```ts
import { IsOptional, IsString, IsUUID, MaxLength, Matches } from "class-validator";

export class UpsertProductDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsString()
  @MaxLength(80)
  categoryLabel!: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  brand?: string | null;

  @IsUUID()
  defaultUnitId!: string;

  @IsOptional()
  @Matches(/^\d+(\.\d{1,2})?$/)
  estimatedPrice?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string | null;
}
```

- [ ] **Step 3: Implement product response mapper**

Map Prisma product with default unit to `ProductDto`, converting decimals and dates to strings.

- [ ] **Step 4: Implement service**

Service methods:

```ts
list(ownerUserId: string, query?: string, includeArchived?: boolean)
create(ownerUserId: string, dto: UpsertProductDto)
get(ownerUserId: string, id: string)
update(ownerUserId: string, id: string, dto: UpsertProductDto)
archive(ownerUserId: string, id: string)
```

Use `NotFoundException` when the product does not belong to the current user.

- [ ] **Step 5: Implement controller**

Routes:

- `GET /products`
- `POST /products`
- `GET /products/:id`
- `PATCH /products/:id`
- `POST /products/:id/archive`

Use `SessionGuard` and `CurrentUser`.

- [ ] **Step 6: Verify products API**

Run:

```powershell
corepack pnpm --filter @zbuy/api test:e2e -- products
corepack pnpm --filter @zbuy/api typecheck
```

Expected: both commands exit with code `0`.

- [ ] **Step 7: Commit**

```powershell
git add apps/api/src/products apps/api/src/app.module.ts apps/api/test/products.e2e-spec.ts
git commit -m "feat: add products API"
```

---

### Task 5: Shopping Lists API

**Files:**
- Create: `apps/api/src/shopping-lists/shopping-lists.module.ts`
- Create: `apps/api/src/shopping-lists/shopping-lists.controller.ts`
- Create: `apps/api/src/shopping-lists/shopping-lists.service.ts`
- Create: `apps/api/src/shopping-lists/dto.ts`
- Create: `apps/api/src/shopping-lists/shopping-list-response.ts`
- Create: `apps/api/test/shopping-lists.e2e-spec.ts`
- Modify: `apps/api/src/app.module.ts`

- [ ] **Step 1: Write Shopping Lists API E2E tests**

Create tests proving:

- create list;
- update name and description;
- add product item with quantity/unit/expected price/priority/notes;
- update item quantity and notes;
- reorder two items;
- duplicate list creates independent item records;
- editing duplicate does not change original;
- archive hides from default list;
- delete removes reusable list;
- user A cannot access user B's lists or items.

- [ ] **Step 2: Implement DTO validation**

Create `apps/api/src/shopping-lists/dto.ts`:

```ts
import { ArrayMinSize, IsArray, IsIn, IsOptional, IsString, IsUUID, Matches, MaxLength } from "class-validator";

export class UpsertShoppingListDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string | null;
}

export class UpsertShoppingListItemDto {
  @IsUUID()
  productId!: string;

  @Matches(/^\d+(\.\d{1,3})?$/)
  quantity!: string;

  @IsUUID()
  unitId!: string;

  @IsOptional()
  @Matches(/^\d+(\.\d{1,2})?$/)
  expectedPrice?: string | null;

  @IsOptional()
  @IsIn(["low", "normal", "high"])
  priority?: "low" | "normal" | "high";

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string | null;
}

export class ReorderShoppingListItemsDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID("4", { each: true })
  itemIds!: string[];
}
```

- [ ] **Step 3: Implement response mapper**

Map list summaries and list detail DTOs. Item DTOs must copy `product.name` into `productName` and `product.categoryLabel` into `categoryLabel`.

- [ ] **Step 4: Implement service methods**

Service methods:

```ts
list(ownerUserId: string, includeArchived?: boolean)
create(ownerUserId: string, dto: UpsertShoppingListDto)
get(ownerUserId: string, id: string)
update(ownerUserId: string, id: string, dto: UpsertShoppingListDto)
archive(ownerUserId: string, id: string)
delete(ownerUserId: string, id: string)
duplicate(ownerUserId: string, id: string)
addItem(ownerUserId: string, listId: string, dto: UpsertShoppingListItemDto)
updateItem(ownerUserId: string, listId: string, itemId: string, dto: UpsertShoppingListItemDto)
deleteItem(ownerUserId: string, listId: string, itemId: string)
reorderItems(ownerUserId: string, listId: string, itemIds: string[])
```

Validate ownership by querying lists and products with `ownerUserId`. Validate unit existence and decimal rules before writing item quantity.

- [ ] **Step 5: Implement controller**

Routes:

- `GET /shopping-lists`
- `POST /shopping-lists`
- `GET /shopping-lists/:id`
- `PATCH /shopping-lists/:id`
- `DELETE /shopping-lists/:id`
- `POST /shopping-lists/:id/archive`
- `POST /shopping-lists/:id/duplicate`
- `POST /shopping-lists/:id/items`
- `PATCH /shopping-lists/:id/items/:itemId`
- `DELETE /shopping-lists/:id/items/:itemId`
- `PATCH /shopping-lists/:id/items/reorder`

- [ ] **Step 6: Verify lists API**

Run:

```powershell
corepack pnpm --filter @zbuy/api test:e2e -- shopping-lists
corepack pnpm --filter @zbuy/api typecheck
```

Expected: both commands exit with code `0`.

- [ ] **Step 7: Commit**

```powershell
git add apps/api/src/shopping-lists apps/api/src/app.module.ts apps/api/test/shopping-lists.e2e-spec.ts
git commit -m "feat: add reusable shopping lists API"
```

---

### Task 6: Web Products And Lists Screens

**Files:**
- Create: `apps/web/src/components/AppShell.tsx`
- Create: `apps/web/src/lib/resources.ts`
- Create: `apps/web/src/app/products/page.tsx`
- Create: `apps/web/src/app/products/ProductForm.tsx`
- Create: `apps/web/src/app/lists/page.tsx`
- Create: `apps/web/src/app/lists/ListForm.tsx`
- Create: `apps/web/src/app/lists/[id]/page.tsx`
- Create: `apps/web/src/app/lists/[id]/ListItemsEditor.tsx`
- Modify: `apps/web/src/app/account/page.tsx`
- Modify: `apps/web/src/app/globals.css`
- Modify: `apps/web/src/app/page.test.tsx`

- [ ] **Step 1: Add resource API client**

Create typed functions in `apps/web/src/lib/resources.ts`:

```ts
export function listUnits()
export function listProducts(query?: string)
export function createProduct(input: UpsertProductRequest)
export function updateProduct(id: string, input: UpsertProductRequest)
export function archiveProduct(id: string)
export function listShoppingLists()
export function createShoppingList(input: UpsertShoppingListRequest)
export function updateShoppingList(id: string, input: UpsertShoppingListRequest)
export function duplicateShoppingList(id: string)
export function getShoppingList(id: string)
export function addShoppingListItem(listId: string, input: UpsertShoppingListItemRequest)
export function updateShoppingListItem(listId: string, itemId: string, input: UpsertShoppingListItemRequest)
export function deleteShoppingListItem(listId: string, itemId: string)
```

- [ ] **Step 2: Build authenticated shell**

Create `AppShell` with navigation links to `/account`, `/products`, and `/lists`.

- [ ] **Step 3: Build Products screen**

Products screen must support loading units, listing products, searching, creating/editing products inline, and archiving products.

- [ ] **Step 4: Build Lists screen**

Lists screen must support listing, creating, editing, archiving, deleting, duplicating, and navigating to list detail.

- [ ] **Step 5: Build List Detail screen**

List detail must support selecting a product, quantity, unit, expected price, priority, notes, add item, edit item, delete item, and move item up/down.

- [ ] **Step 6: Add frontend tests**

Extend `apps/web/src/app/page.test.tsx` to mock API calls and verify:

- Products page renders product form fields and product rows.
- Lists page renders create list form and duplicate button.
- List detail renders item controls and expected price field.

- [ ] **Step 7: Verify web**

Run:

```powershell
corepack pnpm --filter @zbuy/web test
corepack pnpm --filter @zbuy/web typecheck
```

Expected: both commands exit with code `0`.

- [ ] **Step 8: Commit**

```powershell
git add apps/web
git commit -m "feat: add product and list web screens"
```

---

### Task 7: E2E Products And Lists Flow

**Files:**
- Modify: `tests/e2e/auth.spec.ts`
- Modify: `tests/e2e/README.md`

- [ ] **Step 1: Extend Playwright flow**

After the existing signup assertion, add:

```ts
await page.goto("/products");
await page.getByLabel("Nome do produto").fill("Arroz");
await page.getByLabel("Categoria").fill("Mercearia");
await page.getByLabel("Preço estimado").fill("12.50");
await page.getByRole("button", { name: "Salvar produto" }).click();
await expect(page.getByText("Arroz")).toBeVisible();

await page.goto("/lists");
await page.getByLabel("Nome da lista").fill("Compra semanal");
await page.getByRole("button", { name: "Criar lista" }).click();
await page.getByRole("link", { name: "Compra semanal" }).click();
await page.getByLabel("Produto").selectOption({ label: "Arroz" });
await page.getByLabel("Quantidade").fill("2");
await page.getByRole("button", { name: "Adicionar item" }).click();
await expect(page.getByText("Arroz")).toBeVisible();

await page.goto("/lists");
await page.getByRole("button", { name: "Duplicar Compra semanal" }).click();
await expect(page.getByText("Compra semanal - copia")).toBeVisible();
```

- [ ] **Step 2: Update E2E README**

Mention the phase 3 E2E now requires seeded units:

```powershell
corepack pnpm --filter @zbuy/api prisma:seed-units
corepack pnpm e2e
```

- [ ] **Step 3: Verify E2E**

Run with Postgres, API, and web running:

```powershell
corepack pnpm e2e
```

Expected: Playwright reports `1 passed`.

- [ ] **Step 4: Commit**

```powershell
git add tests/e2e
git commit -m "test: cover product and list e2e flow"
```

---

### Task 8: Phase 3 Documentation And Final Verification

**Files:**
- Create: `docs/development/phase-3-lists-products.md`
- Modify: `docs/product/implementation-roadmap.md`

- [ ] **Step 1: Add development documentation**

Create `docs/development/phase-3-lists-products.md` with:

```markdown
# ZBuy Phase 3 Lists And Products

## Database

Run migrations and seed units:

```powershell
$env:DATABASE_URL="postgresql://zbuy:zbuy@127.0.0.1:5432/zbuy?schema=public"
corepack pnpm --filter @zbuy/api prisma:deploy
corepack pnpm --filter @zbuy/api prisma:seed-units
```

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

## Tests

```powershell
corepack pnpm --recursive lint
corepack pnpm --recursive typecheck
corepack pnpm test
corepack pnpm --recursive build
corepack pnpm e2e
```
```

- [ ] **Step 2: Update roadmap status**

In `docs/product/implementation-roadmap.md`, mark phase 3 as the active implementation phase.

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
git add docs/development/phase-3-lists-products.md docs/product/implementation-roadmap.md
git commit -m "docs: add phase 3 product and list guide"
```

---

## Self-Review Checklist

- Spec coverage:
  - Flexible units: Tasks 1, 2, 3, 8.
  - Products with category, brand, notes, unit, estimated price, archive, search: Tasks 1, 2, 4, 6, 7.
  - Reusable lists with create/edit/archive/delete: Tasks 1, 2, 5, 6, 7.
  - List items with quantity/unit/expected price/priority/notes/order: Tasks 1, 2, 5, 6, 7.
  - Duplication independence: Tasks 5, 6, 7.
  - Ownership isolation: Tasks 4 and 5.
  - Documentation and verification: Task 8.
- Out of scope:
  - Shopping sessions, history, geolocation, supermarkets, layouts, barcode scanning, receipt scanning.
- Placeholder scan:
  - Checked for forbidden placeholder wording; no implementation step is intentionally deferred.
- Type consistency:
  - DTO names in API, web, E2E, and shared package must match `packages/shared/src/index.ts`.
