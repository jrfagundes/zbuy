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
