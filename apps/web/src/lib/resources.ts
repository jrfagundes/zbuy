import type {
  AcceptSharedLayoutSuggestionRequest,
  CreateContinuationListRequest,
  DetectSupermarketRequest,
  DetectSupermarketResponse,
  LayoutContributionConsentDto,
  ProductDto,
  PrivateProductPlacementDto,
  PurchaseHistoryFilters,
  PurchaseLocationDto,
  PurchaseLocationType,
  ReorderShoppingListItemsRequest,
  ReorderCorridorsRequest,
  SharedLayoutSuggestionDto,
  ShoppingListDetailDto,
  ShoppingListSummaryDto,
  ShoppingJourneyDetailDto,
  ShoppingJourneyHistoryStopDto,
  ShoppingJourneyStatus,
  ShoppingJourneySummaryDto,
  ShoppingSessionDetailDto,
  ShoppingSessionItemDto,
  ShoppingSessionStatus,
  ShoppingSessionSummaryDto,
  StartJourneyStopRequest,
  StartShoppingJourneyRequest,
  StartShoppingSessionRequest,
  SupermarketCorridorDto,
  SupermarketDto,
  SupermarketLayoutDto,
  UnitDto,
  UpdateLayoutContributionConsentRequest,
  UpdateShoppingJourneyStopItemRequest,
  UpsertProductRequest,
  UpsertCorridorRequest,
  UpsertPrivateProductPlacementRequest,
  UpsertSupermarketRequest,
  UpsertPurchaseLocationRequest,
  UpdateShoppingSessionItemRequest,
  UpsertShoppingListItemRequest,
  UpsertShoppingListRequest
} from "@zbuy/shared";
import { apiRequest } from "./api";

export interface PurchaseHistoryItemDto extends ShoppingSessionItemDto {
  session: {
    id: string;
    completedAt: string;
    context: "physical" | "online";
    sourceListId: string;
    sourceListName: string;
    purchaseLocation: PurchaseLocationDto;
  };
}

type EditableShoppingSessionItemRequest = Omit<UpdateShoppingSessionItemRequest, "status"> & {
  status?: "pending" | "bought" | "not_found";
};

type PurchaseHistoryQueryFilters = Omit<PurchaseHistoryFilters, "itemStatus"> & {
  itemStatus?: "bought" | "not_found" | "unprocessed";
};

function buildQuery<T extends object>(params: T) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params) as Array<[string, string | number | boolean | null | undefined]>) {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  }
  const queryString = query.toString();
  return queryString ? `?${queryString}` : "";
}

export function listUnits() {
  return apiRequest<{ units: UnitDto[] }>("/units");
}

export function listProducts(query = "") {
  const params = query.trim() ? `?query=${encodeURIComponent(query.trim())}` : "";
  return apiRequest<{ products: ProductDto[] }>(`/products${params}`);
}

export function getProductByBarcode(barcode: string) {
  return apiRequest<ProductDto>(`/products/barcode/${encodeURIComponent(barcode)}`);
}

export function createProduct(input: UpsertProductRequest) {
  return apiRequest<ProductDto>("/products", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function updateProduct(id: string, input: UpsertProductRequest) {
  return apiRequest<ProductDto>(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input)
  });
}

export function archiveProduct(id: string) {
  return apiRequest<ProductDto>(`/products/${id}/archive`, { method: "POST" });
}

export function listShoppingLists() {
  return apiRequest<{ shoppingLists: ShoppingListSummaryDto[] }>("/shopping-lists");
}

export function createShoppingList(input: UpsertShoppingListRequest) {
  return apiRequest<ShoppingListDetailDto>("/shopping-lists", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function updateShoppingList(id: string, input: UpsertShoppingListRequest) {
  return apiRequest<ShoppingListDetailDto>(`/shopping-lists/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input)
  });
}

export function archiveShoppingList(id: string) {
  return apiRequest<ShoppingListDetailDto>(`/shopping-lists/${id}/archive`, { method: "POST" });
}

export function deleteShoppingList(id: string) {
  return apiRequest<void>(`/shopping-lists/${id}`, { method: "DELETE" });
}

export function duplicateShoppingList(id: string) {
  return apiRequest<ShoppingListDetailDto>(`/shopping-lists/${id}/duplicate`, { method: "POST" });
}

export function getShoppingList(id: string) {
  return apiRequest<ShoppingListDetailDto>(`/shopping-lists/${id}`);
}

export function addShoppingListItem(listId: string, input: UpsertShoppingListItemRequest) {
  return apiRequest<ShoppingListDetailDto>(`/shopping-lists/${listId}/items`, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function updateShoppingListItem(listId: string, itemId: string, input: UpsertShoppingListItemRequest) {
  return apiRequest<ShoppingListDetailDto>(`/shopping-lists/${listId}/items/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify(input)
  });
}

export function deleteShoppingListItem(listId: string, itemId: string) {
  return apiRequest<ShoppingListDetailDto>(`/shopping-lists/${listId}/items/${itemId}`, { method: "DELETE" });
}

export function reorderShoppingListItems(listId: string, input: ReorderShoppingListItemsRequest) {
  return apiRequest<ShoppingListDetailDto>(`/shopping-lists/${listId}/items/reorder`, {
    method: "PATCH",
    body: JSON.stringify(input)
  });
}

export function listPurchaseLocations(type?: PurchaseLocationType, query?: string) {
  const params = buildQuery({ type, query: query?.trim() });
  return apiRequest<{ purchaseLocations: PurchaseLocationDto[] }>(`/purchase-locations${params}`);
}

export function createPurchaseLocation(input: UpsertPurchaseLocationRequest) {
  return apiRequest<PurchaseLocationDto>("/purchase-locations", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function updatePurchaseLocation(id: string, input: UpsertPurchaseLocationRequest) {
  return apiRequest<PurchaseLocationDto>(`/purchase-locations/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input)
  });
}

export function archivePurchaseLocation(id: string) {
  return apiRequest<PurchaseLocationDto>(`/purchase-locations/${id}/archive`, { method: "POST" });
}

export function listShoppingSessions(status?: ShoppingSessionStatus, limit?: number) {
  const params = buildQuery({ status, limit });
  return apiRequest<{ shoppingSessions: ShoppingSessionSummaryDto[] }>(`/shopping-sessions${params}`);
}

export function getActiveShoppingSession() {
  return apiRequest<ShoppingSessionDetailDto | null>("/shopping-sessions/active", undefined, { emptyBodyAsNull: true });
}

export function startShoppingSession(input: StartShoppingSessionRequest) {
  return apiRequest<ShoppingSessionDetailDto>("/shopping-sessions", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function getShoppingSession(id: string) {
  return apiRequest<ShoppingSessionDetailDto>(`/shopping-sessions/${id}`);
}

export function updateShoppingSessionItem(
  sessionId: string,
  itemId: string,
  input: EditableShoppingSessionItemRequest
) {
  return apiRequest<ShoppingSessionDetailDto>(`/shopping-sessions/${sessionId}/items/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify(input)
  });
}

export function completeShoppingSession(id: string) {
  return apiRequest<ShoppingSessionDetailDto>(`/shopping-sessions/${id}/complete`, { method: "POST" });
}

export function cancelShoppingSession(id: string) {
  return apiRequest<ShoppingSessionDetailDto>(`/shopping-sessions/${id}/cancel`, { method: "POST" });
}

export function createContinuationList(sessionId: string, input: CreateContinuationListRequest) {
  return apiRequest<ShoppingListDetailDto>(`/shopping-sessions/${sessionId}/continuation-list`, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function listPurchaseHistorySessions(filters: PurchaseHistoryQueryFilters = {}) {
  const params = buildQuery(filters);
  return apiRequest<{ shoppingSessions: ShoppingSessionSummaryDto[] }>(`/purchase-history/sessions${params}`);
}

export function getPurchaseHistorySession(id: string) {
  return apiRequest<ShoppingSessionDetailDto>(`/purchase-history/sessions/${id}`);
}

export function listPurchaseHistoryItems(filters: PurchaseHistoryQueryFilters = {}) {
  const params = buildQuery(filters);
  return apiRequest<{ purchaseHistoryItems: PurchaseHistoryItemDto[] }>(`/purchase-history/items${params}`);
}

export function listPurchaseHistoryJourneyStops(filters: PurchaseHistoryQueryFilters = {}) {
  const params = buildQuery(filters);
  return apiRequest<{ shoppingJourneyStops: ShoppingJourneyHistoryStopDto[] }>(`/purchase-history/journey-stops${params}`);
}

export function listSupermarkets(query?: string, latitude?: string, longitude?: string) {
  const params = buildQuery({ query: query?.trim(), lat: latitude, lng: longitude });
  return apiRequest<{ supermarkets: SupermarketDto[] }>(`/supermarkets${params}`);
}

export function createSupermarket(input: UpsertSupermarketRequest) {
  return apiRequest<SupermarketDto>("/supermarkets", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function updateSupermarket(id: string, input: Partial<UpsertSupermarketRequest>) {
  return apiRequest<SupermarketDto>(`/supermarkets/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input)
  });
}

export function archiveSupermarket(id: string) {
  return apiRequest<SupermarketDto>(`/supermarkets/${id}/archive`, { method: "POST" });
}

export function detectSupermarket(input: DetectSupermarketRequest) {
  return apiRequest<DetectSupermarketResponse>("/supermarkets/detect", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function getSupermarketLayout(id: string) {
  return apiRequest<SupermarketLayoutDto>(`/supermarkets/${id}/layout`);
}

export function createSupermarketCorridor(supermarketId: string, input: UpsertCorridorRequest) {
  return apiRequest<SupermarketCorridorDto>(`/supermarkets/${supermarketId}/layout/corridors`, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function updateSupermarketCorridor(supermarketId: string, corridorId: string, input: UpsertCorridorRequest) {
  return apiRequest<SupermarketCorridorDto>(`/supermarkets/${supermarketId}/layout/corridors/${corridorId}`, {
    method: "PATCH",
    body: JSON.stringify(input)
  });
}

export function reorderSupermarketCorridors(supermarketId: string, input: ReorderCorridorsRequest) {
  return apiRequest<SupermarketLayoutDto>(`/supermarkets/${supermarketId}/layout/corridors/reorder`, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function deleteSupermarketCorridor(supermarketId: string, corridorId: string) {
  return apiRequest<void>(`/supermarkets/${supermarketId}/layout/corridors/${corridorId}`, { method: "DELETE" });
}

export function setPrivateProductPlacement(
  supermarketId: string,
  productId: string,
  input: UpsertPrivateProductPlacementRequest
) {
  return apiRequest<PrivateProductPlacementDto>(`/supermarkets/${supermarketId}/layout/products/${productId}/placement`, {
    method: "PUT",
    body: JSON.stringify(input)
  });
}

export function deletePrivateProductPlacement(supermarketId: string, productId: string) {
  return apiRequest<void>(`/supermarkets/${supermarketId}/layout/products/${productId}/placement`, { method: "DELETE" });
}

export function listSharedLayoutSuggestions(supermarketId: string) {
  return apiRequest<{ suggestions: SharedLayoutSuggestionDto[] }>(`/supermarkets/${supermarketId}/layout/suggestions`);
}

export function acceptSharedLayoutSuggestion(
  supermarketId: string,
  suggestionId: string,
  input: AcceptSharedLayoutSuggestionRequest
) {
  return apiRequest<PrivateProductPlacementDto>(`/supermarkets/${supermarketId}/layout/suggestions/${suggestionId}/accept`, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function getLayoutContributionConsent() {
  return apiRequest<LayoutContributionConsentDto>("/layout-consent");
}

export function updateLayoutContributionConsent(input: UpdateLayoutContributionConsentRequest) {
  return apiRequest<LayoutContributionConsentDto>("/layout-consent", {
    method: "PATCH",
    body: JSON.stringify(input)
  });
}

export function getSupermarketLayoutConsent(supermarketId: string) {
  return apiRequest<LayoutContributionConsentDto>(`/supermarkets/${supermarketId}/layout-consent`);
}

export function updateSupermarketLayoutConsent(supermarketId: string, input: UpdateLayoutContributionConsentRequest) {
  return apiRequest<LayoutContributionConsentDto>(`/supermarkets/${supermarketId}/layout-consent`, {
    method: "PATCH",
    body: JSON.stringify(input)
  });
}

export function listShoppingJourneys(status?: ShoppingJourneyStatus, limit?: number) {
  const params = buildQuery({ status, limit });
  return apiRequest<{ shoppingJourneys: ShoppingJourneySummaryDto[] }>(`/shopping-journeys${params}`);
}

export function getActiveShoppingJourney() {
  return apiRequest<ShoppingJourneyDetailDto | null>("/shopping-journeys/active", undefined, { emptyBodyAsNull: true });
}

export function startShoppingJourney(input: StartShoppingJourneyRequest) {
  return apiRequest<ShoppingJourneyDetailDto>("/shopping-journeys", {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function getShoppingJourney(id: string) {
  return apiRequest<ShoppingJourneyDetailDto>(`/shopping-journeys/${id}`);
}

export function finishJourneyStop(journeyId: string, stopId: string) {
  return apiRequest<ShoppingJourneyDetailDto>(`/shopping-journeys/${journeyId}/stops/${stopId}/finish`, { method: "POST" });
}

export function continueJourneyStopOutsideRadius(journeyId: string, stopId: string) {
  return apiRequest<ShoppingJourneyDetailDto>(
    `/shopping-journeys/${journeyId}/stops/${stopId}/continue-outside-radius`,
    { method: "POST" }
  );
}

export function switchJourneyStopSupermarket(journeyId: string, stopId: string, input: StartJourneyStopRequest) {
  return apiRequest<ShoppingJourneyDetailDto>(`/shopping-journeys/${journeyId}/stops/${stopId}/switch-supermarket`, {
    method: "POST",
    body: JSON.stringify(input)
  });
}

export function updateShoppingJourneyStopItem(
  journeyId: string,
  stopId: string,
  itemId: string,
  input: UpdateShoppingJourneyStopItemRequest
) {
  return apiRequest<ShoppingJourneyDetailDto>(`/shopping-journeys/${journeyId}/stops/${stopId}/items/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify(input)
  });
}

export function completeShoppingJourney(id: string) {
  return apiRequest<ShoppingJourneyDetailDto>(`/shopping-journeys/${id}/complete`, { method: "POST" });
}

export function cancelShoppingJourney(id: string) {
  return apiRequest<ShoppingJourneyDetailDto>(`/shopping-journeys/${id}/cancel`, { method: "POST" });
}
