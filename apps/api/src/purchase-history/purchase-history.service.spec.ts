import { NotFoundException } from "@nestjs/common";
import type { PurchaseLocation, ShoppingList, ShoppingSession, ShoppingSessionItem } from "@prisma/client";
import { Prisma } from "@prisma/client";
import type { PrismaService } from "../prisma/prisma.service";
import { PurchaseHistoryService } from "./purchase-history.service";

type SessionItemRecord = ShoppingSessionItem;
type SessionRecord = ShoppingSession & { items: SessionItemRecord[] };

interface MockData {
  locations: PurchaseLocation[];
  lists: ShoppingList[];
  sessions: SessionRecord[];
}

const now = new Date("2026-05-24T12:00:00.000Z");

function decimal(value: string) {
  return new Prisma.Decimal(value);
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

function makeList(overrides: Partial<ShoppingList> = {}): ShoppingList {
  return {
    id: "list-1",
    ownerUserId: "user-1",
    name: "Compra semanal",
    description: null,
    status: "active",
    duplicatedFromListId: null,
    createdAt: now,
    updatedAt: now,
    ...overrides
  };
}

function makeItem(overrides: Partial<SessionItemRecord> = {}): SessionItemRecord {
  return {
    id: "item-rice",
    sessionId: "session-completed",
    sourceProductId: "product-rice",
    sourceListItemId: "list-item-rice",
    snapshotProductName: "Arroz Integral",
    snapshotCategoryLabel: "Mercearia",
    snapshotBrand: null,
    quantity: decimal("1"),
    unitId: "unit-kg",
    snapshotUnitName: "Kilogram",
    snapshotUnitAbbreviation: "kg",
    expectedPrice: decimal("11.00"),
    actualPrice: decimal("12.50"),
    status: "bought",
    priority: "normal",
    notes: null,
    sortOrder: 0,
    createdAt: now,
    updatedAt: now,
    ...overrides
  };
}

function makeSession(overrides: Partial<SessionRecord> = {}): SessionRecord {
  return {
    id: "session-completed",
    ownerUserId: "user-1",
    sourceListId: "list-1",
    snapshotSourceListName: "Compra semanal",
    purchaseLocationId: "location-1",
    context: "physical",
    status: "completed",
    startedAt: new Date("2026-05-24T11:00:00.000Z"),
    completedAt: new Date("2026-05-24T12:00:00.000Z"),
    canceledAt: null,
    knownTotal: decimal("12.50"),
    boughtItemsWithoutPriceCount: 0,
    createdAt: now,
    updatedAt: now,
    items: [makeItem()],
    ...overrides
  };
}

function makeMockData(): MockData {
  const locations = [
    makeLocation(),
    makeLocation({ id: "location-online", type: "online", name: "ZBuy App", websiteOrApp: "https://app.example.com" }),
    makeLocation({ id: "location-other", ownerUserId: "user-2", name: "Other Store" })
  ];
  const lists = [
    makeList(),
    makeList({ id: "list-2", name: "Compra online" }),
    makeList({ id: "list-other", ownerUserId: "user-2", name: "Other List" })
  ];

  const completed = makeSession({
    id: "session-completed",
    items: [
      makeItem({ id: "item-rice", sessionId: "session-completed" }),
      makeItem({
        id: "item-beans",
        sessionId: "session-completed",
        snapshotProductName: "Feijao Carioca",
        actualPrice: null,
        status: "not_found",
        sortOrder: 1
      }),
      makeItem({
        id: "item-milk",
        sessionId: "session-completed",
        snapshotProductName: "Leite",
        expectedPrice: decimal("9.90"),
        actualPrice: null,
        status: "bought",
        sortOrder: 2
      })
    ]
  });
  const completedOnline = makeSession({
    id: "session-online",
    sourceListId: "list-2",
    snapshotSourceListName: "Compra online",
    purchaseLocationId: "location-online",
    context: "online",
    completedAt: new Date("2026-05-20T12:00:00.000Z"),
    knownTotal: decimal("8.50"),
    items: [
      makeItem({
        id: "item-tea",
        sessionId: "session-online",
        snapshotProductName: "Cha Verde",
        expectedPrice: decimal("12.00"),
        actualPrice: decimal("8.50")
      })
    ]
  });
  const canceled = makeSession({
    id: "session-canceled",
    status: "canceled",
    completedAt: null,
    canceledAt: new Date("2026-05-24T13:00:00.000Z"),
    items: [makeItem({ id: "item-canceled", sessionId: "session-canceled", snapshotProductName: "Cancelado" })]
  });
  const active = makeSession({
    id: "session-active",
    status: "active",
    completedAt: null,
    items: [makeItem({ id: "item-active", sessionId: "session-active", snapshotProductName: "Ativo" })]
  });
  const otherUser = makeSession({
    id: "session-other",
    ownerUserId: "user-2",
    sourceListId: "list-other",
    purchaseLocationId: "location-other",
    snapshotSourceListName: "Other List",
    items: [makeItem({ id: "item-other", sessionId: "session-other", snapshotProductName: "Outro Arroz" })]
  });

  return { locations, lists, sessions: [completed, completedOnline, canceled, active, otherUser] };
}

function makePrismaMock(data: MockData = makeMockData()) {
  const prisma = {
    shoppingSession: {
      findMany: jest.fn(({ where, include, orderBy }) => {
        let sessions = data.sessions.filter((session) => matchesSessionWhere(data, session, where));
        if (orderBy?.completedAt === "desc") {
          sessions = sessions.sort((a, b) => (b.completedAt?.getTime() ?? 0) - (a.completedAt?.getTime() ?? 0));
        }
        return Promise.resolve(sessions.map((session) => includeSession(data, session, include)));
      }),
      findFirst: jest.fn(({ where, include }) => {
        const session = data.sessions.find((candidate) => matchesSessionWhere(data, candidate, where));
        return Promise.resolve(session ? includeSession(data, session, include) : null);
      })
    },
    shoppingSessionItem: {
      findMany: jest.fn(({ where, include, orderBy }) => {
        let items = data.sessions.flatMap((session) => session.items).filter((item) => matchesItemWhere(data, item, where));
        if (Array.isArray(orderBy)) {
          items = items.sort((a, b) => {
            const sessionA = data.sessions.find((session) => session.id === a.sessionId);
            const sessionB = data.sessions.find((session) => session.id === b.sessionId);
            const dateDiff = (sessionB?.completedAt?.getTime() ?? 0) - (sessionA?.completedAt?.getTime() ?? 0);
            return dateDiff || a.sortOrder - b.sortOrder;
          });
        }
        return Promise.resolve(items.map((item) => includeItem(data, item, include)));
      })
    }
  } as unknown as PrismaService;

  return { prisma, data };
}

function includeSession(data: MockData, session: SessionRecord, include?: Record<string, unknown>) {
  return {
    ...session,
    ...(include?.items ? { items: [...session.items].sort((a, b) => a.sortOrder - b.sortOrder) } : {}),
    ...(include?.purchaseLocation ? { purchaseLocation: data.locations.find((location) => location.id === session.purchaseLocationId)! } : {}),
    ...(include?.sourceList ? { sourceList: data.lists.find((list) => list.id === session.sourceListId)! } : {})
  };
}

function includeItem(data: MockData, item: SessionItemRecord, include?: Record<string, unknown>) {
  const session = data.sessions.find((candidate) => candidate.id === item.sessionId)!;
  return {
    ...item,
    ...(include?.session
      ? {
          session: includeSession(data, session, {
            purchaseLocation: true,
            sourceList: true
          })
        }
      : {})
  };
}

function matchesSessionWhere(data: MockData, session: SessionRecord, where: Record<string, unknown>) {
  return Object.entries(where).every(([key, value]) => {
    if (value === undefined) return true;
    if (key === "completedAt") return matchesDateRange(session.completedAt, value as Record<string, Date>);
    if (key === "purchaseLocation") {
      const location = data.locations.find((candidate) => candidate.id === session.purchaseLocationId);
      return location?.type === (value as { type: string }).type;
    }
    if (key === "items") {
      const some = (value as { some?: Record<string, unknown> }).some;
      return some ? session.items.some((item) => matchesItemConditions(item, some)) : true;
    }
    return (session as unknown as Record<string, unknown>)[key] === value;
  });
}

function matchesItemWhere(data: MockData, item: SessionItemRecord, where: Record<string, unknown>) {
  return Object.entries(where).every(([key, value]) => {
    if (key === "session") {
      const session = data.sessions.find((candidate) => candidate.id === item.sessionId);
      return session ? matchesSessionWhere(data, session, value as Record<string, unknown>) : false;
    }
    return matchesItemConditions(item, { [key]: value });
  });
}

function matchesItemConditions(item: SessionItemRecord, where: Record<string, unknown>): boolean {
  return Object.entries(where).every(([key, value]) => {
    if (key === "AND") {
      return (value as Record<string, unknown>[]).every((condition) => matchesItemConditions(item, condition));
    }
    if (key === "snapshotProductName") {
      const query = (value as { contains: string }).contains.toLowerCase();
      return item.snapshotProductName.toLowerCase().includes(query);
    }
    if (key === "actualPrice") {
      if (value === null) return item.actualPrice === null;
      return matchesDecimalRange(item.actualPrice, value as Record<string, string>);
    }
    return (item as unknown as Record<string, unknown>)[key] === value;
  });
}

function matchesDateRange(value: Date | null, range: Record<string, Date>) {
  if (!value) return false;
  if (range.gte && value < range.gte) return false;
  if (range.lte && value > range.lte) return false;
  return true;
}

function matchesDecimalRange(value: Prisma.Decimal | null, range: Record<string, string>) {
  if (value === null) return false;
  if (range.gte && value.lessThan(decimal(range.gte))) return false;
  if (range.lte && value.greaterThan(decimal(range.lte))) return false;
  return true;
}

function makeService(data = makeMockData()) {
  const { prisma } = makePrismaMock(data);
  return new PurchaseHistoryService(prisma);
}

describe("PurchaseHistoryService", () => {
  it("excludes canceled sessions from history session and item lists", async () => {
    const service = makeService();

    const sessions = await service.listSessions("user-1");
    const items = await service.listItems("user-1", { productQuery: "cancelado" });

    expect(sessions.shoppingSessions.map((session) => session.id)).not.toContain("session-canceled");
    expect(items.purchaseHistoryItems).toHaveLength(0);
  });

  it("excludes active sessions from history session and item lists", async () => {
    const service = makeService();

    const sessions = await service.listSessions("user-1");
    const items = await service.listItems("user-1", { productQuery: "ativo" });

    expect(sessions.shoppingSessions.map((session) => session.id)).not.toContain("session-active");
    expect(items.purchaseHistoryItems).toHaveLength(0);
  });

  it("finds completed sessions and items by snapshot product name", async () => {
    const service = makeService();

    const sessions = await service.listSessions("user-1", { productQuery: "arroz" });
    const items = await service.listItems("user-1", { productQuery: "ARROZ" });

    expect(sessions.shoppingSessions.map((session) => session.id)).toEqual(["session-completed"]);
    expect(items.purchaseHistoryItems.map((item) => item.snapshotProductName)).toEqual(["Arroz Integral"]);
  });

  it("returns only bought items without actual price when withoutPrice is true", async () => {
    const service = makeService();

    const result = await service.listItems("user-1", { withoutPrice: "true" });

    expect(result.purchaseHistoryItems.map((item) => item.id)).toEqual(["item-milk"]);
    expect(result.purchaseHistoryItems[0]).toMatchObject({ status: "bought", actualPrice: null });
  });

  it("applies price range only to actual prices", async () => {
    const service = makeService();

    const result = await service.listItems("user-1", { minPrice: "10.00", maxPrice: "13.00" });

    expect(result.purchaseHistoryItems.map((item) => item.id)).toEqual(["item-rice"]);
    expect(result.purchaseHistoryItems[0]).toMatchObject({ actualPrice: "12.5", expectedPrice: "11" });
  });

  it("does not return non-bought items from price range filters even if legacy data has an actual price", async () => {
    const data = makeMockData();
    const notFoundItem = data.sessions[0]!.items.find((item) => item.id === "item-beans")!;
    notFoundItem.actualPrice = decimal("12.00");
    const service = makeService(data);

    const result = await service.listItems("user-1", { minPrice: "10.00", maxPrice: "13.00" });

    expect(result.purchaseHistoryItems.map((item) => item.id)).toEqual(["item-rice"]);
  });

  it("isolates ownership across sessions, items, and session detail", async () => {
    const service = makeService();

    const sessions = await service.listSessions("user-1");
    const items = await service.listItems("user-1", { productQuery: "outro" });

    expect(sessions.shoppingSessions.map((session) => session.id)).not.toContain("session-other");
    expect(items.purchaseHistoryItems).toHaveLength(0);
    await expect(service.getSession("user-1", "session-other")).rejects.toBeInstanceOf(NotFoundException);
  });

  it("does not return active or canceled sessions from getSession", async () => {
    const service = makeService();

    await expect(service.getSession("user-1", "session-active")).rejects.toBeInstanceOf(NotFoundException);
    await expect(service.getSession("user-1", "session-canceled")).rejects.toBeInstanceOf(NotFoundException);
  });
});
