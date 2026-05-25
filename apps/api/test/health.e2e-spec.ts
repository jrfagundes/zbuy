import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";

describe("Health endpoints", () => {
  let app: INestApplication;
  const prisma = { isReady: jest.fn() };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    prisma.isReady.mockReset();
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns liveness", async () => {
    await request(app.getHttpServer()).get("/health/live").expect(200).expect({ status: "ok" });
  });

  it("returns readiness", async () => {
    prisma.isReady.mockResolvedValue(true);

    await request(app.getHttpServer())
      .get("/health/ready")
      .expect(200)
      .expect({ status: "ok", checks: { api: "ok", postgres: "ok" } });
  });
});
