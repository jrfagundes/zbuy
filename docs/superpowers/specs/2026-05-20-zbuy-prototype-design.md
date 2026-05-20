# ZBuy Prototype Design

Date: 2026-05-20
Status: Approved for implementation planning

## Goal

ZBuy is a shopping assistant for users who want reusable shopping lists, product registration, supermarket layout support, and purchase history. The first phase is not the real application implementation. It is a product prototype and documentation package that defines screens, flows, data models, business rules, error states, privacy decisions, and a future implementation plan.

The prototype targets a responsive web experience first. The future architecture should allow a mobile app later, but the MVP specification starts with web.

## Product Scope

The prototype covers these areas:

- Authentication with Google, Microsoft, and a native e-mail/password account.
- Product registration with flexible units and optional price data.
- Multiple reusable shopping lists.
- List creation, editing, archiving, deletion, and duplication.
- One active list per shopping session.
- Physical supermarket shopping with geolocation-based store identification.
- Online shopping as a separate flow with no physical layout.
- Assisted supermarket layout based on user-confirmed sector, aisle, shelf, or similar approximate position.
- Hybrid layouts: shared suggested layout plus private user adjustments.
- Purchase history with product prices, supermarket, dates, context, and item outcomes.
- Privacy and consent controls for geolocation and shared layout contributions.

Using multiple lists in parallel during the same shopping session is intentionally out of MVP scope. It is documented as a future feature.

## Core Decisions

- The first deliverable is a documented prototype, not the production app.
- The production stack will use a custom backend later.
- The first production app should be web-first, while preserving a path to native mobile.
- The MVP assumes online usage. Offline support is out of scope for the first implementation.
- Supermarket identification uses geolocation. Indoor product positioning is assisted by user confirmation, not automatic precise indoor tracking.
- Online purchases do not use physical store geolocation or physical layout.
- Shopping lists are reusable templates. Shopping sessions preserve the actual outcome of a specific purchase.

## User Journeys

### Authentication

The user opens the app and chooses one of three authentication paths:

- Continue with Google.
- Continue with Microsoft.
- Create or access a native account with e-mail and password.

The prototype must include sign in, sign up, password recovery, failed login, and future location permission consent.

### Product Management

The user can register reusable products with:

- Name.
- Category.
- Optional brand.
- Default flexible unit.
- Optional estimated/default price.
- Notes.

The product catalog helps users build lists faster and helps the layout system infer categories when no product position is known yet.

### Shopping Lists

The user can create multiple named lists, such as:

- Weekly shopping.
- Barbecue.
- Monthly basics.
- Shopping for another person.

The user can edit, duplicate, archive, and delete lists. Duplicating a list creates an independent copy so the user can adjust quantities or products without changing the original.

When starting a shopping session, the user chooses exactly one list.

### Starting A Shopping Session

The user starts from a selected list and chooses:

- Physical supermarket shopping.
- Online shopping.

If physical, the app requests or uses geolocation to detect nearby supermarkets. If online, the app skips geolocation and layout.

### Physical Shopping

The app attempts to identify the supermarket by coordinates and detection radius. If the confidence is good, it asks the user to confirm. If the store is unknown or ambiguous, it asks the user to choose an existing supermarket, create a new one, or cancel.

During shopping, each item can be marked as:

- Bought.
- Not found.
- Still pending.

The user can also inform or confirm an approximate product position, such as sector, aisle, shelf, or other store-specific location label.

### Online Shopping

Online shopping is a separate flow. It lets the user complete items from the selected list and record purchase data without physical geolocation or physical layout updates.

The history stores that the session was online.

### Purchase History

Every completed or materially updated shopping session contributes to history. The user can later see:

- How much they paid for each product in previous purchases.
- Which supermarket or online context was used.
- When the product was bought.
- Quantity and unit.
- Price paid.
- Items not found.
- Total estimated and total real spend.
- Price variation by supermarket or period.

History must remain accurate even if the reusable list or product catalog changes later.

## Screens

### Welcome And Login

Shows Google login, Microsoft login, e-mail/password login, account creation, password recovery, and privacy links.

### Home

Shows the user's lists, recent shopping sessions, recent supermarkets, and quick actions:

- Create list.
- Duplicate list.
- Start shopping.
- Products.
- Supermarkets.
- History.

### Products

Lists registered products. Supports search, filtering by category, create, edit, and view historical price summary.

### Product Form

Captures product name, category, brand, default unit, optional estimated price, and notes.

### Shopping Lists

Displays all user lists with status, last use, item count, and actions for edit, duplicate, archive, delete, and start shopping.

### List Editor

Lets the user add products, define quantities, choose units, set expected prices, add notes, and reorder or remove items.

### Shopping Context

Asks whether the purchase is physical or online.

### Supermarket Confirmation

Shows detected store candidates and asks the user to confirm. If no store is recognized, the user can create a new supermarket or pick an existing one.

### Physical Shopping Session

Shows selected list items for the current supermarket. Items can be bought, marked as not found, priced, or given a location.

### Product Location Form

Captures approximate product position in the store. The first version supports flexible labels instead of a precise indoor map.

### Supermarket Layout

Shows sectors, aisles, known product positions, uncertain positions, shared suggestions, and private adjustments.

### Online Shopping Session

Shows selected list items without physical layout. Items can be bought, priced, or marked as unavailable online.

### History

Shows past shopping sessions with filters by product, supermarket, date range, list, and context. Includes product price history and total spend.

### Account And Privacy

Shows profile data, authentication methods, location consent, layout contribution consent, export/delete account options, and privacy preferences.

## Conceptual Data Model

### User

Represents an app account.

Fields:

- id
- name
- e-mail
- authentication methods
- location consent
- shared layout contribution consent
- privacy preferences
- created at
- updated at

### Auth Identity

Represents a linked login method.

Fields:

- id
- user id
- provider: google, microsoft, or native
- provider subject id
- e-mail
- created at

### Product

Represents a reusable user product.

Fields:

- id
- owner user id
- name
- category id
- brand
- default unit id
- estimated price
- notes
- archived at
- created at
- updated at

### Unit

Represents a flexible unit of measure.

Examples:

- kg
- g
- unit
- dozen
- box
- package
- liter
- ml
- bundle
- tray
- can
- bottle

Fields:

- id
- name
- abbreviation
- type
- allows decimals
- active

The system should support a seeded unit catalog and allow future expansion without code changes.

### Shopping List

Represents a reusable named list.

Fields:

- id
- owner user id
- name
- description
- status: active, archived
- duplicated from list id
- created at
- updated at

### Shopping List Item

Represents an item inside a reusable list.

Fields:

- id
- list id
- product id
- quantity
- unit id
- expected price
- priority
- notes
- sort order

### Shopping Session

Represents one execution of a purchase using one list.

Fields:

- id
- owner user id
- source list id
- context: physical or online
- supermarket id
- online source label
- status: active, completed, abandoned
- started at
- completed at
- estimated total
- actual total

### Shopping Session Item

Represents the historical snapshot of a list item during a session.

Fields:

- id
- session id
- source list item id
- product id
- product name snapshot
- category snapshot
- quantity
- unit snapshot
- expected price
- actual price
- outcome: pending, bought, not found, unavailable online
- notes

This snapshot preserves history even if products or lists change later.

### Supermarket

Represents a physical store.

Fields:

- id
- name
- address label
- latitude
- longitude
- detection radius meters
- created by user id
- created at
- updated at

### Store Layout

Represents a shared suggested layout for a supermarket.

Fields:

- id
- supermarket id
- version
- confidence score
- created at
- updated at

### Private Layout Adjustment

Represents a user's private correction to a store layout.

Fields:

- id
- user id
- supermarket id
- product id or category id
- position label
- notes
- created at
- updated at

### Product Position

Represents an observed product position in a supermarket.

Fields:

- id
- supermarket id
- product id
- category id
- position label
- source: shared, private, session event
- confidence score
- last confirmed at
- created by user id

### Purchase Event

Represents an auditable action during a shopping session.

Fields:

- id
- session id
- session item id
- event type
- event payload
- created at

Event types include bought, not found, price updated, position informed, position confirmed, supermarket confirmed, context changed, and session completed.

## Business Rules

1. A user can authenticate with Google, Microsoft, or native e-mail/password.
2. A user can create, edit, duplicate, archive, and delete shopping lists.
3. A shopping session uses one selected list.
4. Multiple simultaneous lists in one session are out of MVP scope.
5. A reusable list is not destroyed or automatically emptied when a shopping session is completed.
6. Session items preserve historical snapshots of product, quantity, unit, expected price, actual price, and outcome.
7. Physical shopping requires supermarket confirmation before layout contributions are recorded.
8. If geolocation confidence is low or ambiguous, the user must confirm the supermarket manually.
9. Online shopping uses a separate flow and does not update physical layouts.
10. Bought and not-found actions remove items from the active shopping view for that session, while preserving them in history.
11. Product positions are approximate and user-assisted in the MVP.
12. Shared layout contributions require user consent.
13. Private layout adjustments remain visible only to the owner.
14. Price history is based on shopping session snapshots, not mutable product defaults.
15. A product's estimated price is only a planning aid. The actual price belongs to the session item.
16. Units must be flexible enough for weight, volume, count, package, and store-specific packaging.
17. Changing a reusable product or list must not alter completed session history.

## Error And Exception States

The prototype must represent these cases:

- User denies location permission.
- Location is unavailable.
- Location is too imprecise.
- No supermarket is found nearby.
- Multiple supermarkets are possible.
- User chooses online shopping.
- Product is not found in the physical store.
- Product is unavailable online.
- Product is bought without price informed.
- Actual price differs from expected price.
- User attempts to conclude a session with pending items.
- User moves away from the confirmed supermarket during a session.
- Social login fails.
- Native e-mail/password login fails.
- User has not consented to shared layout contribution.
- User tries to delete a product used in historical sessions.

## Privacy Requirements

- Location use must require explicit consent.
- Shared layout contribution must require explicit consent.
- The user must be able to disable shared contributions while keeping private layout adjustments.
- Historical purchases are private by default.
- Aggregated shared layout data should not expose user identity.
- Account deletion must define how private data and shared anonymized contributions are handled.

## Prototype Deliverables

The first delivery should include:

- User journey map.
- Screen inventory.
- Wireframes for each core screen.
- Data model documentation.
- Business rules.
- Geolocation and supermarket identification flow.
- Physical shopping flow.
- Online shopping flow.
- Product location and layout flow.
- Purchase history and price tracking flow.
- Privacy and consent flow.
- Future implementation plan.

## Future Implementation Direction

The production app should be designed around:

- Responsive web frontend.
- Custom backend API.
- Relational database.
- OAuth integrations for Google and Microsoft.
- Native e-mail/password authentication.
- Geolocation service for supermarket detection.
- Layout service for shared suggestions and private adjustments.
- Purchase history service for immutable price and session records.

Native mobile, offline support, precise indoor positioning, barcode scanning, receipt scanning, and multi-list simultaneous shopping can be planned after the first prototype and MVP validation.
