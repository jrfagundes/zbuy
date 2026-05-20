# ZBuy User Journey Map

Date: 2026-05-20
Status: Prototype documentation

This document maps the primary ZBuy user journeys for the static prototype. The journeys preserve the approved product decisions: reusable lists, one list per shopping session, physical supermarket support with user-assisted location data, a separate online shopping flow, and purchase history that remains accurate after reusable data changes.

## 1. First Access And Authentication

The user reaches ZBuy, chooses an authentication method, and grants optional permissions only when they are needed for a later flow.

```mermaid
flowchart TD
    A[Open ZBuy] --> B[Welcome and login]
    B --> C{Choose access method}
    C --> D[Continue with Google]
    C --> E[Continue with Microsoft]
    C --> F[Use native e-mail and password]
    F --> G{Existing account?}
    G -->|Yes| H[Sign in]
    G -->|No| I[Sign up]
    F --> J[Recover password]
    D --> K{Authentication succeeds?}
    E --> K
    H --> K
    I --> K
    J --> B
    K -->|No| L[Show failed login state]
    L --> B
    K -->|Yes| M[Load home]
    M --> N[Show lists, recent sessions, products, supermarkets, and history]
    N --> O[Ask for location consent later when physical shopping starts]
```

Success criteria:

- The prototype offers Google, Microsoft, and native e-mail/password authentication.
- The native path supports sign in, sign up, password recovery, and failed login states.
- Location permission is not required for first access; it is requested in context before physical shopping.
- A successful login lands on the home screen with access to lists, products, supermarkets, sessions, history, and privacy settings.

## 2. Create And Reuse Lists

The user creates multiple reusable lists, edits them over time, and duplicates a list when they need an independent variant.

```mermaid
flowchart TD
    A[Open home] --> B[Open shopping lists]
    B --> C{Choose action}
    C --> D[Create new list]
    C --> E[Edit existing list]
    C --> F[Duplicate existing list]
    C --> G[Archive or delete list]
    D --> H[Name list]
    E --> I[Update list name, products, quantities, units, expected prices, notes, or order]
    F --> J[Create independent list copy]
    J --> I
    H --> K[Add products from catalog or create product]
    K --> I
    I --> L[Save reusable list]
    G --> M[Remove list from active reuse]
    L --> N[Return to all lists]
    M --> N
    N --> O[Start shopping from exactly one selected list]
```

Success criteria:

- The user can maintain multiple reusable lists, such as weekly shopping, barbecue, monthly basics, or shopping for another person.
- List duplication creates an independent copy, so changing the duplicate does not alter the original list.
- Lists support products, quantities, units, expected prices, notes, ordering, archive, and delete actions.
- Starting a shopping session requires selecting exactly one list; using multiple lists in one session remains out of MVP scope.

## 3. Physical Shopping

The user starts a physical shopping session from one list, confirms or creates the supermarket, records item outcomes, and helps improve approximate product locations.

```mermaid
flowchart TD
    A[Select one reusable list] --> B[Start shopping]
    B --> C[Choose physical supermarket shopping]
    C --> D[Request location permission]
    D --> E{Permission granted?}
    E -->|No| F[Ask user to choose existing supermarket, create supermarket, or cancel]
    E -->|Yes| G[Detect nearby supermarket candidates]
    G --> H{Detection confidence}
    H -->|Good| I[Ask user to confirm detected supermarket]
    H -->|Ambiguous or unknown| F
    F --> J{User choice}
    J -->|Choose existing| K[Use selected supermarket]
    J -->|Create new| L[Create supermarket]
    J -->|Cancel| M[Exit session setup]
    I --> K
    L --> K
    K --> N[Open physical shopping session for selected list]
    N --> O[Mark each item bought, not found, or pending]
    O --> P[Enter price, quantity, and unit as needed]
    P --> Q{Know product location?}
    Q -->|Yes| R[Confirm or add approximate sector, aisle, shelf, or label]
    Q -->|No| S[Use category or unknown location]
    R --> T[Save user-assisted location suggestion or private adjustment]
    S --> U[Continue shopping]
    T --> U
    U --> V{More items?}
    V -->|Yes| O
    V -->|No| W[Complete session and write purchase history snapshot]
```

Success criteria:

- Physical shopping starts from exactly one selected list.
- The app requests geolocation for physical shopping and uses it to suggest nearby supermarkets.
- The user can confirm a detected supermarket, choose an existing supermarket, create a new supermarket, or cancel when the store is unknown or ambiguous.
- Product location is approximate and user-assisted, using labels such as sector, aisle, shelf, or other store-specific terms.
- The layout can combine shared suggested locations with private user adjustments.
- Completed physical sessions preserve item outcomes, prices, quantities, units, date, and supermarket context in history.

## 4. Online Shopping

The user starts an online shopping session from one list and records purchase outcomes without location or physical layout steps.

```mermaid
flowchart TD
    A[Select one reusable list] --> B[Start shopping]
    B --> C[Choose online shopping]
    C --> D[Skip geolocation]
    D --> E[Skip physical supermarket layout]
    E --> F[Open online shopping session for selected list]
    F --> G[Mark each item bought, unavailable online, or pending]
    G --> H[Enter price, quantity, unit, and online context]
    H --> I{More items?}
    I -->|Yes| G
    I -->|No| J[Complete session]
    J --> K[Write purchase history snapshot with online context]
```

Success criteria:

- Online shopping starts from exactly one selected list.
- The online flow does not request geolocation.
- The online flow does not show or update physical supermarket layout.
- The user can record bought items, unavailable items, pending items, prices, quantities, units, and online context.
- The resulting history clearly identifies the session as online.

## 5. Review History And Prices

The user reviews past sessions, product prices, and spending context from immutable purchase records.

```mermaid
flowchart TD
    A[Open home] --> B[Open history]
    B --> C[Filter by product, supermarket, online context, date range, list, or session]
    C --> D[View session summary]
    D --> E[View item-level history]
    E --> F[Compare prices by product, place or context, and period]
    F --> G[Inspect quantity, unit, price, date, and item outcome]
    G --> H{Reusable product or list changed later?}
    H -->|Yes| I[Keep historical snapshot unchanged]
    H -->|No| J[Show current and historical data consistently]
    I --> K[Use history for price variation and spend review]
    J --> K
```

Success criteria:

- History preserves the product price, place or online context, date, quantity, and unit for each purchased item.
- History remains accurate even after reusable products are edited, archived, or deleted.
- History remains accurate even after reusable lists are edited, duplicated, archived, or deleted.
- The user can review items not found or unavailable, total estimated spend, total real spend, and price variation by supermarket or period.
- Physical sessions retain supermarket context, while online sessions retain online context without geolocation or layout data.
