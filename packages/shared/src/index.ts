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
