# ZBuy Implementation Roadmap

This roadmap translates the approved prototype design into future implementation phases. Phase 1 is documentation only. Later phases describe the intended production build sequence after the prototype is approved.

## Phase 1: Prototype Documentation

### Deliverables

- User journeys for authentication, product management, list management, shopping sessions, history, layout, and privacy flows.
- Screen inventory covering the purpose, main actions, states, and error states for every core screen.
- Conceptual data model for users, products, units, lists, sessions, supermarkets, layouts, positions, and purchase events.
- Business rules for authentication, reusable lists, session snapshots, history accuracy, geolocation, layout contribution, privacy, and consent.
- Static wireframes for the core responsive web prototype screens.

### Exit Criteria

- Product owner approves the documented flows.
- No core screen has an undefined purpose, primary action, or required error state.

## Phase 2: Production Foundation

### Deliverables

- Responsive web application scaffold.
- Custom backend scaffold with API boundaries for accounts, products, lists, sessions, supermarkets, layouts, and history.
- Relational database schema based on the approved conceptual model.
- Native account authentication with e-mail, password, account creation, sign in, and password recovery.
- Google OAuth and Microsoft OAuth authentication integrations.

### Exit Criteria

- A user can create a native account and sign in.
- A user can sign in with Google or Microsoft.
- Account and authentication data are persisted in the database.

## Phase 3: Lists And Products

Status: active implementation phase.

### Deliverables

- Product catalog with create, edit, archive, search, category, brand, notes, default unit, and optional estimated price support.
- Flexible unit catalog for weight, volume, count, package, and store-specific packaging use cases.
- Reusable shopping lists with create, edit, archive, delete, reorder, quantity, unit, expected price, priority, and notes support.
- List duplication that creates an independent copy without mutating the original list.

### Exit Criteria

- A user can create, duplicate, edit, and reuse shopping lists.
- A user can build lists from the reusable product catalog with flexible units.
- Duplicated lists can be changed independently from their source list.

## Phase 4: Shopping Sessions And History

### Deliverables

- Physical shopping session flow started from one selected list.
- Online shopping session flow that skips physical geolocation and layout behavior.
- Session item snapshots that preserve product name, category, quantity, unit, expected price, actual price, outcome, and notes.
- Price capture for bought physical items and online items.
- Purchase history filters by product, supermarket or online context, date range, source list, and shopping context.

### Exit Criteria

- A user can complete physical and online shopping sessions from a selected list.
- Completed session history remains accurate when reusable products or lists change later.
- A user can see past product prices by supermarket, online context, and date.

## Phase 5: Supermarket Detection And Layout

### Deliverables

- Geolocation-based supermarket detection using coordinates, detection radius, and confidence handling.
- Manual supermarket confirmation for detected, ambiguous, unknown, or low-confidence locations.
- Approximate product location capture using flexible labels such as sector, aisle, shelf, or store-specific position.
- Shared layout suggestions based on consented contributions.
- Private layout adjustments that remain visible only to the owner.

### Exit Criteria

- A user can confirm the physical store before layout contributions are recorded.
- A user can record approximate product positions during physical shopping.
- Shared suggestions and private adjustments follow the user's consent and privacy settings.

## Deferred Features

- Offline support.
- Native mobile app.
- Multiple simultaneous lists in one shopping session.
- Barcode scanning.
- Receipt scanning.
- Precise indoor positioning with store infrastructure.
