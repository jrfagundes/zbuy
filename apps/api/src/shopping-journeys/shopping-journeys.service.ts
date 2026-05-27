import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { SupermarketLayoutsService } from "../supermarket-layouts/supermarket-layouts.service";
import { SupermarketsService } from "../supermarkets/supermarkets.service";
import { StartJourneyStopDto, StartShoppingJourneyDto, UpdateShoppingJourneyStopItemDto } from "./dto";
import { ShoppingJourneyWithRelations, toShoppingJourneyDetailDto } from "./shopping-journey-response";

const sourceListInclude = {
  items: {
    include: { product: true, unit: true },
    orderBy: { sortOrder: "asc" as const }
  }
};

const journeyInclude = {
  sourceList: true,
  items: {
    include: { stopItems: true },
    orderBy: { sortOrder: "asc" as const }
  },
  stops: {
    include: { supermarket: true },
    orderBy: { startedAt: "asc" as const }
  }
};

@Injectable()
export class ShoppingJourneysService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supermarkets: SupermarketsService,
    private readonly layouts: SupermarketLayoutsService
  ) {}

  async start(ownerUserId: string, dto: StartShoppingJourneyDto) {
    const activeJourney = await this.prisma.shoppingJourney.findFirst({ where: { ownerUserId, status: "active" } });
    if (activeJourney) {
      throw new ConflictException("User already has an active shopping journey");
    }

    const sourceList = await this.prisma.shoppingList.findFirst({
      where: { id: dto.sourceListId, ownerUserId, status: "active" },
      include: sourceListInclude
    });
    if (!sourceList) {
      throw new NotFoundException("Shopping list not found");
    }
    if (sourceList.items.length === 0) {
      throw new BadRequestException("Shopping list must have at least one item");
    }

    await this.supermarkets.findOwnedActive(ownerUserId, dto.supermarketId);

    const created = await this.prisma.$transaction(async (tx) => {
      const journey = await tx.shoppingJourney.create({
        data: {
          ownerUserId,
          sourceListId: dto.sourceListId,
          snapshotSourceListName: sourceList.name,
          context: "physical",
          items: {
            create: sourceList.items.map((item) => ({
              sourceProductId: item.productId,
              sourceListItemId: item.id,
              snapshotProductName: item.product.name,
              snapshotCategoryLabel: item.product.categoryLabel,
              snapshotBrand: item.product.brand,
              quantity: item.quantity.toString(),
              unitId: item.unitId,
              snapshotUnitName: item.unit.name,
              snapshotUnitAbbreviation: item.unit.abbreviation,
              expectedPrice: item.expectedPrice?.toString() ?? null,
              priority: item.priority,
              notes: item.notes,
              sortOrder: item.sortOrder
            }))
          }
        },
        include: journeyInclude
      });
      const stop = await tx.shoppingJourneyStop.create({
        data: { journeyId: journey.id, supermarketId: dto.supermarketId }
      });
      await tx.shoppingJourneyStopItem.createMany({
        data: journey.items.map((item) => ({ stopId: stop.id, journeyItemId: item.id, status: "pending" as const }))
      });
      return journey;
    });

    return this.get(ownerUserId, created.id);
  }

  async getActive(ownerUserId: string) {
    const journey = await this.prisma.shoppingJourney.findFirst({
      where: { ownerUserId, status: "active" },
      include: journeyInclude,
      orderBy: { startedAt: "desc" }
    });
    return journey ? this.toDetail(ownerUserId, journey as ShoppingJourneyWithRelations) : null;
  }

  async get(ownerUserId: string, id: string) {
    const journey = await this.findOwnedJourney(ownerUserId, id);
    return this.toDetail(ownerUserId, journey);
  }

  async finishStop(ownerUserId: string, journeyId: string, stopId: string) {
    await this.findOwnedActiveJourney(ownerUserId, journeyId);
    await this.findOwnedActiveStop(journeyId, stopId);
    await this.prisma.shoppingJourneyStop.update({
      where: { id: stopId },
      data: { status: "finished", finishedAt: new Date() }
    });
    return this.get(ownerUserId, journeyId);
  }

  async continueOutsideRadius(ownerUserId: string, journeyId: string, stopId: string) {
    await this.findOwnedActiveJourney(ownerUserId, journeyId);
    await this.findOwnedActiveStop(journeyId, stopId);
    await this.prisma.shoppingJourneyStop.update({
      where: { id: stopId },
      data: { continuedOutsideRadiusAt: new Date() }
    });
    return this.get(ownerUserId, journeyId);
  }

  async switchSupermarket(ownerUserId: string, journeyId: string, stopId: string, dto: StartJourneyStopDto) {
    await this.findOwnedActiveJourney(ownerUserId, journeyId);
    await this.findOwnedSwitchableStop(journeyId, stopId);
    await this.supermarkets.findOwnedActive(ownerUserId, dto.supermarketId);

    await this.prisma.shoppingJourneyStop.update({
      where: { id: stopId },
      data: { status: "finished", finishedAt: new Date() }
    });
    const activeItems = await this.prisma.shoppingJourneyItem.findMany({
      where: { journeyId, finalStatus: "active" },
      orderBy: { sortOrder: "asc" }
    });
    const newStop = await this.prisma.shoppingJourneyStop.create({
      data: { journeyId, supermarketId: dto.supermarketId }
    });
    await this.prisma.shoppingJourneyStopItem.createMany({
      data: activeItems.map((item) => ({ stopId: newStop.id, journeyItemId: item.id, status: "pending" as const }))
    });
    return this.get(ownerUserId, journeyId);
  }

  async updateStopItem(
    ownerUserId: string,
    journeyId: string,
    stopId: string,
    itemId: string,
    dto: UpdateShoppingJourneyStopItemDto
  ) {
    const journey = await this.findOwnedActiveJourney(ownerUserId, journeyId);
    const stop = await this.findOwnedActiveStop(journeyId, stopId);
    const stopItem = await this.prisma.shoppingJourneyStopItem.findFirst({ where: { id: itemId, stopId } });
    if (!stopItem) {
      throw new NotFoundException("Shopping journey stop item not found");
    }
    const journeyItem = journey.items?.find((item) => item.id === stopItem.journeyItemId);
    if (!journeyItem) {
      throw new NotFoundException("Shopping journey item not found");
    }

    const nextStatus = dto.status ?? stopItem.status;
    const actualPrice = Object.prototype.hasOwnProperty.call(dto, "actualPrice") ? cleanOptionalText(dto.actualPrice) : stopItem.actualPrice?.toString() ?? null;
    if (actualPrice && nextStatus !== "bought") {
      throw new BadRequestException("Actual price can only be set for bought items");
    }

    await this.prisma.shoppingJourneyStopItem.update({
      where: { id: itemId },
      data: {
        ...(dto.status !== undefined ? { status: dto.status } : {}),
        ...(Object.prototype.hasOwnProperty.call(dto, "actualPrice")
          ? { actualPrice: nextStatus === "bought" ? actualPrice : null }
          : {}),
        ...(Object.prototype.hasOwnProperty.call(dto, "corridorId") ? { corridorId: dto.corridorId ?? null } : {}),
        ...(Object.prototype.hasOwnProperty.call(dto, "notes") ? { notes: cleanOptionalText(dto.notes) } : {})
      }
    });

    await this.prisma.shoppingJourneyItem.update({
      where: { id: journeyItem.id },
      data:
        nextStatus === "bought"
          ? { finalStatus: "bought", finalActualPrice: actualPrice }
          : { finalStatus: "active", finalActualPrice: null }
    });

    if (dto.corridorId && journeyItem.sourceProductId) {
      await this.layouts.setProductPlacement(ownerUserId, stop.supermarketId, journeyItem.sourceProductId, {
        corridorId: dto.corridorId
      });
    }

    await this.recalculateTotals(journeyId);
    return this.get(ownerUserId, journeyId);
  }

  async complete(ownerUserId: string, journeyId: string) {
    const journey = await this.findOwnedActiveJourney(ownerUserId, journeyId);
    const activeStop = journey.stops?.find((stop) => stop.status === "active");
    if (activeStop) {
      await this.prisma.shoppingJourneyStop.update({
        where: { id: activeStop.id },
        data: { status: "finished", finishedAt: new Date() }
      });
    }
    await this.prisma.shoppingJourneyItem.updateMany({
      where: { journeyId, finalStatus: "active" },
      data: { finalStatus: "unprocessed" }
    });
    const totals = calculateTotals(journey.items ?? []);
    await this.prisma.shoppingJourney.update({
      where: { id: journeyId },
      data: {
        status: "completed",
        completedAt: new Date(),
        knownTotal: totals.knownTotal,
        boughtItemsWithoutPriceCount: totals.boughtItemsWithoutPriceCount
      }
    });
    return this.get(ownerUserId, journeyId);
  }

  async cancel(ownerUserId: string, journeyId: string) {
    const journey = await this.findOwnedActiveJourney(ownerUserId, journeyId);
    const activeStop = journey.stops?.find((stop) => stop.status === "active");
    if (activeStop) {
      await this.prisma.shoppingJourneyStop.update({
        where: { id: activeStop.id },
        data: { status: "canceled" }
      });
    }
    await this.prisma.shoppingJourney.update({
      where: { id: journeyId },
      data: { status: "canceled", canceledAt: new Date() }
    });
    return this.get(ownerUserId, journeyId);
  }

  private async findOwnedJourney(ownerUserId: string, id: string) {
    const journey = await this.prisma.shoppingJourney.findFirst({
      where: { id, ownerUserId },
      include: journeyInclude
    });
    if (!journey) {
      throw new NotFoundException("Shopping journey not found");
    }
    return journey as ShoppingJourneyWithRelations;
  }

  private async findOwnedActiveJourney(ownerUserId: string, id: string) {
    const journey = await this.findOwnedJourney(ownerUserId, id);
    if (journey.status !== "active") {
      throw new BadRequestException("Shopping journey is not active");
    }
    return journey;
  }

  private async findOwnedActiveStop(journeyId: string, stopId: string) {
    const stop = await this.prisma.shoppingJourneyStop.findFirst({ where: { id: stopId, journeyId, status: "active" } });
    if (!stop) {
      throw new NotFoundException("Shopping journey stop not found");
    }
    return stop;
  }

  private async findOwnedSwitchableStop(journeyId: string, stopId: string) {
    const stop = await this.prisma.shoppingJourneyStop.findFirst({ where: { id: stopId, journeyId } });
    if (!stop || stop.status === "canceled") {
      throw new NotFoundException("Shopping journey stop not found");
    }
    return stop;
  }

  private async toDetail(ownerUserId: string, journey: ShoppingJourneyWithRelations) {
    const productIds = (journey.items ?? [])
      .map((item) => item.sourceProductId)
      .filter((productId): productId is string => productId !== null);
    const activeStop = journey.stops?.find((stop) => stop.status === "active");
    const placements =
      activeStop && productIds.length > 0
        ? await this.prisma.privateProductPlacement.findMany({
            where: { ownerUserId, supermarketId: activeStop.supermarketId, productId: { in: productIds } },
            include: { corridor: true }
          })
        : [];
    return toShoppingJourneyDetailDto(journey, placements);
  }

  private async recalculateTotals(journeyId: string) {
    const journey = await this.prisma.shoppingJourney.findFirst({ where: { id: journeyId }, include: journeyInclude });
    if (!journey) {
      throw new NotFoundException("Shopping journey not found");
    }
    const totals = calculateTotals((journey as ShoppingJourneyWithRelations).items ?? []);
    await this.prisma.shoppingJourney.update({ where: { id: journeyId }, data: totals });
  }
}

function calculateTotals(items: Array<{ finalStatus: string; finalActualPrice: Prisma.Decimal | { toString(): string } | string | number | null }>) {
  const boughtItems = items.filter((item) => item.finalStatus === "bought");
  const knownTotal = boughtItems
    .filter((item) => item.finalActualPrice !== null)
    .reduce((total, item) => total.plus(item.finalActualPrice!.toString()), new Prisma.Decimal(0));
  return {
    knownTotal: knownTotal.toString(),
    boughtItemsWithoutPriceCount: boughtItems.filter((item) => item.finalActualPrice === null).length
  };
}

function cleanOptionalText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : null;
}
