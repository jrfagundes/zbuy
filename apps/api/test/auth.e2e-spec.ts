import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import cookieParser from "cookie-parser";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import { createPrismaFake } from "./prisma-fake";

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
