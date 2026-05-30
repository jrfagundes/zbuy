import * as SecureStore from 'expo-secure-store';

/**
 * API base URL.
 * - Android emulator → use 10.0.2.2 (maps to host machine's localhost)
 * - Physical device on same WiFi → set EXPO_PUBLIC_API_URL to your local IP
 *   e.g. EXPO_PUBLIC_API_URL=http://192.168.1.x:3001
 */
export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:3001';

const SESSION_COOKIE_KEY = 'zbuy_session_value';
const SESSION_COOKIE_NAME = 'zbuy_session';

export async function getSessionCookie(): Promise<string | null> {
  return SecureStore.getItemAsync(SESSION_COOKIE_KEY);
}

export async function clearSessionCookie(): Promise<void> {
  await SecureStore.deleteItemAsync(SESSION_COOKIE_KEY);
}

async function saveSessionFromResponse(response: Response): Promise<void> {
  const setCookie = response.headers.get('set-cookie');
  if (!setCookie) return;
  const match = setCookie.match(new RegExp(`${SESSION_COOKIE_NAME}=([^;]+)`));
  if (match?.[1]) {
    await SecureStore.setItemAsync(SESSION_COOKIE_KEY, match[1]);
  }
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const sessionCookie = await getSessionCookie();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (sessionCookie) {
    headers['Cookie'] = `${SESSION_COOKIE_NAME}=${sessionCookie}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  await saveSessionFromResponse(response);

  if (!response.ok) {
    let message = 'Erro na requisição';
    try {
      const body = await response.json();
      if (Array.isArray(body.message)) {
        message = body.message.join(', ');
      } else if (typeof body.message === 'string') {
        message = body.message;
      }
    } catch {
      // ignore parse errors
    }
    throw new ApiError(response.status, message);
  }

  const text = await response.text();
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}
