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
