# ZBuy Phase 2 Production Foundation Design

Date: 2026-05-21
Status: Approved for implementation planning

## Goal

Phase 2 creates the production foundation for ZBuy. It does not implement shopping products, reusable lists, shopping sessions, price history, geolocation, supermarkets, or layouts. It establishes the web app, custom backend, database, authentication, tests, and observability needed for later product modules.

## Architecture

ZBuy Phase 2 uses a monorepo with these application boundaries:

- `apps/web`: Next.js web application.
- `apps/api`: NestJS backend API.
- `packages/shared`: shared types and API contracts when they reduce duplication.
- PostgreSQL: relational database.
- Docker Compose: local orchestration for app services, database, and observability.
- SigNoz: self-hosted open source APM for local development.
- OpenTelemetry: instrumentation standard for traces, metrics, and log correlation.

The API owns authentication, persistence, security decisions, and backend observability. The web app consumes authenticated API endpoints and presents minimal account/authentication screens. Business modules for products, lists, shopping, history, supermarkets, and layouts remain out of scope for this phase.

## Scope

### Included

- Monorepo setup for web, API, shared package, and tooling.
- Next.js scaffold for the web app.
- NestJS scaffold for the API.
- PostgreSQL setup and database migrations.
- Native e-mail/password account creation and login.
- Google OAuth login.
- Microsoft OAuth login.
- Logout/session revocation.
- Password reset request and password reset completion.
- Minimal authenticated endpoint such as `/me`.
- Minimal web screens for login, sign up, password recovery, reset password, and authenticated account state.
- Docker Compose local development stack.
- Automated tests for backend, frontend, and minimum end-to-end authentication flow.
- OpenTelemetry instrumentation.
- SigNoz local APM stack.
- Health, readiness, logs, metrics, and tracing documentation.
- Setup documentation.

### Excluded

- Product catalog.
- Flexible unit catalog UI.
- Shopping lists.
- Shopping sessions.
- Purchase history and prices.
- Online shopping flow.
- Physical shopping flow.
- Geolocation.
- Supermarket detection.
- Supermarket layouts.
- Product position capture.
- Native mobile app.
- Offline support.

## Authentication And Account Model

Phase 2 implements only the identity/account domain.

### Entities

#### User

Represents an application account.

Conceptual fields:

- id
- name
- e-mail
- e-mail verification status
- created at
- updated at
- disabled at

#### Auth Identity

Represents a login method linked to a user.

Conceptual fields:

- id
- user id
- provider: `native`, `google`, or `microsoft`
- provider subject id
- provider e-mail
- password hash for native identities only
- created at
- updated at

#### Session Or Refresh Token

Represents a revocable authenticated session.

Conceptual fields:

- id
- user id
- token hash
- expires at
- revoked at
- created at
- last used at

#### Password Reset Token

Represents a one-time password reset credential.

Conceptual fields:

- id
- user id
- token hash
- expires at
- consumed at
- created at

#### Audit Event

Represents important authentication/security activity.

Conceptual fields:

- id
- user id when known
- event type
- request id
- trace id
- metadata
- created at

Audit event types include account created, login succeeded, login failed, logout, password reset requested, password reset completed, OAuth login succeeded, and OAuth login failed.

## Authentication Flows

### Native Sign Up

The user enters name, e-mail, and password. The API validates the input, ensures the e-mail is unique, hashes the password with a strong password hashing algorithm, creates the user, creates a native auth identity, starts a session, emits an audit event, and returns authenticated state to the web app.

### Native Sign In

The user enters e-mail and password. The API validates credentials, creates a revocable session, emits success or failure audit events, and returns authenticated state.

### Logout

The user logs out from the web app. The API revokes the active session or refresh token and emits an audit event.

### Password Reset

The user requests a password reset by e-mail. The API creates a short-lived reset token, stores only a token hash, emits an audit event, and uses a development-safe delivery mechanism in local environments. Completing reset consumes the token, updates the password hash, revokes existing sessions for that user, and emits an audit event.

### Google OAuth

The web app initiates Google sign in. The API handles the OAuth callback, validates the provider identity, finds or creates the user, links the Google identity, creates a session, emits an audit event, and returns authenticated state.

### Microsoft OAuth

The web app initiates Microsoft sign in. The API handles the OAuth callback, validates the provider identity, finds or creates the user, links the Microsoft identity, creates a session, emits an audit event, and returns authenticated state.

### Authenticated State

The API exposes a protected endpoint, such as `/me`, that returns the authenticated user profile. The web app uses it to show an authenticated account state.

## Security Rules

- Passwords are never stored in plain text.
- Password hashes use a strong, modern password hashing algorithm.
- E-mail must be unique for active accounts.
- OAuth secrets are loaded from environment variables and never committed.
- Session/refresh tokens are stored only as hashes.
- Password reset tokens are stored only as hashes.
- Password reset tokens are single use and expire.
- Logout revokes the active session.
- Password reset completion revokes existing sessions for that user.
- Relevant authentication events are recorded in the audit log.
- Protected endpoints require a valid authenticated session.
- Local development may use mock or dummy OAuth credentials, but real secrets must stay outside Git.

## API Surface

Minimum API endpoints:

- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/password-reset/request`
- `POST /auth/password-reset/confirm`
- `GET /auth/google/start`
- `GET /auth/google/callback`
- `GET /auth/microsoft/start`
- `GET /auth/microsoft/callback`
- `GET /me`
- `GET /health/live`
- `GET /health/ready`

Readiness must validate PostgreSQL connectivity. Liveness must indicate the API process is running.

## Web Surface

Minimum web screens/routes:

- Login.
- Sign up.
- Password reset request.
- Password reset confirmation.
- Authenticated account/home state.
- Basic error states for failed login, failed sign up, invalid reset token, and unavailable API.

The web app should stay intentionally small in this phase. It exists to validate authentication and foundation behavior, not to implement the full shopping product UI.

## Testing Requirements

Testing is mandatory in Phase 2.

### Backend Tests

- Unit tests for authentication service behavior.
- Unit tests for password hashing and token hashing helpers.
- Integration tests with PostgreSQL for sign up, login, logout, password reset, and `/me`.
- Endpoint tests for `/auth/*`, `/me`, `/health/live`, and `/health/ready`.

### Frontend Tests

- Render tests for login, sign up, password reset, and authenticated account state.
- Form interaction tests using mocked API responses.
- Error-state tests for failed login and unavailable API.

### End-To-End Test

At minimum, the E2E suite must verify:

- Native sign up.
- Native login.
- Access to `/me`.
- Logout.

OAuth flows may use provider mocks or documented local test mode in this phase.

## Observability Requirements

Observability is mandatory in Phase 2.

### OpenTelemetry

The NestJS API must be instrumented with OpenTelemetry for:

- HTTP request traces.
- PostgreSQL spans when supported by the selected libraries.
- Error spans.
- Service name and environment attributes.
- `trace_id` and `span_id` propagation.

The Next.js web app should be prepared for basic trace/correlation support where practical, but API instrumentation is the hard requirement for this phase.

### SigNoz APM

The local development stack must include SigNoz as the open source APM target. It must receive telemetry through OpenTelemetry-compatible configuration.

The setup must allow replacing SigNoz with another OpenTelemetry backend later by changing environment variables and collector/exporter configuration.

### Logs

API logs must be structured and include:

- timestamp
- level
- service name
- request id
- trace id when available
- span id when available
- route/method/status when applicable
- error details when applicable

### Metrics

The foundation must expose or export basic metrics for:

- HTTP request count.
- HTTP status codes.
- Request latency.
- Error count or error rate.
- API uptime/process health.

### Health Checks

Required endpoints:

- `/health/live`: process liveness.
- `/health/ready`: readiness including PostgreSQL connectivity.

Health check requests should be visible enough for operational debugging without polluting traces excessively.

## Local Development

The local environment must be documented and runnable with Docker Compose. It should include:

- PostgreSQL.
- API.
- Web app.
- SigNoz or the required SigNoz local stack.
- OpenTelemetry collector/exporter configuration if needed by the selected SigNoz setup.

Documentation must explain:

- Required environment variables.
- How to start the stack.
- How to run migrations.
- How to run tests.
- How to open the web app.
- How to access SigNoz.
- How to verify traces, logs, and metrics.

## Acceptance Criteria

Phase 2 is complete when:

- The local stack starts from documented commands.
- PostgreSQL is reachable by the API.
- Database migrations create the authentication foundation tables.
- A user can create a native account.
- A user can sign in with native credentials.
- A user can log out.
- A user can request and complete password reset in local/dev mode.
- Google OAuth and Microsoft OAuth flows are implemented or have documented local mock/test mode plus production configuration path.
- `/me` returns the authenticated user.
- `/health/live` and `/health/ready` work.
- Automated tests pass.
- API traces are visible in SigNoz.
- API logs include request id and trace correlation.
- Basic HTTP metrics are visible in the configured observability stack.

## Future Phases

Phase 3 will build product catalog, flexible units, and reusable shopping lists on top of this foundation. Phase 4 will build shopping sessions and history. Phase 5 will build supermarket detection and layout behavior.
