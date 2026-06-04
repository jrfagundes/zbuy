import type { Product, ShoppingList, ShoppingListItem, Unit } from "@prisma/client";
import type {
  ShoppingListDetailDto,
  ShoppingListItemDto,
  ShoppingListShareDto,
  ShoppingListSummaryDto
} from "@zbuy/shared";
import { toUnitDto } from "../units/unit-response";

type ItemWithRelations = ShoppingListItem & { product: Product; unit: Unit };
type ListWithRelations = ShoppingList & {
  items?: ItemWithRelations[];
  owner?: { name: string } | null;
  _count?: { items?: number; shares?: number };
};

type ShareWithUser = {
  userId: string;
  createdAt: Date;
  user: { name: string; email: string };
};

function decimalToString(value: { toString(): string } | string | number) {
  return value.toString();
}

function optionalDecimalToString(value: { toString(): string } | string | number | null) {
  return value === null ? null : value.toString();
}

export function toShoppingListItemDto(item: ItemWithRelations): ShoppingListItemDto {
  return {
    id: item.id,
    productId: item.productId,
    productName: item.product.name,
    categoryLabel: item.product.categoryLabel,
    quantity: decimalToString(item.quantity),
    unitId: item.unitId,
    unit: toUnitDto(item.unit),
    expectedPrice: optionalDecimalToString(item.expectedPrice),
    priority: item.priority,
    notes: item.notes,
    sortOrder: item.sortOrder
  };
}

export function toShoppingListSummaryDto(list: ListWithRelations, actingUserId: string): ShoppingListSummaryDto {
  const isOwner = list.ownerUserId === actingUserId;
  return {
    id: list.id,
    name: list.name,
    description: list.description,
    status: list.status,
    duplicatedFromListId: list.duplicatedFromListId,
    itemCount: list._count?.items ?? list.items?.length ?? 0,
    isOwner,
    sharedByName: isOwner ? null : list.owner?.name ?? null,
    memberCount: list._count?.shares ?? 0,
    createdAt: list.createdAt.toISOString(),
    updatedAt: list.updatedAt.toISOString()
  };
}

export function toShoppingListDetailDto(list: ListWithRelations, actingUserId: string): ShoppingListDetailDto {
  return {
    ...toShoppingListSummaryDto(list, actingUserId),
    items: (list.items ?? []).map(toShoppingListItemDto)
  };
}

export function toShoppingListShareDto(share: ShareWithUser): ShoppingListShareDto {
  return {
    userId: share.userId,
    name: share.user.name,
    email: share.user.email,
    invitedAt: share.createdAt.toISOString()
  };
}
