# Deploy do backend ZBuy — Render (API) + Neon (Postgres)

Guia para colocar o backend na internet **de graça**, gerar um APK apontando para a
URL pública e testar no supermercado de verdade (no celular, em rede móvel).

- **API** → Render (Docker, plano free). "Dorme" após ~15 min ocioso → 1ª chamada
  depois disso leva ~50s pra acordar (cold start). Normal no free tier.
- **Postgres** → Neon (plano free, permanente). Não expira como o Postgres do Render.

> O app mobile fala direto com a API por **HTTPS**, então funciona em qualquer rede
> (Wi-Fi ou dados móveis) — sem `adb reverse`, sem computador junto.

---

## Visão geral das fases

| Fase | Quem faz | O quê |
|------|----------|-------|
| A | **Você** | Criar projeto no Neon e copiar a connection string |
| B | **Eu (Claude)** | Rodar migrations + seed de unidades + catálogo no Neon |
| C | **Você** | Criar o serviço no Render (Blueprint) e setar as env vars |
| D | **Eu** | Smoke-test da API pública (health, signup, login) |
| E | **Eu + você** | Apontar o app para a URL do Render, gerar o APK, você instala |

---

## Fase A — Neon (Postgres grátis)

1. Acesse <https://neon.tech> → **Sign up** (pode usar a conta Google).
2. **Create project**: nome `zbuy`, região mais próxima (ex.: *AWS US East (Ohio)*),
   versão do Postgres 16.
3. Na tela do projeto, em **Connection string**, copie a string **direct** (a que
   **não** tem `-pooler` no host). Algo como:
   ```
   postgresql://USER:PASSWORD@ep-xxxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
   > Use a **direct** (sem `-pooler`) para as migrations. No free tier de baixo tráfego
   > ela serve também para o app rodar.
4. **Me mande essa connection string** — eu sigo para a Fase B.

---

## Fase B — Semear o banco no Neon (eu faço)

Com a `DATABASE_URL` do Neon eu rodo, a partir da minha máquina:

```powershell
# 1. Cria o schema (todas as migrations)
$env:DATABASE_URL="<neon-url>"; corepack pnpm --filter @zbuy/api exec prisma migrate deploy

# 2. Seed de unidades (kg, g, L, unit, ...)
$env:DATABASE_URL="<neon-url>"; corepack pnpm --filter @zbuy/api prisma:seed-units

# 3. Restaura o catálogo global limpo (3.236 produtos)
psql "<neon-url>" -f apps/api/prisma/seed-data/catalog-seed.sql
```

> As cópias por usuário (`Product`) **não** precisam ser migradas: cada conta recebe o
> catálogo automaticamente (auto-provisioning) ao se cadastrar/logar no ambiente novo.

Verificação: `SELECT count(*) FROM "ProductCatalog";` deve retornar **3236**.

---

## Fase C — Render (API)

O repo já tem `Dockerfile`, `.dockerignore` e `render.yaml` prontos.

1. Acesse <https://render.com> → **Sign up** (conecte sua conta GitHub `jrfagundes`).
2. **New + → Blueprint** → selecione o repositório `jrfagundes/zbuy`.
3. O Render lê o `render.yaml` e propõe o serviço `zbuy-api` (Docker, free). Confirme.
4. Em **Environment**, preencha as variáveis marcadas como *sync: false*:

   | Variável | Valor |
   |----------|-------|
   | `DATABASE_URL` | a connection string do Neon (a mesma da Fase A) |
   | `GOOGLE_CLIENT_ID` | o **Web** Client ID do Google (mesmo do `.env` local) |

   Já vêm preenchidas automaticamente: `NODE_ENV=production`, `SESSION_SECRET`
   (gerado), `SESSION_COOKIE_NAME`, `WEB_ORIGIN`, `PASSWORD_RESET_BASE_URL`.

5. **Create**. O primeiro build leva alguns minutos (Docker + pnpm). No deploy, o
   container roda `prisma migrate deploy` e sobe a API.
6. Anote a URL pública, algo como **`https://zbuy-api.onrender.com`**.

> **Migrations no boot:** o `CMD` do Dockerfile aplica as migrations a cada deploy.
> Como eu já rodei na Fase B, ele só confirma que não há nada pendente.

---

## Fase D — Smoke-test (eu faço)

Com a URL do Render eu testo:

```bash
curl https://zbuy-api.onrender.com/health/live            # {"status":"ok"}
curl https://zbuy-api.onrender.com/health/ready           # postgres: ok
# signup + login + GET /me + contagem de produtos do novo usuário
```

---

## Fase E — APK apontando para a internet

O app embute `EXPO_PUBLIC_API_URL` **no momento do build** → precisa rebuildar.

1. Eu edito `apps/mobile/.env`:
   ```
   EXPO_PUBLIC_API_URL=https://zbuy-api.onrender.com
   ```
2. Build **release** local (JS embutido → roda sem Metro, standalone no supermercado):
   ```powershell
   cd apps/mobile
   npx expo run:android --variant release
   ```
   > O build release é assinado com o `android/app/debug.keystore` (padrão do template),
   > cujo SHA-1 **já está registrado** no Google Cloud → o login Google continua funcionando.
3. O APK sai em `apps/mobile/android/app/build/outputs/apk/release/app-release.apk`.
   Instale no celular (sideload, como no teste anterior).

### Google OAuth — confirmar
- O `GOOGLE_CLIENT_ID` no Render **deve ser o mesmo Web Client ID** usado em
  `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` (app). Já são iguais no ambiente local.
- O SHA-1 do `debug.keystore` já está no Google Cloud (registrado no teste anterior).
  Se você gerar um keystore de release próprio depois, registre o novo SHA-1.

---

## Cold start (o que esperar no supermercado)

- 1ª ação depois de ocioso: ~50s "acordando" (tela pode demorar). Depois fica rápido.
- Dica: abra o app e faça login **antes** de começar a comprar, pra já acordar a API.
- Se quiser eliminar o cold start no futuro: Render Starter (US$7/mês) ou Fly.io.

## Solução de problemas

- **Build do Render falha no pnpm**: confira que `pnpm-lock.yaml` está commitado e atualizado.
- **`P1001` / can't reach database**: `DATABASE_URL` errada ou faltando `?sslmode=require`.
- **App não conecta**: confirme o `EXPO_PUBLIC_API_URL` (https, sem barra final) e rebuild.
- **Login Google `DEVELOPER_ERROR`**: SHA-1 do APK não bate com o registrado no Google Cloud.
- **CORS no web**: ajuste `WEB_ORIGIN` no Render (o app mobile não usa CORS).
