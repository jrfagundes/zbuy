/**
 * Feature flags.
 *
 * O app é um cliente do backend ZBuy. OFFLINE troca a API remota por um
 * "backend" local no próprio aparelho (ver src/lib/localApi.ts), para testar
 * sem servidor. Enquanto OFFLINE, só as funções que rodam 100% no celular
 * ficam habilitadas; o resto depende do servidor e fica desligado.
 *
 * Para voltar ao backend real: EXPO_PUBLIC_OFFLINE=false (e EXPO_PUBLIC_API_URL).
 */
export const OFFLINE = (process.env.EXPO_PUBLIC_OFFLINE ?? 'true') !== 'false';

export const FEATURES = {
  // Rodam local (servidas pelo localApi em modo OFFLINE).
  products: true,
  lists: true,
  // Precisam de backend ao vivo — indisponíveis em modo OFFLINE.
  journeys: !OFFLINE,
  history: !OFFLINE,
  sharing: !OFFLINE,
  remoteAuth: !OFFLINE, // login / signup / Google
  layoutConsent: !OFFLINE,
} as const;
