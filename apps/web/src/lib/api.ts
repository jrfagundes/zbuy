import type { AuthenticatedUserResponse } from "@zbuy/shared";

export const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_URL ?? process.env.WEB_PUBLIC_API_URL ?? "http://127.0.0.1:3001";

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
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

  return response.json() as Promise<T>;
}

export type AuthResponse = AuthenticatedUserResponse;
