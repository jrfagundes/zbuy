# ZBuy Business Rules

Date: 2026-05-20
Status: Prototype documentation

This document defines grouped business rules for the ZBuy static prototype. These rules describe product behavior and data expectations only; they do not define production architecture or implementation details.

## Authentication

- Users can authenticate with Google, Microsoft, or native e-mail/password.
- Native account support must be visible in the main login experience, including sign in, sign up, password recovery, and failed login states.
- A user account may have one or more linked authentication identities.
- Location consent is not required to create an account, sign in, open Home, manage lists, manage products, or start online shopping.

## Lists

- Users can create multiple named shopping lists.
- A list name is required.
- Lists are reusable templates and may be edited, archived, deleted, or duplicated.
- Duplicating a list creates an independent copy, including items, quantities, units, expected prices, priority, notes, and order.
- Editing a duplicated list must not change the original list.
- Starting a shopping session requires selecting exactly one list.
- Multiple simultaneous lists in one session are out of MVP scope.
- Completing a shopping session must not delete, empty, or otherwise consume the source list.
- Each shopping session stores a source list name snapshot so history remains accurate if the reusable list is renamed, archived, deleted, or duplicated later.

## Products And Units

- Product name is required.
- Product default unit is required.
- Product category is represented as a non-normalized prototype label.
- Category label snapshots are copied into session history instead of depending on a normalized category entity.
- Unit values must be selected from a flexible unit catalog.
- The unit catalog must support weight, volume, count, package, and store-specific packaging examples such as kg, g, unit, dozen, box, package, liter, ml, bundle, tray, can, and bottle.
- The unit catalog should be expandable later without requiring prototype business-rule changes.
- Estimated product price is optional and is used only as a planning aid.
- Actual price is recorded per shopping session item.
- Product and list edits must not alter completed session item snapshots or historical prices.

## Physical Shopping

- Physical shopping starts from one selected list.
- Geolocation is requested only when the user starts physical shopping.
- A user must confirm the supermarket before any layout recording occurs.
- If geolocation is denied, unavailable, imprecise, low confidence, or ambiguous, the user must manually choose an existing supermarket, create a supermarket, or cancel setup.
- Low-confidence or ambiguous supermarket detection requires explicit manual choice.
- Session items can be marked bought, not found, or left pending.
- Bought and not-found actions remove items from the active shopping view while preserving them in the session record.
- Requested quantity and requested unit are copied from the source list item when the session starts.
- Actual quantity and actual unit may be recorded during the session to reflect what was purchased or searched for.
- Actual price is optional, but when entered it belongs to the session item.
- Finishing a session with pending items requires explicit confirmation.
- Confirmed pending items are preserved in history with a pending outcome.
- Completing a physical session writes historical item snapshots and does not delete or empty the source list.

## Online Shopping

- Online shopping starts from one selected list.
- Online shopping does not require location consent.
- Online shopping must not request geolocation.
- Online shopping must not show, create, or update physical supermarket layouts.
- Online shopping records online source or context when available, such as website, app, marketplace, delivery service, source label, or context notes.
- Online session items can be marked bought, unavailable online, or left pending.
- Requested quantity and requested unit are copied from the source list item when the session starts.
- Actual quantity and actual unit may be recorded during the session to reflect the online purchase outcome.
- Actual price is recorded per online session item when available.
- Finishing an online session with pending items requires explicit confirmation.
- Completing an online session writes historical item snapshots and does not delete or empty the source list.

## Layouts

- Physical layout data is approximate and user-assisted.
- Layout positions may use flexible labels such as sector, aisle, shelf, display, freezer, counter, or another store-specific position label.
- Shared layout suggestions require explicit user consent.
- Private layout adjustments remain private to the owner.
- Users can keep private layout adjustments even when shared layout contribution consent is disabled.
- Product positions must include confidence metadata when available.
- Product positions must include last confirmation metadata when available.
- Shared layout data must not expose user identity.
- Online shopping activity must not update physical layouts.

## History

- Each session preserves immutable item snapshots.
- Session history must preserve source list name snapshot, product name snapshot, category label snapshot, requested quantity, requested unit, actual quantity, actual unit, expected price, actual price, outcome, and notes when available.
- Historical prices must remain accurate after product edits, product archiving, product deletion handling, list edits, list duplication, list archiving, or list deletion.
- Product estimated price and list expected price are planning values; historical price reporting uses session item actual price.
- History must distinguish physical supermarket context from online context.
- History must filter by product, supermarket, online context, date range, and list.
- History may also filter by session context when useful for the prototype.
- Items marked not found, unavailable online, or pending remain visible in history as session outcomes.

## Privacy

- Purchase history is private by default.
- Location use requires explicit consent and is requested in context for physical shopping.
- Location consent is not required for online shopping.
- Shared layout contribution requires explicit consent separate from basic app usage.
- Shared layout data must be aggregated or anonymized so it does not expose user identity.
- Private layout adjustments must remain visible only to the owner.
- Account deletion handling must define what happens to private products, lists, sessions, purchase history, private layout adjustments, authentication identities, and any anonymized shared layout contributions.
- Account deletion should remove or de-identify private user data while preserving only shared layout contributions that can no longer identify the user.
