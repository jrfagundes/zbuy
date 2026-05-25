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

type ListRecord = {
  id: string;
  ownerUserId: string;
  name: string;
  description: string | null;
  status: "active" | "archived";
  duplicatedFromListId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type ItemRecord = {
  id: string;
  listId: string;
  productId: string;
  quantity: string;
  unitId: string;
  expectedPrice: string | null;
  priority: "low" | "normal" | "high";
  notes: string | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

function addShoppingListFake(prisma: ReturnType<typeof createPrismaFake>) {
  const now = new Date("2026-05-22T00:00:00.000Z");
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
  const lists = new Map<string, ListRecord>();
  const items = new Map<string, ItemRecord>();
  let sequence = 0;

  function listWithIncludes(list: ListRecord) {
    const listItems = Array.from(items.values())
      .filter((item) => item.listId === list.id)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((item) => ({
        ...item,
        product: products.get(item.productId),
        unit: units.get(item.unitId)
      }));
    return { ...list, items: listItems, _count: { items: listItems.length } };
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
          id: `33333333-3333-4333-8333-${String(++sequence).padStart(12, "0")}`,
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
      findFirst: jest.fn(({ where }: { where: { id: string; ownerUserId?: string; archivedAt?: null } }) => {
        const product = products.get(where.id);
        if (!product) return null;
        if (where.ownerUserId && product.ownerUserId !== where.ownerUserId) return null;
        if (where.archivedAt === null && product.archivedAt !== null) return null;
        return product;
      }),
      findMany: jest.fn(() => Array.from(products.values())),
      update: jest.fn(({ where, data }) => {
        const product = products.get(where.id);
        if (!product) throw new Error("Product not found");
        Object.assign(product, data, { updatedAt: now });
        return product;
      })
    },
    shoppingList: {
      create: jest.fn(({ data }) => {
        const list: ListRecord = {
          id: `44444444-4444-4444-8444-${String(++sequence).padStart(12, "0")}`,
          ownerUserId: data.ownerUserId,
          name: data.name,
          description: data.description ?? null,
          status: data.status ?? "active",
          duplicatedFromListId: data.duplicatedFromListId ?? null,
          createdAt: now,
          updatedAt: now
        };
        lists.set(list.id, list);
        if (data.items?.create) {
          for (const itemData of data.items.create) {
            const item: ItemRecord = {
              id: `55555555-5555-4555-8555-${String(++sequence).padStart(12, "0")}`,
              listId: list.id,
              productId: itemData.productId,
              quantity: itemData.quantity,
              unitId: itemData.unitId,
              expectedPrice: itemData.expectedPrice ?? null,
              priority: itemData.priority ?? "normal",
              notes: itemData.notes ?? null,
              sortOrder: itemData.sortOrder,
              createdAt: now,
              updatedAt: now
            };
            items.set(item.id, item);
          }
        }
        return listWithIncludes(list);
      }),
      findMany: jest.fn(({ where }) =>
        Array.from(lists.values())
          .filter((list) => list.ownerUserId === where.ownerUserId)
          .filter((list) => (where.status ? list.status === where.status : true))
          .map(listWithIncludes)
      ),
      findFirst: jest.fn(({ where }) => {
        const list = lists.get(where.id);
        if (!list || list.ownerUserId !== where.ownerUserId) return null;
        return listWithIncludes(list);
      }),
      update: jest.fn(({ where, data }) => {
        const list = lists.get(where.id);
        if (!list) throw new Error("List not found");
        Object.assign(list, data, { updatedAt: now });
        return listWithIncludes(list);
      }),
      delete: jest.fn(({ where }) => {
        const list = lists.get(where.id);
        if (!list) throw new Error("List not found");
        lists.delete(where.id);
        for (const item of Array.from(items.values())) {
          if (item.listId === where.id) items.delete(item.id);
        }
        return list;
      })
    },
    shoppingListItem: {
      create: jest.fn(({ data }) => {
        const item: ItemRecord = {
          id: `55555555-5555-4555-8555-${String(++sequence).padStart(12, "0")}`,
          listId: data.listId,
          productId: data.productId,
          quantity: data.quantity,
          unitId: data.unitId,
          expectedPrice: data.expectedPrice ?? null,
          priority: data.priority ?? "normal",
          notes: data.notes ?? null,
          sortOrder: data.sortOrder,
          createdAt: now,
          updatedAt: now
        };
        items.set(item.id, item);
        return { ...item, product: products.get(item.productId), unit: units.get(item.unitId) };
      }),
      update: jest.fn(({ where, data }) => {
        const item = items.get(where.id);
        if (!item) throw new Error("Item not found");
        Object.assign(item, data, { updatedAt: now });
        return { ...item, product: products.get(item.productId), unit: units.get(item.unitId) };
      }),
      delete: jest.fn(({ where }) => {
        const item = items.get(where.id);
        if (!item) throw new Error("Item not found");
        items.delete(where.id);
        return item;
      }),
      findFirst: jest.fn(({ where }) => {
        const item = items.get(where.id);
        if (!item || item.listId !== where.listId) return null;
        return { ...item, product: products.get(item.productId), unit: units.get(item.unitId) };
      }),
      findMany: jest.fn(({ where }) =>
        Array.from(items.values())
          .filter((item) => item.listId === where.listId)
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((item) => ({ ...item, product: products.get(item.productId), unit: units.get(item.unitId) }))
      )
    },
    shoppingSession: {
      count: jest.fn().mockResolvedValue(0)
    },
    $transaction: jest.fn(async (operationsOrCallback) => {
      if (typeof operationsOrCallback === "function") return operationsOrCallback(prisma);
      return Promise.all(operationsOrCallback);
    })
  });
}

describe("Shopping Lists API", () => {
  let app: INestApplication;
  const prisma = createPrismaFake();
  const kilogramUnitId = "11111111-1111-4111-8111-111111111111";
  const packageUnitId = "22222222-2222-4222-8222-222222222222";

  beforeAll(async () => {
    addShoppingListFake(prisma);

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

  it("manages reusable lists, items, duplication, archive, delete, and ownership", async () => {
    const owner = await request(app.getHttpServer())
      .post("/auth/signup")
      .send({ name: "List Owner", email: "lists-owner@example.com", password: "CorrectHorseBatteryStaple1!" })
      .expect(201);
    const other = await request(app.getHttpServer())
      .post("/auth/signup")
      .send({ name: "Other User", email: "lists-other@example.com", password: "CorrectHorseBatteryStaple1!" })
      .expect(201);

    const ownerCookie = owner.headers["set-cookie"];
    const otherCookie = other.headers["set-cookie"];

    const rice = await request(app.getHttpServer())
      .post("/products")
      .set("Cookie", ownerCookie)
      .send({ name: "Rice", categoryLabel: "Pantry", defaultUnitId: kilogramUnitId, estimatedPrice: "12.50" })
      .expect(201);
    const beans = await request(app.getHttpServer())
      .post("/products")
      .set("Cookie", ownerCookie)
      .send({ name: "Beans", categoryLabel: "Pantry", defaultUnitId: packageUnitId, estimatedPrice: "8.40" })
      .expect(201);

    const created = await request(app.getHttpServer())
      .post("/shopping-lists")
      .set("Cookie", ownerCookie)
      .send({ name: "Weekly", description: "Main groceries" })
      .expect(201);
    expect(created.body).toMatchObject({
      id: expect.any(String),
      name: "Weekly",
      description: "Main groceries",
      status: "active",
      itemCount: 0,
      items: []
    });

    const updatedList = await request(app.getHttpServer())
      .patch(`/shopping-lists/${created.body.id}`)
      .set("Cookie", ownerCookie)
      .send({ name: "Weekly updated", description: "Updated groceries" })
      .expect(200);
    expect(updatedList.body).toMatchObject({ name: "Weekly updated", description: "Updated groceries" });

    const firstItemList = await request(app.getHttpServer())
      .post(`/shopping-lists/${created.body.id}/items`)
      .set("Cookie", ownerCookie)
      .send({
        productId: rice.body.id,
        quantity: "2.5",
        unitId: kilogramUnitId,
        expectedPrice: "25.00",
        priority: "high",
        notes: "Buy promo"
      })
      .expect(201);
    expect(firstItemList.body.items[0]).toMatchObject({
      productName: "Rice",
      categoryLabel: "Pantry",
      quantity: "2.5",
      expectedPrice: "25.00",
      priority: "high",
      notes: "Buy promo",
      sortOrder: 0
    });
    const firstItemId = firstItemList.body.items[0].id;

    const secondItemList = await request(app.getHttpServer())
      .post(`/shopping-lists/${created.body.id}/items`)
      .set("Cookie", ownerCookie)
      .send({ productId: beans.body.id, quantity: "1", unitId: packageUnitId, priority: "normal" })
      .expect(201);
    const secondItemId = secondItemList.body.items[1].id;

    const editedItemList = await request(app.getHttpServer())
      .patch(`/shopping-lists/${created.body.id}/items/${firstItemId}`)
      .set("Cookie", ownerCookie)
      .send({
        productId: rice.body.id,
        quantity: "3",
        unitId: kilogramUnitId,
        expectedPrice: "30.00",
        priority: "normal",
        notes: "Changed amount"
      })
      .expect(200);
    expect(editedItemList.body.items[0]).toMatchObject({ quantity: "3", notes: "Changed amount" });

    const reordered = await request(app.getHttpServer())
      .patch(`/shopping-lists/${created.body.id}/items/reorder`)
      .set("Cookie", ownerCookie)
      .send({ itemIds: [secondItemId, firstItemId] })
      .expect(200);
    expect(reordered.body.items.map((item: { id: string }) => item.id)).toEqual([secondItemId, firstItemId]);

    await request(app.getHttpServer()).get(`/shopping-lists/${created.body.id}`).set("Cookie", otherCookie).expect(404);

    const duplicated = await request(app.getHttpServer())
      .post(`/shopping-lists/${created.body.id}/duplicate`)
      .set("Cookie", ownerCookie)
      .expect(201);
    expect(duplicated.body).toMatchObject({
      name: "Weekly updated - copia",
      duplicatedFromListId: created.body.id,
      itemCount: 2
    });
    expect(duplicated.body.items[0].id).not.toBe(reordered.body.items[0].id);

    await request(app.getHttpServer())
      .patch(`/shopping-lists/${duplicated.body.id}/items/${duplicated.body.items[0].id}`)
      .set("Cookie", ownerCookie)
      .send({
        productId: beans.body.id,
        quantity: "2",
        unitId: packageUnitId,
        priority: "low",
        notes: "Duplicate only"
      })
      .expect(200);

    await request(app.getHttpServer())
      .get(`/shopping-lists/${created.body.id}`)
      .set("Cookie", ownerCookie)
      .expect(200)
      .expect(({ body }) => {
        expect(body.items[0].quantity).toBe("1");
        expect(body.items[0].notes).toBeNull();
      });

    await request(app.getHttpServer())
      .delete(`/shopping-lists/${created.body.id}/items/${firstItemId}`)
      .set("Cookie", ownerCookie)
      .expect(200)
      .expect(({ body }) => expect(body.itemCount).toBe(1));

    await request(app.getHttpServer()).post(`/shopping-lists/${created.body.id}/archive`).set("Cookie", otherCookie).expect(404);
    const archived = await request(app.getHttpServer())
      .post(`/shopping-lists/${created.body.id}/archive`)
      .set("Cookie", ownerCookie)
      .expect(200);
    expect(archived.body.status).toBe("archived");

    await request(app.getHttpServer())
      .get("/shopping-lists")
      .set("Cookie", ownerCookie)
      .expect(200)
      .expect(({ body }) => expect(body.shoppingLists.some((list: { id: string }) => list.id === created.body.id)).toBe(false));

    await request(app.getHttpServer())
      .get("/shopping-lists?includeArchived=true")
      .set("Cookie", ownerCookie)
      .expect(200)
      .expect(({ body }) => expect(body.shoppingLists.some((list: { id: string }) => list.id === created.body.id)).toBe(true));

    jest
      .mocked((prisma as unknown as { shoppingSession: { count: jest.Mock } }).shoppingSession.count)
      .mockResolvedValueOnce(1);
    await request(app.getHttpServer()).delete(`/shopping-lists/${created.body.id}`).set("Cookie", ownerCookie).expect(409);

    await request(app.getHttpServer()).delete(`/shopping-lists/${duplicated.body.id}`).set("Cookie", otherCookie).expect(404);
    await request(app.getHttpServer()).delete(`/shopping-lists/${duplicated.body.id}`).set("Cookie", ownerCookie).expect(204);
    await request(app.getHttpServer()).get(`/shopping-lists/${duplicated.body.id}`).set("Cookie", ownerCookie).expect(404);
  });
});
