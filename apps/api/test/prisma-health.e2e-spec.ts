import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import request from "supertest";
import { HealthModule } from "../src/health/health.module";
import { PrismaService } from "../src/prisma/prisma.service";

describe("Readiness with PostgreSQL check", () => {
  let app: INestApplication;
  const prisma = { isReady: jest.fn() };

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

  beforeEach(() => {
    prisma.isReady.mockReset();
  });

  afterAll(async () => {
    await app.close();
  });

  it("reports postgres readiness", async () => {
    prisma.isReady.mockResolvedValue(true);

    await request(app.getHttpServer())
      .get("/health/ready")
      .expect(200)
      .expect({ status: "ok", checks: { api: "ok", postgres: "ok" } });
  });

  it("reports postgres readiness failure", async () => {
    prisma.isReady.mockRejectedValue(new Error("database unavailable"));

    await request(app.getHttpServer())
      .get("/health/ready")
      .expect(503)
      .expect({
        status: "error",
        checks: { api: "ok", postgres: "error" }
      });
  });
});
