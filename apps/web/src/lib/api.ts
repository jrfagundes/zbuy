import type { AuthenticatedUserResponse } from "@zbuy/shared";

export const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? process.env.WEB_PUBLIC_API_URL ?? "http://127.0.0.1:3001";

interface ApiRequestOptions {
  emptyBodyAsNull?: boolean;
}

export async function apiRequest<T>(path: string, init?: RequestInit, options: ApiRequestOptions = {}): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {})
    }
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(body.message ?? "Request failed");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  if (!text) {
    if (options.emptyBodyAsNull) {
      return null as T;
    }
    throw new Error("API response body was empty");
  }

  return JSON.parse(text) as T;
}

export type AuthResponse = AuthenticatedUserResponse;
