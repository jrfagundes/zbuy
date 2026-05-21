# ZBuy Phase 2 Production Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the production foundation for ZBuy with a Next.js web app, NestJS API, PostgreSQL persistence, authentication, automated tests, and OpenTelemetry/SigNoz observability.

**Architecture:** Use a TypeScript monorepo with `apps/web`, `apps/api`, and `packages/shared`. The NestJS API owns authentication, persistence, health checks, logs, metrics, and OpenTelemetry instrumentation; the Next.js app consumes the API for account/authentication flows.

**Tech Stack:** pnpm workspaces, TypeScript, Next.js, NestJS, PostgreSQL, Prisma migrations, Docker Compose, OpenTelemetry, SigNoz, Jest/Vitest, Playwright.

---

## File Structure

- Create: `package.json`
  - Root scripts for install, dev, build, lint, test, typecheck, migration, and E2E.
- Create: `pnpm-workspace.yaml`
  - Workspace definitions for apps and packages.
- Create: `tsconfig.base.json`
  - Shared TypeScript compiler options.
- Create: `.env.example`
  - Documented local environment variables without secrets.
- Create: `docker-compose.yml`
  - PostgreSQL, API, web, and SigNoz/observability services.
- Create: `docs/development/phase-2-setup.md`
  - Setup, test, observability, and troubleshooting instructions.
- Create: `packages/shared/package.json`
- Create: `packages/shared/src/index.ts`
  - Shared DTO-like TypeScript types for auth/user responses.
- Create: `apps/api/**`
  - NestJS API, auth module, health module, Prisma module, observability bootstrap, tests.
- Create: `apps/web/**`
  - Next.js app, auth screens, authenticated account state, API client, tests.
- Create: `tests/e2e/**`
  - Playwright E2E sign up, login, `/me`, and logout flow.

Implementation should happen in a fresh worktree/branch. Do not implement product catalog, shopping lists, shopping sessions, history, geolocation, supermarkets, or layouts.

---

### Task 1: Monorepo Foundation

**Files:**
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `tsconfig.base.json`
- Create: `.gitignore`
- Create: `.env.example`
- Create: `packages/shared/package.json`
- Create: `packages/shared/tsconfig.json`
- Create: `packages/shared/src/index.ts`

- [ ] **Step 1: Create root workspace files**

Create `package.json`:

```json
{
  "name": "zbuy",
  "private": true,
  "packageManager": "pnpm@9.15.0",
  "scripts": {
    "dev": "pnpm --parallel --filter @zbuy/api --filter @zbuy/web dev",
    "build": "pnpm --recursive build",
    "lint": "pnpm --recursive lint",
    "test": "pnpm --recursive test",
    "typecheck": "pnpm --recursive typecheck",
    "db:migrate": "pnpm --filter @zbuy/api prisma:migrate",
    "db:generate": "pnpm --filter @zbuy/api prisma:generate",
    "e2e": "pnpm --filter @zbuy/e2e test"
  },
  "devDependencies": {
    "typescript": "^5.7.2"
  }
}
```

Create `pnpm-workspace.yaml`:

```yaml
packages:
  - "apps/*"
  - "packages/*"
  - "tests/*"
```

Create `tsconfig.base.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```

- [ ] **Step 2: Create environment template**

Create `.env.example`:

```dotenv
NODE_ENV=development

WEB_PORT=3000
API_PORT=3001
WEB_PUBLIC_API_URL=http://localhost:3001

DATABASE_URL=postgresql://zbuy:zbuy@localhost:5432/zbuy?schema=public

SESSION_COOKIE_NAME=zbuy_session
SESSION_SECRET=replace-with-local-random-secret
PASSWORD_RESET_BASE_URL=http://localhost:3000/reset-password

GOOGLE_CLIENT_ID=dummy-google-client-id
GOOGLE_CLIENT_SECRET=dummy-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback

MICROSOFT_CLIENT_ID=dummy-microsoft-client-id
MICROSOFT_CLIENT_SECRET=dummy-microsoft-client-secret
MICROSOFT_CALLBACK_URL=http://localhost:3001/auth/microsoft/callback

OTEL_SERVICE_NAME=zbuy-api
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
OTEL_ENVIRONMENT=local

SIGNOZ_PORT=3301
```

- [ ] **Step 3: Create shared package**

Create `packages/shared/package.json`:

```json
{
  "name": "@zbuy/shared",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "lint": "tsc -p tsconfig.json --noEmit",
    "test": "node --test --passWithNoTests",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.7.2"
  }
}
```

Create `packages/shared/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  },
  "include": ["src/**/*.ts"]
}
```

Create `packages/shared/src/index.ts`:

```ts
export type AuthProvider = "native" | "google" | "microsoft";

export interface CurrentUserDto {
  id: string;
  name: string;
  email: string;
}

export interface AuthenticatedUserResponse {
  user: CurrentUserDto;
}

export interface ApiErrorResponse {
  message: string;
  requestId?: string;
}
```

- [ ] **Step 4: Install workspace dependencies**

Run:

```powershell
pnpm install
```

Expected: `pnpm-lock.yaml` is created and install exits with code `0`.

- [ ] **Step 5: Verify workspace foundation**

Run:

```powershell
pnpm --filter @zbuy/shared typecheck
```

Expected: command exits with code `0`.

- [ ] **Step 6: Commit**

Run:

```powershell
git add package.json pnpm-workspace.yaml tsconfig.base.json .env.example packages/shared pnpm-lock.yaml
git commit -m "chore: scaffold TypeScript monorepo"
```

Expected: commit succeeds.

---

### Task 2: API Scaffold And Health Checks

**Files:**
- Create: `apps/api/package.json`
- Create: `apps/api/tsconfig.json`
- Create: `apps/api/tsconfig.build.json`
- Create: `apps/api/src/main.ts`
- Create: `apps/api/src/app.module.ts`
- Create: `apps/api/src/health/health.controller.ts`
- Create: `apps/api/src/health/health.module.ts`
- Create: `apps/api/src/request-context/request-context.middleware.ts`
- Create: `apps/api/test/health.e2e-spec.ts`

- [ ] **Step 1: Create API package**

Create `apps/api/package.json`:

```json
{
  "name": "@zbuy/api",
  "version": "0.1.0",
  "private": true,
  "type": "commonjs",
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build",
    "lint": "eslint \"src/**/*.ts\" \"test/**/*.ts\"",
    "test": "jest",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "@nestjs/common": "^10.4.15",
    "@nestjs/core": "^10.4.15",
    "@nestjs/platform-express": "^10.4.15",
    "cookie-parser": "^1.4.7",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "uuid": "^11.0.3"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.8",
    "@nestjs/testing": "^10.4.15",
    "@types/cookie-parser": "^1.4.8",
    "@types/express": "^5.0.0",
    "@types/jest": "^29.5.14",
    "@types/node": "^22.10.2",
    "@types/supertest": "^6.0.2",
    "@types/uuid": "^10.0.0",
    "@typescript-eslint/eslint-plugin": "^8.18.1",
    "@typescript-eslint/parser": "^8.18.1",
    "eslint": "^9.17.0",
    "jest": "^29.7.0",
    "source-map-support": "^0.5.21",
    "supertest": "^7.0.0",
    "ts-jest": "^29.2.5",
    "ts-loader": "^9.5.2",
    "ts-node": "^10.9.2",
    "typescript": "^5.7.2"
  }
}
```

- [ ] **Step 2: Create TypeScript and Jest config**

Create `apps/api/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "module": "CommonJS",
    "moduleResolution": "Node",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "outDir": "dist",
    "baseUrl": "./",
    "types": ["node", "jest"]
  },
  "include": ["src/**/*.ts", "test/**/*.ts"]
}
```

Create `apps/api/tsconfig.build.json`:

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["test", "dist", "**/*.spec.ts"]
}
```

Create `apps/api/jest.config.cjs`:

```js
module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverageFrom: ["src/**/*.(t|j)s"],
  testEnvironment: "node"
};
```

Create `apps/api/test/jest-e2e.json`:

```json
{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": "..",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}
```

- [ ] **Step 3: Create API app and health endpoints**

Create `apps/api/src/main.ts`:

```ts
import "reflect-metadata";
import cookieParser from "cookie-parser";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: process.env.WEB_ORIGIN ?? "http://localhost:3000",
    credentials: true
  });
  const port = Number(process.env.API_PORT ?? 3001);
  await app.listen(port);
}

void bootstrap();
```

Create `apps/api/src/app.module.ts`:

```ts
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { RequestContextMiddleware } from "./request-context/request-context.middleware";

@Module({
  imports: [HealthModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes("*");
  }
}
```

Create `apps/api/src/request-context/request-context.middleware.ts`:

```ts
import { Injectable, NestMiddleware } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";

declare module "express-serve-static-core" {
  interface Request {
    requestId?: string;
  }
}

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const incoming = req.header("x-request-id");
    const requestId = incoming && incoming.trim().length > 0 ? incoming : randomUUID();
    req.requestId = requestId;
    res.setHeader("x-request-id", requestId);
    next();
  }
}
```

Create `apps/api/src/health/health.controller.ts`:

```ts
import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get("live")
  live() {
    return { status: "ok" };
  }

  @Get("ready")
  ready() {
    return { status: "ok", checks: { api: "ok" } };
  }
}
```

Create `apps/api/src/health/health.module.ts`:

```ts
import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller";

@Module({
  controllers: [HealthController]
})
export class HealthModule {}
```

- [ ] **Step 4: Write health endpoint tests**

Create `apps/api/test/health.e2e-spec.ts`:

```ts
import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe("Health endpoints", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns liveness", async () => {
    await request(app.getHttpServer()).get("/health/live").expect(200).expect({ status: "ok" });
  });

  it("returns readiness", async () => {
    await request(app.getHttpServer())
      .get("/health/ready")
      .expect(200)
      .expect({ status: "ok", checks: { api: "ok" } });
  });
});
```

- [ ] **Step 5: Install and verify API scaffold**

Run:

```powershell
pnpm install
pnpm --filter @zbuy/api typecheck
pnpm --filter @zbuy/api test:e2e
```

Expected: typecheck and e2e tests exit with code `0`.

- [ ] **Step 6: Commit**

Run:

```powershell
git add apps/api package.json pnpm-lock.yaml
git commit -m "feat: scaffold NestJS API health foundation"
```

Expected: commit succeeds.

---

### Task 3: Database And Prisma Auth Schema

**Files:**
- Create: `apps/api/prisma/schema.prisma`
- Create: `apps/api/src/prisma/prisma.module.ts`
- Create: `apps/api/src/prisma/prisma.service.ts`
- Modify: `apps/api/src/app.module.ts`
- Modify: `apps/api/src/health/health.controller.ts`
- Modify: `apps/api/src/health/health.module.ts`
- Modify: `apps/api/package.json`
- Create: `apps/api/test/prisma-health.e2e-spec.ts`

- [ ] **Step 1: Add Prisma dependencies and scripts**

Modify `apps/api/package.json` so dependencies include:

```json
"@prisma/client": "^6.1.0"
```

and devDependencies include:

```json
"prisma": "^6.1.0"
```

Add scripts:

```json
"prisma:generate": "prisma generate",
"prisma:migrate": "prisma migrate dev",
"prisma:deploy": "prisma migrate deploy"
```

- [ ] **Step 2: Create Prisma schema**

Create `apps/api/prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum AuthProvider {
  native
  google
  microsoft
}

enum AuditEventType {
  account_created
  login_succeeded
  login_failed
  logout
  password_reset_requested
  password_reset_completed
  oauth_login_succeeded
  oauth_login_failed
}

model User {
  id              String          @id @default(uuid())
  name            String
  email           String          @unique
  emailVerifiedAt DateTime?
  disabledAt      DateTime?
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
  identities      AuthIdentity[]
  sessions        Session[]
  resetTokens     PasswordResetToken[]
  auditEvents     AuditEvent[]
}

model AuthIdentity {
  id                String       @id @default(uuid())
  userId            String
  provider          AuthProvider
  providerSubjectId String?
  providerEmail     String
  passwordHash      String?
  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
  user              User         @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerSubjectId])
  @@unique([provider, providerEmail])
}

model Session {
  id         String    @id @default(uuid())
  userId     String
  tokenHash  String    @unique
  expiresAt  DateTime
  revokedAt  DateTime?
  createdAt  DateTime  @default(now())
  lastUsedAt DateTime?
  user       User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model PasswordResetToken {
  id         String    @id @default(uuid())
  userId     String
  tokenHash  String    @unique
  expiresAt  DateTime
  consumedAt DateTime?
  createdAt  DateTime  @default(now())
  user       User      @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model AuditEvent {
  id        String         @id @default(uuid())
  userId    String?
  eventType AuditEventType
  requestId String?
  traceId   String?
  metadata  Json?
  createdAt DateTime       @default(now())
  user      User?          @relation(fields: [userId], references: [id], onDelete: SetNull)
}
```

- [ ] **Step 3: Add Prisma service**

Create `apps/api/src/prisma/prisma.service.ts`:

```ts
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async isReady() {
    await this.$queryRaw`SELECT 1`;
    return true;
  }
}
```

Create `apps/api/src/prisma/prisma.module.ts`:

```ts
import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
```

- [ ] **Step 4: Wire Prisma into app and readiness**

Modify `apps/api/src/app.module.ts` to import `PrismaModule`:

```ts
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RequestContextMiddleware } from "./request-context/request-context.middleware";

@Module({
  imports: [PrismaModule, HealthModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes("*");
  }
}
```

Modify `apps/api/src/health/health.controller.ts`:

```ts
import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Controller("health")
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("live")
  live() {
    return { status: "ok" };
  }

  @Get("ready")
  async ready() {
    try {
      await this.prisma.isReady();
      return { status: "ok", checks: { api: "ok", postgres: "ok" } };
    } catch {
      throw new ServiceUnavailableException({
        status: "error",
        checks: { api: "ok", postgres: "error" }
      });
    }
  }
}
```

- [ ] **Step 5: Add readiness test with Prisma mock**

Create `apps/api/test/prisma-health.e2e-spec.ts`:

```ts
import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { HealthModule } from "../src/health/health.module";
import { PrismaService } from "../src/prisma/prisma.service";

describe("Readiness with PostgreSQL check", () => {
  let app: INestApplication;
  const prisma = { isReady: jest.fn().mockResolvedValue(true) };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HealthModule]
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("reports postgres readiness", async () => {
    await request(app.getHttpServer())
      .get("/health/ready")
      .expect(200)
      .expect({ status: "ok", checks: { api: "ok", postgres: "ok" } });
  });
});
```

- [ ] **Step 6: Generate Prisma client and create initial migration**

Run:

```powershell
pnpm install
pnpm --filter @zbuy/api prisma:generate
pnpm --filter @zbuy/api prisma migrate dev --name auth_foundation
pnpm --filter @zbuy/api test:e2e
```

Expected:

- Prisma client generation succeeds.
- Migration folder is created under `apps/api/prisma/migrations`.
- E2E tests exit with code `0`.

- [ ] **Step 7: Commit**

Run:

```powershell
git add apps/api package.json pnpm-lock.yaml
git commit -m "feat: add auth foundation database schema"
```

Expected: commit succeeds.

---

### Task 4: Native Authentication API

**Files:**
- Create: `apps/api/src/auth/auth.module.ts`
- Create: `apps/api/src/auth/auth.controller.ts`
- Create: `apps/api/src/auth/auth.service.ts`
- Create: `apps/api/src/auth/password.service.ts`
- Create: `apps/api/src/auth/token.service.ts`
- Create: `apps/api/src/auth/session.guard.ts`
- Create: `apps/api/src/auth/current-user.decorator.ts`
- Create: `apps/api/src/me/me.controller.ts`
- Create: `apps/api/src/me/me.module.ts`
- Modify: `apps/api/src/app.module.ts`
- Create: `apps/api/test/auth.e2e-spec.ts`

- [ ] **Step 1: Add auth dependencies**

Modify `apps/api/package.json` dependencies to include:

```json
"argon2": "^0.41.1",
"class-transformer": "^0.5.1",
"class-validator": "^0.14.1"
```

- [ ] **Step 2: Implement hashing and token helpers**

Create `apps/api/src/auth/password.service.ts`:

```ts
import { Injectable } from "@nestjs/common";
import argon2 from "argon2";

@Injectable()
export class PasswordService {
  hash(password: string) {
    return argon2.hash(password);
  }

  verify(hash: string, password: string) {
    return argon2.verify(hash, password);
  }
}
```

Create `apps/api/src/auth/token.service.ts`:

```ts
import { Injectable } from "@nestjs/common";
import { createHash, randomBytes } from "node:crypto";

@Injectable()
export class TokenService {
  createOpaqueToken() {
    return randomBytes(32).toString("base64url");
  }

  hashToken(token: string) {
    return createHash("sha256").update(token).digest("hex");
  }
}
```

- [ ] **Step 3: Implement auth service**

Create `apps/api/src/auth/auth.service.ts` with methods:

```ts
import { Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
import { addDays } from "date-fns";
import { PrismaService } from "../prisma/prisma.service";
import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwords: PasswordService,
    private readonly tokens: TokenService
  ) {}

  async signUp(input: SignUpInput) {
    const email = input.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException("E-mail already registered");

    const passwordHash = await this.passwords.hash(input.password);
    const sessionToken = this.tokens.createOpaqueToken();
    const tokenHash = this.tokens.hashToken(sessionToken);

    const user = await this.prisma.user.create({
      data: {
        name: input.name.trim(),
        email,
        identities: {
          create: {
            provider: "native",
            providerEmail: email,
            passwordHash
          }
        },
        sessions: {
          create: {
            tokenHash,
            expiresAt: addDays(new Date(), 30)
          }
        },
        auditEvents: {
          create: { eventType: "account_created" }
        }
      }
    });

    return { user, sessionToken };
  }

  async login(input: LoginInput) {
    const email = input.email.trim().toLowerCase();
    const identity = await this.prisma.authIdentity.findUnique({
      where: { provider_providerEmail: { provider: "native", providerEmail: email } },
      include: { user: true }
    });

    if (!identity?.passwordHash) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const valid = await this.passwords.verify(identity.passwordHash, input.password);
    if (!valid) {
      await this.prisma.auditEvent.create({
        data: { userId: identity.userId, eventType: "login_failed" }
      });
      throw new UnauthorizedException("Invalid credentials");
    }

    const sessionToken = this.tokens.createOpaqueToken();
    await this.prisma.session.create({
      data: {
        userId: identity.userId,
        tokenHash: this.tokens.hashToken(sessionToken),
        expiresAt: addDays(new Date(), 30)
      }
    });
    await this.prisma.auditEvent.create({
      data: { userId: identity.userId, eventType: "login_succeeded" }
    });

    return { user: identity.user, sessionToken };
  }

  async findUserBySession(token: string) {
    const tokenHash = this.tokens.hashToken(token);
    const session = await this.prisma.session.findUnique({
      where: { tokenHash },
      include: { user: true }
    });
    if (!session || session.revokedAt || session.expiresAt < new Date()) return null;
    return session.user;
  }

  async logout(token: string) {
    await this.prisma.session.updateMany({
      where: { tokenHash: this.tokens.hashToken(token), revokedAt: null },
      data: { revokedAt: new Date() }
    });
  }
}
```

Add `date-fns` to dependencies:

```json
"date-fns": "^4.1.0"
```

- [ ] **Step 4: Implement controller, guard, and `/me`**

Create `apps/api/src/auth/auth.controller.ts`, `session.guard.ts`, `current-user.decorator.ts`, `auth.module.ts`, `apps/api/src/me/me.controller.ts`, and `apps/api/src/me/me.module.ts` so that:

- `POST /auth/signup` accepts `{ name, email, password }`.
- `POST /auth/login` accepts `{ email, password }`.
- `POST /auth/logout` revokes the session.
- Session token is set in an HTTP-only cookie named from `SESSION_COOKIE_NAME`.
- `GET /me` returns `{ user: { id, name, email } }` for authenticated users.

Use this cookie helper in `auth.controller.ts`:

```ts
const cookieName = process.env.SESSION_COOKIE_NAME ?? "zbuy_session";
const secure = process.env.NODE_ENV === "production";
res.cookie(cookieName, sessionToken, {
  httpOnly: true,
  sameSite: "lax",
  secure,
  path: "/"
});
```

- [ ] **Step 5: Write native auth e2e tests**

Create `apps/api/test/auth.e2e-spec.ts` that:

- signs up a user;
- verifies `/me` works with returned cookie;
- logs out;
- verifies `/me` returns unauthorized after logout;
- logs in again with same credentials;
- verifies `/me` works again.

Use a test database URL and clean tables before each test.

- [ ] **Step 6: Verify native auth**

Run:

```powershell
pnpm --filter @zbuy/api typecheck
pnpm --filter @zbuy/api test:e2e
```

Expected: both commands exit with code `0`.

- [ ] **Step 7: Commit**

Run:

```powershell
git add apps/api package.json pnpm-lock.yaml
git commit -m "feat: implement native authentication API"
```

Expected: commit succeeds.

---

### Task 5: Password Reset And OAuth Test Mode

**Files:**
- Modify: `apps/api/src/auth/auth.service.ts`
- Modify: `apps/api/src/auth/auth.controller.ts`
- Create: `apps/api/src/auth/oauth.service.ts`
- Create: `apps/api/test/password-reset.e2e-spec.ts`
- Create: `apps/api/test/oauth-test-mode.e2e-spec.ts`

- [ ] **Step 1: Implement password reset**

Add service methods:

- `requestPasswordReset(email: string)`
- `confirmPasswordReset(token: string, newPassword: string)`

Rules:

- Always return success for reset request to avoid account enumeration.
- Store only token hash.
- Expire token after 30 minutes.
- Consume token on success.
- Revoke existing sessions on password reset completion.
- In local/dev mode, return the raw token in the response under `devResetToken` for testing.

- [ ] **Step 2: Add password reset endpoints**

Add:

- `POST /auth/password-reset/request`
- `POST /auth/password-reset/confirm`

Request bodies:

```json
{ "email": "user@example.com" }
```

and:

```json
{ "token": "raw-token", "password": "new-password" }
```

- [ ] **Step 3: Implement OAuth local test mode**

Create `apps/api/src/auth/oauth.service.ts` with a method that accepts provider `google` or `microsoft` and a test profile in local/test mode:

```ts
export interface OAuthTestProfile {
  provider: "google" | "microsoft";
  subject: string;
  email: string;
  name: string;
}
```

Expose local-only endpoints:

- `POST /auth/google/test-callback`
- `POST /auth/microsoft/test-callback`

These must reject requests when `NODE_ENV=production`.

- [ ] **Step 4: Write tests**

Create E2E tests for:

- password reset request returns success and `devResetToken` in test/local mode;
- confirm reset changes password;
- old password no longer works;
- new password works;
- existing sessions are revoked;
- Google test callback creates or links a user;
- Microsoft test callback creates or links a user.

- [ ] **Step 5: Verify**

Run:

```powershell
pnpm --filter @zbuy/api typecheck
pnpm --filter @zbuy/api test:e2e
```

Expected: both commands exit with code `0`.

- [ ] **Step 6: Commit**

Run:

```powershell
git add apps/api package.json pnpm-lock.yaml
git commit -m "feat: add password reset and OAuth test mode"
```

Expected: commit succeeds.

---

### Task 6: OpenTelemetry, Structured Logs, And SigNoz

**Files:**
- Create: `apps/api/src/observability/tracing.ts`
- Create: `apps/api/src/observability/logger.service.ts`
- Modify: `apps/api/src/main.ts`
- Modify: `apps/api/src/request-context/request-context.middleware.ts`
- Modify: `apps/api/package.json`
- Create: `docker-compose.yml`
- Create: `docs/development/observability.md`

- [ ] **Step 1: Add observability dependencies**

Add to `apps/api/package.json` dependencies:

```json
"@opentelemetry/api": "^1.9.0",
"@opentelemetry/auto-instrumentations-node": "^0.56.1",
"@opentelemetry/exporter-trace-otlp-http": "^0.57.1",
"@opentelemetry/resources": "^1.30.1",
"@opentelemetry/sdk-node": "^0.57.1",
"@opentelemetry/semantic-conventions": "^1.28.0",
"pino": "^9.5.0"
```

- [ ] **Step 2: Create tracing bootstrap**

Create `apps/api/src/observability/tracing.ts`:

```ts
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { Resource } from "@opentelemetry/resources";
import { SEMRESATTRS_SERVICE_NAME } from "@opentelemetry/semantic-conventions";

export function startTracing() {
  const endpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
  const serviceName = process.env.OTEL_SERVICE_NAME ?? "zbuy-api";

  const sdk = new NodeSDK({
    resource: new Resource({
      [SEMRESATTRS_SERVICE_NAME]: serviceName,
      "deployment.environment": process.env.OTEL_ENVIRONMENT ?? "local"
    }),
    traceExporter: endpoint ? new OTLPTraceExporter({ url: `${endpoint}/v1/traces` }) : undefined,
    instrumentations: [getNodeAutoInstrumentations()]
  });

  sdk.start();
  return sdk;
}
```

Modify `apps/api/src/main.ts` so tracing starts before Nest bootstraps:

```ts
import { startTracing } from "./observability/tracing";

startTracing();
```

- [ ] **Step 3: Add structured logger**

Create a logger service that emits JSON logs with request id, trace id, and span id. Use `@opentelemetry/api` to read current span context.

- [ ] **Step 4: Update request middleware**

Update `RequestContextMiddleware` to:

- preserve/generate `x-request-id`;
- set response header;
- log method/path/status/duration on response finish.

- [ ] **Step 5: Add Docker Compose**

Create `docker-compose.yml` with services:

- `postgres` on port `5432`;
- `api` on port `3001`;
- `web` on port `3000`;
- SigNoz local stack or documented SigNoz container composition.

If SigNoz requires multiple services, include only the minimum local APM stack needed for traces/metrics/logs and document ports.

- [ ] **Step 6: Verify tracing and logs**

Run:

```powershell
pnpm --filter @zbuy/api typecheck
pnpm --filter @zbuy/api test
docker compose config
```

Expected: all commands exit with code `0`.

- [ ] **Step 7: Commit**

Run:

```powershell
git add apps/api docker-compose.yml docs/development/observability.md package.json pnpm-lock.yaml
git commit -m "feat: add OpenTelemetry and SigNoz observability"
```

Expected: commit succeeds.

---

### Task 7: Web App Auth Screens

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/next.config.mjs`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/src/app/page.tsx`
- Create: `apps/web/src/app/signup/page.tsx`
- Create: `apps/web/src/app/reset-password/page.tsx`
- Create: `apps/web/src/app/account/page.tsx`
- Create: `apps/web/src/lib/api.ts`
- Create: `apps/web/src/components/AuthForm.tsx`
- Create: `apps/web/src/components/AuthLayout.tsx`
- Create: `apps/web/src/app/globals.css`
- Create: `apps/web/src/app/layout.tsx`
- Create: `apps/web/src/app/page.test.tsx`

- [ ] **Step 1: Create Next.js app package**

Create a minimal Next.js app with scripts:

```json
{
  "name": "@zbuy/web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "lint": "next lint",
    "test": "vitest run",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "@zbuy/shared": "workspace:*",
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.2",
    "@types/react-dom": "^19.0.2",
    "@vitejs/plugin-react": "^4.3.4",
    "jsdom": "^25.0.1",
    "typescript": "^5.7.2",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 2: Implement API client**

Create `apps/web/src/lib/api.ts`:

```ts
const apiBaseUrl = process.env.WEB_PUBLIC_API_URL ?? "http://localhost:3001";

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {})
    }
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(body.message ?? "Request failed");
  }
  return response.json() as Promise<T>;
}
```

- [ ] **Step 3: Implement auth screens**

Create screens for:

- login at `/`;
- sign up at `/signup`;
- password reset request at `/reset-password`;
- authenticated account at `/account`.

Each form should show loading, success, and error states. Social buttons should link to API OAuth start endpoints.

- [ ] **Step 4: Add frontend tests**

Write tests that verify:

- login page renders e-mail/password, Google, and Microsoft options;
- sign up page renders name/e-mail/password fields;
- reset password page renders e-mail request form;
- account page handles unavailable API error.

- [ ] **Step 5: Verify**

Run:

```powershell
pnpm --filter @zbuy/web typecheck
pnpm --filter @zbuy/web test
```

Expected: both commands exit with code `0`.

- [ ] **Step 6: Commit**

Run:

```powershell
git add apps/web package.json pnpm-lock.yaml
git commit -m "feat: add Next.js authentication screens"
```

Expected: commit succeeds.

---

### Task 8: End-To-End Authentication Flow

**Files:**
- Create: `tests/e2e/package.json`
- Create: `tests/e2e/playwright.config.ts`
- Create: `tests/e2e/auth.spec.ts`
- Modify: `package.json`
- Modify: `docker-compose.yml`

- [ ] **Step 1: Create E2E package**

Create `tests/e2e/package.json`:

```json
{
  "name": "@zbuy/e2e",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "test": "playwright test"
  },
  "devDependencies": {
    "@playwright/test": "^1.49.1",
    "typescript": "^5.7.2"
  }
}
```

- [ ] **Step 2: Add Playwright config**

Create `tests/e2e/playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  timeout: 30_000,
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
```

- [ ] **Step 3: Add auth E2E test**

Create `tests/e2e/auth.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("native account sign up, login, account, logout", async ({ page }) => {
  const email = `e2e-${Date.now()}@example.com`;
  const password = "CorrectHorseBatteryStaple1!";

  await page.goto("/signup");
  await page.getByLabel("Name").fill("E2E User");
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: /create account/i }).click();
  await expect(page.getByText(email)).toBeVisible();

  await page.getByRole("button", { name: /log out/i }).click();
  await page.goto("/");
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page.getByText(email)).toBeVisible();
});
```

- [ ] **Step 4: Verify E2E**

Run:

```powershell
pnpm install
pnpm e2e
```

Expected: Playwright test passes against the local running stack.

- [ ] **Step 5: Commit**

Run:

```powershell
git add tests/e2e package.json pnpm-lock.yaml docker-compose.yml
git commit -m "test: add authentication e2e flow"
```

Expected: commit succeeds.

---

### Task 9: Setup And Operations Documentation

**Files:**
- Create: `docs/development/phase-2-setup.md`
- Modify: `docs/development/observability.md`
- Modify: `README.md`

- [ ] **Step 1: Document setup**

Create `docs/development/phase-2-setup.md` with:

```markdown
# ZBuy Phase 2 Local Setup

## Requirements

- Node.js 22+
- pnpm 9+
- Docker Desktop

## Environment

Copy `.env.example` to `.env` and replace local secrets with development-only values.

## Start Services

```powershell
docker compose up -d postgres
pnpm install
pnpm db:generate
pnpm db:migrate
pnpm dev
```

## Verify API

```powershell
Invoke-WebRequest -UseBasicParsing http://localhost:3001/health/live
Invoke-WebRequest -UseBasicParsing http://localhost:3001/health/ready
```

## Run Tests

```powershell
pnpm typecheck
pnpm test
pnpm e2e
```

## Observability

Start the observability stack with Docker Compose and open SigNoz on the documented local port. Generate API traffic by visiting the web app and calling health/auth endpoints.
```

- [ ] **Step 2: Document observability verification**

Ensure `docs/development/observability.md` includes:

- how OpenTelemetry is configured;
- where SigNoz runs locally;
- how to find traces for `/health/live`, `/health/ready`, and `/auth/login`;
- how request id correlates with trace id in logs;
- how to switch OTLP endpoint.

- [ ] **Step 3: Add root README**

Create or update `README.md` with a short project overview and links to:

- `docs/product/README.md`
- `docs/development/phase-2-setup.md`
- `docs/development/observability.md`

- [ ] **Step 4: Verify documentation**

Run:

```powershell
Select-String -Path README.md,docs\development\*.md -Pattern "SigNoz|OpenTelemetry|pnpm|docker compose|health"
```

Expected: matches in setup and observability docs.

- [ ] **Step 5: Commit**

Run:

```powershell
git add README.md docs/development
git commit -m "docs: add phase 2 setup and observability guide"
```

Expected: commit succeeds.

---

## Self-Review Checklist

- Spec coverage:
  - Monorepo, web, API, shared package: Tasks 1, 2, 7.
  - PostgreSQL and migrations: Task 3.
  - Native auth: Task 4.
  - Password reset and OAuth local test mode: Task 5.
  - `/me` and health endpoints: Tasks 2, 4.
  - OpenTelemetry, structured logs, SigNoz: Task 6.
  - Backend/frontend/E2E tests: Tasks 2, 4, 5, 7, 8.
  - Documentation: Task 9.
- Explicitly out of scope:
  - No product catalog.
  - No shopping lists.
  - No shopping sessions.
  - No purchase history.
  - No geolocation/supermarket/layout modules.
- Placeholder scan:
  - Search this plan for `T[B]D`, `TO[D]O`, `implement late[r]`, `fill in detail[s]`, and `Similar to Tas[k]`.
- Type consistency:
  - `CurrentUserDto`, `AuthenticatedUserResponse`, `AuthProvider`, and endpoint names must match across `packages/shared`, API, web, and tests.
