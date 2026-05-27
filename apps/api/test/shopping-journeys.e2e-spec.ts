import { Test } from "@nestjs/testing";
import type { INestApplication } from "@nestjs/common";
import cookieParser from "cookie-parser";
import request from "supertest";
import { Prisma } from "@prisma/client";
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

type ListItemRecord = {
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

type SupermarketRecord = {
  id: string;
  ownerUserId: string;
  name: string;
  address: string | null;
  city: string | null;
  latitude: Prisma.Decimal | null;
  longitude: Prisma.Decimal | null;
  presenceRadiusMeters: number;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type CorridorRecord = {
  id: string;
  ownerUserId: string;
  supermarketId: string;
  name: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

type PlacementRecord = {
  ownerUserId: string;
  supermarketId: string;
  productId: string;
  corridorId: string;
  lastConfirmedAt: Date;
};

type JourneyRecord = {
  id: string;
  ownerUserId: string;
  sourceListId: string;
  snapshotSourceListName: string;
  context: "physical";
  status: "active" | "completed" | "canceled";
  startedAt: Date;
  completedAt: Date | null;
  canceledAt: Date | null;
  knownTotal: string;
  boughtItemsWithoutPriceCount: number;
};

type JourneyItemRecord = {
  id: string;
  journeyId: string;
  sourceProductId: string;
  sourceListItemId: string;
  snapshotProductName: string;
  snapshotCategoryLabel: string;
  snapshotBrand: string | null;
  quantity: string;
  unitId: string;
  snapshotUnitName: string;
  snapshotUnitAbbreviation: string;
  expectedPrice: string | null;
  finalActualPrice: string | null;
  finalStatus: "active" | "bought" | "not_found" | "unprocessed";
  priority: "low" | "normal" | "high";
  notes: string | null;
  sortOrder: number;
};

type StopRecord = {
  id: string;
  journeyId: string;
  supermarketId: string;
  status: "active" | "finished" | "canceled";
  startedAt: Date;
  finishedAt: Date | null;
  exitDetectedAt: Date | null;
  continuedOutsideRadiusAt: Date | null;
};

type StopItemRecord = {
  id: string;
  stopId: string;
  journeyItemId: string;
  status: "pending" | "bought" | "not_found" | "unprocessed";
  actualPrice: string | null;
  corridorId: string | null;
  notes: string | null;
};

function addShoppingJourneyFake(prisma: ReturnType<typeof createPrismaFake>) {
  const now = new Date("2026-05-26T10:00:00.000Z");
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
  const listItems = new Map<string, ListItemRecord>();
  const supermarkets = new Map<string, SupermarketRecord>();
  const corridors = new Map<string, CorridorRecord>();
  const placements = new Map<string, PlacementRecord>();
  const journeys = new Map<string, JourneyRecord>();
  const journeyItems = new Map<string, JourneyItemRecord>();
  const stops = new Map<string, StopRecord>();
  const stopItems = new Map<string, StopItemRecord>();
  let sequence = 0;

  function nextId(prefix: string) {
    sequence += 1;
    const suffix = String(sequence).padStart(12, "0");
    const prefixCode = prefix
      .split("")
      .reduce((total, char) => total + char.charCodeAt(0), 0)
      .toString(16)
      .padStart(8, "0")
      .slice(0, 8);
    return `${prefixCode}-0000-4000-8000-${suffix}`;
  }

  function unit(id: string) {
    const record = units.get(id);
    if (!record) throw new Error("Unit not found");
    return record;
  }

  function product(id: string) {
    const record = products.get(id);
    if (!record) throw new Error("Product not found");
    return record;
  }

  function supermarket(id: string) {
    const record = supermarkets.get(id);
    if (!record) throw new Error("Supermarket not found");
    return record;
  }

  function listWithItems(list: ListRecord) {
    const items = Array.from(listItems.values())
      .filter((item) => item.listId === list.id)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((item) => ({ ...item, product: product(item.productId), unit: unit(item.unitId) }));
    return { ...list, items, _count: { items: items.length } };
  }

  function corridorWithCount(corridor: CorridorRecord) {
    return {
      ...corridor,
      _count: {
        placements: Array.from(placements.values()).filter((placement) => placement.corridorId === corridor.id).length
      }
    };
  }

  function journeyWithRelations(journey: JourneyRecord) {
    const items = Array.from(journeyItems.values())
      .filter((item) => item.journeyId === journey.id)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((item) => ({
        ...item,
        stopItems: Array.from(stopItems.values()).filter((stopItem) => stopItem.journeyItemId === item.id)
      }));
    const journeyStops = Array.from(stops.values())
      .filter((stop) => stop.journeyId === journey.id)
      .sort((a, b) => a.startedAt.getTime() - b.startedAt.getTime())
      .map((stop) => ({ ...stop, supermarket: supermarket(stop.supermarketId) }));
    return { ...journey, sourceList: lists.get(journey.sourceListId), items, stops: journeyStops };
  }

  function recalculateJourney(journeyId: string) {
    const journey = journeys.get(journeyId);
    if (!journey) return;
    const bought = Array.from(journeyItems.values()).filter((item) => item.journeyId === journeyId && item.finalStatus === "bought");
    const knownTotal = bought
      .filter((item) => item.finalActualPrice !== null)
      .reduce((total, item) => total.plus(item.finalActualPrice!), new Prisma.Decimal(0));
    journey.knownTotal = knownTotal.toString();
    journey.boughtItemsWithoutPriceCount = bought.filter((item) => item.finalActualPrice === null).length;
  }

  Object.assign(prisma, {
    $transaction: jest.fn(async (input: unknown) => {
      if (typeof input === "function") return input(prisma);
      return Promise.all(input as Array<Promise<unknown>>);
    }),
    unit: {
      findFirst: jest.fn(({ where }: { where: { id: string; active?: boolean } }) => {
        const record = units.get(where.id);
        if (!record) return null;
        if (where.active !== undefined && record.active !== where.active) return null;
        return record;
      })
    },
    product: {
      create: jest.fn(({ data }) => {
        const record: ProductRecord = {
          id: nextId("product"),
          ownerUserId: data.ownerUserId,
          name: data.name,
          categoryLabel: data.categoryLabel,
          brand: data.brand ?? null,
          defaultUnitId: data.defaultUnitId,
          defaultUnit: unit(data.defaultUnitId),
          estimatedPrice: data.estimatedPrice ?? null,
          notes: data.notes ?? null,
          archivedAt: null,
          createdAt: now,
          updatedAt: now
        };
        products.set(record.id, record);
        return record;
      }),
      findFirst: jest.fn(({ where }: { where: { id: string; ownerUserId?: string; archivedAt?: null } }) => {
        const record = products.get(where.id);
        if (!record) return null;
        if (where.ownerUserId && record.ownerUserId !== where.ownerUserId) return null;
        if (where.archivedAt === null && record.archivedAt !== null) return null;
        return record;
      }),
      findMany: jest.fn(({ where }: { where?: { ownerUserId?: string; archivedAt?: null } } = {}) =>
        Array.from(products.values()).filter((record) => {
          if (where?.ownerUserId && record.ownerUserId !== where.ownerUserId) return false;
          if (where?.archivedAt === null && record.archivedAt !== null) return false;
          return true;
        })
      )
    },
    shoppingList: {
      create: jest.fn(({ data }) => {
        const record: ListRecord = {
          id: nextId("list"),
          ownerUserId: data.ownerUserId,
          name: data.name,
          description: data.description ?? null,
          status: "active",
          duplicatedFromListId: data.duplicatedFromListId ?? null,
          createdAt: now,
          updatedAt: now
        };
        lists.set(record.id, record);
        return listWithItems(record);
      }),
      findFirst: jest.fn(({ where }) => {
        const record = lists.get(where.id);
        if (!record) return null;
        if (where.ownerUserId && record.ownerUserId !== where.ownerUserId) return null;
        if (where.status && record.status !== where.status) return null;
        return listWithItems(record);
      }),
      findMany: jest.fn(({ where }) =>
        Array.from(lists.values())
          .filter((record) => record.ownerUserId === where.ownerUserId)
          .filter((record) => (where.status ? record.status === where.status : true))
          .map(listWithItems)
      )
    },
    shoppingListItem: {
      create: jest.fn(({ data }) => {
        const record: ListItemRecord = {
          id: nextId("list-item"),
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
        listItems.set(record.id, record);
        return { ...record, product: product(record.productId), unit: unit(record.unitId) };
      })
    },
    supermarket: {
      create: jest.fn(({ data }) => {
        const record: SupermarketRecord = {
          id: nextId("supermarket"),
          ownerUserId: data.ownerUserId,
          name: data.name,
          address: data.address ?? null,
          city: data.city ?? null,
          latitude: data.latitude ?? null,
          longitude: data.longitude ?? null,
          presenceRadiusMeters: data.presenceRadiusMeters ?? 500,
          archivedAt: null,
          createdAt: now,
          updatedAt: now
        };
        supermarkets.set(record.id, record);
        return record;
      }),
      findFirst: jest.fn(({ where }) => {
        const record = supermarkets.get(where.id);
        if (!record) return null;
        if (where.ownerUserId && record.ownerUserId !== where.ownerUserId) return null;
        if (where.archivedAt === null && record.archivedAt !== null) return null;
        return record;
      }),
      findMany: jest.fn(({ where }) =>
        Array.from(supermarkets.values())
          .filter((record) => record.ownerUserId === where.ownerUserId)
          .filter((record) => (where.archivedAt === null ? record.archivedAt === null : true))
          .sort((a, b) => a.name.localeCompare(b.name))
      ),
      update: jest.fn(({ where, data }) => {
        const record = supermarkets.get(where.id);
        if (!record) throw new Error("Supermarket not found");
        Object.assign(record, data, { updatedAt: now });
        return record;
      })
    },
    supermarketCorridor: {
      count: jest.fn(({ where }) =>
        Array.from(corridors.values()).filter(
          (record) => record.ownerUserId === where.ownerUserId && record.supermarketId === where.supermarketId
        ).length
      ),
      create: jest.fn(({ data }) => {
        const record: CorridorRecord = {
          id: nextId("corridor"),
          ownerUserId: data.ownerUserId,
          supermarketId: data.supermarketId,
          name: data.name,
          sortOrder: data.sortOrder,
          createdAt: now,
          updatedAt: now
        };
        corridors.set(record.id, record);
        return corridorWithCount(record);
      }),
      findFirst: jest.fn(({ where }) => {
        const record = corridors.get(where.id);
        if (!record) return null;
        if (where.ownerUserId && record.ownerUserId !== where.ownerUserId) return null;
        if (where.supermarketId && record.supermarketId !== where.supermarketId) return null;
        return corridorWithCount(record);
      }),
      findMany: jest.fn(({ where }) =>
        Array.from(corridors.values())
          .filter((record) => record.ownerUserId === where.ownerUserId && record.supermarketId === where.supermarketId)
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map(corridorWithCount)
      ),
      update: jest.fn(({ where, data }) => {
        const record = corridors.get(where.id);
        if (!record) throw new Error("Corridor not found");
        Object.assign(record, data, { updatedAt: now });
        return corridorWithCount(record);
      })
    },
    privateProductPlacement: {
      findMany: jest.fn(({ where }) =>
        Array.from(placements.values())
          .filter((record) => record.ownerUserId === where.ownerUserId)
          .filter((record) => record.supermarketId === where.supermarketId)
          .filter((record) => {
            if (!where.productId?.in) return true;
            return where.productId.in.includes(record.productId);
          })
          .map((record) => ({ ...record, corridor: corridors.get(record.corridorId) }))
      ),
      upsert: jest.fn(({ where, create, update }) => {
        const key = `${where.ownerUserId_supermarketId_productId.ownerUserId}:${where.ownerUserId_supermarketId_productId.supermarketId}:${where.ownerUserId_supermarketId_productId.productId}`;
        const existing = placements.get(key);
        const record: PlacementRecord = existing
          ? { ...existing, ...update, lastConfirmedAt: update.lastConfirmedAt ?? now }
          : {
              ownerUserId: create.ownerUserId,
              supermarketId: create.supermarketId,
              productId: create.productId,
              corridorId: create.corridorId,
              lastConfirmedAt: now
            };
        placements.set(key, record);
        return record;
      }),
      deleteMany: jest.fn()
    },
    sharedLayoutSuggestion: {
      findMany: jest.fn(() => [])
    },
    shoppingJourney: {
      create: jest.fn(({ data }) => {
        const sourceList = listWithItems(lists.get(data.sourceListId)!);
        const journey: JourneyRecord = {
          id: nextId("journey"),
          ownerUserId: data.ownerUserId,
          sourceListId: data.sourceListId,
          snapshotSourceListName: data.snapshotSourceListName,
          context: "physical",
          status: "active",
          startedAt: now,
          completedAt: null,
          canceledAt: null,
          knownTotal: "0",
          boughtItemsWithoutPriceCount: 0
        };
        journeys.set(journey.id, journey);
        for (const item of sourceList.items) {
          const record: JourneyItemRecord = {
            id: nextId("journey-item"),
            journeyId: journey.id,
            sourceProductId: item.productId,
            sourceListItemId: item.id,
            snapshotProductName: item.product.name,
            snapshotCategoryLabel: item.product.categoryLabel,
            snapshotBrand: item.product.brand,
            quantity: item.quantity,
            unitId: item.unitId,
            snapshotUnitName: item.unit.name,
            snapshotUnitAbbreviation: item.unit.abbreviation,
            expectedPrice: item.expectedPrice,
            finalActualPrice: null,
            finalStatus: "active",
            priority: item.priority,
            notes: item.notes,
            sortOrder: item.sortOrder
          };
          journeyItems.set(record.id, record);
        }
        return journeyWithRelations(journey);
      }),
      findFirst: jest.fn(({ where }) => {
        const record = Array.from(journeys.values()).find((candidate) => {
          if (where.id && candidate.id !== where.id) return false;
          if (where.ownerUserId && candidate.ownerUserId !== where.ownerUserId) return false;
          if (where.status && candidate.status !== where.status) return false;
          return true;
        });
        return record ? journeyWithRelations(record) : null;
      }),
      update: jest.fn(({ where, data }) => {
        const record = journeys.get(where.id);
        if (!record) throw new Error("Journey not found");
        Object.assign(record, data);
        return journeyWithRelations(record);
      })
    },
    shoppingJourneyItem: {
      findMany: jest.fn(({ where }) =>
        Array.from(journeyItems.values())
          .filter((record) => record.journeyId === where.journeyId)
          .filter((record) => (where.finalStatus ? record.finalStatus === where.finalStatus : true))
          .sort((a, b) => a.sortOrder - b.sortOrder)
      ),
      update: jest.fn(({ where, data }) => {
        const record = journeyItems.get(where.id);
        if (!record) throw new Error("Journey item not found");
        Object.assign(record, data);
        recalculateJourney(record.journeyId);
        return record;
      }),
      updateMany: jest.fn(({ where, data }) => {
        let count = 0;
        for (const record of journeyItems.values()) {
          if (record.journeyId !== where.journeyId) continue;
          if (where.finalStatus && record.finalStatus !== where.finalStatus) continue;
          Object.assign(record, data);
          count += 1;
        }
        recalculateJourney(where.journeyId);
        return { count };
      })
    },
    shoppingJourneyStop: {
      create: jest.fn(({ data }) => {
        const record: StopRecord = {
          id: nextId("stop"),
          journeyId: data.journeyId,
          supermarketId: data.supermarketId,
          status: "active",
          startedAt: now,
          finishedAt: null,
          exitDetectedAt: null,
          continuedOutsideRadiusAt: null
        };
        stops.set(record.id, record);
        return record;
      }),
      findFirst: jest.fn(({ where }) => {
        const record = stops.get(where.id);
        if (!record) return null;
        if (where.journeyId && record.journeyId !== where.journeyId) return null;
        if (where.status && record.status !== where.status) return null;
        return record;
      }),
      findMany: jest.fn(({ where }) =>
        Array.from(stops.values())
          .filter((record) => {
            const journey = journeys.get(record.journeyId);
            return Boolean(journey && journey.ownerUserId === where.journey.ownerUserId && journey.status === where.journey.status);
          })
          .map((record) => ({
            ...record,
            supermarket: supermarket(record.supermarketId),
            journey: journeys.get(record.journeyId),
            items: Array.from(stopItems.values()).filter((item) => item.stopId === record.id)
          }))
      ),
      update: jest.fn(({ where, data }) => {
        const record = stops.get(where.id);
        if (!record) throw new Error("Stop not found");
        Object.assign(record, data);
        return record;
      })
    },
    shoppingJourneyStopItem: {
      createMany: jest.fn(({ data }) => {
        for (const item of data) {
          const record: StopItemRecord = {
            id: nextId("stop-item"),
            stopId: item.stopId,
            journeyItemId: item.journeyItemId,
            status: item.status,
            actualPrice: null,
            corridorId: null,
            notes: null
          };
          stopItems.set(record.id, record);
        }
        return { count: data.length };
      }),
      findFirst: jest.fn(({ where }) => {
        const record = stopItems.get(where.id);
        if (!record) return null;
        if (where.stopId && record.stopId !== where.stopId) return null;
        return record;
      }),
      findMany: jest.fn(({ where }) =>
        Array.from(stopItems.values())
          .filter((record) => {
            const stop = stops.get(record.stopId);
            const journey = stop ? journeys.get(stop.journeyId) : null;
            return Boolean(journey && journey.ownerUserId === where.stop.journey.ownerUserId && journey.status === where.stop.journey.status);
          })
          .map((record) => ({
            ...record,
            journeyItem: journeyItems.get(record.journeyItemId),
            stop: {
              ...stops.get(record.stopId)!,
              supermarket: supermarket(stops.get(record.stopId)!.supermarketId),
              journey: journeys.get(stops.get(record.stopId)!.journeyId)
            }
          }))
      ),
      update: jest.fn(({ where, data }) => {
        const record = stopItems.get(where.id);
        if (!record) throw new Error("Stop item not found");
        Object.assign(record, data);
        return record;
      })
    },
    shoppingSession: {
      count: jest.fn(() => 0)
    }
  });

  return { kilogramUnitId, packageUnitId };
}

describe("Shopping journeys API", () => {
  let app: INestApplication;
  const prisma = createPrismaFake();
  let kilogramUnitId: string;
  let packageUnitId: string;

  beforeAll(async () => {
    ({ kilogramUnitId, packageUnitId } = addShoppingJourneyFake(prisma));

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

  it("covers a physical journey across two supermarkets and exposes history", async () => {
    const signup = await request(app.getHttpServer())
      .post("/auth/signup")
      .send({ name: "Journey Owner", email: "journey-owner@example.com", password: "CorrectHorseBatteryStaple1!" })
      .expect(201);
    const cookie = signup.headers["set-cookie"];

    const rice = await request(app.getHttpServer())
      .post("/products")
      .set("Cookie", cookie)
      .send({ name: "Rice", categoryLabel: "Pantry", defaultUnitId: kilogramUnitId, estimatedPrice: "12.50" })
      .expect(201);
    const beans = await request(app.getHttpServer())
      .post("/products")
      .set("Cookie", cookie)
      .send({ name: "Beans", categoryLabel: "Pantry", defaultUnitId: packageUnitId, estimatedPrice: "8.40" })
      .expect(201);

    const list = await request(app.getHttpServer())
      .post("/shopping-lists")
      .set("Cookie", cookie)
      .send({ name: "Weekly" })
      .expect(201);
    await request(app.getHttpServer())
      .post(`/shopping-lists/${list.body.id}/items`)
      .set("Cookie", cookie)
      .send({ productId: rice.body.id, quantity: "2", unitId: kilogramUnitId, expectedPrice: "25.00", priority: "normal" })
      .expect(201);
    await request(app.getHttpServer())
      .post(`/shopping-lists/${list.body.id}/items`)
      .set("Cookie", cookie)
      .send({ productId: beans.body.id, quantity: "1", unitId: packageUnitId, expectedPrice: "8.40", priority: "normal" })
      .expect(201);

    const firstSupermarket = await request(app.getHttpServer())
      .post("/supermarkets")
      .set("Cookie", cookie)
      .send({ name: "Mercado Central", latitude: "-23.5", longitude: "-46.6" })
      .expect(201);
    const secondSupermarket = await request(app.getHttpServer())
      .post("/supermarkets")
      .set("Cookie", cookie)
      .send({ name: "Atacado Norte", latitude: "-23.6", longitude: "-46.7" })
      .expect(201);
    const corridor = await request(app.getHttpServer())
      .post(`/supermarkets/${firstSupermarket.body.id}/layout/corridors`)
      .set("Cookie", cookie)
      .send({ name: "Corredor 1" })
      .expect(201);

    const started = await request(app.getHttpServer())
      .post("/shopping-journeys")
      .set("Cookie", cookie)
      .send({ sourceListId: list.body.id, supermarketId: firstSupermarket.body.id })
      .expect(201);
    const firstStopId = started.body.activeStop.id;
    const riceStopItem = started.body.items.find((item: { snapshotProductName: string }) => item.snapshotProductName === "Rice").activeStopItem;
    const beansStopItem = started.body.items.find((item: { snapshotProductName: string }) => item.snapshotProductName === "Beans").activeStopItem;

    await request(app.getHttpServer())
      .patch(`/shopping-journeys/${started.body.id}/stops/${firstStopId}/items/${riceStopItem.id}`)
      .set("Cookie", cookie)
      .send({ status: "bought", actualPrice: "11.90", corridorId: corridor.body.id })
      .expect(200)
      .expect(({ body }) => {
        expect(body.knownTotal).toBe("11.9");
        expect(body.items.find((item: { snapshotProductName: string }) => item.snapshotProductName === "Rice").finalStatus).toBe("bought");
      });

    await request(app.getHttpServer())
      .patch(`/shopping-journeys/${started.body.id}/stops/${firstStopId}/items/${beansStopItem.id}`)
      .set("Cookie", cookie)
      .send({ status: "not_found" })
      .expect(200)
      .expect(({ body }) => {
        expect(body.items.find((item: { snapshotProductName: string }) => item.snapshotProductName === "Beans").finalStatus).toBe("active");
      });

    await request(app.getHttpServer())
      .post(`/shopping-journeys/${started.body.id}/stops/${firstStopId}/finish`)
      .set("Cookie", cookie)
      .expect(200)
      .expect(({ body }) => {
        expect(body.activeStop).toBeNull();
      });

    const switched = await request(app.getHttpServer())
      .post(`/shopping-journeys/${started.body.id}/stops/${firstStopId}/switch-supermarket`)
      .set("Cookie", cookie)
      .send({ supermarketId: secondSupermarket.body.id })
      .expect(200);
    expect(switched.body.activeStop.supermarketId).toBe(secondSupermarket.body.id);
    const beansAfterSwitch = switched.body.items.find((item: { snapshotProductName: string }) => item.snapshotProductName === "Beans");
    expect(beansAfterSwitch.finalStatus).toBe("active");
    expect(beansAfterSwitch.activeStopItem.status).toBe("pending");

    await request(app.getHttpServer())
      .post(`/shopping-journeys/${started.body.id}/complete`)
      .set("Cookie", cookie)
      .expect(200)
      .expect(({ body }) => {
        expect(body.status).toBe("completed");
        expect(body.knownTotal).toBe("11.9");
      });

    await request(app.getHttpServer())
      .get(`/purchase-history/journeys/${started.body.id}`)
      .set("Cookie", cookie)
      .expect(200)
      .expect(({ body }) => {
        expect(body.status).toBe("completed");
        expect(body.items.find((item: { snapshotProductName: string }) => item.snapshotProductName === "Beans").finalStatus).toBe("unprocessed");
      });

    await request(app.getHttpServer())
      .get("/purchase-history/journey-items?productQuery=Rice")
      .set("Cookie", cookie)
      .expect(200)
      .expect(({ body }) => {
        expect(body.purchaseHistoryJourneyItems.some((item: { snapshotProductName: string }) => item.snapshotProductName === "Rice")).toBe(true);
      });
  });
});
