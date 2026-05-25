import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, type PurchaseLocation, type ShoppingSession, type ShoppingSessionItem } from "@prisma/client";
import type { PurchaseLocationDto, ShoppingSessionDetailDto, ShoppingSessionSummaryDto } from "@zbuy/shared";
import { PrismaService } from "../prisma/prisma.service";
import { toPurchaseLocationDto } from "../purchase-locations/purchase-location-response";
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
    and.push({ actualPrice });
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

function hasWhereConditions(where: Prisma.ShoppingSessionItemWhereInput) {
  return Object.keys(where).length > 0;
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
