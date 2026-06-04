import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, type ShoppingSessionItem } from "@prisma/client";
import type { ShoppingListDetailDto } from "@zbuy/shared";
import { PrismaService } from "../prisma/prisma.service";
import { PurchaseLocationsService } from "../purchase-locations/purchase-locations.service";
import { toShoppingListDetailDto } from "../shopping-lists/shopping-list-response";
import { CreateContinuationListDto, StartShoppingSessionDto, UpdateShoppingSessionItemDto } from "./dto";
import type { ShoppingSessionWithRelations } from "./shopping-session-response";
import { toShoppingSessionDetailDto, toShoppingSessionSummaryDto } from "./shopping-session-response";

const sessionInclude = {
  purchaseLocation: true,
  sourceList: true,
  items: { orderBy: { sortOrder: "asc" as const } }
};

const sourceListInclude = {
  items: {
    include: { product: true, unit: true },
    orderBy: { sortOrder: "asc" as const }
  }
};

const continuationListInclude = {
  items: {
    include: { product: true, unit: true },
    orderBy: { sortOrder: "asc" as const }
  },
  _count: { select: { items: true } }
};

@Injectable()
export class ShoppingSessionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly purchaseLocations: PurchaseLocationsService
  ) {}

  async start(ownerUserId: string, dto: StartShoppingSessionDto) {
    const activeSession = await this.prisma.shoppingSession.findFirst({
      where: { ownerUserId, status: "active" }
    });
    if (activeSession) {
      throw new ConflictException("User already has an active shopping session");
    }

    const sourceList = await this.prisma.shoppingList.findFirst({
      where: { id: dto.sourceListId, ownerUserId },
      include: sourceListInclude
    });
    if (!sourceList) {
      throw new NotFoundException("Shopping list not found");
    }
    if (sourceList.items.length === 0) {
      throw new BadRequestException("Shopping list must have at least one item");
    }

    const purchaseLocation = await this.purchaseLocations.findOwned(ownerUserId, dto.purchaseLocationId);
    if (purchaseLocation.archivedAt) {
      throw new BadRequestException("Purchase location is archived");
    }
    if (dto.context !== purchaseLocation.type) {
      throw new BadRequestException("Shopping session context must match purchase location type");
    }

    try {
      const session = await this.prisma.shoppingSession.create({
        data: {
          ownerUserId,
          sourceListId: dto.sourceListId,
          snapshotSourceListName: sourceList.name,
          purchaseLocationId: dto.purchaseLocationId,
          context: dto.context,
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
        include: sessionInclude
      });

      return toShoppingSessionDetailDto(session);
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        throw new BadRequestException("User already has an active shopping session");
      }
      throw error;
    }
  }

  async list(ownerUserId: string, status?: string, limit?: number) {
    const sessions = await this.prisma.shoppingSession.findMany({
      where: {
        ownerUserId,
        ...(status === "active" || status === "completed" || status === "canceled" ? { status } : {})
      },
      include: sessionInclude,
      orderBy: { startedAt: "desc" },
      ...(Number.isFinite(limit) && limit && limit > 0 ? { take: limit } : {})
    });

    return { shoppingSessions: sessions.map((session) => toShoppingSessionSummaryDto(session)) };
  }

  async getActive(ownerUserId: string) {
    const session = await this.prisma.shoppingSession.findFirst({
      where: { ownerUserId, status: "active" },
      include: sessionInclude,
      orderBy: { startedAt: "desc" }
    });
    return session ? toShoppingSessionDetailDto(session) : null;
  }

  async get(ownerUserId: string, id: string) {
    const session = await this.findOwnedSession(ownerUserId, id);
    return toShoppingSessionDetailDto(session);
  }

  async updateItem(ownerUserId: string, sessionId: string, itemId: string, dto: UpdateShoppingSessionItemDto) {
    const session = await this.findOwnedSession(ownerUserId, sessionId);
    ensureActiveSession(session);

    const item = await this.prisma.shoppingSessionItem.findFirst({ where: { id: itemId, sessionId } });
    if (!item) {
      throw new NotFoundException("Shopping session item not found");
    }

    const data: {
      status?: "pending" | "bought" | "not_found";
      actualPrice?: string | null;
      notes?: string | null;
    } = {};
    const nextStatus = dto.status ?? item.status;
    if (dto.status !== undefined) {
      data.status = dto.status;
      if (dto.status !== "bought") {
        data.actualPrice = null;
      }
    }
    if (Object.prototype.hasOwnProperty.call(dto, "actualPrice")) {
      const actualPrice = cleanOptionalText(dto.actualPrice);
      if (actualPrice && nextStatus !== "bought") {
        throw new BadRequestException("Actual price can only be set for bought items");
      }
      data.actualPrice = actualPrice;
    }
    if (Object.prototype.hasOwnProperty.call(dto, "notes")) {
      data.notes = cleanOptionalText(dto.notes);
    }

    await this.prisma.shoppingSessionItem.update({
      where: { id: itemId },
      data
    });

    await this.recalculateTotals(sessionId);
    return this.get(ownerUserId, sessionId);
  }

  async complete(ownerUserId: string, id: string) {
    return this.prisma.$transaction(async (tx) => {
      const session = await tx.shoppingSession.findFirst({
        where: { id, ownerUserId },
        include: sessionInclude
      });
      if (!session) {
        throw new NotFoundException("Shopping session not found");
      }
      ensureActiveSession(session);

      await tx.shoppingSessionItem.updateMany({
        where: { sessionId: id, status: "pending" },
        data: { status: "unprocessed", actualPrice: null }
      });

      const totals = calculateTotals(
        (session.items ?? []).map((item) => (item.status === "pending" ? { ...item, status: "unprocessed" } : item))
      );
      const updated = await tx.shoppingSession.update({
        where: { id },
        data: {
          status: "completed",
          completedAt: new Date(),
          knownTotal: totals.knownTotal,
          boughtItemsWithoutPriceCount: totals.boughtItemsWithoutPriceCount
        },
        include: sessionInclude
      });

      return toShoppingSessionDetailDto(updated);
    });
  }

  async cancel(ownerUserId: string, id: string) {
    const session = await this.findOwnedSession(ownerUserId, id);
    ensureActiveSession(session);

    const updated = await this.prisma.shoppingSession.update({
      where: { id },
      data: {
        status: "canceled",
        canceledAt: new Date()
      },
      include: sessionInclude
    });

    return toShoppingSessionDetailDto(updated);
  }

  async createContinuationList(
    ownerUserId: string,
    sessionId: string,
    dto: CreateContinuationListDto
  ): Promise<ShoppingListDetailDto> {
    const session = await this.findOwnedSession(ownerUserId, sessionId);
    if (session.status !== "completed") {
      throw new BadRequestException("Only completed sessions can create continuation lists");
    }

    const continuationItems = (session.items ?? []).filter((item) => item.status === "not_found" || item.status === "unprocessed");
    if (continuationItems.length === 0) {
      throw new BadRequestException("No items available for continuation");
    }
    if (continuationItems.some((item) => !item.sourceProductId || !item.unitId)) {
      throw new BadRequestException("Continuation items must keep product and unit references");
    }

    const name = dto.name?.trim() || `${session.sourceList.name} - continuação`;
    const list = await this.prisma.shoppingList.create({
      data: {
        ownerUserId,
        name,
        description: null,
        duplicatedFromListId: session.sourceListId,
        items: {
          create: continuationItems.map((item) => ({
            productId: item.sourceProductId as string,
            quantity: item.quantity.toString(),
            unitId: item.unitId as string,
            expectedPrice: item.expectedPrice?.toString() ?? null,
            priority: item.priority,
            notes: item.notes,
            sortOrder: item.sortOrder
          }))
        }
      },
      include: continuationListInclude
    });

    return toShoppingListDetailDto(list, ownerUserId);
  }

  private async findOwnedSession(ownerUserId: string, id: string): Promise<ShoppingSessionWithRelations> {
    const session = await this.prisma.shoppingSession.findFirst({
      where: { id, ownerUserId },
      include: sessionInclude
    });
    if (!session) {
      throw new NotFoundException("Shopping session not found");
    }
    return session;
  }

  private async recalculateTotals(sessionId: string) {
    const session = await this.prisma.shoppingSession.findFirst({
      where: { id: sessionId },
      include: sessionInclude
    });
    if (!session) {
      throw new NotFoundException("Shopping session not found");
    }

    const totals = calculateTotals(session.items);
    await this.prisma.shoppingSession.update({
      where: { id: sessionId },
      data: totals
    });
  }
}

function ensureActiveSession(session: { status: string }) {
  if (session.status !== "active") {
    throw new BadRequestException("Shopping session is not active");
  }
}

function isUniqueConstraintError(error: unknown) {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

function calculateTotals(items: Array<Pick<ShoppingSessionItem, "status" | "actualPrice">>) {
  const boughtItems = items.filter((item) => item.status === "bought");
  const knownTotal = boughtItems
    .filter((item) => item.actualPrice !== null)
    .reduce((total, item) => total.plus(item.actualPrice!), new Prisma.Decimal(0));
  const boughtItemsWithoutPriceCount = boughtItems.filter((item) => item.actualPrice === null).length;

  return {
    knownTotal: knownTotal.toString(),
    boughtItemsWithoutPriceCount
  };
}

function cleanOptionalText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : null;
}
