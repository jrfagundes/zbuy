export type AuthProvider = "native" | "google" | "microsoft";

export interface CurrentUserDto {
  id: string;
  name: string;
  email: string;
}

export interface AuthenticatedUserResponse {
  user: CurrentUserDto;
}

export interface ApiErrorResponse {
  message: string;
  requestId?: string;
}

export type UnitType = "weight" | "volume" | "count" | "package" | "custom";
export type ShoppingListStatus = "active" | "archived";
export type ListItemPriority = "low" | "normal" | "high";

export interface UnitDto {
  id: string;
  name: string;
  abbreviation: string;
  type: UnitType;
  allowsDecimals: boolean;
  sortOrder: number;
}

export interface ProductDto {
  id: string;
  name: string;
  categoryLabel: string;
  brand: string | null;
  defaultUnitId: string;
  defaultUnit: UnitDto;
  estimatedPrice: string | null;
  notes: string | null;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpsertProductRequest {
  name: string;
  categoryLabel: string;
  brand?: string | null;
  defaultUnitId: string;
  estimatedPrice?: string | null;
  notes?: string | null;
}

export interface ShoppingListItemDto {
  id: string;
  productId: string;
  productName: string;
  categoryLabel: string;
  quantity: string;
  unitId: string;
  unit: UnitDto;
  expectedPrice: string | null;
  priority: ListItemPriority;
  notes: string | null;
  sortOrder: number;
}

export interface ShoppingListSummaryDto {
  id: string;
  name: string;
  description: string | null;
  status: ShoppingListStatus;
  duplicatedFromListId: string | null;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingListDetailDto extends ShoppingListSummaryDto {
  items: ShoppingListItemDto[];
}

export interface UpsertShoppingListRequest {
  name: string;
  description?: string | null;
}

export interface UpsertShoppingListItemRequest {
  productId: string;
  quantity: string;
  unitId: string;
  expectedPrice?: string | null;
  priority?: ListItemPriority;
  notes?: string | null;
}

export interface ReorderShoppingListItemsRequest {
  itemIds: string[];
}

export type PurchaseLocationType = "physical" | "online";
export type ShoppingSessionContext = "physical" | "online";
export type ShoppingSessionStatus = "active" | "completed" | "canceled";
export type ShoppingSessionItemStatus = "pending" | "bought" | "not_found" | "unprocessed";

export interface PurchaseLocationDto {
  id: string;
  type: PurchaseLocationType;
  name: string;
  address: string | null;
  city: string | null;
  websiteOrApp: string | null;
  notes: string | null;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpsertPurchaseLocationRequest {
  type: PurchaseLocationType;
  name: string;
  address?: string | null;
  city?: string | null;
  websiteOrApp?: string | null;
  notes?: string | null;
}

export interface ShoppingSessionItemDto {
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
  status: ShoppingSessionItemStatus;
  priority: ListItemPriority;
  notes: string | null;
  sortOrder: number;
}

export interface ShoppingSessionSummaryDto {
  id: string;
  sourceListId: string;
  sourceListName: string;
  purchaseLocation: PurchaseLocationDto;
  context: ShoppingSessionContext;
  status: ShoppingSessionStatus;
  startedAt: string;
  completedAt: string | null;
  canceledAt: string | null;
  knownTotal: string;
  boughtItemsWithoutPriceCount: number;
  itemCounts: {
    pending: number;
    bought: number;
    notFound: number;
    unprocessed: number;
  };
}

export interface ShoppingSessionDetailDto extends ShoppingSessionSummaryDto {
  items: ShoppingSessionItemDto[];
}

export interface StartShoppingSessionRequest {
  sourceListId: string;
  purchaseLocationId: string;
  context: ShoppingSessionContext;
}

export interface UpdateShoppingSessionItemRequest {
  status?: ShoppingSessionItemStatus;
  actualPrice?: string | null;
  notes?: string | null;
}

export interface PurchaseHistoryFilters {
  dateFrom?: string;
  dateTo?: string;
  locationId?: string;
  locationType?: PurchaseLocationType;
  productQuery?: string;
  sourceListId?: string;
  itemStatus?: ShoppingSessionItemStatus;
  minPrice?: string;
  maxPrice?: string;
  withoutPrice?: boolean;
}

export interface CreateContinuationListRequest {
  name?: string;
}

export type SupermarketDetectionStatus = "detected" | "ambiguous" | "unknown";
export type ShoppingJourneyContext = "physical" | "online";
export type ShoppingJourneyStatus = "active" | "completed" | "canceled";
export type ShoppingJourneyStopStatus = "active" | "finished" | "canceled";
export type ShoppingJourneyItemFinalStatus = "active" | "bought" | "not_found" | "unprocessed";

export interface SupermarketDto {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  latitude: string | null;
  longitude: string | null;
  presenceRadiusMeters: number;
  distanceMeters?: number;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpsertSupermarketRequest {
  name: string;
  address?: string | null;
  city?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  presenceRadiusMeters?: number;
}

export interface DetectSupermarketRequest {
  latitude: string;
  longitude: string;
  radiusMeters?: number;
}

export interface DetectSupermarketResponse {
  status: SupermarketDetectionStatus;
  candidates: SupermarketDto[];
}

export interface SupermarketCorridorDto {
  id: string;
  name: string;
  sortOrder: number;
  productCount: number;
}

export interface PrivateProductPlacementDto {
  productId: string;
  corridorId: string;
  lastConfirmedAt: string;
}

export interface SharedLayoutSuggestionDto {
  id: string;
  productId: string;
  suggestedCorridorName: string;
  confidenceScore: string;
  sourceContributionCount: number;
}

export interface SupermarketLayoutDto {
  supermarketId: string;
  presenceRadiusMeters: number;
  corridors: SupermarketCorridorDto[];
  placements: PrivateProductPlacementDto[];
  suggestions: SharedLayoutSuggestionDto[];
}

export interface UpsertCorridorRequest {
  name: string;
}

export interface ReorderCorridorsRequest {
  corridorIds: string[];
}

export interface UpsertPrivateProductPlacementRequest {
  corridorId: string;
}

export interface AcceptSharedLayoutSuggestionRequest {
  corridorId?: string;
  corridorName?: string;
}

export interface LayoutContributionConsentDto {
  globalSharedLayoutContributionEnabled: boolean;
  supermarketOverride: boolean | null;
  effectiveSharedLayoutContributionEnabled: boolean;
}

export interface UpdateLayoutContributionConsentRequest {
  globalSharedLayoutContributionEnabled?: boolean;
  supermarketOverride?: boolean | null;
}

export interface ShoppingJourneyStopDto {
  id: string;
  supermarketId: string;
  supermarketName: string;
  status: ShoppingJourneyStopStatus;
  startedAt: string;
  finishedAt: string | null;
  exitDetectedAt: string | null;
  continuedOutsideRadiusAt: string | null;
}

export interface ShoppingJourneyHistoryStopDto extends ShoppingJourneyStopDto {
  journeyId: string;
  sourceListId: string;
  sourceListName: string;
  knownTotal: string;
  boughtItemsWithoutPriceCount: number;
  itemCounts: {
    bought: number;
    notFound: number;
    unprocessed: number;
  };
}

export interface ShoppingJourneyStopItemDto {
  id: string;
  stopId: string;
  journeyItemId: string;
  status: ShoppingSessionItemStatus;
  actualPrice: string | null;
  corridorId: string | null;
  notes: string | null;
}

export interface ShoppingJourneyItemDto {
  id: string;
  sourceProductId: string | null;
  snapshotProductName: string;
  snapshotCategoryLabel: string;
  snapshotBrand: string | null;
  quantity: string;
  unitId: string | null;
  snapshotUnitName: string;
  snapshotUnitAbbreviation: string;
  expectedPrice: string | null;
  finalActualPrice: string | null;
  finalStatus: ShoppingJourneyItemFinalStatus;
  priority: ListItemPriority;
  notes: string | null;
  sortOrder: number;
  activeStopItem: ShoppingJourneyStopItemDto | null;
  placement: { corridorId: string; corridorName: string } | null;
}

export interface ShoppingJourneySummaryDto {
  id: string;
  sourceListId: string;
  sourceListName: string;
  context: ShoppingJourneyContext;
  status: ShoppingJourneyStatus;
  startedAt: string;
  completedAt: string | null;
  canceledAt: string | null;
  knownTotal: string;
  boughtItemsWithoutPriceCount: number;
  activeStop: ShoppingJourneyStopDto | null;
}

export interface ShoppingJourneyDetailDto extends ShoppingJourneySummaryDto {
  items: ShoppingJourneyItemDto[];
  layout: SupermarketLayoutDto | null;
}

export interface StartShoppingJourneyRequest {
  sourceListId: string;
  supermarketId: string;
  latitude?: string | null;
  longitude?: string | null;
}

export interface StartJourneyStopRequest {
  supermarketId: string;
}

export interface UpdateShoppingJourneyStopItemRequest {
  status?: "pending" | "bought" | "not_found";
  actualPrice?: string | null;
  corridorId?: string | null;
  notes?: string | null;
}
