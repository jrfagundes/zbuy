import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { MailService } from "../mail/mail.service";
import { PrismaService } from "../prisma/prisma.service";
import { ReorderShoppingListItemsDto, UpsertShoppingListDto, UpsertShoppingListItemDto } from "./dto";
import { toShoppingListDetailDto, toShoppingListShareDto, toShoppingListSummaryDto } from "./shopping-list-response";

const listDetailInclude = {
  items: {
    include: { product: true, unit: true },
    orderBy: { sortOrder: "asc" as const }
  },
  owner: { select: { name: true } },
  _count: { select: { items: true, shares: true } }
};

@Injectable()
export class ShoppingListsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService
  ) {}

  async list(userId: string, includeArchived = false) {
    const shoppingLists = await this.prisma.shoppingList.findMany({
      where: {
        OR: [{ ownerUserId: userId }, { shares: { some: { userId } } }],
        ...(includeArchived ? {} : { status: "active" as const })
      },
      include: {
        owner: { select: { name: true } },
        _count: { select: { items: true, shares: true } }
      },
      orderBy: [{ updatedAt: "desc" }, { name: "asc" }]
    });
    return { shoppingLists: shoppingLists.map((list) => toShoppingListSummaryDto(list, userId)) };
  }

  async create(ownerUserId: string, dto: UpsertShoppingListDto) {
    const list = await this.prisma.shoppingList.create({
      data: {
        ownerUserId,
        name: dto.name.trim(),
        description: cleanOptionalText(dto.description)
      },
      include: listDetailInclude
    });
    return toShoppingListDetailDto(list, ownerUserId);
  }

  async get(userId: string, id: string) {
    const list = await this.findAccessibleList(userId, id);
    return toShoppingListDetailDto(list, userId);
  }

  async update(userId: string, id: string, dto: UpsertShoppingListDto) {
    await this.findAccessibleList(userId, id);
    const list = await this.prisma.shoppingList.update({
      where: { id },
      data: {
        name: dto.name.trim(),
        description: cleanOptionalText(dto.description)
      },
      include: listDetailInclude
    });
    return toShoppingListDetailDto(list, userId);
  }

  async archive(ownerUserId: string, id: string) {
    await this.findOwnedList(ownerUserId, id);
    const list = await this.prisma.shoppingList.update({
      where: { id },
      data: { status: "archived" },
      include: listDetailInclude
    });
    return toShoppingListDetailDto(list, ownerUserId);
  }

  async delete(ownerUserId: string, id: string) {
    await this.findOwnedList(ownerUserId, id);
    const sessionCount = await this.prisma.shoppingSession.count({ where: { sourceListId: id } });
    if (sessionCount > 0) {
      throw new ConflictException("Shopping list with shopping sessions cannot be deleted");
    }
    await this.prisma.shoppingList.delete({ where: { id } });
  }

  async duplicate(userId: string, id: string) {
    const source = await this.findAccessibleList(userId, id);
    const duplicate = await this.prisma.shoppingList.create({
      data: {
        ownerUserId: userId,
        name: `${source.name} - copia`,
        description: source.description,
        duplicatedFromListId: source.id,
        items: {
          create: source.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity.toString(),
            unitId: item.unitId,
            expectedPrice: item.expectedPrice?.toString() ?? null,
            priority: item.priority,
            notes: item.notes,
            sortOrder: item.sortOrder
          }))
        }
      },
      include: listDetailInclude
    });
    return toShoppingListDetailDto(duplicate, userId);
  }

  async addItem(userId: string, listId: string, dto: UpsertShoppingListItemDto) {
    const list = await this.findAccessibleList(userId, listId);
    await this.validateItemInput(userId, dto);
    const nextSortOrder = list.items.length === 0 ? 0 : Math.max(...list.items.map((item) => item.sortOrder)) + 1;
    await this.prisma.shoppingListItem.create({
      data: {
        listId,
        productId: dto.productId,
        quantity: dto.quantity,
        unitId: dto.unitId,
        expectedPrice: cleanOptionalText(dto.expectedPrice),
        priority: dto.priority ?? "normal",
        notes: cleanOptionalText(dto.notes),
        sortOrder: nextSortOrder
      },
      include: { product: true, unit: true }
    });
    return this.get(userId, listId);
  }

  async updateItem(userId: string, listId: string, itemId: string, dto: UpsertShoppingListItemDto) {
    await this.findAccessibleItem(userId, listId, itemId);
    await this.validateItemInput(userId, dto);
    await this.prisma.shoppingListItem.update({
      where: { id: itemId },
      data: {
        productId: dto.productId,
        quantity: dto.quantity,
        unitId: dto.unitId,
        expectedPrice: cleanOptionalText(dto.expectedPrice),
        priority: dto.priority ?? "normal",
        notes: cleanOptionalText(dto.notes)
      },
      include: { product: true, unit: true }
    });
    return this.get(userId, listId);
  }

  async deleteItem(userId: string, listId: string, itemId: string) {
    await this.findAccessibleItem(userId, listId, itemId);
    await this.prisma.shoppingListItem.delete({ where: { id: itemId } });
    return this.get(userId, listId);
  }

  async reorderItems(userId: string, listId: string, dto: ReorderShoppingListItemsDto) {
    const list = await this.findAccessibleList(userId, listId);
    const existingIds = new Set(list.items.map((item) => item.id));
    if (dto.itemIds.length !== existingIds.size || dto.itemIds.some((id) => !existingIds.has(id))) {
      throw new BadRequestException("Item order must include every list item exactly once");
    }

    await this.prisma.$transaction(
      dto.itemIds.map((id, index) =>
        this.prisma.shoppingListItem.update({
          where: { id },
          data: { sortOrder: index }
        })
      )
    );
    return this.get(userId, listId);
  }

  // ── Sharing ────────────────────────────────────────────────────────────

  async listShares(userId: string, listId: string) {
    await this.findAccessibleList(userId, listId);
    const shares = await this.prisma.shoppingListShare.findMany({
      where: { listId },
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "asc" }
    });
    return { shares: shares.map(toShoppingListShareDto) };
  }

  async addShare(ownerUserId: string, listId: string, email: string) {
    const list = await this.findOwnedList(ownerUserId, listId);
    const normalizedEmail = email.trim().toLowerCase();
    const target = await this.prisma.user.findUnique({ where: { email: normalizedEmail } });

    // E-mail ainda sem conta: em vez de compartilhar, enviamos um convite de cadastro.
    if (!target) {
      const inviter = await this.prisma.user.findUnique({
        where: { id: ownerUserId },
        select: { name: true }
      });
      await this.mail.sendListInvite(normalizedEmail, inviter?.name ?? "Alguém", list.name);
      const { shares } = await this.listShares(ownerUserId, listId);
      return { shares, invited: { email: normalizedEmail } };
    }

    if (target.id === ownerUserId) {
      throw new BadRequestException("You cannot share a list with yourself");
    }
    const existing = await this.prisma.shoppingListShare.findUnique({
      where: { listId_userId: { listId, userId: target.id } }
    });
    if (existing) {
      throw new ConflictException("List already shared with this user");
    }
    await this.prisma.shoppingListShare.create({
      data: { listId, userId: target.id, invitedByUserId: ownerUserId }
    });
    return this.listShares(ownerUserId, listId);
  }

  async removeShare(userId: string, listId: string, memberUserId: string) {
    const list = await this.prisma.shoppingList.findUnique({ where: { id: listId } });
    if (!list) {
      throw new NotFoundException("Shopping list not found");
    }
    // Owner can remove anyone; a member can remove only themselves (leave).
    const isOwner = list.ownerUserId === userId;
    if (!isOwner && memberUserId !== userId) {
      throw new ForbiddenException("Only the list owner can remove other members");
    }
    await this.prisma.shoppingListShare.deleteMany({ where: { listId, userId: memberUserId } });
    if (isOwner) {
      return this.listShares(userId, listId);
    }
    return { shares: [] };
  }

  // ── Access helpers ─────────────────────────────────────────────────────

  private async findAccessibleList(userId: string, id: string) {
    const list = await this.prisma.shoppingList.findFirst({
      where: { id, OR: [{ ownerUserId: userId }, { shares: { some: { userId } } }] },
      include: listDetailInclude
    });
    if (!list) {
      throw new NotFoundException("Shopping list not found");
    }
    return list;
  }

  private async findOwnedList(ownerUserId: string, id: string) {
    const list = await this.prisma.shoppingList.findFirst({
      where: { id, ownerUserId },
      include: listDetailInclude
    });
    if (!list) {
      throw new NotFoundException("Shopping list not found");
    }
    return list;
  }

  private async findAccessibleItem(userId: string, listId: string, itemId: string) {
    await this.findAccessibleList(userId, listId);
    const item = await this.prisma.shoppingListItem.findFirst({
      where: { id: itemId, listId },
      include: { product: true, unit: true }
    });
    if (!item) {
      throw new NotFoundException("Shopping list item not found");
    }
    return item;
  }

  private async validateItemInput(ownerUserId: string, dto: UpsertShoppingListItemDto) {
    const [product, unit] = await Promise.all([
      this.prisma.product.findFirst({ where: { id: dto.productId, ownerUserId, archivedAt: null } }),
      this.prisma.unit.findFirst({ where: { id: dto.unitId, active: true } })
    ]);
    if (!product) {
      throw new BadRequestException("Product not found");
    }
    if (!unit) {
      throw new BadRequestException("Unit not found");
    }
    if (!unit.allowsDecimals && dto.quantity.includes(".")) {
      throw new BadRequestException("Unit does not allow decimal quantities");
    }
  }
}

function cleanOptionalText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : null;
}
