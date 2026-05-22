import type {
  ProductDto,
  ReorderShoppingListItemsRequest,
  ShoppingListDetailDto,
  ShoppingListSummaryDto,
  UnitDto,
  UpsertProductRequest,
  UpsertShoppingListItemRequest,
  UpsertShoppingListRequest
} from "@zbuy/shared";
import { apiRequest } from "./api";

export function listUnits() {
  return apiRequest<{ units: UnitDto[] }>("/units");
}

export function listProducts(query = "") {
  const params = query.trim() ? `?query=${encodeURIComponent(query.trim())}` : "";
  return apiRequest<{ products: ProductDto[] }>(`/products${params}`);
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
