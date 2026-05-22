import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ReorderShoppingListItemsDto, UpsertShoppingListDto, UpsertShoppingListItemDto } from "./dto";
import { toShoppingListDetailDto, toShoppingListSummaryDto } from "./shopping-list-response";

const listDetailInclude = {
  items: {
    include: { product: true, unit: true },
    orderBy: { sortOrder: "asc" as const }
  },
  _count: { select: { items: true } }
};

@Injectable()
export class ShoppingListsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(ownerUserId: string, includeArchived = false) {
    const shoppingLists = await this.prisma.shoppingList.findMany({
      where: {
        ownerUserId,
        ...(includeArchived ? {} : { status: "active" as const })
      },
      include: { _count: { select: { items: true } } },
      orderBy: [{ updatedAt: "desc" }, { name: "asc" }]
    });
    return { shoppingLists: shoppingLists.map(toShoppingListSummaryDto) };
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
    return toShoppingListDetailDto(list);
  }

  async get(ownerUserId: string, id: string) {
    const list = await this.findOwnedList(ownerUserId, id);
    return toShoppingListDetailDto(list);
  }

  async update(ownerUserId: string, id: string, dto: UpsertShoppingListDto) {
    await this.findOwnedList(ownerUserId, id);
    const list = await this.prisma.shoppingList.update({
      where: { id },
      data: {
        name: dto.name.trim(),
        description: cleanOptionalText(dto.description)
      },
      include: listDetailInclude
    });
    return toShoppingListDetailDto(list);
  }

  async archive(ownerUserId: string, id: string) {
    await this.findOwnedList(ownerUserId, id);
    const list = await this.prisma.shoppingList.update({
      where: { id },
      data: { status: "archived" },
      include: listDetailInclude
    });
    return toShoppingListDetailDto(list);
  }

  async delete(ownerUserId: string, id: string) {
    await this.findOwnedList(ownerUserId, id);
    await this.prisma.shoppingList.delete({ where: { id } });
  }

  async duplicate(ownerUserId: string, id: string) {
    const source = await this.findOwnedList(ownerUserId, id);
    const duplicate = await this.prisma.shoppingList.create({
      data: {
        ownerUserId,
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
    return toShoppingListDetailDto(duplicate);
  }

  async addItem(ownerUserId: string, listId: string, dto: UpsertShoppingListItemDto) {
    const list = await this.findOwnedList(ownerUserId, listId);
    await this.validateItemInput(ownerUserId, dto);
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
    return this.get(ownerUserId, listId);
  }

  async updateItem(ownerUserId: string, listId: string, itemId: string, dto: UpsertShoppingListItemDto) {
    await this.findOwnedItem(ownerUserId, listId, itemId);
    await this.validateItemInput(ownerUserId, dto);
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
    return this.get(ownerUserId, listId);
  }

  async deleteItem(ownerUserId: string, listId: string, itemId: string) {
    await this.findOwnedItem(ownerUserId, listId, itemId);
    await this.prisma.shoppingListItem.delete({ where: { id: itemId } });
    return this.get(ownerUserId, listId);
  }

  async reorderItems(ownerUserId: string, listId: string, dto: ReorderShoppingListItemsDto) {
    const list = await this.findOwnedList(ownerUserId, listId);
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
    return this.get(ownerUserId, listId);
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

  private async findOwnedItem(ownerUserId: string, listId: string, itemId: string) {
    await this.findOwnedList(ownerUserId, listId);
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
