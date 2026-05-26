import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SupermarketsService } from "../supermarkets/supermarkets.service";
import { toLayoutContributionConsentDto } from "./layout-consent-response";

@Injectable()
export class LayoutConsentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supermarkets: SupermarketsService
  ) {}

  async getGlobal(ownerUserId: string) {
    return toLayoutContributionConsentDto({
      globalSharedLayoutContributionEnabled: await this.getGlobalEnabled(ownerUserId)
    });
  }

  async updateGlobal(ownerUserId: string, enabled: boolean) {
    const consent = await this.prisma.layoutContributionConsent.upsert({
      where: { ownerUserId },
      create: { ownerUserId, globalSharedLayoutContributionEnabled: enabled },
      update: { globalSharedLayoutContributionEnabled: enabled }
    });

    return toLayoutContributionConsentDto({
      globalSharedLayoutContributionEnabled: consent.globalSharedLayoutContributionEnabled
    });
  }

  async getForSupermarket(ownerUserId: string, supermarketId: string) {
    await this.supermarkets.findOwnedActive(ownerUserId, supermarketId);
    const [globalEnabled, override] = await Promise.all([
      this.getGlobalEnabled(ownerUserId),
      this.prisma.supermarketLayoutConsentOverride.findUnique({
        where: { ownerUserId_supermarketId: { ownerUserId, supermarketId } }
      })
    ]);

    return toLayoutContributionConsentDto({
      globalSharedLayoutContributionEnabled: globalEnabled,
      supermarketOverride: override?.sharedLayoutContributionEnabled ?? null
    });
  }

  async updateForSupermarket(ownerUserId: string, supermarketId: string, override: boolean | null) {
    await this.supermarkets.findOwnedActive(ownerUserId, supermarketId);
    const globalEnabled = await this.getGlobalEnabled(ownerUserId);

    if (override === null) {
      await this.prisma.supermarketLayoutConsentOverride.deleteMany({
        where: { ownerUserId, supermarketId }
      });
      return toLayoutContributionConsentDto({
        globalSharedLayoutContributionEnabled: globalEnabled,
        supermarketOverride: null
      });
    }

    const persistedOverride = await this.prisma.supermarketLayoutConsentOverride.upsert({
      where: { ownerUserId_supermarketId: { ownerUserId, supermarketId } },
      create: {
        ownerUserId,
        supermarketId,
        sharedLayoutContributionEnabled: override
      },
      update: { sharedLayoutContributionEnabled: override }
    });

    return toLayoutContributionConsentDto({
      globalSharedLayoutContributionEnabled: globalEnabled,
      supermarketOverride: persistedOverride.sharedLayoutContributionEnabled
    });
  }

  private async getGlobalEnabled(ownerUserId: string) {
    const consent = await this.prisma.layoutContributionConsent.findUnique({
      where: { ownerUserId }
    });
    return consent?.globalSharedLayoutContributionEnabled ?? false;
  }
}
