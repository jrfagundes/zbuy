# Configurar e-mail de convite — domínio próprio + Resend

O backend envia o convite de cadastro (ao compartilhar uma lista com um e-mail sem
conta) via **SMTP genérico**. Aqui usamos **Resend** com um **domínio próprio**, para
enviar de `convites@seudominio.com` para qualquer destinatário, com boa entregabilidade.

> O código não muda: tudo é controlado por variáveis de ambiente no Render
> (`SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS/MAIL_FROM`).

---

## Passo 1 — Registrar o domínio (.com)

1. Escolha um nome disponível. Como `zbuy.com` provavelmente está tomado, tente:
   `getzbuy.com`, `zbuyapp.com`, `usezbuy.com`, `zbuylist.com`, `meuzbuy.com`.
2. Registre em um registrar confiável. Recomendado:
   - **Cloudflare Registrar** (<https://dash.cloudflare.com>) — preço de custo (~US$10,44/ano
     no .com), WHOIS privado grátis e DNS fácil. (Você cria conta, adiciona o site e
     registra o domínio; o DNS já fica na Cloudflare.)
   - Alternativa: **Namecheap** (<https://www.namecheap.com>).
3. Confirme que você tem acesso ao **painel de DNS** do domínio (na Cloudflare, aba **DNS**).

---

## Passo 2 — Criar conta no Resend e autenticar o domínio

1. Acesse <https://resend.com> → **Sign up** (pode usar o Google).
2. **Domains → Add Domain** → digite seu domínio (ex.: `getzbuy.com`).
3. O Resend mostra alguns **registros DNS** (tipo `TXT`/`CNAME` para SPF, DKIM e,
   opcionalmente, DMARC). **Copie cada um.**
4. No painel de DNS do domínio (Cloudflare), **adicione exatamente esses registros**.
   - Na Cloudflare, deixe os registros do Resend como **DNS only** (nuvem cinza), não "Proxied".
5. Volte ao Resend e clique em **Verify**. Pode levar de alguns minutos até propagar.
   Quando ficar **Verified**, está pronto.

---

## Passo 3 — Criar a API Key

1. No Resend: **API Keys → Create API Key** (permissão *Sending access*).
2. Copie a chave (começa com `re_...`). **Ela só aparece uma vez.**

---

## Passo 4 — Configurar no Render

No serviço `zbuy-api` → **Environment**, confira/defina:

| Variável | Valor |
|----------|-------|
| `SMTP_HOST` | `smtp.resend.com` (já no render.yaml) |
| `SMTP_PORT` | `587` (já no render.yaml) |
| `SMTP_USER` | `resend` (já no render.yaml) |
| `SMTP_PASS` | a **API key** do Resend (`re_...`) |
| `MAIL_FROM` | `ZBuy <convites@seudominio.com>` |

Salve. O Render reinicia o serviço com as novas variáveis.

---

## Passo 5 — Testar

1. No app, compartilhe uma lista com um e-mail **que não tem conta** no ZBuy.
2. Deve aparecer o alerta **"Convite enviado"** e o e-mail chega na caixa do destinatário
   com o botão **Baixar o ZBuy** (link do GitHub Release).
3. No Resend, a aba **Emails** mostra o envio (status *delivered*).

### Solução de problemas
- **"Não foi possível enviar o convite"**: `SMTP_PASS` errada, ou domínio ainda não
  *Verified* no Resend, ou `MAIL_FROM` usando um domínio diferente do verificado.
- **E-mail caiu no spam**: confirme SPF/DKIM verdes no Resend; adicione um registro DMARC.
- **Domínio não verifica**: revise se os registros DNS batem exatamente (sem proxy na Cloudflare).
