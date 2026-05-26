import { BadRequestException, ConflictException, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import type { PrismaService } from "../prisma/prisma.service";
import type { SupermarketLayoutsService } from "../supermarket-layouts/supermarket-layouts.service";
import type { SupermarketsService } from "../supermarkets/supermarkets.service";
import { ShoppingJourneysService } from "./shopping-journeys.service";

const now = new Date("2026-05-26T10:00:00.000Z");

function decimal(value: string) {
  return new Prisma.Decimal(value);
}

function unit() {
  return {
    id: "unit-1",
    name: "Unidade",
    abbreviation: "un",
    type: "count",
    allowsDecimals: false,
    active: true,
    sortOrder: 0,
    createdAt: now,
    updatedAt: now
  };
}

function product(overrides: Record<string, unknown> = {}) {
  return {
    id: "product-1",
    ownerUserId: "user-1",
    name: "Arroz",
    categoryLabel: "Mercearia",
    brand: null,
    defaultUnitId: "unit-1",
    estimatedPrice: null,
    notes: null,
    archivedAt: null,
    createdAt: now,
    updatedAt: now,
    ...overrides
  };
}

function sourceList(items = [listItem()]) {
  return {
    id: "list-1",
    ownerUserId: "user-1",
    name: "Compra semanal",
    description: null,
    status: "active",
    duplicatedFromListId: null,
    createdAt: now,
    updatedAt: now,
    items
  };
}

function listItem(overrides: Record<string, unknown> = {}) {
  const itemUnit = unit();
  const itemProduct = product();
  return {
    id: "list-item-1",
    listId: "list-1",
    productId: itemProduct.id,
    quantity: decimal("2"),
    unitId: itemUnit.id,
    expectedPrice: decimal("10.00"),
    priority: "normal",
    notes: null,
    sortOrder: 0,
    createdAt: now,
    updatedAt: now,
    product: itemProduct,
    unit: itemUnit,
    ...overrides
  };
}

function supermarket(overrides: Record<string, unknown> = {}) {
  return {
    id: "supermarket-1",
    ownerUserId: "user-1",
    name: "Mercado Central",
    address: null,
    city: null,
    latitude: null,
    longitude: null,
    presenceRadiusMeters: 500,
    archivedAt: null,
    createdAt: now,
    updatedAt: now,
    ...overrides
  };
}

function journey(overrides: Record<string, unknown> = {}) {
  return {
    id: "journey-1",
    ownerUserId: "user-1",
    sourceListId: "list-1",
    snapshotSourceListName: "Compra semanal",
    context: "physical",
    status: "active",
    startedAt: now,
    completedAt: null,
    canceledAt: null,
    knownTotal: decimal("0"),
    boughtItemsWithoutPriceCount: 0,
    createdAt: now,
    updatedAt: now,
    sourceList: sourceList(),
    items: [journeyItem()],
    stops: [stop()],
    ...overrides
  };
}

function journeyItem(overrides: Record<string, unknown> = {}) {
  return {
    id: "journey-item-1",
    journeyId: "journey-1",
    sourceProductId: "product-1",
    sourceListItemId: "list-item-1",
    snapshotProductName: "Arroz",
    snapshotCategoryLabel: "Mercearia",
    snapshotBrand: null,
    quantity: decimal("2"),
    unitId: "unit-1",
    snapshotUnitName: "Unidade",
    snapshotUnitAbbreviation: "un",
    expectedPrice: decimal("10.00"),
    finalActualPrice: null,
    finalStatus: "active",
    priority: "normal",
    notes: null,
    sortOrder: 0,
    createdAt: now,
    updatedAt: now,
    stopItems: [stopItem()],
    ...overrides
  };
}

function stop(overrides: Record<string, unknown> = {}) {
  return {
    id: "stop-1",
    journeyId: "journey-1",
    supermarketId: "supermarket-1",
    status: "active",
    startedAt: now,
    finishedAt: null,
    exitDetectedAt: null,
    continuedOutsideRadiusAt: null,
    createdAt: now,
    updatedAt: now,
    supermarket: supermarket(),
    items: [stopItem()],
    ...overrides
  };
}

function stopItem(overrides: Record<string, unknown> = {}) {
  return {
    id: "stop-item-1",
    stopId: "stop-1",
    journeyItemId: "journey-item-1",
    status: "pending",
    actualPrice: null,
    corridorId: null,
    notes: null,
    createdAt: now,
    updatedAt: now,
    ...overrides
  };
}

function makePrismaMock() {
  // Prisma's transaction callback needs the mock object while it is being built.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prisma: any = {};
  Object.assign(prisma, {
    $transaction: jest.fn((operation) => (typeof operation === "function" ? operation(prisma) : Promise.all(operation))),
    shoppingJourney: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    },
    shoppingJourneyItem: {
      findMany: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn()
    },
    shoppingJourneyStop: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    },
    shoppingJourneyStopItem: {
      createMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn()
    },
    shoppingList: {
      findFirst: jest.fn()
    },
    privateProductPlacement: {
      findMany: jest.fn()
    }
  });
  return prisma;
}

function makeService() {
  const prismaMock = makePrismaMock();
  const supermarketsMock = {
    findOwnedActive: jest.fn().mockResolvedValue(supermarket())
  };
  const layoutsMock = {
    setProductPlacement: jest.fn()
  };
  const service = new ShoppingJourneysService(
    prismaMock as unknown as PrismaService,
    supermarketsMock as unknown as SupermarketsService,
    layoutsMock as unknown as SupermarketLayoutsService
  );
  return { service, prismaMock, supermarketsMock, layoutsMock };
}

describe("ShoppingJourneysService", () => {
  it("starts a physical journey by snapshotting list items and creating the first supermarket stop", async () => {
    const { service, prismaMock, supermarketsMock } = makeService();
    prismaMock.shoppingJourney.findFirst.mockResolvedValueOnce(null).mockResolvedValueOnce(journey());
    prismaMock.shoppingList.findFirst.mockResolvedValue(sourceList());
    prismaMock.shoppingJourney.create.mockResolvedValue(journey({ stops: [], items: [journeyItem()] }));
    prismaMock.shoppingJourneyStop.create.mockResolvedValue(stop());
    prismaMock.shoppingJourneyStopItem.createMany.mockResolvedValue({ count: 1 });
    prismaMock.privateProductPlacement.findMany.mockResolvedValue([]);

    const result = await service.start("user-1", {
      sourceListId: "list-1",
      supermarketId: "supermarket-1",
      latitude: "-23.5",
      longitude: "-46.6"
    });

    expect(result.activeStop?.supermarketId).toBe("supermarket-1");
    expect(supermarketsMock.findOwnedActive).toHaveBeenCalledWith("user-1", "supermarket-1");
    expect(prismaMock.shoppingJourney.create).toHaveBeenCalledWith({
      data: {
        ownerUserId: "user-1",
        sourceListId: "list-1",
        snapshotSourceListName: "Compra semanal",
        context: "physical",
        items: {
          create: [
            expect.objectContaining({
              sourceProductId: "product-1",
              sourceListItemId: "list-item-1",
              snapshotProductName: "Arroz"
            })
          ]
        }
      },
      include: expect.any(Object)
    });
    expect(prismaMock.shoppingJourneyStopItem.createMany).toHaveBeenCalledWith({
      data: [{ stopId: "stop-1", journeyItemId: "journey-item-1", status: "pending" }]
    });
  });

  it("does not allow a second active journey", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.shoppingJourney.findFirst.mockResolvedValue(journey());

    await expect(service.start("user-1", { sourceListId: "list-1", supermarketId: "supermarket-1" })).rejects.toBeInstanceOf(
      ConflictException
    );
  });

  it("rejects empty source lists", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.shoppingJourney.findFirst.mockResolvedValue(null);
    prismaMock.shoppingList.findFirst.mockResolvedValue(sourceList([]));

    await expect(service.start("user-1", { sourceListId: "list-1", supermarketId: "supermarket-1" })).rejects.toBeInstanceOf(
      BadRequestException
    );
  });

  it("rejects archived or inaccessible supermarkets", async () => {
    const { service, prismaMock, supermarketsMock } = makeService();
    prismaMock.shoppingJourney.findFirst.mockResolvedValue(null);
    prismaMock.shoppingList.findFirst.mockResolvedValue(sourceList());
    supermarketsMock.findOwnedActive.mockRejectedValue(new NotFoundException("Supermarket not found"));

    await expect(service.start("user-1", { sourceListId: "list-1", supermarketId: "supermarket-1" })).rejects.toBeInstanceOf(
      NotFoundException
    );
  });

  it("returns active journey detail with active stop items and placement metadata", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.shoppingJourney.findFirst.mockResolvedValue(journey());
    prismaMock.privateProductPlacement.findMany.mockResolvedValue([
      { productId: "product-1", corridorId: "corridor-1", corridor: { id: "corridor-1", name: "Mercearia" } }
    ]);

    const result = await service.getActive("user-1");

    expect(result?.items[0]).toMatchObject({
      activeStopItem: { id: "stop-item-1", status: "pending" },
      placement: { corridorId: "corridor-1", corridorName: "Mercearia" }
    });
  });

  it("finishes a stop while keeping the journey active", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.shoppingJourney.findFirst.mockResolvedValue(journey());
    prismaMock.shoppingJourneyStop.findFirst.mockResolvedValue(stop());
    prismaMock.shoppingJourneyStop.update.mockResolvedValue(stop({ status: "finished", finishedAt: now }));
    prismaMock.privateProductPlacement.findMany.mockResolvedValue([]);

    const result = await service.finishStop("user-1", "journey-1", "stop-1");

    expect(result.status).toBe("active");
    expect(prismaMock.shoppingJourneyStop.update).toHaveBeenCalledWith({
      where: { id: "stop-1" },
      data: { status: "finished", finishedAt: expect.any(Date) }
    });
  });

  it("marks bought stop items as bought journey items", async () => {
    const { service, prismaMock, layoutsMock } = makeService();
    prismaMock.shoppingJourney.findFirst.mockResolvedValue(journey());
    prismaMock.shoppingJourneyStop.findFirst.mockResolvedValue(stop());
    prismaMock.shoppingJourneyStopItem.findFirst.mockResolvedValue(stopItem());
    prismaMock.shoppingJourneyStopItem.update.mockResolvedValue(stopItem({ status: "bought", actualPrice: decimal("12.50"), corridorId: "corridor-1" }));
    prismaMock.shoppingJourneyItem.update.mockResolvedValue(journeyItem({ finalStatus: "bought", finalActualPrice: decimal("12.50") }));
    prismaMock.privateProductPlacement.findMany.mockResolvedValue([]);

    await service.updateStopItem("user-1", "journey-1", "stop-1", "stop-item-1", {
      status: "bought",
      actualPrice: "12.50",
      corridorId: "corridor-1"
    });

    expect(prismaMock.shoppingJourneyItem.update).toHaveBeenCalledWith({
      where: { id: "journey-item-1" },
      data: { finalStatus: "bought", finalActualPrice: "12.50" }
    });
    expect(layoutsMock.setProductPlacement).toHaveBeenCalledWith("user-1", "supermarket-1", "product-1", {
      corridorId: "corridor-1"
    });
  });

  it("keeps not-found stop items active for future supermarkets", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.shoppingJourney.findFirst.mockResolvedValue(journey());
    prismaMock.shoppingJourneyStop.findFirst.mockResolvedValue(stop());
    prismaMock.shoppingJourneyStopItem.findFirst.mockResolvedValue(stopItem());
    prismaMock.shoppingJourneyStopItem.update.mockResolvedValue(stopItem({ status: "not_found" }));
    prismaMock.shoppingJourneyItem.update.mockResolvedValue(journeyItem({ finalStatus: "active" }));
    prismaMock.privateProductPlacement.findMany.mockResolvedValue([]);

    await service.updateStopItem("user-1", "journey-1", "stop-1", "stop-item-1", { status: "not_found" });

    expect(prismaMock.shoppingJourneyItem.update).toHaveBeenCalledWith({
      where: { id: "journey-item-1" },
      data: { finalStatus: "active", finalActualPrice: null }
    });
  });

  it("switches supermarket by finishing the old stop and creating pending items for active journey items", async () => {
    const { service, prismaMock, supermarketsMock } = makeService();
    prismaMock.shoppingJourney.findFirst.mockResolvedValue(journey());
    prismaMock.shoppingJourneyStop.findFirst.mockResolvedValue(stop());
    prismaMock.shoppingJourneyStop.update.mockResolvedValue(stop({ status: "finished" }));
    prismaMock.shoppingJourneyItem.findMany.mockResolvedValue([journeyItem({ finalStatus: "active" })]);
    prismaMock.shoppingJourneyStop.create.mockResolvedValue(stop({ id: "stop-2", supermarketId: "supermarket-2" }));
    prismaMock.shoppingJourneyStopItem.createMany.mockResolvedValue({ count: 1 });
    prismaMock.privateProductPlacement.findMany.mockResolvedValue([]);
    supermarketsMock.findOwnedActive.mockResolvedValue(supermarket({ id: "supermarket-2", name: "Atacado Norte" }));

    await service.switchSupermarket("user-1", "journey-1", "stop-1", { supermarketId: "supermarket-2" });

    expect(prismaMock.shoppingJourneyStop.update).toHaveBeenCalledWith({
      where: { id: "stop-1" },
      data: { status: "finished", finishedAt: expect.any(Date) }
    });
    expect(prismaMock.shoppingJourneyStopItem.createMany).toHaveBeenCalledWith({
      data: [{ stopId: "stop-2", journeyItemId: "journey-item-1", status: "pending" }]
    });
  });

  it("completes a journey by converting remaining active items to unprocessed", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.shoppingJourney.findFirst
      .mockResolvedValueOnce(journey())
      .mockResolvedValueOnce(journey({ status: "completed", completedAt: now, items: [journeyItem({ finalStatus: "unprocessed" })] }));
    prismaMock.shoppingJourneyStop.update.mockResolvedValue(stop({ status: "finished" }));
    prismaMock.shoppingJourneyItem.updateMany.mockResolvedValue({ count: 1 });
    prismaMock.shoppingJourney.update.mockResolvedValue(journey({ status: "completed", completedAt: now }));
    prismaMock.privateProductPlacement.findMany.mockResolvedValue([]);

    const result = await service.complete("user-1", "journey-1");

    expect(result.status).toBe("completed");
    expect(prismaMock.shoppingJourneyItem.updateMany).toHaveBeenCalledWith({
      where: { journeyId: "journey-1", finalStatus: "active" },
      data: { finalStatus: "unprocessed" }
    });
  });

  it("cancels a journey and cancels its active stop without deleting audit rows", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.shoppingJourney.findFirst
      .mockResolvedValueOnce(journey())
      .mockResolvedValueOnce(journey({ status: "canceled", canceledAt: now, stops: [stop({ status: "canceled" })] }));
    prismaMock.shoppingJourneyStop.update.mockResolvedValue(stop({ status: "canceled" }));
    prismaMock.shoppingJourney.update.mockResolvedValue(journey({ status: "canceled", canceledAt: now }));
    prismaMock.privateProductPlacement.findMany.mockResolvedValue([]);

    const result = await service.cancel("user-1", "journey-1");

    expect(result.status).toBe("canceled");
    expect(prismaMock.shoppingJourneyStop.update).toHaveBeenCalledWith({
      where: { id: "stop-1" },
      data: { status: "canceled" }
    });
  });
});
