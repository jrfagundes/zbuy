import type {
  LayoutContributionConsentDto,
  ProductDto,
  ShoppingListDetailDto,
  ShoppingListSummaryDto,
  UnitDto,
  UpdateLayoutContributionConsentRequest,
  UpsertProductRequest,
  UpsertShoppingListItemRequest,
  UpsertShoppingListRequest,
} from '@zbuy/shared';
import { apiRequest } from './api';

// Auth

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export function login(email: string, password: string) {
  return apiRequest<{ user: AuthUser }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function signup(name: string, email: string, password: string) {
  return apiRequest<{ user: AuthUser }>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export function logout() {
  return apiRequest<void>('/auth/logout', { method: 'POST' });
}

export function getCurrentUser() {
  return apiRequest<{ user: AuthUser }>('/me');
}

// Layout contribution consent

export function getLayoutConsent() {
  return apiRequest<LayoutContributionConsentDto>('/layout-consent');
}

export function updateLayoutConsent(input: UpdateLayoutContributionConsentRequest) {
  return apiRequest<LayoutContributionConsentDto>('/layout-consent', {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

// Units

export function listUnits() {
  return apiRequest<{ units: UnitDto[] }>('/units');
}

// Products

export function listProducts(query = '') {
  const params = query.trim() ? `?query=${encodeURIComponent(query.trim())}` : '';
  return apiRequest<{ products: ProductDto[] }>(`/products${params}`);
}

export function createProduct(input: UpsertProductRequest) {
  return apiRequest<ProductDto>('/products', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateProduct(id: string, input: UpsertProductRequest) {
  return apiRequest<ProductDto>(`/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export function archiveProduct(id: string) {
  return apiRequest<ProductDto>(`/products/${id}/archive`, { method: 'POST' });
}

// Shopping Lists

export function listShoppingLists() {
  return apiRequest<{ shoppingLists: ShoppingListSummaryDto[] }>('/shopping-lists');
}

export function getShoppingList(id: string) {
  return apiRequest<ShoppingListDetailDto>(`/shopping-lists/${id}`);
}

export function createShoppingList(input: UpsertShoppingListRequest) {
  return apiRequest<ShoppingListDetailDto>('/shopping-lists', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateShoppingList(id: string, input: UpsertShoppingListRequest) {
  return apiRequest<ShoppingListDetailDto>(`/shopping-lists/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export function archiveShoppingList(id: string) {
  return apiRequest<ShoppingListDetailDto>(`/shopping-lists/${id}/archive`, {
    method: 'POST',
  });
}

export function deleteShoppingList(id: string) {
  return apiRequest<void>(`/shopping-lists/${id}`, { method: 'DELETE' });
}

export function duplicateShoppingList(id: string) {
  return apiRequest<ShoppingListDetailDto>(`/shopping-lists/${id}/duplicate`, {
    method: 'POST',
  });
}

// Shopping List Items

export function addShoppingListItem(listId: string, input: UpsertShoppingListItemRequest) {
  return apiRequest<ShoppingListDetailDto>(`/shopping-lists/${listId}/items`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateShoppingListItem(
  listId: string,
  itemId: string,
  input: UpsertShoppingListItemRequest
) {
  return apiRequest<ShoppingListDetailDto>(`/shopping-lists/${listId}/items/${itemId}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export function deleteShoppingListItem(listId: string, itemId: string) {
  return apiRequest<ShoppingListDetailDto>(`/shopping-lists/${listId}/items/${itemId}`, {
    method: 'DELETE',
  });
}
