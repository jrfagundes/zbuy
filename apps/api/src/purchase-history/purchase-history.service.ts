import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, type PurchaseLocation, type ShoppingSession, type ShoppingSessionItem } from "@prisma/client";
import type {
  PurchaseLocationDto,
  ShoppingJourneyDetailDto,
  ShoppingJourneyHistoryStopDto,
  ShoppingSessionDetailDto,
  ShoppingSessionSummaryDto
} from "@zbuy/shared";
import { PrismaService } from "../prisma/prisma.service";
import { toPurchaseLocationDto } from "../purchase-locations/purchase-location-response";
import { toShoppingJourneyDetailDto } from "../shopping-journeys/shopping-journey-response";
import {
  toShoppingSessionDetailDto,
  toShoppingSessionItemDto,
  toShoppingSessionSummaryDto
} from "../shopping-sessions/shopping-session-response";
import type { PurchaseHistoryQueryDto } from "./dto";

const sessionInclude = {
  purchaseLocation: true,
  sourceList: true,
  items: { orderBy: { sortOrder: "asc" as const } }
};

const itemInclude = {
  session: {
    include: {
      purchaseLocation: true,
      sourceList: true
    }
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

const journeyStopInclude = {
  supermarket: true,
  journey: { include: { items: true } },
  items: { include: { journeyItem: true } }
};

const journeyStopItemInclude = {
  journeyItem: true,
  stop: {
    include: {
      supermarket: true,
      journey: true
    }
  }
};

type PurchaseHistoryItemRecord = ShoppingSessionItem & {
  session: ShoppingSession & {
    snapshotSourceListName: string;
    purchaseLocation: PurchaseLocation;
  };
};

export interface PurchaseHistoryItemDto {
  id: string;
  sourceProductId: string | null;
  sourceListItemId: string | null;
  snapshotProductName: string;
  snapshotCategoryLabel: string;
  snapshotBrand: string | null;
  quantity: string;
  unitId: string | null;
  snapshotUnitName: string;
  snapshotUnitAbbreviation: string;
  expectedPrice: string | null;
  actualPrice: string | null;
  status: "bought" | "not_found" | "unprocessed" | "pending";
  priority: "low" | "normal" | "high";
  notes: string | null;
  sortOrder: number;
  session: {
    id: string;
    completedAt: string;
    context: "physical" | "online";
    sourceListId: string;
    sourceListName: string;
    purchaseLocation: PurchaseLocationDto;
  };
}

export interface PurchaseHistoryJourneyItemDto {
  id: string;
  sourceProductId: string | null;
  sourceListItemId: string | null;
  snapshotProductName: string;
  snapshotCategoryLabel: string;
  snapshotBrand: string | null;
  quantity: string;
  unitId: string | null;
  snapshotUnitName: string;
  snapshotUnitAbbreviation: string;
  expectedPrice: string | null;
  actualPrice: string | null;
  status: "bought" | "not_found" | "unprocessed" | "pending";
  priority: "low" | "normal" | "high";
  notes: string | null;
  sortOrder: number;
  stop: {
    id: string;
    journeyId: string;
    supermarketId: string;
    supermarketName: string;
    completedAt: string;
    sourceListId: string;
    sourceListName: string;
  };
}

@Injectable()
export class PurchaseHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async listSessions(
    ownerUserId: string,
    filters: PurchaseHistoryQueryDto = {}
  ): Promise<{ shoppingSessions: ShoppingSessionSummaryDto[] }> {
    const sessions = await this.prisma.shoppingSession.findMany({
      where: buildSessionWhere(ownerUserId, filters),
      include: sessionInclude,
      orderBy: { completedAt: "desc" }
    });

    return { shoppingSessions: sessions.map((session) => toShoppingSessionSummaryDto(session)) };
  }

  async getSession(ownerUserId: string, id: string): Promise<ShoppingSessionDetailDto> {
    const session = await this.prisma.shoppingSession.findFirst({
      where: {
        id,
        ownerUserId,
        status: "completed"
      },
      include: sessionInclude
    });
    if (!session) {
      throw new NotFoundException("Purchase history session not found");
    }

    return toShoppingSessionDetailDto(session);
  }

  async listItems(ownerUserId: string, filters: PurchaseHistoryQueryDto = {}): Promise<{ purchaseHistoryItems: PurchaseHistoryItemDto[] }> {
    const items = await this.prisma.shoppingSessionItem.findMany({
      where: {
        ...buildItemWhere(filters),
        session: buildSessionWhere(ownerUserId, filters, { includeItemFilters: false })
      },
      include: itemInclude,
      orderBy: [{ session: { completedAt: "desc" } }, { sortOrder: "asc" }]
    });

    return { purchaseHistoryItems: items.map(toPurchaseHistoryItemDto) };
  }

  async listJourneyStops(
    ownerUserId: string,
    filters: PurchaseHistoryQueryDto = {}
  ): Promise<{ shoppingJourneyStops: ShoppingJourneyHistoryStopDto[] }> {
    const stops = await this.prisma.shoppingJourneyStop.findMany({
      where: buildJourneyStopWhere(ownerUserId, filters),
      include: journeyStopInclude,
      orderBy: [{ journey: { completedAt: "desc" } }, { startedAt: "asc" }]
    });

    return { shoppingJourneyStops: stops.map(toShoppingJourneyHistoryStopDto) };
  }

  async getJourney(ownerUserId: string, id: string): Promise<ShoppingJourneyDetailDto> {
    const journey = await this.prisma.shoppingJourney.findFirst({
      where: { id, ownerUserId, status: "completed" },
      include: journeyInclude
    });
    if (!journey) {
      throw new NotFoundException("Purchase history journey not found");
    }

    return toShoppingJourneyDetailDto(journey);
  }

  async listJourneyItems(
    ownerUserId: string,
    filters: PurchaseHistoryQueryDto = {}
  ): Promise<{ purchaseHistoryJourneyItems: PurchaseHistoryJourneyItemDto[] }> {
    const items = await this.prisma.shoppingJourneyStopItem.findMany({
      where: {
        ...buildJourneyStopItemWhere(filters),
        stop: buildJourneyStopWhere(ownerUserId, filters, { includeItemFilters: false })
      },
      include: journeyStopItemInclude,
      orderBy: [{ stop: { journey: { completedAt: "desc" } } }, { journeyItem: { sortOrder: "asc" } }]
    });

    return { purchaseHistoryJourneyItems: items.map(toPurchaseHistoryJourneyItemDto) };
  }
}

function buildSessionWhere(
  ownerUserId: string,
  filters: PurchaseHistoryQueryDto,
  options: { includeItemFilters?: boolean } = {}
): Prisma.ShoppingSessionWhereInput {
  const where: Prisma.ShoppingSessionWhereInput = {
    ownerUserId,
    status: "completed",
    ...(filters.locationId ? { purchaseLocationId: filters.locationId } : {}),
    ...(filters.locationType ? { purchaseLocation: { type: filters.locationType } } : {}),
    ...(filters.sourceListId ? { sourceListId: filters.sourceListId } : {})
  };

  const completedAt = buildDateRange(filters);
  if (completedAt) {
    where.completedAt = completedAt;
  }

  const itemWhere = buildItemWhere(filters);
  if (options.includeItemFilters !== false && hasWhereConditions(itemWhere)) {
    where.items = { some: itemWhere };
  }

  return where;
}

function buildItemWhere(filters: PurchaseHistoryQueryDto): Prisma.ShoppingSessionItemWhereInput {
  const and: Prisma.ShoppingSessionItemWhereInput[] = [];
  const productQuery = filters.productQuery?.trim();

  if (productQuery) {
    and.push({ snapshotProductName: { contains: productQuery, mode: "insensitive" } });
  }
  if (filters.itemStatus) {
    and.push({ status: filters.itemStatus });
  }
  if (filters.withoutPrice === "true") {
    and.push({ status: "bought" }, { actualPrice: null });
  }

  const actualPrice = buildPriceRange(filters);
  if (actualPrice) {
    and.push({ status: "bought" }, { actualPrice });
  }

  return and.length > 0 ? { AND: and } : {};
}

function buildJourneyStopWhere(
  ownerUserId: string,
  filters: PurchaseHistoryQueryDto,
  options: { includeItemFilters?: boolean } = {}
): Prisma.ShoppingJourneyStopWhereInput {
  const journey: Prisma.ShoppingJourneyWhereInput = {
    ownerUserId,
    status: "completed",
    ...(filters.sourceListId ? { sourceListId: filters.sourceListId } : {})
  };
  const completedAt = buildDateRange(filters);
  if (completedAt) {
    journey.completedAt = completedAt;
  }

  const where: Prisma.ShoppingJourneyStopWhereInput = {
    journey,
    ...(filters.locationId ? { supermarketId: filters.locationId } : {}),
    ...(filters.locationType === "online" ? { supermarketId: "__online_purchase_without_supermarket__" } : {})
  };

  const itemWhere = buildJourneyStopItemWhere(filters);
  if (options.includeItemFilters !== false && hasWhereConditions(itemWhere)) {
    where.items = { some: itemWhere };
  }

  return where;
}

function buildJourneyStopItemWhere(filters: PurchaseHistoryQueryDto): Prisma.ShoppingJourneyStopItemWhereInput {
  const and: Prisma.ShoppingJourneyStopItemWhereInput[] = [];
  const productQuery = filters.productQuery?.trim();

  if (productQuery) {
    and.push({ journeyItem: { snapshotProductName: { contains: productQuery, mode: "insensitive" } } });
  }
  if (filters.itemStatus) {
    and.push({ status: filters.itemStatus });
  }
  if (filters.withoutPrice === "true") {
    and.push({ status: "bought" }, { actualPrice: null });
  }

  const actualPrice = buildPriceRange(filters);
  if (actualPrice) {
    and.push({ status: "bought" }, { actualPrice });
  }

  return and.length > 0 ? { AND: and } : {};
}

function buildDateRange(filters: PurchaseHistoryQueryDto): Prisma.DateTimeNullableFilter | undefined {
  const range: Prisma.DateTimeNullableFilter = {};
  if (filters.dateFrom) {
    range.gte = new Date(filters.dateFrom);
  }
  if (filters.dateTo) {
    range.lte = new Date(filters.dateTo);
  }
  return Object.keys(range).length > 0 ? range : undefined;
}

function buildPriceRange(filters: PurchaseHistoryQueryDto): Prisma.DecimalNullableFilter | undefined {
  const range: Prisma.DecimalNullableFilter = {};
  if (filters.minPrice) {
    range.gte = filters.minPrice;
  }
  if (filters.maxPrice) {
    range.lte = filters.maxPrice;
  }
  return Object.keys(range).length > 0 ? range : undefined;
}

function hasWhereConditions(where: Record<string, unknown>) {
  return Object.keys(where).length > 0;
}

function toShoppingJourneyHistoryStopDto(stop: any): ShoppingJourneyHistoryStopDto {
  return {
    id: stop.id,
    supermarketId: stop.supermarketId,
    supermarketName: stop.supermarket.name,
    status: stop.status,
    startedAt: stop.startedAt.toISOString(),
    finishedAt: stop.finishedAt?.toISOString() ?? null,
    exitDetectedAt: stop.exitDetectedAt?.toISOString() ?? null,
    continuedOutsideRadiusAt: stop.continuedOutsideRadiusAt?.toISOString() ?? null,
    journeyId: stop.journeyId,
    sourceListId: stop.journey.sourceListId,
    sourceListName: stop.journey.snapshotSourceListName,
    knownTotal: stop.journey.knownTotal.toString(),
    boughtItemsWithoutPriceCount: stop.journey.boughtItemsWithoutPriceCount,
    itemCounts: countJourneyStopItems(stop.items ?? [])
  };
}

function countJourneyStopItems(items: Array<{ status: string }>) {
  return items.reduce(
    (counts, item) => {
      if (item.status === "bought") counts.bought += 1;
      if (item.status === "not_found") counts.notFound += 1;
      if (item.status === "unprocessed") counts.unprocessed += 1;
      return counts;
    },
    { bought: 0, notFound: 0, unprocessed: 0 }
  );
}

function toPurchaseHistoryJourneyItemDto(item: any): PurchaseHistoryJourneyItemDto {
  const journeyItem = item.journeyItem;
  return {
    id: item.id,
    sourceProductId: journeyItem.sourceProductId,
    sourceListItemId: journeyItem.sourceListItemId,
    snapshotProductName: journeyItem.snapshotProductName,
    snapshotCategoryLabel: journeyItem.snapshotCategoryLabel,
    snapshotBrand: journeyItem.snapshotBrand,
    quantity: journeyItem.quantity.toString(),
    unitId: journeyItem.unitId,
    snapshotUnitName: journeyItem.snapshotUnitName,
    snapshotUnitAbbreviation: journeyItem.snapshotUnitAbbreviation,
    expectedPrice: journeyItem.expectedPrice?.toString() ?? null,
    actualPrice: item.actualPrice?.toString() ?? null,
    status: item.status,
    priority: journeyItem.priority,
    notes: item.notes ?? journeyItem.notes,
    sortOrder: journeyItem.sortOrder,
    stop: {
      id: item.stop.id,
      journeyId: item.stop.journeyId,
      supermarketId: item.stop.supermarketId,
      supermarketName: item.stop.supermarket.name,
      completedAt: item.stop.journey.completedAt?.toISOString() ?? "",
      sourceListId: item.stop.journey.sourceListId,
      sourceListName: item.stop.journey.snapshotSourceListName
    }
  };
}

function toPurchaseHistoryItemDto(item: PurchaseHistoryItemRecord): PurchaseHistoryItemDto {
  const dto = toShoppingSessionItemDto(item);

  return {
    ...dto,
    session: {
      id: item.session.id,
      completedAt: item.session.completedAt?.toISOString() ?? "",
      context: item.session.context,
      sourceListId: item.session.sourceListId,
      sourceListName: item.session.snapshotSourceListName,
      purchaseLocation: toPurchaseLocationDto(item.session.purchaseLocation)
    }
  };
}
