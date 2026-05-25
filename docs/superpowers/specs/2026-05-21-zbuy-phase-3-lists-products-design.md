# ZBuy Phase 3 Lists And Products Spec

Date: 2026-05-21
Status: Ready for implementation planning

## Goal

Build the first authenticated product-management surface after the account foundation: flexible units, reusable user product catalog, and reusable shopping lists with duplication.

## Scope

Phase 3 implements:

- Flexible unit catalog for weight, volume, count, package, and store-specific packaging.
- User-owned product catalog with create, edit, archive, search, category label, brand, notes, default unit, and optional estimated price.
- Reusable shopping lists with create, edit, archive, delete, reorder, quantity, unit, expected price, priority, notes, and product references.
- List duplication that creates an independent copy of list metadata and items.
- Web screens for products, lists, list details, create/edit product, create/edit list, and duplicate confirmation.
- API, database, shared DTOs, unit tests, API E2E tests, frontend tests, and Playwright coverage for the main product/list flow.

Phase 3 does not implement:

- Shopping sessions.
- Purchase history.
- Geolocation.
- Supermarket detection.
- Store layouts.
- Multiple simultaneous lists in one session.
- Barcode scanning.
- Receipt scanning.

## Product Decisions

### Products

Products are private to the authenticated user. A product name, category label, and default unit are required. Brand, notes, and estimated price are optional. Products are archived instead of hard-deleted so historical references and future session snapshots can remain stable.

Estimated price is a planning value only. It is not purchase history and must not be treated as actual spend.

### Units

Units are catalog records shared by the application. The initial seed must include examples for:

- Weight: kg, g.
- Volume: L, ml.
- Count: unit, dozen.
- Package: box, package, bundle, tray, can, bottle.

Units include a display name, abbreviation, type, decimal support flag, active flag, and sort order. The catalog must be expandable without schema redesign.

### Lists

Shopping lists are reusable templates. Completing future shopping sessions must not delete or empty the source list. A list name is required. Description is optional. Lists can be archived and deleted while still preserving completed historical snapshots in later phases.

Deleting a list in phase 3 can hard-delete the reusable list and its current items because phase 4 session snapshots are not implemented yet. The phase 4 plan must re-evaluate delete behavior after sessions exist.

### List Items

A list item references one product and stores the requested quantity, selected unit, expected price, priority, notes, and sort order. The selected unit defaults to the product default unit but can be changed per list item.

Quantity must be positive. Decimal quantities are allowed only when the chosen unit allows decimals. Expected price is optional and represents user expectation for that list item.

### Duplication

Duplicating a list creates a new list owned by the same user. The duplicate keeps:

- Name with a copy suffix.
- Description.
- Item product references.
- Quantity.
- Unit.
- Expected price.
- Priority.
- Notes.
- Sort order.

The duplicate must not share mutable item records with the original. Editing the duplicate must not alter the source list.

## API Surface

All endpoints require an authenticated session cookie.

### Units

- `GET /units`
  - Returns active units ordered by sort order and name.

### Products

- `GET /products?query=&includeArchived=`
- `POST /products`
- `GET /products/:id`
- `PATCH /products/:id`
- `POST /products/:id/archive`

### Lists

- `GET /shopping-lists?includeArchived=`
- `POST /shopping-lists`
- `GET /shopping-lists/:id`
- `PATCH /shopping-lists/:id`
- `DELETE /shopping-lists/:id`
- `POST /shopping-lists/:id/archive`
- `POST /shopping-lists/:id/duplicate`

### List Items

- `POST /shopping-lists/:id/items`
- `PATCH /shopping-lists/:id/items/:itemId`
- `DELETE /shopping-lists/:id/items/:itemId`
- `PATCH /shopping-lists/:id/items/reorder`

## Web Screens

### Products

Products screen shows search, active products, archived filter, create button, and empty/error/loading states. Product form supports name, category label, brand, default unit, estimated price, and notes.

### Lists

Lists screen shows active lists, archived filter, create button, duplicate action, archive action, delete action, empty/error/loading states, and item counts.

### List Detail

List detail screen supports editing name/description, adding products, editing quantity/unit/expected price/priority/notes, deleting items, and moving items up/down.

## Acceptance Criteria

- A signed-in user can create and edit products.
- A signed-in user can archive products and exclude archived products from default search results.
- A signed-in user can list flexible units.
- A signed-in user can create, edit, archive, delete, duplicate, and open reusable shopping lists.
- A signed-in user can add products to a list with flexible quantity/unit/expected price/priority/notes.
- A duplicated list is independent from the source list.
- API tests prove ownership isolation between users.
- Frontend tests cover product and list screens.
- Playwright E2E proves the main flow: sign up, create product, create list, add product to list, duplicate list, edit duplicate, confirm original remains unchanged.
