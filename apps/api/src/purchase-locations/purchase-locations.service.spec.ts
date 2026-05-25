import { BadRequestException, ConflictException, NotFoundException } from "@nestjs/common";
import type { PurchaseLocation } from "@prisma/client";
import type { PrismaService } from "../prisma/prisma.service";
import { PurchaseLocationsService } from "./purchase-locations.service";

type PurchaseLocationRecord = PurchaseLocation;

function makeLocation(overrides: Partial<PurchaseLocationRecord> = {}): PurchaseLocationRecord {
  const now = new Date("2026-05-24T12:00:00.000Z");
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

function makePrismaMock(initialLocations: PurchaseLocationRecord[] = []) {
  const locations = [...initialLocations];

  const purchaseLocation = {
    findMany: jest.fn(({ where }) => {
      const query = where.name?.contains?.toLowerCase();
      return Promise.resolve(
        locations
          .filter((location) => location.ownerUserId === where.ownerUserId)
          .filter((location) => (where.archivedAt === null ? location.archivedAt === null : true))
          .filter((location) => (where.type ? location.type === where.type : true))
          .filter((location) => (query ? location.name.toLowerCase().includes(query) : true))
          .sort((a, b) => a.name.localeCompare(b.name))
      );
    }),
    create: jest.fn(({ data }) => {
      const now = new Date("2026-05-24T12:00:00.000Z");
      const location = makeLocation({
        id: `location-${locations.length + 1}`,
        createdAt: now,
        updatedAt: now,
        ...data
      });
      locations.push(location);
      return Promise.resolve(location);
    }),
    findFirst: jest.fn(({ where }) => {
      return Promise.resolve(
        locations.find((location) => location.id === where.id && location.ownerUserId === where.ownerUserId) ?? null
      );
    }),
    update: jest.fn(({ where, data }) => {
      const index = locations.findIndex((location) => location.id === where.id);
      if (index === -1) {
        throw new Error("Location not found in mock");
      }
      const updated = {
        ...locations[index],
        ...data,
        updatedAt: new Date("2026-05-24T13:00:00.000Z")
      };
      locations[index] = updated;
      return Promise.resolve(updated);
    })
  };

  return {
    prisma: {
      purchaseLocation,
      shoppingSession: {
        count: jest.fn(({ where }) =>
          Promise.resolve(where.purchaseLocationId === "location-with-history" || where.purchaseLocationId === "location-1" ? 0 : 0)
        )
      }
    } as unknown as PrismaService,
    purchaseLocation,
    locations
  };
}

describe("PurchaseLocationsService", () => {
  it("creates, lists, updates, and archives a physical location owned by the user", async () => {
    const { prisma, locations } = makePrismaMock();
    const service = new PurchaseLocationsService(prisma);

    const created = await service.create("user-1", {
      type: "physical",
      name: "  Mercado Central  ",
      address: "  Rua 1  ",
      city: "",
      websiteOrApp: "   ",
      notes: " Perto de casa "
    });

    expect(created).toMatchObject({
      id: "location-1",
      type: "physical",
      name: "Mercado Central",
      address: "Rua 1",
      city: null,
      websiteOrApp: null,
      notes: "Perto de casa",
      archivedAt: null
    });

    await service.create("user-1", {
      type: "physical",
      name: "Atacado Norte",
      address: null,
      city: null,
      websiteOrApp: null,
      notes: null
    });

    const filtered = await service.list("user-1", "physical", "mercado");
    expect(filtered.purchaseLocations.map((location) => location.name)).toEqual(["Mercado Central"]);

    const updated = await service.update("user-1", created.id, {
      type: "physical",
      name: " Mercado Central Renovado ",
      address: null,
      city: " Centro ",
      websiteOrApp: null,
      notes: ""
    });
    expect(updated).toMatchObject({
      name: "Mercado Central Renovado",
      city: "Centro",
      notes: null
    });

    const archived = await service.archive("user-1", created.id);
    expect(archived.archivedAt).toEqual(expect.any(String));
    expect(locations.find((location) => location.id === created.id)?.archivedAt).toBeInstanceOf(Date);
  });

  it("creates an online location", async () => {
    const { prisma } = makePrismaMock();
    const service = new PurchaseLocationsService(prisma);

    const created = await service.create("user-1", {
      type: "online",
      name: " ZBuy App ",
      address: null,
      city: null,
      websiteOrApp: " https://app.example.com ",
      notes: null
    });

    expect(created).toMatchObject({
      type: "online",
      name: "ZBuy App",
      websiteOrApp: "https://app.example.com"
    });
  });

  it("does not allow a user to access another user's location", async () => {
    const { prisma } = makePrismaMock([makeLocation({ id: "other-location", ownerUserId: "user-2" })]);
    const service = new PurchaseLocationsService(prisma);

    await expect(service.get("user-1", "other-location")).rejects.toBeInstanceOf(NotFoundException);
    await expect(
      service.update("user-1", "other-location", {
        type: "physical",
        name: "Mercado",
        address: null,
        city: null,
        websiteOrApp: null,
        notes: null
      })
    ).rejects.toBeInstanceOf(NotFoundException);
    await expect(service.archive("user-1", "other-location")).rejects.toBeInstanceOf(NotFoundException);
  });

  it("excludes archived locations from the default list", async () => {
    const { prisma } = makePrismaMock([
      makeLocation({ id: "active-location", name: "Active Store", archivedAt: null }),
      makeLocation({ id: "archived-location", name: "Archived Store", archivedAt: new Date("2026-05-24T10:00:00.000Z") })
    ]);
    const service = new PurchaseLocationsService(prisma);

    const result = await service.list("user-1");

    expect(result.purchaseLocations.map((location) => location.id)).toEqual(["active-location"]);
  });

  it("rejects an empty name after trimming", async () => {
    const { prisma } = makePrismaMock();
    const service = new PurchaseLocationsService(prisma);

    await expect(
      service.create("user-1", {
        type: "physical",
        name: "   ",
        address: null,
        city: null,
        websiteOrApp: null,
        notes: null
      })
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it("does not allow updating a location that already has shopping sessions", async () => {
    const { prisma } = makePrismaMock([makeLocation({ id: "location-with-history" })]);
    jest.spyOn(prisma.shoppingSession, "count").mockResolvedValue(1);
    const service = new PurchaseLocationsService(prisma);

    await expect(
      service.update("user-1", "location-with-history", {
        type: "online",
        name: "Online Market",
        address: null,
        city: null,
        websiteOrApp: "app",
        notes: null
      })
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
