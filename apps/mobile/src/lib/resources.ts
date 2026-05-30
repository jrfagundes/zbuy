import type { ShoppingListSummaryDto } from '@zbuy/shared';
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

export function getMe() {
  return apiRequest<{ user: AuthUser }>('/auth/me');
}

// Shopping Lists

export function listShoppingLists() {
  return apiRequest<{ shoppingLists: ShoppingListSummaryDto[] }>('/shopping-lists');
}
