# ZBuy Phase 5 Supermarket Detection And Layout Spec

Date: 2026-05-26
Status: Ready for implementation planning

## Goal

Build geolocation-assisted supermarket detection and editable supermarket layouts so a physical shopping journey can continue across multiple supermarkets while preserving accurate item outcomes, history, and private layout learning.

## Scope

Phase 5 implements:

- Physical shopping journeys with multiple supermarket stops using the same source list.
- GPS-assisted supermarket detection for choosing the current physical supermarket.
- Configurable supermarket presence radius, defaulting to 500 meters.
- Exit detection when the user leaves the current supermarket radius.
- Unknown-location handling when the user marks an item bought or found outside a recognized supermarket.
- Private supermarket layouts made of editable aisles or corridors.
- Automatic private layout learning when the user marks a product in a corridor.
- Item grouping by the current supermarket layout.
- A fallback "Sem corredor definido" group for items without known corridor.
- Manual corridor creation, rename, reorder, and delete in both the shopping flow and a dedicated layout screen.
- Shared layout suggestions shown separately from the private layout and applied only after explicit user acceptance.
- Shared contribution consent controlled globally and overridable per supermarket.
- API, database, shared DTOs, frontend screens, tests, and Playwright coverage for the main multi-stop physical shopping flow.

Phase 5 does not implement:

- Real indoor positioning through BLE, Wi-Fi RTT, beacons, store infrastructure, or indoor maps.
- Automatic aisle-level location from GPS alone.
- Multiple simultaneous shopping journeys.
- Shopping with two reusable lists in one journey.
- Barcode scanning.
- Receipt scanning.
- Store staff or supermarket-admin managed layouts.
- Automatic application of shared suggestions without user acceptance.
- Online shopping layout behavior.

## Product Decisions

### GPS Role

GPS is used to identify the supermarket or determine that the user is outside the active supermarket radius. GPS is not treated as reliable enough to locate the user's aisle inside the store.

The app uses coordinates to:

- Suggest nearby supermarkets.
- Select the layout for the current physical stop.
- Detect that the user likely left a supermarket.
- Detect that the user is buying or locating a product at an unknown physical place.

Product grouping inside a store is based on the known layout for that supermarket, not on live indoor coordinates.

### Supermarket Presence Radius

Each physical supermarket has a configurable `presenceRadiusMeters` value. The default is 500 meters.

The radius determines whether the user is considered inside or near that supermarket. The user can edit this value in the supermarket/layout settings. A larger radius is useful for large stores or parking/curbside areas. A smaller radius is useful when several stores are close to one another.

If the user leaves the current supermarket radius during an active physical stop, the app must not finish the overall shopping journey automatically. It must pause layout contribution and ask what to do next.

### Shopping Journey And Supermarket Stops

Phase 4 allowed one active physical session tied to one purchase location. Phase 5 changes the physical shopping model into one active shopping journey with one selected source list and one or more supermarket stops.

A shopping journey:

- Starts from exactly one reusable shopping list.
- Has one active stop at a time.
- Can move from one supermarket to another without ending the overall journey.
- Ends only when the user explicitly finishes the overall shopping journey.

A supermarket stop:

- Represents the time spent shopping at one physical supermarket.
- Has its own supermarket, started time, ended time, and item outcomes for that supermarket.
- Can be ended while the journey remains active.
- Determines which layout is used to group the remaining items.

When a stop ends:

- Bought items are removed from the active shopping list for the rest of the journey.
- Not-found items are recorded for that supermarket but return automatically to the active list for the next supermarket.
- Pending items remain active for the next supermarket.

History must show where each item was bought, not found, or left pending for each stop.

### Leaving A Supermarket

When the app detects that the user left the active supermarket radius, it presents three options:

- Finish shopping in this supermarket.
- Continue anyway outside the radius.
- Switch to another detected or manually selected supermarket.

"Finish shopping in this supermarket" ends only the current supermarket stop. It does not finish the overall shopping journey.

If another supermarket is detected while a stop is still active, the app asks before switching:

`Parece que voce esta no Mercado X. Deseja encerrar a parada no Mercado Y e continuar aqui?`

If the user confirms:

- The previous stop is ended.
- The overall journey remains active.
- Remaining items are recalculated.
- A new stop is started for the detected supermarket.
- Items are regrouped automatically using the new supermarket layout.

If the user declines:

- The current stop remains active.
- The layout is not changed.
- The app may keep showing a manual switch option.

### Unknown Physical Location

If the user buys or locates a product in a physical place that is not recognized as a supermarket, the app asks whether the place is a supermarket.

If the user confirms that it is a supermarket:

- The app asks for the supermarket name.
- The app creates a new physical supermarket using the current coordinates and default radius.
- The app starts or switches to a stop for that supermarket.
- The product action is recorded for that supermarket.

If the user says it is not a supermarket:

- The item action is recorded without creating a physical supermarket layout.
- No layout contribution is saved for that place.
- The overall journey remains active.

### Item Grouping

During an active physical stop, remaining items are grouped by the private layout for the current supermarket.

Grouping rules:

- Items with a known corridor appear under that corridor.
- Corridors follow the user's configured order for that supermarket.
- Items without a known corridor appear in `Sem corredor definido` at the end.
- When the supermarket changes, the app automatically regroups remaining items using the new supermarket layout.
- Not-found items from previous stops are active again in the new supermarket.

This grouping applies only to the active physical shopping view. Completed history remains organized by journey, stop, and item outcome.

### Private Layout Learning

Each user has a private layout per supermarket. The private layout is the primary source for grouping items.

When the user marks a product as bought or found and chooses a corridor, the app automatically updates the user's private layout for that supermarket. The app does not ask for confirmation before saving this private learning.

The next time the user shops at the same supermarket, the product appears in the learned corridor.

Private layout learning must not expose the user's private layout to other users.

### Corridor Editing

The user can edit corridors in two places:

- Quick editing during shopping.
- A dedicated supermarket layout screen.

Both places support:

- Create corridor.
- Rename corridor.
- Reorder corridor.
- Delete corridor.

Deleting a corridor does not delete products. Products associated with the deleted corridor return to `Sem corredor definido` for that supermarket.

### Shared Suggestions

Shared layout suggestions are separate from the private layout.

The app may show a shared suggestion when:

- The user has no private corridor for a product at the current supermarket.
- A shared suggestion exists with enough confidence.
- The suggestion matches the current supermarket.

The app must not apply a shared suggestion automatically. The user must explicitly accept it. Once accepted, the suggestion becomes part of the user's private layout.

Shared suggestions must not expose another user's identity or private layout.

### Shared Contribution Consent

The user controls whether private layout actions can contribute to shared suggestions.

Consent has two layers:

- Global account default.
- Per-supermarket override.

The effective setting for a supermarket is:

- Use supermarket override when set.
- Otherwise use the global account default.

Disabling shared contribution does not disable private layout learning.

Shared contribution records should be aggregated or anonymized before becoming visible as shared suggestions.

## API Surface

All endpoints require an authenticated session cookie.

### Supermarkets

- `GET /supermarkets?query=&lat=&lng=&radiusMeters=`
- `POST /supermarkets`
- `GET /supermarkets/:id`
- `PATCH /supermarkets/:id`
- `POST /supermarkets/:id/archive`
- `POST /supermarkets/detect`

Detection accepts coordinates and returns:

- Best supermarket candidate when confidence is high.
- Multiple candidates when ambiguous.
- Unknown result when no candidate matches.

### Shopping Journeys

- `GET /shopping-journeys?status=&limit=`
- `POST /shopping-journeys`
- `GET /shopping-journeys/active`
- `GET /shopping-journeys/:id`
- `POST /shopping-journeys/:id/complete`
- `POST /shopping-journeys/:id/cancel`

### Journey Stops

- `POST /shopping-journeys/:id/stops`
- `GET /shopping-journeys/:id/stops/:stopId`
- `POST /shopping-journeys/:id/stops/:stopId/finish`
- `POST /shopping-journeys/:id/stops/:stopId/continue-outside-radius`
- `POST /shopping-journeys/:id/stops/:stopId/switch-supermarket`

### Journey Items

- `PATCH /shopping-journeys/:id/stops/:stopId/items/:itemId`
- `PATCH /shopping-journeys/:id/stops/:stopId/items/:itemId/status`
- `POST /shopping-journeys/:id/stops/:stopId/items/:itemId/location`

Item location records accept a corridor id or a request to create/select a corridor inline.

### Supermarket Layouts

- `GET /supermarkets/:id/layout`
- `POST /supermarkets/:id/layout/corridors`
- `PATCH /supermarkets/:id/layout/corridors/:corridorId`
- `PATCH /supermarkets/:id/layout/corridors/reorder`
- `DELETE /supermarkets/:id/layout/corridors/:corridorId`
- `PUT /supermarkets/:id/layout/products/:productId`
- `DELETE /supermarkets/:id/layout/products/:productId`

### Shared Suggestions And Consent

- `GET /supermarkets/:id/layout/suggestions`
- `POST /supermarkets/:id/layout/suggestions/:suggestionId/accept`
- `GET /layout-consent`
- `PATCH /layout-consent`
- `GET /supermarkets/:id/layout-consent`
- `PATCH /supermarkets/:id/layout-consent`

## Web Screens

### Purchases

The Purchases screen keeps the phase 4 entry point but changes physical purchase start to create a shopping journey.

For physical shopping, the start flow includes:

- Selected reusable list.
- Location permission prompt.
- Detected supermarket candidate when available.
- Manual supermarket selection when detection is ambiguous or unknown.
- Create-supermarket option when no candidate is correct.

Online shopping continues to use the phase 4 online flow and does not use supermarket layout behavior.

### Active Physical Journey

The active physical journey screen shows:

- Current supermarket stop.
- Whether the user is inside or outside the configured radius.
- Remaining item count.
- Bought item count.
- Not-found count for current stop.
- Corridor-grouped active items.
- `Sem corredor definido` group.
- Actions to finish current supermarket stop, switch supermarket, or finish overall shopping journey.

When no stop is active but the journey remains active, the screen asks the user to detect, select, or create the next supermarket.

### Supermarket Switch Prompt

When the app detects another supermarket during an active stop, it shows:

- Current supermarket.
- Detected supermarket.
- Confidence or distance hint when useful.
- Confirm switch action.
- Keep current supermarket action.

Confirming switch ends the current stop and starts a new stop.

### Unknown Location Prompt

When the user records a product at an unknown place, the prompt asks:

- `Este local e um supermercado?`

If yes:

- Ask for supermarket name.
- Create supermarket with current coordinates.
- Use that supermarket for the item action.

If no:

- Record the item action without layout contribution.

### Supermarket Layout

The dedicated layout screen shows:

- Supermarket name and radius setting.
- Corridor list with create, rename, reorder, and delete actions.
- Products assigned to each corridor.
- `Sem corredor definido` products.
- Shared suggestions awaiting acceptance.
- Contribution consent override for that supermarket.

### Privacy And Consent Settings

The account privacy/settings screen includes:

- Global shared layout contribution setting.
- Explanation that private layouts remain private.
- Explanation that disabling contribution does not disable private layout learning.

The supermarket layout screen includes the per-supermarket override.

## Data Model

### Supermarket

Fields:

- `id`
- `ownerUserId`
- `name`
- `address`
- `city`
- `latitude`
- `longitude`
- `presenceRadiusMeters`
- `archivedAt`
- `createdAt`
- `updatedAt`

The `ownerUserId` identifies who created the supermarket record. Shared/public visibility rules are handled separately from private layout ownership.

### ShoppingJourney

Fields:

- `id`
- `ownerUserId`
- `sourceListId`
- `sourceListNameSnapshot`
- `context`: `physical` or `online`
- `status`: `active`, `completed`, or `canceled`
- `startedAt`
- `completedAt`
- `canceledAt`
- `knownTotal`
- `boughtItemsWithoutPriceCount`
- `createdAt`
- `updatedAt`

Physical journeys can have multiple stops. Online journeys can keep the phase 4 single-location behavior and do not create supermarket layout stops.

### ShoppingJourneyItem

Fields:

- `id`
- `journeyId`
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
- `finalActualPrice`
- `finalStatus`: `active`, `bought`, `not_found`, `unprocessed`
- `priority`
- `notes`
- `sortOrder`
- `createdAt`
- `updatedAt`

This item represents the remaining journey-level item. Stop outcomes are stored separately so a product can be not found in one supermarket and bought later in another.

### ShoppingJourneyStop

Fields:

- `id`
- `journeyId`
- `supermarketId`
- `status`: `active`, `finished`, or `canceled`
- `startedAt`
- `finishedAt`
- `exitDetectedAt`
- `continuedOutsideRadiusAt`
- `createdAt`
- `updatedAt`

Only one stop can be active per active physical journey.

### ShoppingJourneyStopItem

Fields:

- `id`
- `stopId`
- `journeyItemId`
- `status`: `pending`, `bought`, `not_found`, or `unprocessed`
- `actualPrice`
- `corridorId`
- `notes`
- `createdAt`
- `updatedAt`

Stop items preserve what happened at one supermarket. If a product is not found, the journey item remains active for later stops.

### SupermarketCorridor

Fields:

- `id`
- `ownerUserId`
- `supermarketId`
- `name`
- `sortOrder`
- `createdAt`
- `updatedAt`

Corridors are private to the user unless converted into aggregated shared suggestions through consented contribution processing.

### PrivateProductPlacement

Fields:

- `id`
- `ownerUserId`
- `supermarketId`
- `productId`
- `corridorId`
- `lastConfirmedAt`
- `createdAt`
- `updatedAt`

This is the user's private learned product placement for one supermarket.

### SharedLayoutSuggestion

Fields:

- `id`
- `supermarketId`
- `productId`
- `suggestedCorridorName`
- `confidenceScore`
- `sourceContributionCount`
- `lastConfirmedAt`
- `createdAt`
- `updatedAt`

Suggestions are not owned by or attributed to visible users.

### LayoutContributionConsent

Fields:

- `id`
- `ownerUserId`
- `globalSharedLayoutContributionEnabled`
- `createdAt`
- `updatedAt`

### SupermarketLayoutConsentOverride

Fields:

- `id`
- `ownerUserId`
- `supermarketId`
- `sharedLayoutContributionEnabled`
- `createdAt`
- `updatedAt`

## Acceptance Criteria

- A signed-in user can start a physical shopping journey from one reusable list.
- A signed-in user can allow location detection and receive a detected supermarket, ambiguous result, or unknown result.
- A signed-in user can create a supermarket from an unknown physical location by confirming the place is a supermarket and entering a name.
- Each supermarket has a configurable presence radius with default 500 meters.
- When the user leaves the current supermarket radius, the app asks whether to finish the current stop, continue outside the radius, or switch supermarkets.
- Finishing a supermarket stop does not finish the overall shopping journey.
- Bought items are removed from the active journey after the stop where they were bought.
- Not-found items are recorded for the current supermarket and return automatically to the active item list for the next supermarket.
- When the user switches to another supermarket, remaining items are regrouped automatically by that supermarket layout.
- Items with known private placement are grouped under their corridor.
- Items without known placement appear under `Sem corredor definido` at the end.
- A signed-in user can create, rename, reorder, and delete corridors during shopping.
- A signed-in user can create, rename, reorder, and delete corridors from a dedicated supermarket layout screen.
- Deleting a corridor moves associated private product placements back to `Sem corredor definido`.
- Marking a product in a corridor automatically updates the user's private layout for that supermarket.
- Shared suggestions appear separately from private placements and require explicit acceptance before applying.
- Accepted shared suggestions become private placements for the user.
- Global shared contribution consent can be updated from account settings.
- Per-supermarket shared contribution override can be updated from the supermarket layout screen.
- Disabling shared contribution does not disable private layout learning.
- Online shopping does not request geolocation, does not use supermarket stops, and does not update physical layouts.
- API tests cover supermarket detection, radius handling, stop transitions, item reactivation across stops, private placement updates, corridor deletion, suggestions, and consent.
- Frontend tests cover physical journey start, unknown-location flow, exit prompt, supermarket switch prompt, corridor grouping, corridor editing, suggestion acceptance, and consent controls.
- Playwright E2E proves the main phase 5 flow: sign up, create product/list, start physical journey, create/detect supermarket, group items, mark bought/not found with corridors, finish stop, switch supermarket, verify not-found item returns, accept suggestion, and finish journey.
