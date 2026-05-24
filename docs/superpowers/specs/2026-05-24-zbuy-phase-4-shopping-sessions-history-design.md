# ZBuy Phase 4 Shopping Sessions And History Spec

Date: 2026-05-24
Status: Ready for implementation planning

## Goal

Build shopping sessions and purchase history on top of reusable lists and products, preserving accurate item snapshots, prices, outcomes, and purchase locations.

## Scope

Phase 4 implements:

- Dedicated Purchases screen for active session, recent sessions, starting a session, and history access.
- Reusable purchase locations with type `physical` or `online`.
- Manual physical supermarket selection before starting a physical shopping session.
- Online purchase location selection from reusable online locations.
- One active shopping session per user in phase 4.
- Data model prepared for multiple active sessions in the future.
- Session snapshot from a reusable list at session start.
- Kanban shopping session UI with real drag-and-drop and fallback card actions.
- Item outcomes: pending, bought, not found, and unprocessed at completion time.
- Optional actual price capture for bought items.
- Session completion, cancellation, and immutable completed history.
- History session list, session detail, and advanced filters.
- Continuation list creation from not found and unprocessed session items.
- API, database, shared DTOs, unit tests, frontend tests, and Playwright coverage for the main purchase flow.

Phase 4 does not implement:

- Automatic geolocation-based store detection.
- Supermarket layout detection or product positioning.
- Multiple simultaneous active shopping sessions.
- Editing completed purchase history.
- Receipt scanning.
- Barcode scanning.
- Indoor positioning.
- Shopping with two reusable lists in one session.

## Product Decisions

### Purchase Locations

The system uses a single reusable purchase location concept for both physical and online contexts.

A physical location requires only a name. Address, city, and notes are optional. The user manually selects or creates the physical supermarket before starting a physical session. Automatic location detection belongs to phase 5.

An online location requires only a name. Site/app and notes are optional. Online sessions skip physical geolocation and layout behavior.

History filters use the same location model for physical and online purchases.

### Session Start

The user starts a session from the dedicated Purchases screen. The start flow requires:

- A reusable shopping list.
- Shopping context: physical or online.
- Purchase location matching the selected context.

Phase 4 allows only one active session per user. If a user already has an active session, the API must reject creating another active session and the web UI must direct the user to continue or cancel the existing session.

The data model must not be built as a singleton. Sessions have statuses such as `active`, `completed`, and `canceled` so future phases can allow multiple active sessions with a controlled business-rule change.

### Session Snapshot

Starting a session creates a full item snapshot from the selected reusable list. The snapshot preserves the shopping intent at that moment and protects completed history from later catalog/list edits.

Each session item snapshot stores:

- Source product id when available.
- Source list item id when available.
- Product name.
- Category label.
- Brand.
- Quantity.
- Unit id, unit name, and unit abbreviation.
- Expected price.
- Priority.
- Notes.
- Sort order.

The reusable list remains unchanged throughout the session.

### Shopping Session UI

The session detail uses a kanban board with real drag-and-drop:

- Pending.
- Bought.
- Not found.

Dragging an item to Bought marks it as bought. Dragging to Not found marks it unavailable for that session location only. Dragging back to Pending undoes the outcome while the session is still active.

Cards must also provide explicit actions for accessibility and mobile usability:

- Mark bought.
- Mark not found.
- Move back to pending.
- Edit actual price.
- Edit notes.

Actual price is optional for bought items. If absent, the item remains bought with unknown spend.

### Completion And Cancellation

The user can complete a session even when some items remain pending. On completion:

- Bought items remain bought.
- Not found items remain not found.
- Pending items become unprocessed.
- Completed sessions become immutable history in phase 4.

The user can cancel an active session. Canceled sessions keep a record with status `canceled`, but do not count as purchase history totals and do not contribute to spend analysis.

### Not Found Behavior

Not found is a session-local outcome. It records that the user looked for the product at that location/date and did not find it.

A not found item:

- Has no spend.
- Appears in the session detail/history.
- Does not remove or archive the product.
- Does not alter the reusable list.
- Appears again if the user starts a new session from the same reusable list at another location.

### Totals And Unknown Prices

Actual price is optional. Totals must be labeled as known totals, not full totals, when any bought item has no actual price.

Example display:

`Total known: R$ 82.40 · 3 bought items without price`

Total calculations sum only bought items with actual price values. Items not found, unprocessed, and bought without actual price do not add to the known total.

### Continuation Lists

After completing a session, the original reusable list remains intact.

The user can create a new reusable list based on the completed session. This continuation list includes only items that still need action:

- Not found items.
- Unprocessed items.

Bought items are excluded. The continuation list copies product references, quantity, unit, expected price, priority, notes, and sort order where possible.

## API Surface

All endpoints require an authenticated session cookie.

### Purchase Locations

- `GET /purchase-locations?type=&query=`
- `POST /purchase-locations`
- `GET /purchase-locations/:id`
- `PATCH /purchase-locations/:id`
- `POST /purchase-locations/:id/archive`

### Shopping Sessions

- `GET /shopping-sessions?status=&limit=`
- `POST /shopping-sessions`
- `GET /shopping-sessions/active`
- `GET /shopping-sessions/:id`
- `POST /shopping-sessions/:id/cancel`
- `POST /shopping-sessions/:id/complete`
- `PATCH /shopping-sessions/:id/items/:itemId`
- `PATCH /shopping-sessions/:id/items/:itemId/status`
- `POST /shopping-sessions/:id/continuation-list`

### Purchase History

- `GET /purchase-history/sessions`
- `GET /purchase-history/sessions/:id`
- `GET /purchase-history/items`

History filters include:

- Date range.
- Location id.
- Location type.
- Product query.
- Source list id.
- Item status.
- Minimum price.
- Maximum price.
- Bought items without price.

## Web Screens

### Purchases

The Purchases screen shows:

- Current active session, if any.
- Start purchase action.
- Recent completed sessions.
- Recent canceled sessions.
- Link to full history.

If an active session exists, starting another session is blocked and the user is prompted to continue or cancel the active session.

### Start Purchase

The start purchase flow supports:

- Selecting a reusable list.
- Selecting physical or online context.
- Selecting an existing purchase location.
- Creating a new purchase location inline.

Only location name is required. Optional fields stay secondary to keep the flow fast.

### Session Detail

The session detail screen shows:

- Session context and location.
- Known total and missing price warning.
- Kanban columns by item status.
- Drag-and-drop status movement.
- Explicit card action buttons.
- Actual price editing.
- Notes editing.
- Complete session action.
- Cancel session action.

### History

History shows a filterable list of completed sessions. Each session row includes:

- Date.
- Location.
- Context.
- Source list.
- Known total.
- Count of bought items without price.
- Counts by item outcome.

### History Detail

History detail shows immutable session data:

- Session metadata.
- Known total.
- Missing price warning.
- Bought items with and without price.
- Not found items.
- Unprocessed items.
- Source list reference.
- Continuation list action.

## Data Model

### PurchaseLocation

Fields:

- `id`
- `ownerUserId`
- `type`: `physical` or `online`
- `name`
- `address`
- `city`
- `websiteOrApp`
- `notes`
- `archivedAt`
- `createdAt`
- `updatedAt`

Only `name` and `type` are required. Optional fields are context-specific but can share the table.

### ShoppingSession

Fields:

- `id`
- `ownerUserId`
- `sourceListId`
- `purchaseLocationId`
- `context`: `physical` or `online`
- `status`: `active`, `completed`, or `canceled`
- `startedAt`
- `completedAt`
- `canceledAt`
- `knownTotal`
- `boughtItemsWithoutPriceCount`
- `createdAt`
- `updatedAt`

The one-active-session rule is enforced by service logic in phase 4.

### ShoppingSessionItem

Fields:

- `id`
- `sessionId`
- `sourceProductId`
- `sourceListItemId`
- `snapshotProductName`
- `snapshotCategoryLabel`
- `snapshotBrand`
- `quantity`
- `unitId`
- `snapshotUnitName`
- `snapshotUnitAbbreviation`
- `expectedPrice`
- `actualPrice`
- `status`: `pending`, `bought`, `not_found`, or `unprocessed`
- `priority`
- `notes`
- `sortOrder`
- `createdAt`
- `updatedAt`

## Acceptance Criteria

- A signed-in user can create and reuse physical and online purchase locations.
- A signed-in user can start a physical session by selecting a reusable list and a physical purchase location.
- A signed-in user can start an online session by selecting a reusable list and an online purchase location.
- The API prevents a user from starting a second active session in phase 4.
- Starting a session snapshots list item data so later product/list edits do not change completed history.
- A signed-in user can move items between pending, bought, and not found with drag-and-drop.
- A signed-in user can use explicit card actions to change item status without drag-and-drop.
- A signed-in user can move an item back to pending while the session is active.
- A signed-in user can record a bought item with or without actual price.
- A signed-in user can complete a session with pending items; pending items become unprocessed.
- A signed-in user can cancel a session; canceled sessions do not count toward spend totals.
- Completed session history shows known totals and bought-without-price warnings.
- History filters support date, location, type, product, source list, item status, price range, and bought-without-price.
- Not found items are recorded for that session location and do not alter reusable lists.
- A signed-in user can create a continuation list from a completed session containing only not found and unprocessed items.
- Frontend tests cover purchases, session detail, location creation, and history screens.
- API tests cover ownership isolation, one-active-session enforcement, snapshot immutability, completion, cancellation, and continuation list creation.
- Playwright E2E proves the main flow: sign up, create product/list, create purchase location, start session, move items, complete session, view history, and create continuation list.
