import { NotFoundException } from "@nestjs/common";
import type { PrismaService } from "../prisma/prisma.service";
import type { SupermarketsService } from "../supermarkets/supermarkets.service";
import { LayoutConsentService } from "./layout-consent.service";

function makePrismaMock() {
  return {
    layoutContributionConsent: {
      findUnique: jest.fn(),
      upsert: jest.fn()
    },
    supermarketLayoutConsentOverride: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
      deleteMany: jest.fn()
    }
  };
}

function makeService() {
  const prismaMock = makePrismaMock();
  const supermarketsMock = {
    findOwnedActive: jest.fn().mockResolvedValue({ id: "supermarket-1", ownerUserId: "user-1" })
  };
  const service = new LayoutConsentService(
    prismaMock as unknown as PrismaService,
    supermarketsMock as unknown as SupermarketsService
  );

  return { service, prismaMock, supermarketsMock };
}

describe("LayoutConsentService", () => {
  it("defaults missing global consent to disabled", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.layoutContributionConsent.findUnique.mockResolvedValue(null);

    await expect(service.getGlobal("user-1")).resolves.toEqual({
      globalSharedLayoutContributionEnabled: false,
      supermarketOverride: null,
      effectiveSharedLayoutContributionEnabled: false
    });
  });

  it("updates global consent", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.layoutContributionConsent.upsert.mockResolvedValue({
      ownerUserId: "user-1",
      globalSharedLayoutContributionEnabled: true
    });

    const result = await service.updateGlobal("user-1", true);

    expect(result).toEqual({
      globalSharedLayoutContributionEnabled: true,
      supermarketOverride: null,
      effectiveSharedLayoutContributionEnabled: true
    });
    expect(prismaMock.layoutContributionConsent.upsert).toHaveBeenCalledWith({
      where: { ownerUserId: "user-1" },
      create: { ownerUserId: "user-1", globalSharedLayoutContributionEnabled: true },
      update: { globalSharedLayoutContributionEnabled: true }
    });
  });

  it("returns null supermarket override when none exists", async () => {
    const { service, prismaMock, supermarketsMock } = makeService();
    prismaMock.layoutContributionConsent.findUnique.mockResolvedValue({
      ownerUserId: "user-1",
      globalSharedLayoutContributionEnabled: true
    });
    prismaMock.supermarketLayoutConsentOverride.findUnique.mockResolvedValue(null);

    const result = await service.getForSupermarket("user-1", "supermarket-1");

    expect(result).toEqual({
      globalSharedLayoutContributionEnabled: true,
      supermarketOverride: null,
      effectiveSharedLayoutContributionEnabled: true
    });
    expect(supermarketsMock.findOwnedActive).toHaveBeenCalledWith("user-1", "supermarket-1");
  });

  it("uses supermarket override as the effective consent", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.layoutContributionConsent.findUnique.mockResolvedValue({
      ownerUserId: "user-1",
      globalSharedLayoutContributionEnabled: true
    });
    prismaMock.supermarketLayoutConsentOverride.upsert.mockResolvedValue({
      ownerUserId: "user-1",
      supermarketId: "supermarket-1",
      sharedLayoutContributionEnabled: false
    });

    const result = await service.updateForSupermarket("user-1", "supermarket-1", false);

    expect(result).toEqual({
      globalSharedLayoutContributionEnabled: true,
      supermarketOverride: false,
      effectiveSharedLayoutContributionEnabled: false
    });
    expect(prismaMock.supermarketLayoutConsentOverride.upsert).toHaveBeenCalledWith({
      where: { ownerUserId_supermarketId: { ownerUserId: "user-1", supermarketId: "supermarket-1" } },
      create: {
        ownerUserId: "user-1",
        supermarketId: "supermarket-1",
        sharedLayoutContributionEnabled: false
      },
      update: { sharedLayoutContributionEnabled: false }
    });
  });

  it("clears supermarket override and falls back to global consent", async () => {
    const { service, prismaMock } = makeService();
    prismaMock.layoutContributionConsent.findUnique.mockResolvedValue({
      ownerUserId: "user-1",
      globalSharedLayoutContributionEnabled: true
    });
    prismaMock.supermarketLayoutConsentOverride.deleteMany.mockResolvedValue({ count: 1 });

    const result = await service.updateForSupermarket("user-1", "supermarket-1", null);

    expect(result).toEqual({
      globalSharedLayoutContributionEnabled: true,
      supermarketOverride: null,
      effectiveSharedLayoutContributionEnabled: true
    });
    expect(prismaMock.supermarketLayoutConsentOverride.deleteMany).toHaveBeenCalledWith({
      where: { ownerUserId: "user-1", supermarketId: "supermarket-1" }
    });
  });

  it("does not allow another user's supermarket consent to be read or changed", async () => {
    const { service, prismaMock, supermarketsMock } = makeService();
    supermarketsMock.findOwnedActive.mockRejectedValue(new NotFoundException("Supermarket not found"));

    await expect(service.getForSupermarket("user-2", "supermarket-1")).rejects.toBeInstanceOf(NotFoundException);
    await expect(service.updateForSupermarket("user-2", "supermarket-1", true)).rejects.toBeInstanceOf(
      NotFoundException
    );
    expect(prismaMock.supermarketLayoutConsentOverride.findUnique).not.toHaveBeenCalled();
    expect(prismaMock.supermarketLayoutConsentOverride.upsert).not.toHaveBeenCalled();
  });
});
