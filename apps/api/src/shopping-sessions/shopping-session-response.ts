import type { PurchaseLocation, ShoppingList, ShoppingSession, ShoppingSessionItem } from "@prisma/client";
import type { ShoppingSessionDetailDto, ShoppingSessionItemDto, ShoppingSessionSummaryDto } from "@zbuy/shared";
import { toPurchaseLocationDto } from "../purchase-locations/purchase-location-response";

type DecimalLike = { toString(): string };

export type ShoppingSessionWithRelations = ShoppingSession & {
  snapshotSourceListName: string;
  purchaseLocation: PurchaseLocation;
  sourceList: ShoppingList;
  items?: ShoppingSessionItem[];
};

function decimalToString(value: DecimalLike | string | number) {
  return value.toString();
}

function optionalDecimalToString(value: DecimalLike | string | number | null) {
  return value === null ? null : value.toString();
}

function countStatuses(items: ShoppingSessionItem[] = []) {
  return items.reduce(
    (counts, item) => {
      if (item.status === "pending") counts.pending += 1;
      if (item.status === "bought") counts.bought += 1;
      if (item.status === "not_found") counts.notFound += 1;
      if (item.status === "unprocessed") counts.unprocessed += 1;
      return counts;
    },
    { pending: 0, bought: 0, notFound: 0, unprocessed: 0 }
  );
}

export function toShoppingSessionItemDto(item: ShoppingSessionItem): ShoppingSessionItemDto {
  return {
    id: item.id,
    sourceProductId: item.sourceProductId,
    sourceListItemId: item.sourceListItemId,
    snapshotProductName: item.snapshotProductName,
    snapshotCategoryLabel: item.snapshotCategoryLabel,
    snapshotBrand: item.snapshotBrand,
    quantity: decimalToString(item.quantity),
    unitId: item.unitId,
    snapshotUnitName: item.snapshotUnitName,
    snapshotUnitAbbreviation: item.snapshotUnitAbbreviation,
    expectedPrice: optionalDecimalToString(item.expectedPrice),
    actualPrice: optionalDecimalToString(item.actualPrice),
    status: item.status,
    priority: item.priority,
    notes: item.notes,
    sortOrder: item.sortOrder
  };
}

export function toShoppingSessionSummaryDto(session: ShoppingSessionWithRelations): ShoppingSessionSummaryDto {
  return {
    id: session.id,
    sourceListId: session.sourceListId,
    sourceListName: session.snapshotSourceListName,
    purchaseLocation: toPurchaseLocationDto(session.purchaseLocation),
    context: session.context,
    status: session.status,
    startedAt: session.startedAt.toISOString(),
    completedAt: session.completedAt?.toISOString() ?? null,
    canceledAt: session.canceledAt?.toISOString() ?? null,
    knownTotal: decimalToString(session.knownTotal),
    boughtItemsWithoutPriceCount: session.boughtItemsWithoutPriceCount,
    itemCounts: countStatuses(session.items)
  };
}

export function toShoppingSessionDetailDto(session: ShoppingSessionWithRelations): ShoppingSessionDetailDto {
  return {
    ...toShoppingSessionSummaryDto(session),
    items: (session.items ?? []).map(toShoppingSessionItemDto)
  };
}
