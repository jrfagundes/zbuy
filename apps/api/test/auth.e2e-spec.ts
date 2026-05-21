import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import cookieParser from "cookie-parser";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";

type UserRecord = {
  id: string;
  name: string;
  email: string;
};

type AuthIdentityRecord = {
  id: string;
  userId: string;
  provider: "native";
  providerEmail: string;
  passwordHash: string | null;
  user?: UserRecord;
};

type SessionRecord = {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  user?: UserRecord;
};

function createPrismaFake() {
  const users = new Map<string, UserRecord>();
  const usersByEmail = new Map<string, UserRecord>();
  const identitiesByProviderEmail = new Map<string, AuthIdentityRecord>();
  const sessionsByTokenHash = new Map<string, SessionRecord>();
  const auditEvents: Array<{ userId?: string | null; eventType: string }> = [];
  let sequence = 0;

  return {
    user: {
      findUnique: jest.fn(({ where }: { where: { email: string } }) => usersByEmail.get(where.email) ?? null),
      create: jest.fn(({ data }) => {
        const user = {
          id: `user-${++sequence}`,
          name: data.name,
          email: data.email
        };
        users.set(user.id, user);
        usersByEmail.set(user.email, user);

        const identity = {
          id: `identity-${++sequence}`,
          userId: user.id,
          provider: data.identities.create.provider,
          providerEmail: data.identities.create.providerEmail,
          passwordHash: data.identities.create.passwordHash
        };
        identitiesByProviderEmail.set(`${identity.provider}:${identity.providerEmail}`, identity);

        const session = {
          id: `session-${++sequence}`,
          userId: user.id,
          tokenHash: data.sessions.create.tokenHash,
          expiresAt: data.sessions.create.expiresAt,
          revokedAt: null
        };
        sessionsByTokenHash.set(session.tokenHash, session);
        auditEvents.push({ userId: user.id, eventType: data.auditEvents.create.eventType });

        return user;
      })
    },
    authIdentity: {
      findUnique: jest.fn(({ where, include }) => {
        const key = `${where.provider_providerEmail.provider}:${where.provider_providerEmail.providerEmail}`;
        const identity = identitiesByProviderEmail.get(key);
        if (!identity) return null;
        return include?.user ? { ...identity, user: users.get(identity.userId) } : identity;
      })
    },
    session: {
      create: jest.fn(({ data }) => {
        const session = {
          id: `session-${++sequence}`,
          userId: data.userId,
          tokenHash: data.tokenHash,
          expiresAt: data.expiresAt,
          revokedAt: null
        };
        sessionsByTokenHash.set(session.tokenHash, session);
        return session;
      }),
      findUnique: jest.fn(({ where, include }) => {
        const session = sessionsByTokenHash.get(where.tokenHash);
        if (!session) return null;
        return include?.user ? { ...session, user: users.get(session.userId) } : session;
      }),
      updateMany: jest.fn(({ where, data }) => {
        const session = sessionsByTokenHash.get(where.tokenHash);
        if (!session || (where.revokedAt === null && session.revokedAt !== null)) {
          return { count: 0 };
        }
        session.revokedAt = data.revokedAt;
        return { count: 1 };
      })
    },
    auditEvent: {
      create: jest.fn(({ data }) => {
        auditEvents.push(data);
        return { id: `audit-${++sequence}`, ...data };
      })
    },
    isReady: jest.fn().mockResolvedValue(true),
    __auditEvents: auditEvents
  };
}

describe("Native authentication", () => {
  let app: INestApplication;
  const prisma = createPrismaFake();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleRef.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("signs up, reads /me, logs out, rejects old session, logs in, and reads /me again", async () => {
    const email = "native@example.com";
    const password = "CorrectHorseBatteryStaple1!";

    const signUpResponse = await request(app.getHttpServer())
      .post("/auth/signup")
      .send({ name: "Native User", email, password })
      .expect(201);

    expect(signUpResponse.body).toEqual({
      user: { id: expect.any(String), name: "Native User", email }
    });
    const signUpCookie = signUpResponse.headers["set-cookie"];
    expect(signUpCookie).toEqual([expect.stringContaining("zbuy_session=")]);
    expect(signUpCookie[0]).toContain("HttpOnly");
    expect(signUpCookie[0]).toContain("SameSite=Lax");

    await request(app.getHttpServer())
      .get("/me")
      .set("Cookie", signUpCookie)
      .expect(200)
      .expect(signUpResponse.body);

    const logoutResponse = await request(app.getHttpServer())
      .post("/auth/logout")
      .set("Cookie", signUpCookie)
      .expect(204);
    expect(logoutResponse.headers["set-cookie"][0]).toContain("zbuy_session=;");

    await request(app.getHttpServer()).get("/me").set("Cookie", signUpCookie).expect(401);

    await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email, password: "wrong-password" })
      .expect(401);

    const loginResponse = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email: "NATIVE@example.com", password })
      .expect(201)
      .expect(signUpResponse.body);

    const loginCookie = loginResponse.headers["set-cookie"];
    await request(app.getHttpServer())
      .get("/me")
      .set("Cookie", loginCookie)
      .expect(200)
      .expect(signUpResponse.body);

    expect(prisma.__auditEvents).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ eventType: "account_created" }),
        expect.objectContaining({ eventType: "logout" }),
        expect.objectContaining({ eventType: "login_failed" }),
        expect.objectContaining({ eventType: "login_succeeded" })
      ])
    );
  });
});
