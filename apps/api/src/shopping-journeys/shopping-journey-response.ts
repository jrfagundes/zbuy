import type {
  ShoppingJourneyDetailDto,
  ShoppingJourneyItemDto,
  ShoppingJourneyStopDto,
  ShoppingJourneyStopItemDto,
  ShoppingJourneySummaryDto
} from "@zbuy/shared";

type DecimalLike = { toString(): string };

export type ShoppingJourneyWithRelations = {
  id: string;
  ownerUserId: string;
  sourceListId: string;
  snapshotSourceListName: string;
  context: "physical" | "online";
  status: "active" | "completed" | "canceled";
  startedAt: Date;
  completedAt: Date | null;
  canceledAt: Date | null;
  knownTotal: DecimalLike | string | number;
  boughtItemsWithoutPriceCount: number;
  owner?: { name: string } | null;
  items?: JourneyItemWithStops[];
  stops?: JourneyStopWithRelations[];
};

type JourneyStopWithRelations = {
  id: string;
  supermarketId: string;
  status: "active" | "finished" | "canceled";
  startedAt: Date;
  finishedAt: Date | null;
  exitDetectedAt: Date | null;
  continuedOutsideRadiusAt: Date | null;
  supermarket: { name: string };
};

type JourneyItemWithStops = {
  id: string;
  sourceProductId: string | null;
  sourceListId: string | null;
  snapshotSourceListName: string | null;
  snapshotProductName: string;
  snapshotCategoryLabel: string;
  snapshotBrand: string | null;
  quantity: DecimalLike | string | number;
  unitId: string | null;
  snapshotUnitName: string;
  snapshotUnitAbbreviation: string;
  expectedPrice: DecimalLike | string | number | null;
  finalActualPrice: DecimalLike | string | number | null;
  finalStatus: "active" | "bought" | "not_found" | "unprocessed";
  priority: "low" | "normal" | "high";
  notes: string | null;
  sortOrder: number;
  stopItems?: JourneyStopItemRecord[];
};

type JourneyStopItemRecord = {
  id: string;
  stopId: string;
  journeyItemId: string;
  status: "pending" | "bought" | "not_found" | "unprocessed";
  actualPrice: DecimalLike | string | number | null;
  corridorId: string | null;
  notes: string | null;
};

export function toShoppingJourneyDetailDto(
  journey: ShoppingJourneyWithRelations,
  placements: Array<{ productId: string; corridorId: string; corridor?: { name: string } }> = [],
  actingUserId?: string
): ShoppingJourneyDetailDto {
  const activeStop = findActiveStop(journey);
  return {
    ...toShoppingJourneySummaryDto(journey, actingUserId),
    items: (journey.items ?? []).map((item) => toShoppingJourneyItemDto(item, activeStop?.id ?? null, placements)),
    layout: null
  };
}

export function toShoppingJourneySummaryDto(
  journey: ShoppingJourneyWithRelations,
  actingUserId?: string
): ShoppingJourneySummaryDto {
  const sourceLists = deriveSourceLists(journey);
  const isOwner = actingUserId === undefined || journey.ownerUserId === actingUserId;
  return {
    id: journey.id,
    sourceListId: journey.sourceListId,
    sourceListName: journey.snapshotSourceListName,
    sourceLists,
    context: journey.context,
    status: journey.status,
    startedAt: journey.startedAt.toISOString(),
    completedAt: journey.completedAt?.toISOString() ?? null,
    canceledAt: journey.canceledAt?.toISOString() ?? null,
    knownTotal: decimalToString(journey.knownTotal),
    boughtItemsWithoutPriceCount: journey.boughtItemsWithoutPriceCount,
    activeStop: findActiveStop(journey),
    isOwner,
    sharedByName: isOwner ? null : journey.owner?.name ?? null
  };
}

function deriveSourceLists(journey: ShoppingJourneyWithRelations): { id: string; name: string }[] {
  const seen = new Map<string, string>();
  for (const item of journey.items ?? []) {
    if (item.sourceListId && item.snapshotSourceListName && !seen.has(item.sourceListId)) {
      seen.set(item.sourceListId, item.snapshotSourceListName);
    }
  }
  if (seen.size === 0) {
    return [{ id: journey.sourceListId, name: journey.snapshotSourceListName }];
  }
  return Array.from(seen.entries()).map(([id, name]) => ({ id, name }));
}

function toShoppingJourneyItemDto(
  item: JourneyItemWithStops,
  activeStopId: string | null,
  placements: Array<{ productId: string; corridorId: string; corridor?: { name: string } }>
): ShoppingJourneyItemDto {
  const activeStopItem = activeStopId ? item.stopItems?.find((stopItem) => stopItem.stopId === activeStopId) ?? null : null;
  const placement =
    item.sourceProductId === null ? null : placements.find((candidate) => candidate.productId === item.sourceProductId) ?? null;
  return {
    id: item.id,
    sourceProductId: item.sourceProductId,
    sourceListId: item.sourceListId,
    sourceListName: item.snapshotSourceListName,
    snapshotProductName: item.snapshotProductName,
    snapshotCategoryLabel: item.snapshotCategoryLabel,
    snapshotBrand: item.snapshotBrand,
    quantity: decimalToString(item.quantity),
    unitId: item.unitId,
    snapshotUnitName: item.snapshotUnitName,
    snapshotUnitAbbreviation: item.snapshotUnitAbbreviation,
    expectedPrice: optionalDecimalToString(item.expectedPrice),
    finalActualPrice: optionalDecimalToString(item.finalActualPrice),
    finalStatus: item.finalStatus,
    priority: item.priority,
    notes: item.notes,
    sortOrder: item.sortOrder,
    activeStopItem: activeStopItem ? toShoppingJourneyStopItemDto(activeStopItem) : null,
    placement: placement ? { corridorId: placement.corridorId, corridorName: placement.corridor?.name ?? "" } : null
  };
}

function toShoppingJourneyStopItemDto(item: JourneyStopItemRecord): ShoppingJourneyStopItemDto {
  return {
    id: item.id,
    stopId: item.stopId,
    journeyItemId: item.journeyItemId,
    status: item.status,
    actualPrice: optionalDecimalToString(item.actualPrice),
    corridorId: item.corridorId,
    notes: item.notes
  };
}

function toShoppingJourneyStopDto(stop: JourneyStopWithRelations): ShoppingJourneyStopDto {
  return {
    id: stop.id,
    supermarketId: stop.supermarketId,
    supermarketName: stop.supermarket.name,
    status: stop.status,
    startedAt: stop.startedAt.toISOString(),
    finishedAt: stop.finishedAt?.toISOString() ?? null,
    exitDetectedAt: stop.exitDetectedAt?.toISOString() ?? null,
    continuedOutsideRadiusAt: stop.continuedOutsideRadiusAt?.toISOString() ?? null
  };
}

function findActiveStop(journey: ShoppingJourneyWithRelations) {
  const stop = journey.stops?.find((candidate) => candidate.status === "active");
  return stop ? toShoppingJourneyStopDto(stop) : null;
}

function decimalToString(value: DecimalLike | string | number) {
  return value.toString();
}

function optionalDecimalToString(value: DecimalLike | string | number | null) {
  return value === null ? null : value.toString();
}
