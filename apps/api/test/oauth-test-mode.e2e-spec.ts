import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import cookieParser from "cookie-parser";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import { createPrismaFake } from "./prisma-fake";

describe("OAuth local test mode", () => {
  let app: INestApplication;
  const prisma = createPrismaFake();

  beforeAll(async () => {
    process.env.NODE_ENV = "test";
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

  it("creates or reuses Google and Microsoft users through local-only callbacks", async () => {
    const google = await request(app.getHttpServer())
      .post("/auth/google/test-callback")
      .send({ subject: "google-subject", email: "google@example.com", name: "Google User" })
      .expect(201);
    expect(google.body).toEqual({
      user: { id: expect.any(String), name: "Google User", email: "google@example.com" }
    });
    await request(app.getHttpServer()).get("/me").set("Cookie", google.headers["set-cookie"]).expect(200).expect(google.body);

    const googleAgain = await request(app.getHttpServer())
      .post("/auth/google/test-callback")
      .send({ subject: "google-subject", email: "google-renamed@example.com", name: "Google Renamed" })
      .expect(201);
    expect(googleAgain.body.user.id).toBe(google.body.user.id);

    const microsoft = await request(app.getHttpServer())
      .post("/auth/microsoft/test-callback")
      .send({ subject: "microsoft-subject", email: "microsoft@example.com", name: "Microsoft User" })
      .expect(201);
    expect(microsoft.body).toEqual({
      user: { id: expect.any(String), name: "Microsoft User", email: "microsoft@example.com" }
    });

    expect(prisma.__auditEvents).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ eventType: "oauth_login_succeeded" })
      ])
    );
  });

  it("rejects local OAuth callbacks in production", async () => {
    const previous = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    try {
      await request(app.getHttpServer())
        .post("/auth/google/test-callback")
        .send({ subject: "prod-subject", email: "prod@example.com", name: "Prod User" })
        .expect(404);
    } finally {
      process.env.NODE_ENV = previous;
    }
  });
});
