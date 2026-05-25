import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import cookieParser from "cookie-parser";
import request from "supertest";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import { createPrismaFake } from "./prisma-fake";

type UnitRecord = {
  id: string;
  name: string;
  abbreviation: string;
  type: "weight" | "volume" | "count" | "package" | "custom";
  allowsDecimals: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

type ProductRecord = {
  id: string;
  ownerUserId: string;
  name: string;
  categoryLabel: string;
  brand: string | null;
  defaultUnitId: string;
  defaultUnit: UnitRecord;
  estimatedPrice: string | null;
  notes: string | null;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

function addProductFake(prisma: ReturnType<typeof createPrismaFake>) {
  const now = new Date("2026-05-21T00:00:00.000Z");
  const kilogramUnitId = "11111111-1111-4111-8111-111111111111";
  const packageUnitId = "22222222-2222-4222-8222-222222222222";
  const units = new Map<string, UnitRecord>([
    [
      kilogramUnitId,
      {
        id: kilogramUnitId,
        name: "Kilogram",
        abbreviation: "kg",
        type: "weight",
        allowsDecimals: true,
        active: true,
        sortOrder: 10,
        createdAt: now,
        updatedAt: now
      }
    ],
    [
      packageUnitId,
      {
        id: packageUnitId,
        name: "Package",
        abbreviation: "package",
        type: "package",
        allowsDecimals: false,
        active: true,
        sortOrder: 80,
        createdAt: now,
        updatedAt: now
      }
    ]
  ]);
  const products = new Map<string, ProductRecord>();
  let sequence = 0;

  function matchesQuery(product: ProductRecord, query: string | undefined) {
    if (!query) return true;
    const normalized = query.toLowerCase();
    return [product.name, product.categoryLabel, product.brand ?? ""].some((value) =>
      value.toLowerCase().includes(normalized)
    );
  }

  Object.assign(prisma, {
    unit: {
      findFirst: jest.fn(({ where }: { where: { id: string; active?: boolean } }) => {
        const unit = units.get(where.id);
        if (!unit) return null;
        if (where.active !== undefined && unit.active !== where.active) return null;
        return unit;
      })
    },
    product: {
      create: jest.fn(({ data }) => {
        const unit = units.get(data.defaultUnitId);
        if (!unit) throw new Error("Unit not found");
        const product: ProductRecord = {
          id: `product-${++sequence}`,
          ownerUserId: data.ownerUserId,
          name: data.name,
          categoryLabel: data.categoryLabel,
          brand: data.brand ?? null,
          defaultUnitId: data.defaultUnitId,
          defaultUnit: unit,
          estimatedPrice: data.estimatedPrice ?? null,
          notes: data.notes ?? null,
          archivedAt: null,
          createdAt: now,
          updatedAt: now
        };
        products.set(product.id, product);
        return product;
      }),
      findMany: jest.fn(({ where }: { where: { ownerUserId: string; archivedAt?: null; OR?: Array<unknown> } }) =>
        Array.from(products.values()).filter((product) => {
          if (product.ownerUserId !== where.ownerUserId) return false;
          if (where.archivedAt === null && product.archivedAt !== null) return false;
          return matchesQuery(product, where.OR ? "rice" : undefined);
        })
      ),
      findFirst: jest.fn(({ where }: { where: { id: string; ownerUserId: string } }) => {
        const product = products.get(where.id);
        if (!product || product.ownerUserId !== where.ownerUserId) return null;
        return product;
      }),
      update: jest.fn(({ where, data }) => {
        const product = products.get(where.id);
        if (!product) throw new Error("Product not found");
        const unit = data.defaultUnitId ? units.get(data.defaultUnitId) : product.defaultUnit;
        if (!unit) throw new Error("Unit not found");
        Object.assign(product, {
          name: data.name ?? product.name,
          categoryLabel: data.categoryLabel ?? product.categoryLabel,
          brand: data.brand ?? product.brand,
          defaultUnitId: data.defaultUnitId ?? product.defaultUnitId,
          defaultUnit: unit,
          estimatedPrice: data.estimatedPrice ?? product.estimatedPrice,
          notes: data.notes ?? product.notes,
          archivedAt: data.archivedAt ?? product.archivedAt,
          updatedAt: now
        });
        return product;
      })
    }
  });
}

describe("Products API", () => {
  let app: INestApplication;
  const prisma = createPrismaFake();
  const kilogramUnitId = "11111111-1111-4111-8111-111111111111";
  const packageUnitId = "22222222-2222-4222-8222-222222222222";

  beforeAll(async () => {
    addProductFake(prisma);

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

  it("creates, searches, edits, archives, and isolates products by owner", async () => {
    const owner = await request(app.getHttpServer())
      .post("/auth/signup")
      .send({ name: "Owner", email: "products-owner@example.com", password: "CorrectHorseBatteryStaple1!" })
      .expect(201);
    const other = await request(app.getHttpServer())
      .post("/auth/signup")
      .send({ name: "Other", email: "products-other@example.com", password: "CorrectHorseBatteryStaple1!" })
      .expect(201);

    const ownerCookie = owner.headers["set-cookie"];
    const otherCookie = other.headers["set-cookie"];

    const created = await request(app.getHttpServer())
      .post("/products")
      .set("Cookie", ownerCookie)
      .send({
        name: "Rice",
        categoryLabel: "Pantry",
        brand: "ZBuy Farms",
        defaultUnitId: kilogramUnitId,
        estimatedPrice: "12.50",
        notes: "Prefer long grain"
      })
      .expect(201);

    expect(created.body).toMatchObject({
      id: expect.any(String),
      name: "Rice",
      categoryLabel: "Pantry",
      brand: "ZBuy Farms",
      defaultUnitId: kilogramUnitId,
      defaultUnit: { abbreviation: "kg" },
      estimatedPrice: "12.50",
      notes: "Prefer long grain",
      archivedAt: null
    });

    await request(app.getHttpServer())
      .get("/products?query=rice")
      .set("Cookie", ownerCookie)
      .expect(200)
      .expect(({ body }) => {
        expect(body.products).toHaveLength(1);
        expect(body.products[0].id).toBe(created.body.id);
      });

    await request(app.getHttpServer()).get(`/products/${created.body.id}`).set("Cookie", otherCookie).expect(404);

    const updated = await request(app.getHttpServer())
      .patch(`/products/${created.body.id}`)
      .set("Cookie", ownerCookie)
      .send({
        name: "Rice 5kg",
        categoryLabel: "Pantry",
        brand: "ZBuy Farms",
        defaultUnitId: packageUnitId,
        estimatedPrice: "14.25",
        notes: "Promo package"
      })
      .expect(200);

    expect(updated.body).toMatchObject({
      id: created.body.id,
      name: "Rice 5kg",
      defaultUnitId: packageUnitId,
      estimatedPrice: "14.25",
      notes: "Promo package"
    });

    await request(app.getHttpServer())
      .patch(`/products/${created.body.id}`)
      .set("Cookie", otherCookie)
      .send({
        name: "Other Rice",
        categoryLabel: "Pantry",
        defaultUnitId: kilogramUnitId
      })
      .expect(404);

    await request(app.getHttpServer()).post(`/products/${created.body.id}/archive`).set("Cookie", otherCookie).expect(404);

    const archived = await request(app.getHttpServer())
      .post(`/products/${created.body.id}/archive`)
      .set("Cookie", ownerCookie)
      .expect(200);
    expect(archived.body.archivedAt).toEqual(expect.any(String));

    await request(app.getHttpServer())
      .get("/products")
      .set("Cookie", ownerCookie)
      .expect(200)
      .expect({ products: [] });

    await request(app.getHttpServer())
      .get("/products?includeArchived=true")
      .set("Cookie", ownerCookie)
      .expect(200)
      .expect(({ body }) => {
        expect(body.products).toHaveLength(1);
        expect(body.products[0].archivedAt).toEqual(expect.any(String));
      });
  });
});
