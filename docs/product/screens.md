# ZBuy Screen Inventory

Date: 2026-05-20
Status: Prototype documentation

This inventory defines the core screens for the ZBuy static prototype. The screens support authentication, reusable product and list management, physical supermarket shopping, online shopping, purchase history, and privacy controls.

## Welcome And Login

Purpose: Give the user a clear entry point into ZBuy and support all approved authentication paths before loading private shopping data.

Primary actions:

- Continue with Google.
- Continue with Microsoft.
- Sign in with e-mail and password.
- Create a native account.
- Start password recovery.
- Open privacy and terms links.

Fields:

- E-mail address.
- Password.
- New account name.
- New account e-mail.
- New account password.
- Password recovery e-mail.

States:

- Signed out default state.
- Social login in progress.
- Social login failed.
- Native sign-in failed.
- Account creation validation errors.
- Password recovery submitted.

Validation:

- E-mail must be present and formatted as an e-mail address.
- Password must be present for native sign-in.
- Account creation requires valid e-mail and password.
- Failed authentication returns the user to a recoverable state without clearing unrelated form context.

## Home

Purpose: Serve as the authenticated landing screen and main routing point for lists, products, shopping sessions, supermarkets, history, and account settings.

Primary actions:

- Create list.
- Duplicate a recent list.
- Start shopping from one selected list.
- Open Products.
- Open Shopping Lists.
- Open Supermarket Layout.
- Open History.
- Open Account And Privacy.

Data shown:

- Active reusable shopping lists.
- Recent shopping sessions.
- Recent or frequently used supermarkets.
- Recent online shopping contexts.
- Quick summary of estimated and actual spend from recent history.

States:

- Empty state for a new user with no lists or products.
- Returning user state with active lists and recent sessions.
- Active session reminder when a shopping session was started but not completed.

## Products

Purpose: Let the user manage reusable products that can be added to shopping lists and used as stable references for history and layout suggestions.

Primary actions:

- Search products.
- Filter by category.
- Create product.
- Edit product.
- Archive product.
- Open historical price summary for a product.
- Add product to a list from a product row when a target list is selected.

Data shown:

- Product name.
- Category.
- Brand when available.
- Default unit.
- Estimated/default price when available.
- Notes indicator.
- Historical price range or latest known price when available.
- Archived status.

States:

- Empty product catalog.
- Filtered results.
- No matching search results.
- Product used in historical sessions, where deletion is blocked or converted to archive.

## Product Form

Purpose: Capture or update reusable product details without changing completed session history.

Primary actions:

- Save product.
- Cancel changes.
- Archive product.
- Restore archived product when applicable.

Fields:

- Name.
- Category.
- Optional brand.
- Default unit.
- Optional estimated/default price.
- Notes.

Validation:

- Name is required.
- Category is required.
- Default unit is required and must come from the supported unit catalog.
- Estimated price is optional, but when entered must be a valid non-negative monetary value.
- Archiving a product does not remove historical session snapshots.

States:

- Create mode.
- Edit mode.
- Archived product mode.
- Save failed.

## Shopping Lists

Purpose: Show all reusable lists and provide the list-level actions needed before a shopping session starts.

Primary actions:

- Create list.
- Edit list.
- Duplicate list.
- Archive list.
- Delete list.
- Start shopping from exactly one list.

Data shown:

- List name.
- Description when available.
- Status: active or archived.
- Item count.
- Last updated date.
- Last used date.
- Duplicated-from indicator when relevant.

States:

- No lists yet.
- Active lists.
- Archived lists.
- Delete confirmation.
- Cannot start shopping until one list is selected.

Validation:

- Starting a shopping session requires exactly one selected list.
- Duplicating a list creates an independent copy, including items, quantities, units, expected prices, priority, notes, and order.

## List Editor

Purpose: Build and maintain a reusable shopping list template that can be used repeatedly without being consumed by a session.

Primary actions:

- Rename list.
- Add product from catalog.
- Create a product while editing the list.
- Edit item details.
- Reorder items.
- Remove item from list.
- Save list.
- Duplicate list.
- Archive list.
- Start shopping from this list.

Fields:

- List name.
- Description.
- Product.
- Quantity.
- Unit.
- Expected price.
- Notes.
- Priority.
- Sort order.

Data shown:

- Product category.
- Product default unit and estimated price as suggestions.
- Item count.
- Estimated total based on expected prices.

Validation:

- List name is required.
- Each item requires a product, quantity, and unit.
- Quantity must be greater than zero.
- Expected price is optional, but when entered must be a valid non-negative monetary value.
- Priority must use the supported prototype values, such as normal, high, or low.

## Shopping Context

Purpose: Ask how the selected list will be used so the prototype can route to the correct session flow.

Primary actions:

- Choose physical supermarket shopping.
- Choose online shopping.
- Go back to the selected list.
- Cancel session setup.

Data shown:

- Selected list name.
- Item count.
- Estimated total.
- Last used context when available.

States:

- Physical option selected.
- Online option selected.
- No context selected.

Validation:

- The user must choose physical or online before continuing.
- Physical shopping proceeds to supermarket confirmation and may request geolocation.
- Online shopping skips geolocation and physical layout screens.

## Supermarket Confirmation

Purpose: Confirm the physical store before starting a physical session and before recording shared or private layout data.

Primary actions:

- Confirm one detected supermarket match.
- Choose from multiple possible supermarket matches.
- Search existing supermarkets.
- Create a new supermarket.
- Continue without location by manually choosing a supermarket.
- Cancel physical session setup.

Data shown:

- Detected supermarket candidate name.
- Address label.
- Distance from current location.
- Detection confidence or match quality.
- Detection radius when relevant.
- Existing supermarket search results.

States:

- One confident match.
- Multiple possible matches.
- No match found.
- Location permission denied.
- Location unavailable.
- Location too imprecise.
- Manual supermarket selection.
- New supermarket creation.

Validation:

- A physical session requires a confirmed supermarket before layout contributions are recorded.
- If location is denied or imprecise, the user can choose an existing supermarket, create one, or cancel.
- Ambiguous detection requires explicit user choice.

## Physical Shopping Session

Purpose: Guide the user through one selected list in a confirmed supermarket while recording item outcomes, prices, and product location observations.

Primary actions:

- Mark item as bought.
- Mark item as not found.
- Enter or update actual price.
- Open Product Location Form.
- Undo a recent item outcome while the session is active.
- Finish session.

Data shown:

- Selected list name.
- Confirmed supermarket.
- Pending items.
- Bought items summary.
- Not found items summary.
- Product name.
- Quantity.
- Unit.
- Expected price.
- Actual price.
- Priority.
- Notes.
- Suggested product location when known.
- Estimated total and actual total.

States:

- Active session with pending items.
- Item bought.
- Item not found.
- Product location missing.
- Actual price differs from expected price.
- Bought without price informed.
- User attempts to finish with pending items.
- User moves away from the confirmed supermarket.
- Session completed.
- Session abandoned.

Validation:

- Bought and not-found actions remove items from the active shopping view while preserving them in the session record.
- Actual price is optional, but when entered must be a valid non-negative monetary value.
- Finishing with pending items requires confirmation or a decision for those items.
- Product location updates require supermarket confirmation.

## Product Location Form

Purpose: Capture an approximate user-assisted location for a product or category within a confirmed supermarket.

Primary actions:

- Save product location.
- Mark current suggestion as correct.
- Replace current suggestion.
- Choose private visibility.
- Choose shared contribution visibility when consent allows it.
- Cancel without saving.

Fields:

- Product.
- Supermarket.
- Sector.
- Aisle.
- Shelf or position label.
- Optional notes.
- Visibility: private or shared.

Data shown:

- Existing shared suggestion when available.
- Existing private adjustment when available.
- Last confirmed date when available.
- Shared contribution consent status.

Validation:

- A confirmed supermarket is required.
- At least one location descriptor is required: sector, aisle, shelf/position label, or notes.
- Shared visibility requires shared layout contribution consent.
- Private visibility remains available even when shared contribution consent is disabled.

## Supermarket Layout

Purpose: Show the known and uncertain layout information for a supermarket so users can understand and refine approximate product positions.

Primary actions:

- Select supermarket.
- Search products or categories in the layout.
- View product position details.
- Add private adjustment.
- Contribute a shared suggestion when consent allows it.
- Filter shared suggestions and private adjustments.

Data shown:

- Supermarket name and address label.
- Sectors.
- Aisles.
- Known product positions.
- Category positions.
- Uncertain positions.
- Shared suggestions.
- Private adjustments.
- Confidence or last confirmed metadata where available.

States:

- No supermarket selected.
- Layout not yet known.
- Shared layout available.
- Private adjustments available.
- User has not consented to shared layout contribution.

## Online Shopping Session

Purpose: Let the user complete one selected list in an online context without geolocation or physical store layout.

Primary actions:

- Enter online source label.
- Mark item as bought.
- Mark item as unavailable online.
- Enter or update actual price.
- Finish session.
- Cancel or abandon session.

Fields:

- Online source label.
- Actual price per item.
- Optional session notes.

Data shown:

- Selected list name.
- Pending items.
- Bought items summary.
- Unavailable online summary.
- Product name.
- Quantity.
- Unit.
- Expected price.
- Actual price.
- Priority.
- Notes.
- Estimated total and actual total.

States:

- Active online session.
- Item bought.
- Item unavailable online.
- Bought without price informed.
- Actual price differs from expected price.
- User attempts to finish with pending items.
- Session completed.
- Session abandoned.

Validation:

- Online sessions do not request geolocation.
- Online sessions do not show or update physical supermarket layout.
- Actual price is optional, but when entered must be a valid non-negative monetary value.
- Finished sessions write immutable history snapshots with online context.

## History

Purpose: Let the user review completed shopping sessions, item outcomes, prices, and spending trends from immutable historical snapshots.

Primary actions:

- Filter by product.
- Filter by supermarket.
- Filter by online context.
- Filter by date range.
- Filter by list.
- Filter by session context: physical or online.
- Open session detail.
- Compare product prices across stores, online contexts, or periods.

Data shown:

- Session date.
- Source list name snapshot.
- Physical supermarket or online context.
- Session status.
- Estimated total.
- Actual total.
- Product.
- Quantity.
- Unit.
- Expected price.
- Actual price.
- Outcome: bought, not found, unavailable online, or pending when applicable.
- Price variation by supermarket, online context, or period.

States:

- No history yet.
- Filtered results.
- No results for selected filters.
- Product or list has changed since the historical session.
- Product or list has been archived or deleted after the historical session.

Validation:

- History uses session snapshots and must not change when reusable products or lists are later edited.
- Date range filters require a valid start and end date.
- Physical sessions show supermarket context.
- Online sessions show online context and no physical layout data.

## Account And Privacy

Purpose: Give the user control over profile, authentication methods, location consent, shared layout contribution consent, and account data rights.

Primary actions:

- View profile details.
- Manage linked authentication methods.
- Change password for native account when available.
- Update location consent.
- Update shared layout contribution consent.
- Export account data.
- Delete account.
- Open privacy preferences.

Data shown:

- Name.
- E-mail.
- Linked authentication providers.
- Location consent status.
- Shared layout contribution consent status.
- Privacy preferences.
- Account creation date.

States:

- Location consent enabled.
- Location consent disabled.
- Shared layout contribution consent enabled.
- Shared layout contribution consent disabled.
- Export requested.
- Delete account confirmation.

Validation:

- Location use requires explicit consent before geolocation is requested.
- Shared layout contributions require explicit consent.
- The user can disable shared contributions while keeping private layout adjustments.
- Account deletion must explain how private data and anonymized shared contributions are handled.
