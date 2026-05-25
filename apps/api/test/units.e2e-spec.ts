import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import cookieParser from "cookie-parser";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import { createPrismaFake } from "./prisma-fake";

describe("Units API", () => {
  let app: INestApplication;
  const prisma = createPrismaFake();

  beforeAll(async () => {
    Object.assign(prisma, {
      unit: {
        findMany: jest.fn().mockResolvedValue([
          {
            id: "unit-kg",
            name: "Kilogram",
            abbreviation: "kg",
            type: "weight",
            allowsDecimals: true,
            active: true,
            sortOrder: 10,
            createdAt: new Date("2026-05-21T00:00:00.000Z"),
            updatedAt: new Date("2026-05-21T00:00:00.000Z")
          }
        ])
      }
    });

    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleRef.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  it("returns active flexible units for an authenticated user", async () => {
    const signUpResponse = await request(app.getHttpServer())
      .post("/auth/signup")
      .send({
        name: "Units User",
        email: "units@example.com",
        password: "CorrectHorseBatteryStaple1!"
      })
      .expect(201);

    await request(app.getHttpServer())
      .get("/units")
      .set("Cookie", signUpResponse.headers["set-cookie"])
      .expect(200)
      .expect({
        units: [
          {
            id: "unit-kg",
            name: "Kilogram",
            abbreviation: "kg",
            type: "weight",
            allowsDecimals: true,
            sortOrder: 10
          }
        ]
      });
  });
});
