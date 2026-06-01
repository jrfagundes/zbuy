import type {
  LayoutContributionConsentDto,
  ProductDto,
  ShoppingListSummaryDto,
  UnitDto,
  UpdateLayoutContributionConsentRequest,
  UpsertProductRequest,
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
