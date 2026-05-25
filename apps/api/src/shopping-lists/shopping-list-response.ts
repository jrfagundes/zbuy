import type { Product, ShoppingList, ShoppingListItem, Unit } from "@prisma/client";
import type { ShoppingListDetailDto, ShoppingListItemDto, ShoppingListSummaryDto } from "@zbuy/shared";
import { toUnitDto } from "../units/unit-response";

type ItemWithRelations = ShoppingListItem & { product: Product; unit: Unit };
type ListWithRelations = ShoppingList & {
  items?: ItemWithRelations[];
  _count?: { items: number };
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

export function toShoppingListSummaryDto(list: ListWithRelations): ShoppingListSummaryDto {
  return {
    id: list.id,
    name: list.name,
    description: list.description,
    status: list.status,
    duplicatedFromListId: list.duplicatedFromListId,
    itemCount: list._count?.items ?? list.items?.length ?? 0,
    createdAt: list.createdAt.toISOString(),
    updatedAt: list.updatedAt.toISOString()
  };
}

export function toShoppingListDetailDto(list: ListWithRelations): ShoppingListDetailDto {
  return {
    ...toShoppingListSummaryDto(list),
    items: (list.items ?? []).map(toShoppingListItemDto)
  };
}
