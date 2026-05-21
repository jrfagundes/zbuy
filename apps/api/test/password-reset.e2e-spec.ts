import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import cookieParser from "cookie-parser";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import { createPrismaFake } from "./prisma-fake";

describe("Password reset", () => {
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

  it("resets the password, revokes existing sessions, and allows the new password", async () => {
    const email = "reset@example.com";
    const oldPassword = "OldCorrectHorseBattery1!";
    const newPassword = "NewCorrectHorseBattery1!";

    const signUp = await request(app.getHttpServer())
      .post("/auth/signup")
      .send({ name: "Reset User", email, password: oldPassword })
      .expect(201);
    const oldCookie = signUp.headers["set-cookie"];

    const resetRequest = await request(app.getHttpServer())
      .post("/auth/password-reset/request")
      .send({ email })
      .expect(201);
    expect(resetRequest.body).toEqual({
      status: "ok",
      devResetToken: expect.any(String)
    });

    await request(app.getHttpServer())
      .post("/auth/password-reset/confirm")
      .send({ token: resetRequest.body.devResetToken, password: newPassword })
      .expect(200)
      .expect({ status: "ok" });

    await request(app.getHttpServer()).get("/me").set("Cookie", oldCookie).expect(401);

    await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email, password: oldPassword })
      .expect(401);

    const login = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ email, password: newPassword })
      .expect(201)
      .expect(signUp.body);

    await request(app.getHttpServer()).get("/me").set("Cookie", login.headers["set-cookie"]).expect(200).expect(signUp.body);

    await request(app.getHttpServer())
      .post("/auth/password-reset/request")
      .send({ email: "missing@example.com" })
      .expect(201)
      .expect({ status: "ok" });

    expect(prisma.__auditEvents).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ eventType: "password_reset_requested" }),
        expect.objectContaining({ eventType: "password_reset_completed" })
      ])
    );
  });
});
