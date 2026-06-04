import { GoogleSignin } from '@react-native-google-signin/google-signin';

/**
 * Google Sign-In integration.
 *
 * Requires a Web OAuth Client ID from the Google Cloud Console, exposed as
 * EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID (apps/mobile/.env). The same Web Client ID
 * must be set as GOOGLE_CLIENT_ID on the API so it can verify the returned
 * idToken's audience.
 *
 * On Android, you must also register an "Android" OAuth Client with the app's
 * package name (dev.zbuy.app) and the build's SHA-1 fingerprint.
 */

const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

/** Whether Google login is configured (Web Client ID present). */
export const isGoogleConfigured = Boolean(webClientId);

let configured = false;

function ensureConfigured() {
  if (configured) return;
  GoogleSignin.configure({ webClientId });
  configured = true;
}

/**
 * Opens the native Google account picker and returns a verifiable idToken.
 * Throws if the user cancels or no token is returned.
 */
export async function signInWithGoogle(): Promise<string> {
  if (!isGoogleConfigured) {
    throw new Error('Login com Google não configurado neste app.');
  }
  ensureConfigured();
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  const response = await GoogleSignin.signIn();
  // The SDK shape changed across versions: newer returns { data: { idToken } },
  // older returns { idToken } at the top level.
  const idToken =
    (response as { data?: { idToken?: string | null } }).data?.idToken ??
    (response as { idToken?: string | null }).idToken ??
    null;

  if (!idToken) {
    throw new Error('Não foi possível obter o token do Google.');
  }
  return idToken;
}
