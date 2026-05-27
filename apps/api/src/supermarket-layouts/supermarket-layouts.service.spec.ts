import { BadRequestException, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import type { PrismaService } from "../prisma/prisma.service";
import type { SupermarketsService } from "../supermarkets/supermarkets.service";
import { SupermarketLayoutsService } from "./supermarket-layouts.service";

function makePrismaMock() {
  return {
    supermarketCorridor: {
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    },
    privateProductPlacement: {
      findMany: jest.fn(),
      deleteMany: jest.fn(),
      upsert: jest.fn()
    },
    sharedLayoutSuggestion: {
      findMany: jest.fn(),
      findFirst: jest.fn()
    },
    product: {
      findFirst: jest.fn()
    },
    $transaction: jest.fn()
  };
}

function makeService() {
  const prismaMock = makePrismaMock();
  const supermarketsMock = {
    findOwnedActive: jest.fn().mockResolvedValue({ id: "supermarket-1", ownerUserId: "user-1", presenceRadiusMeters: 500 })
  };
  const service = new SupermarketLayoutsService(
    prismaMock as unknown as PrismaService,
    supermarketsMock as unknown as SupermarketsService
  );
  return { service, prismaMock, supermarketsMock };
}

function corridor(overrides: Record<string, unknown> = {}) {
  return {
    id: "corridor-1",
    ownerUserId: "user-1",
    supermarketId: "supermarket-1",
    name: "Hortifruti",
    sortOrder: 0,
    createdAt: new Date("2026-05-26T10:00:00.000Z"),
    updatedAt: new Date("2026-05-26T10:00:00.000Z"),
    _count: { placements: 0 },
    ...overrides
  };
}

function placement(overrides: Record<string, unknown> = {}) {
  return {
    id: "placement-1",
    ownerUserId: "user-1",
    supermarketId: "supermarket-1",
    productId: "product-1",
    corridorId: "corridor-1",
    lastConfirmedAt: new Date("2026-05-26T10:00:00.000Z"),
    createdAt: new Date("2026-05-26T10:00:00.000Z"),
    updatedAt: new Date("2026-05-26T10:00:00.000Z"),
    ...overrides
  };
}

function suggestion(overrides: Record<string, unknown> = {}) {
  return {
    id: "suggestion-1",
    supermarketId: "supermarket-1",
    productId: "product-1",
    suggestedCorridorName: "Padaria",
    confidenceScore: new Prisma.Decimal("0.85"),
    sourceContributionCount: 4,
    lastConfirmedAt: new Date("2026-05-26T10:00:00.000Z"),
    createdAt: new Date("2026-05-26T10:00:00.000Z"),
    updatedAt: new Date("2026-05-26T10:00:00.000Z"),
    ...overrides
  };
}

describe("SupermarketLayoutsService", () => {
  it("creates corridors with increasing sort order", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.supermarketCorridor.count.mockResolvedValue(2);
    prismaMock.supermarketCorridor.create.mockResolvedValue(corridor({ id: "corridor-3", name: "Bebidas", sortOrder: 2 }));

    const result = await service.createCorridor("user-1", "supermarket-1", { name: " Bebidas " });

    expect(result).toMatchObject({ id: "corridor-3", name: "Bebidas", sortOrder: 2 });
    expect(prismaMock.supermarketCorridor.create).toHaveBeenCalledWith({
      data: { ownerUserId: "user-1", supermarketId: "supermarket-1", name: "Bebidas", sortOrder: 2 },
      include: { _count: { select: { placements: true } } }
    });
  });

  it("renames a corridor with a trimmed name", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.supermarketCorridor.findFirst.mockResolvedValue(corridor());
    prismaMock.supermarketCorridor.update.mockResolvedValue(corridor({ name: "Limpeza" }));

    const result = await service.updateCorridor("user-1", "supermarket-1", "corridor-1", { name: " Limpeza " });

    expect(result.name).toBe("Limpeza");
    expect(prismaMock.supermarketCorridor.update).toHaveBeenCalledWith({
      where: { id: "corridor-1" },
      data: { name: "Limpeza" },
      include: { _count: { select: { placements: true } } }
    });
  });

  it("reorders corridors by persisting every requested position", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.supermarketCorridor.findMany
      .mockResolvedValueOnce([corridor({ id: "corridor-1" }), corridor({ id: "corridor-2" })])
      .mockResolvedValueOnce([corridor({ id: "corridor-2", sortOrder: 0 }), corridor({ id: "corridor-1", sortOrder: 1 })]);
    prismaMock.privateProductPlacement.findMany.mockResolvedValue([]);
    prismaMock.sharedLayoutSuggestion.findMany.mockResolvedValue([]);
    prismaMock.supermarketCorridor.update
      .mockReturnValueOnce(Promise.resolve(corridor({ id: "corridor-2", sortOrder: 0 })))
      .mockReturnValueOnce(Promise.resolve(corridor({ id: "corridor-1", sortOrder: 1 })));
    prismaMock.$transaction.mockImplementation((operations) => Promise.all(operations));

    await service.reorderCorridors("user-1", "supermarket-1", { corridorIds: ["corridor-2", "corridor-1"] });

    expect(prismaMock.supermarketCorridor.update).toHaveBeenNthCalledWith(1, {
      where: { id: "corridor-2" },
      data: { sortOrder: 0 }
    });
    expect(prismaMock.supermarketCorridor.update).toHaveBeenNthCalledWith(2, {
      where: { id: "corridor-1" },
      data: { sortOrder: 1 }
    });
  });

  it("deletes a corridor after removing associated private placements", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.supermarketCorridor.findFirst.mockResolvedValue(corridor());
    prismaMock.privateProductPlacement.deleteMany.mockResolvedValue({ count: 2 });
    prismaMock.supermarketCorridor.delete.mockResolvedValue(corridor());

    await service.deleteCorridor("user-1", "supermarket-1", "corridor-1");

    expect(prismaMock.privateProductPlacement.deleteMany).toHaveBeenCalledWith({
      where: { ownerUserId: "user-1", supermarketId: "supermarket-1", corridorId: "corridor-1" }
    });
    expect(prismaMock.supermarketCorridor.delete).toHaveBeenCalledWith({ where: { id: "corridor-1" } });
  });

  it("upserts one private placement per user, supermarket, and product", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.product.findFirst.mockResolvedValue({ id: "product-1", ownerUserId: "user-1", archivedAt: null });
    prismaMock.supermarketCorridor.findFirst.mockResolvedValue(corridor());
    prismaMock.privateProductPlacement.upsert.mockResolvedValue(placement());

    const result = await service.setProductPlacement("user-1", "supermarket-1", "product-1", { corridorId: "corridor-1" });

    expect(result).toEqual({
      productId: "product-1",
      corridorId: "corridor-1",
      lastConfirmedAt: "2026-05-26T10:00:00.000Z"
    });
    expect(prismaMock.privateProductPlacement.upsert).toHaveBeenCalledWith({
      where: { ownerUserId_supermarketId_productId: { ownerUserId: "user-1", supermarketId: "supermarket-1", productId: "product-1" } },
      create: { ownerUserId: "user-1", supermarketId: "supermarket-1", productId: "product-1", corridorId: "corridor-1" },
      update: { corridorId: "corridor-1", lastConfirmedAt: expect.any(Date) }
    });
  });

  it("does not allow a placement to use another user's corridor", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.product.findFirst.mockResolvedValue({ id: "product-1", ownerUserId: "user-1", archivedAt: null });
    prismaMock.supermarketCorridor.findFirst.mockResolvedValue(null);

    await expect(
      service.setProductPlacement("user-1", "supermarket-1", "product-1", { corridorId: "corridor-foreign" })
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(prismaMock.privateProductPlacement.upsert).not.toHaveBeenCalled();
  });

  it("lists suggestions separately from private placements", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.supermarketCorridor.findMany.mockResolvedValue([corridor()]);
    prismaMock.privateProductPlacement.findMany.mockResolvedValue([placement()]);
    prismaMock.sharedLayoutSuggestion.findMany.mockResolvedValue([suggestion()]);

    const layout = await service.getLayout("user-1", "supermarket-1");

    expect(layout.placements).toEqual([
      { productId: "product-1", corridorId: "corridor-1", lastConfirmedAt: "2026-05-26T10:00:00.000Z" }
    ]);
    expect(layout.suggestions).toEqual([
      {
        id: "suggestion-1",
        productId: "product-1",
        suggestedCorridorName: "Padaria",
        confidenceScore: "0.85",
        sourceContributionCount: 4
      }
    ]);
  });

  it("accepts a suggestion by creating a private corridor and placement", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.sharedLayoutSuggestion.findFirst.mockResolvedValue(suggestion());
    prismaMock.product.findFirst.mockResolvedValue({ id: "product-1", ownerUserId: "user-1", archivedAt: null });
    prismaMock.supermarketCorridor.count.mockResolvedValue(1);
    prismaMock.supermarketCorridor.create.mockResolvedValue(corridor({ id: "corridor-2", name: "Padaria", sortOrder: 1 }));
    prismaMock.supermarketCorridor.findFirst.mockResolvedValue(corridor({ id: "corridor-2", name: "Padaria", sortOrder: 1 }));
    prismaMock.privateProductPlacement.upsert.mockResolvedValue(placement({ corridorId: "corridor-2" }));

    const result = await service.acceptSuggestion("user-1", "supermarket-1", "suggestion-1", {});

    expect(result.corridorId).toBe("corridor-2");
    expect(prismaMock.supermarketCorridor.create).toHaveBeenCalledWith({
      data: { ownerUserId: "user-1", supermarketId: "supermarket-1", name: "Padaria", sortOrder: 1 },
      include: { _count: { select: { placements: true } } }
    });
  });

  it("rejects reorders that omit or add corridors", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.supermarketCorridor.findMany.mockResolvedValue([corridor({ id: "corridor-1" })]);

    await expect(
      service.reorderCorridors("user-1", "supermarket-1", { corridorIds: ["corridor-1", "corridor-2"] })
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
