import { BadRequestException, ConflictException, NotFoundException } from "@nestjs/common";
import type {
  ListItemPriority,
  Product,
  PurchaseLocation,
  ShoppingList,
  ShoppingListItem,
  ShoppingSession,
  ShoppingSessionContext,
  ShoppingSessionItem,
  ShoppingSessionItemStatus,
  ShoppingSessionStatus,
  Unit
} from "@prisma/client";
import { Prisma } from "@prisma/client";
import type { ShoppingSessionItemDto } from "@zbuy/shared";
import type { PrismaService } from "../prisma/prisma.service";
import { PurchaseLocationsService } from "../purchase-locations/purchase-locations.service";
import { ShoppingSessionsService } from "./shopping-sessions.service";

type ProductRecord = Product & { defaultUnit?: Unit };
type ListItemRecord = ShoppingListItem & { product: Product; unit: Unit };
type ShoppingListRecord = ShoppingList & { items: ListItemRecord[] };
type SessionItemRecord = ShoppingSessionItem;
type SessionRecord = ShoppingSession & {
  items: SessionItemRecord[];
  purchaseLocation?: PurchaseLocation;
  sourceList?: ShoppingList;
};

interface MockData {
  units: Unit[];
  products: ProductRecord[];
  lists: ShoppingListRecord[];
  locations: PurchaseLocation[];
  sessions: SessionRecord[];
  nextListId: number;
  nextListItemId: number;
  nextSessionId: number;
  nextSessionItemId: number;
}

const now = new Date("2026-05-24T12:00:00.000Z");

function decimal(value: string) {
  return new Prisma.Decimal(value);
}

function makeUnit(overrides: Partial<Unit> = {}): Unit {
  return {
    id: "unit-kg",
    name: "Kilogram",
    abbreviation: "kg",
    type: "weight",
    allowsDecimals: true,
    active: true,
    sortOrder: 0,
    createdAt: now,
    updatedAt: now,
    ...overrides
  };
}

function makeProduct(overrides: Partial<ProductRecord> = {}): ProductRecord {
  return {
    id: "product-rice",
    ownerUserId: "user-1",
    name: "Arroz",
    categoryLabel: "Mercearia",
    brand: "ZBuy",
    defaultUnitId: "unit-kg",
    estimatedPrice: decimal("10.00"),
    notes: null,
    archivedAt: null,
    createdAt: now,
    updatedAt: now,
    ...overrides
  };
}

function makeList(overrides: Partial<ShoppingListRecord> = {}): ShoppingListRecord {
  const unit = makeUnit();
  const product = makeProduct();
  return {
    id: "list-1",
    ownerUserId: "user-1",
    name: "Compra semanal",
    description: null,
    status: "active",
    duplicatedFromListId: null,
    createdAt: now,
    updatedAt: now,
    items: [
      {
        id: "list-item-rice",
        listId: "list-1",
        productId: product.id,
        quantity: decimal("2"),
        unitId: unit.id,
        expectedPrice: decimal("10.00"),
        priority: "normal",
        notes: "Integral",
        sortOrder: 0,
        createdAt: now,
        updatedAt: now,
        product,
        unit
      }
    ],
    ...overrides
  };
}

function makeLocation(overrides: Partial<PurchaseLocation> = {}): PurchaseLocation {
  return {
    id: "location-1",
    ownerUserId: "user-1",
    type: "physical",
    name: "Mercado Central",
    address: null,
    city: null,
    websiteOrApp: null,
    notes: null,
    archivedAt: null,
    createdAt: now,
    updatedAt: now,
    ...overrides
  };
}

function makeMockData(overrides: Partial<MockData> = {}): MockData {
  const unit = makeUnit();
  const product = makeProduct();
  const list = makeList({
    items: [
      {
        id: "list-item-rice",
        listId: "list-1",
        productId: product.id,
        quantity: decimal("2"),
        unitId: unit.id,
        expectedPrice: decimal("10.00"),
        priority: "normal",
        notes: "Integral",
        sortOrder: 0,
        createdAt: now,
        updatedAt: now,
        product,
        unit
      },
      {
        id: "list-item-beans",
        listId: "list-1",
        productId: "product-beans",
        quantity: decimal("1"),
        unitId: unit.id,
        expectedPrice: decimal("8.50"),
        priority: "high",
        notes: null,
        sortOrder: 1,
        createdAt: now,
        updatedAt: now,
        product: makeProduct({
          id: "product-beans",
          name: "Feijao",
          categoryLabel: "Mercearia",
          brand: null
        }),
        unit
      }
    ]
  });

  return {
    units: [unit],
    products: [product, list.items[1]!.product],
    lists: [list],
    locations: [makeLocation()],
    sessions: [],
    nextListId: 2,
    nextListItemId: 3,
    nextSessionId: 1,
    nextSessionItemId: 1,
    ...overrides
  };
}

function includeSession(data: MockData, session: SessionRecord, include?: Record<string, unknown>) {
  const sourceList = data.lists.find((list) => list.id === session.sourceListId);
  const purchaseLocation = data.locations.find((location) => location.id === session.purchaseLocationId);
  return {
    ...session,
    ...(include?.items
      ? {
          items: [...session.items].sort((a, b) => a.sortOrder - b.sortOrder)
        }
      : {}),
    ...(include?.sourceList ? { sourceList } : {}),
    ...(include?.purchaseLocation ? { purchaseLocation } : {})
  };
}

function matchesWhere<T extends { id: string; ownerUserId?: string; status?: string }>(record: T, where: Record<string, unknown>) {
  return Object.entries(where).every(([key, value]) => {
    if (value === undefined) return true;
    return (record as Record<string, unknown>)[key] === value;
  });
}

function makePrismaMock(data: MockData = makeMockData()) {
  const prisma = {
    shoppingSession: {
      findFirst: jest.fn(({ where, include, orderBy }) => {
        const sessions = data.sessions
          .filter((session) => matchesWhere(session, where))
          .sort((a, b) => {
            if (orderBy?.startedAt === "desc") return b.startedAt.getTime() - a.startedAt.getTime();
            return 0;
          });
        return Promise.resolve(sessions[0] ? includeSession(data, sessions[0], include) : null);
      }),
      findMany: jest.fn(({ where, include, orderBy, take }) => {
        let sessions = data.sessions.filter((session) => matchesWhere(session, where));
        if (orderBy?.startedAt === "desc") {
          sessions = sessions.sort((a, b) => b.startedAt.getTime() - a.startedAt.getTime());
        }
        if (take) sessions = sessions.slice(0, take);
        return Promise.resolve(sessions.map((session) => includeSession(data, session, include)));
      }),
      create: jest.fn(({ data: createData, include }) => {
        const session: SessionRecord = {
          id: `session-${data.nextSessionId++}`,
          ownerUserId: createData.ownerUserId,
          sourceListId: createData.sourceListId,
          purchaseLocationId: createData.purchaseLocationId,
          context: createData.context,
          status: "active",
          startedAt: now,
          completedAt: null,
          canceledAt: null,
          knownTotal: decimal("0"),
          boughtItemsWithoutPriceCount: 0,
          createdAt: now,
          updatedAt: now,
          items: createData.items.create.map((item: Record<string, unknown>) => ({
            id: `session-item-${data.nextSessionItemId++}`,
            sessionId: `session-${data.nextSessionId - 1}`,
            sourceProductId: item.sourceProductId as string,
            sourceListItemId: item.sourceListItemId as string,
            snapshotProductName: item.snapshotProductName as string,
            snapshotCategoryLabel: item.snapshotCategoryLabel as string,
            snapshotBrand: item.snapshotBrand as string | null,
            quantity: decimal(item.quantity as string),
            unitId: item.unitId as string,
            snapshotUnitName: item.snapshotUnitName as string,
            snapshotUnitAbbreviation: item.snapshotUnitAbbreviation as string,
            expectedPrice: item.expectedPrice ? decimal(item.expectedPrice as string) : null,
            actualPrice: null,
            status: "pending",
            priority: item.priority as ListItemPriority,
            notes: item.notes as string | null,
            sortOrder: item.sortOrder as number,
            createdAt: now,
            updatedAt: now
          }))
        };
        data.sessions.push(session);
        return Promise.resolve(includeSession(data, session, include));
      }),
      update: jest.fn(({ where, data: updateData, include }) => {
        const session = data.sessions.find((candidate) => candidate.id === where.id);
        if (!session) throw new Error("Session not found in mock");
        Object.assign(session, updateData, { updatedAt: now });
        return Promise.resolve(includeSession(data, session, include));
      })
    },
    shoppingSessionItem: {
      findFirst: jest.fn(({ where }) => {
        const session = data.sessions.find((candidate) => candidate.id === where.sessionId);
        return Promise.resolve(session?.items.find((item) => item.id === where.id) ?? null);
      }),
      update: jest.fn(({ where, data: updateData }) => {
        const item = data.sessions.flatMap((session) => session.items).find((candidate) => candidate.id === where.id);
        if (!item) throw new Error("Session item not found in mock");
        Object.assign(item, {
          ...updateData,
          actualPrice: updateData.actualPrice === null ? null : updateData.actualPrice ? decimal(updateData.actualPrice) : item.actualPrice,
          updatedAt: now
        });
        return Promise.resolve(item);
      }),
      updateMany: jest.fn(({ where, data: updateData }) => {
        const session = data.sessions.find((candidate) => candidate.id === where.sessionId);
        const items = session?.items.filter((item) => item.status === where.status) ?? [];
        items.forEach((item) => Object.assign(item, updateData, { updatedAt: now }));
        return Promise.resolve({ count: items.length });
      })
    },
    shoppingList: {
      findFirst: jest.fn(({ where, include }) => {
        const list = data.lists.find((candidate) => matchesWhere(candidate, where));
        if (!list) return Promise.resolve(null);
        return Promise.resolve({
          ...list,
          items: include?.items ? [...list.items].sort((a, b) => a.sortOrder - b.sortOrder) : undefined
        });
      }),
      create: jest.fn(({ data: createData }) => {
        const list: ShoppingListRecord = {
          id: `list-${data.nextListId++}`,
          ownerUserId: createData.ownerUserId,
          name: createData.name,
          description: createData.description ?? null,
          status: "active",
          duplicatedFromListId: createData.duplicatedFromListId ?? null,
          createdAt: now,
          updatedAt: now,
          items: createData.items.create.map((item: Record<string, unknown>, index: number) => {
            const product = data.products.find((candidate) => candidate.id === item.productId)!;
            const unit = data.units.find((candidate) => candidate.id === item.unitId)!;
            return {
              id: `list-item-${data.nextListItemId++}`,
              listId: `list-${data.nextListId - 1}`,
              productId: item.productId as string,
              quantity: decimal(item.quantity as string),
              unitId: item.unitId as string,
              expectedPrice: item.expectedPrice ? decimal(item.expectedPrice as string) : null,
              priority: item.priority as ListItemPriority,
              notes: item.notes as string | null,
              sortOrder: (item.sortOrder as number | undefined) ?? index,
              createdAt: now,
              updatedAt: now,
              product,
              unit
            };
          })
        };
        data.lists.push(list);
        return Promise.resolve(list);
      })
    },
    purchaseLocation: {
      findFirst: jest.fn(({ where }) => {
        return Promise.resolve(
          data.locations.find((location) => location.id === where.id && location.ownerUserId === where.ownerUserId) ?? null
        );
      })
    }
  } as unknown as PrismaService;

  return { prisma, data };
}

function makeService(data = makeMockData()) {
  const { prisma } = makePrismaMock(data);
  return new ShoppingSessionsService(prisma, new PurchaseLocationsService(prisma));
}

describe("ShoppingSessionsService", () => {
  it("keeps item snapshots immutable after product and list edits", async () => {
    const data = makeMockData();
    const service = makeService(data);

    const started = await service.start("user-1", {
      sourceListId: "list-1",
      purchaseLocationId: "location-1",
      context: "physical"
    });

    data.lists[0]!.name = "Compra alterada";
    data.lists[0]!.items[0]!.product.name = "Arroz alterado";
    data.lists[0]!.items[0]!.quantity = decimal("9");

    const detail = await service.get("user-1", started.id);

    expect(detail.sourceListName).toBe("Compra alterada");
    expect(detail.items[0]).toMatchObject({
      snapshotProductName: "Arroz",
      quantity: "2",
      expectedPrice: "10"
    });
  });

  it("allows only one active session per user", async () => {
    const service = makeService();

    await service.start("user-1", { sourceListId: "list-1", purchaseLocationId: "location-1", context: "physical" });

    await expect(
      service.start("user-1", { sourceListId: "list-1", purchaseLocationId: "location-1", context: "physical" })
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it("allows different users to each have an active session", async () => {
    const data = makeMockData();
    const secondList = makeList({ id: "list-2", ownerUserId: "user-2" });
    secondList.items = secondList.items.map((item) => ({ ...item, listId: "list-2" }));
    data.lists.push(secondList);
    data.locations.push(makeLocation({ id: "location-2", ownerUserId: "user-2" }));
    const service = makeService(data);

    const first = await service.start("user-1", { sourceListId: "list-1", purchaseLocationId: "location-1", context: "physical" });
    const second = await service.start("user-2", { sourceListId: "list-2", purchaseLocationId: "location-2", context: "physical" });

    expect(first.status).toBe("active");
    expect(second.status).toBe("active");
  });

  it("rejects context and purchase location type mismatch", async () => {
    const service = makeService();

    await expect(
      service.start("user-1", { sourceListId: "list-1", purchaseLocationId: "location-1", context: "online" })
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it("moves items between bought, not_found, and pending", async () => {
    const service = makeService();
    const session = await service.start("user-1", { sourceListId: "list-1", purchaseLocationId: "location-1", context: "physical" });
    const itemId = session.items[0]!.id;

    const bought = await service.updateItem("user-1", session.id, itemId, { status: "bought" });
    expect(bought.items[0]!.status).toBe("bought");

    const notFound = await service.updateItem("user-1", session.id, itemId, { status: "not_found" });
    expect(notFound.items[0]!.status).toBe("not_found");

    const pending = await service.updateItem("user-1", session.id, itemId, { status: "pending" });
    expect(pending.items[0]!.status).toBe("pending");
  });

  it("converts pending items to unprocessed when completing a session", async () => {
    const service = makeService();
    const session = await service.start("user-1", { sourceListId: "list-1", purchaseLocationId: "location-1", context: "physical" });
    await service.updateItem("user-1", session.id, session.items[0]!.id, { status: "bought", actualPrice: "12.50" });

    const completed = await service.complete("user-1", session.id);

    expect(completed.status).toBe("completed");
    expect(completed.completedAt).toEqual(expect.any(String));
    expect(completed.itemCounts).toEqual({ pending: 0, bought: 1, notFound: 0, unprocessed: 1 });
    expect(completed.items.map((item: ShoppingSessionItemDto) => item.status)).toEqual(["bought", "unprocessed"]);
  });

  it("treats actual price as optional and recalculates known total", async () => {
    const service = makeService();
    const session = await service.start("user-1", { sourceListId: "list-1", purchaseLocationId: "location-1", context: "physical" });

    const withoutPrice = await service.updateItem("user-1", session.id, session.items[0]!.id, { status: "bought" });
    expect(withoutPrice.knownTotal).toBe("0");
    expect(withoutPrice.boughtItemsWithoutPriceCount).toBe(1);

    const withPrice = await service.updateItem("user-1", session.id, session.items[0]!.id, { actualPrice: "12.50" });
    expect(withPrice.knownTotal).toBe("12.5");
    expect(withPrice.boughtItemsWithoutPriceCount).toBe(0);
  });

  it("cancels an active session while keeping items unchanged", async () => {
    const service = makeService();
    const session = await service.start("user-1", { sourceListId: "list-1", purchaseLocationId: "location-1", context: "physical" });

    const canceled = await service.cancel("user-1", session.id);

    expect(canceled.status).toBe("canceled");
    expect(canceled.canceledAt).toEqual(expect.any(String));
    expect(canceled.items.map((item: ShoppingSessionItemDto) => item.status)).toEqual(["pending", "pending"]);
  });

  it("creates a continuation list with only not_found and unprocessed items", async () => {
    const data = makeMockData();
    const product = makeProduct({ id: "product-milk", name: "Leite", brand: null });
    data.products.push(product);
    data.lists[0]!.items[0]!.sortOrder = 10;
    data.lists[0]!.items[1]!.sortOrder = 30;
    data.lists[0]!.items.push({
      id: "list-item-milk",
      listId: "list-1",
      productId: product.id,
      quantity: decimal("3"),
      unitId: "unit-kg",
      expectedPrice: decimal("6.25"),
      priority: "low",
      notes: "Sem lactose",
      sortOrder: 20,
      createdAt: now,
      updatedAt: now,
      product,
      unit: data.units[0]!
    });
    const service = makeService(data);
    const session = await service.start("user-1", { sourceListId: "list-1", purchaseLocationId: "location-1", context: "physical" });
    await service.updateItem("user-1", session.id, session.items[0]!.id, { status: "not_found" });
    await service.updateItem("user-1", session.id, session.items[1]!.id, { status: "bought", actualPrice: "12.50" });
    await service.complete("user-1", session.id);

    const continuation = await service.createContinuationList("user-1", session.id, { name: " Continuacao " });

    expect(continuation.name).toBe("Continuacao");
    const items = data.lists.find((list) => list.id === continuation.id)?.items ?? [];
    expect(items.map((item) => item.productId)).toEqual(["product-rice", "product-beans"]);
    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({ notes: "Integral", sortOrder: 10 });
    expect(items[1]).toMatchObject({ notes: null, sortOrder: 30 });
  });

  it("isolates session ownership", async () => {
    const service = makeService();
    const session = await service.start("user-1", { sourceListId: "list-1", purchaseLocationId: "location-1", context: "physical" });

    await expect(service.get("user-2", session.id)).rejects.toBeInstanceOf(NotFoundException);
    await expect(service.updateItem("user-2", session.id, session.items[0]!.id, { status: "bought" })).rejects.toBeInstanceOf(
      NotFoundException
    );
    await expect(service.cancel("user-2", session.id)).rejects.toBeInstanceOf(NotFoundException);
  });
});
