# Configurar Login com Google (ZBuy)

O fluxo de login/cadastro com Google já está implementado no app (botão "Entrar com
Google") e no backend (`POST /auth/google`, que verifica o ID token). Para **ativar**,
você precisa criar credenciais no Google Cloud Console e plugá-las. Enquanto isso, o
botão aparece e, ao tocar, exibe um aviso de que ainda não está configurado.

## Visão geral

| Onde | Variável | Valor |
|------|----------|-------|
| `.env` (raiz, backend) | `GOOGLE_CLIENT_ID` | **Web** Client ID |
| `apps/mobile/.env` | `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` | **mesmo** Web Client ID |
| Google Cloud | Android OAuth Client | package `dev.zbuy.app` + SHA-1 |

O app (Android) obtém um **ID token** cujo *audience* é o **Web** Client ID. O backend
verifica esse token contra `GOOGLE_CLIENT_ID`. Por isso os dois usam o **mesmo Web Client ID**.
O **Android** OAuth Client não vira variável — ele só precisa existir no Google Cloud
(com o package e o SHA-1 corretos) para o Google Sign-In nativo funcionar.

## Passo a passo

### 1. Projeto e tela de consentimento
1. Acesse <https://console.cloud.google.com/> e crie (ou selecione) um projeto.
2. **APIs e serviços → Tela de consentimento OAuth**: tipo **Externo**, preencha nome do
   app, e-mail de suporte e e-mail do desenvolvedor. Em "Usuários de teste", adicione as
   contas Google que vão testar.

### 2. Web OAuth Client (backend + app)
1. **APIs e serviços → Credenciais → Criar credenciais → ID do cliente OAuth**.
2. Tipo de aplicativo: **Aplicativo da Web**.
3. Crie e copie o **Client ID** (algo como `123-abc.apps.googleusercontent.com`).
4. Cole em:
   - `.env` (raiz): `GOOGLE_CLIENT_ID=123-abc.apps.googleusercontent.com`
   - `apps/mobile/.env`: `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=123-abc.apps.googleusercontent.com`
     (crie o arquivo a partir de `apps/mobile/.env.example`)

### 3. Android OAuth Client (Google Sign-In nativo)
1. **Criar credenciais → ID do cliente OAuth → Android**.
2. **Nome do pacote**: `dev.zbuy.app`
3. **Impressão digital SHA-1**: obtenha do keystore que **assina o build** —
   `android/app/debug.keystore` (gerado pelo `expo prebuild`), **não** o
   `~/.android/debug.keystore` (eles diferem!):

   ```powershell
   keytool -list -v -keystore "apps\mobile\android\app\debug.keystore" -alias androiddebugkey -storepass android -keypass android
   ```

   Copie a linha `SHA1:` e cole no campo do Google Cloud.
   > Se o `android/` ainda não existe, rode `cd apps/mobile; npx expo prebuild --platform android` antes.
   > Para builds de release (EAS/Play Store), repita com o keystore de produção e o SHA-1
   > do Play App Signing.

### 4. Ativar e reconstruir
1. Garanta as duas variáveis preenchidas (backend e mobile).
2. Reinicie a API (carrega o novo `GOOGLE_CLIENT_ID`).
3. Reconstrua o dev client (módulo nativo):

   ```powershell
   cd apps/mobile
   npx expo prebuild --platform android --clean
   npx expo run:android
   ```

4. Toque em **Entrar com Google** → selecione a conta → o app recebe o ID token, envia
   para `POST /auth/google`, e a sessão é criada (cria a conta automaticamente no primeiro acesso).

## Verificação rápida
- Sem credenciais: `POST /auth/google` com token inválido responde **401**; o botão no app
  mostra aviso de "não configurado".
- Com credenciais: após login, confira no banco que existe um `User` e um
  `AuthIdentity` com `provider = "google"`.

## Solução de problemas
- **DEVELOPER_ERROR no app**: SHA-1 ou package do Android OAuth Client não batem com o build.
- **audience mismatch / Invalid token no backend**: `GOOGLE_CLIENT_ID` (backend) ≠
  `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` (app). Devem ser o **Web** Client ID, iguais.
- **Acesso bloqueado (app não verificado)**: adicione a conta em "Usuários de teste" na
  tela de consentimento.
