import { NotFoundException } from "@nestjs/common";
import { Prisma, type Supermarket } from "@prisma/client";
import type { PrismaService } from "../prisma/prisma.service";
import { SupermarketsService } from "./supermarkets.service";

type SupermarketRecord = Supermarket;

function makeSupermarket(overrides: Partial<SupermarketRecord> = {}): SupermarketRecord {
  const now = new Date("2026-05-24T12:00:00.000Z");
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

function decimal(value: string) {
  return new Prisma.Decimal(value);
}

function makePrismaMock(initialSupermarkets: SupermarketRecord[] = []) {
  const supermarkets = [...initialSupermarkets];

  const supermarket = {
    findMany: jest.fn(({ where }) => {
      const query = where.name?.contains?.toLowerCase();
      return Promise.resolve(
        supermarkets
          .filter((item) => item.ownerUserId === where.ownerUserId)
          .filter((item) => (where.archivedAt === null ? item.archivedAt === null : true))
          .filter((item) => (where.latitude?.not === null ? item.latitude !== null : true))
          .filter((item) => (where.longitude?.not === null ? item.longitude !== null : true))
          .filter((item) => (query ? item.name.toLowerCase().includes(query) : true))
          .sort((a, b) => a.name.localeCompare(b.name))
      );
    }),
    create: jest.fn(({ data }) => {
      const now = new Date("2026-05-24T12:00:00.000Z");
      const item = makeSupermarket({
        id: `supermarket-${supermarkets.length + 1}`,
        createdAt: now,
        updatedAt: now,
        ...data
      });
      supermarkets.push(item);
      return Promise.resolve(item);
    }),
    findFirst: jest.fn(({ where }) => {
      return Promise.resolve(
        supermarkets.find(
          (item) =>
            item.id === where.id &&
            item.ownerUserId === where.ownerUserId &&
            (where.archivedAt === null ? item.archivedAt === null : true)
        ) ?? null
      );
    }),
    update: jest.fn(({ where, data }) => {
      const index = supermarkets.findIndex((item) => item.id === where.id);
      if (index === -1) {
        throw new Error("Supermarket not found in mock");
      }
      const updated = {
        ...supermarkets[index],
        ...data,
        updatedAt: new Date("2026-05-24T13:00:00.000Z")
      };
      supermarkets[index] = updated;
      return Promise.resolve(updated);
    })
  };

  return {
    prisma: {
      supermarket
    } as unknown as PrismaService,
    supermarket,
    supermarkets
  };
}

describe("SupermarketsService", () => {
  it("creates a supermarket with the default presence radius", async () => {
    const { prisma } = makePrismaMock();
    const service = new SupermarketsService(prisma);

    const created = await service.create("user-1", { name: "Mercado Central" });

    expect(created).toMatchObject({
      name: "Mercado Central",
      presenceRadiusMeters: 500
    });
  });

  it("lists owned active supermarkets with a case-insensitive name filter", async () => {
    const { prisma, supermarket } = makePrismaMock([
      makeSupermarket({ id: "supermarket-1", name: "Mercado Central" }),
      makeSupermarket({ id: "supermarket-2", name: "Atacado Norte" })
    ]);
    const service = new SupermarketsService(prisma);

    const result = await service.list("user-1", "central");

    expect(result.supermarkets.map((item) => item.name)).toEqual(["Mercado Central"]);
    expect(supermarket.findMany).toHaveBeenCalledWith({
      where: {
        ownerUserId: "user-1",
        archivedAt: null,
        name: { contains: "central", mode: Prisma.QueryMode.insensitive }
      },
      orderBy: [{ name: "asc" }]
    });
  });

  it("updates presence radius and coordinates", async () => {
    const { prisma, supermarket, supermarkets } = makePrismaMock([makeSupermarket({ id: "supermarket-1" })]);
    const service = new SupermarketsService(prisma);

    const updated = await service.update("user-1", "supermarket-1", {
      presenceRadiusMeters: 250,
      latitude: "-23.5",
      longitude: "-46.6"
    });

    expect(updated).toMatchObject({
      presenceRadiusMeters: 250,
      latitude: "-23.5",
      longitude: "-46.6"
    });
    expect(supermarkets[0]).toMatchObject({
      presenceRadiusMeters: 250,
      latitude: decimal("-23.5"),
      longitude: decimal("-46.6")
    });
    expect(supermarket.update).toHaveBeenCalledWith({
      where: { id: "supermarket-1" },
      data: {
        presenceRadiusMeters: 250,
        latitude: decimal("-23.5"),
        longitude: decimal("-46.6")
      }
    });
    expect(supermarket.update.mock.calls[0][0].data).not.toHaveProperty("name");
  });

  it("archives a supermarket by setting archivedAt", async () => {
    const { prisma, supermarkets } = makePrismaMock([makeSupermarket({ id: "supermarket-1" })]);
    const service = new SupermarketsService(prisma);

    const archived = await service.archive("user-1", "supermarket-1");

    expect(archived.archivedAt).toEqual(expect.any(String));
    expect(supermarkets[0].archivedAt).toBeInstanceOf(Date);
  });

  it("detects exactly one owned active supermarket inside its own radius", async () => {
    const { prisma } = makePrismaMock([
      makeSupermarket({
        id: "supermarket-1",
        latitude: decimal("-23.5"),
        longitude: decimal("-46.6"),
        presenceRadiusMeters: 100
      }),
      makeSupermarket({
        id: "supermarket-2",
        latitude: decimal("-23.6"),
        longitude: decimal("-46.7"),
        presenceRadiusMeters: 100
      })
    ]);
    const service = new SupermarketsService(prisma);

    const result = await service.detect("user-1", { latitude: "-23.5", longitude: "-46.6" });

    expect(result.status).toBe("detected");
    expect(result.candidates.map((item) => item.id)).toEqual(["supermarket-1"]);
    expect(result.candidates[0].distanceMeters).toBe(0);
  });

  it("returns ambiguous when two owned active supermarkets are inside their radius", async () => {
    const { prisma } = makePrismaMock([
      makeSupermarket({
        id: "supermarket-1",
        latitude: decimal("-23.5"),
        longitude: decimal("-46.6"),
        presenceRadiusMeters: 500
      }),
      makeSupermarket({
        id: "supermarket-2",
        latitude: decimal("-23.5005"),
        longitude: decimal("-46.6005"),
        presenceRadiusMeters: 500
      })
    ]);
    const service = new SupermarketsService(prisma);

    const result = await service.detect("user-1", { latitude: "-23.5", longitude: "-46.6" });

    expect(result.status).toBe("ambiguous");
    expect(result.candidates.map((item) => item.id)).toEqual(["supermarket-1", "supermarket-2"]);
  });

  it("returns unknown when no owned active supermarket matches", async () => {
    const { prisma } = makePrismaMock([
      makeSupermarket({
        id: "supermarket-1",
        latitude: decimal("-23.6"),
        longitude: decimal("-46.7"),
        presenceRadiusMeters: 100
      })
    ]);
    const service = new SupermarketsService(prisma);

    const result = await service.detect("user-1", { latitude: "-23.5", longitude: "-46.6" });

    expect(result).toEqual({ status: "unknown", candidates: [] });
  });

  it("does not allow a user to get another user's supermarket", async () => {
    const { prisma } = makePrismaMock([makeSupermarket({ id: "supermarket-1", ownerUserId: "user-1" })]);
    const service = new SupermarketsService(prisma);

    await expect(service.get("user-2", "supermarket-1")).rejects.toBeInstanceOf(NotFoundException);
  });
});
