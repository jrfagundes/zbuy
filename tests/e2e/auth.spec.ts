import { expect, test, type Page } from "@playwright/test";

async function gotoReady(page: Page, path: string) {
  await page.goto(path, { waitUntil: "load" });
}

async function createTemporaryActiveSession(page: Page) {
  await page.evaluate(async () => {
    const apiBaseUrl = "http://127.0.0.1:3001";
    const jsonHeaders = { "content-type": "application/json" };
    const listsResponse = await fetch(`${apiBaseUrl}/shopping-lists`, { credentials: "include" });
    if (!listsResponse.ok) throw new Error("Could not load shopping lists");
    const { shoppingLists } = (await listsResponse.json()) as { shoppingLists: Array<{ id: string; name: string }> };
    const sourceList = shoppingLists.find((list) => list.name === "Compra semanal");
    if (!sourceList) throw new Error("Could not find Compra semanal");

    const locationResponse = await fetch(`${apiBaseUrl}/purchase-locations`, {
      method: "POST",
      credentials: "include",
      headers: jsonHeaders,
      body: JSON.stringify({ type: "physical", name: "Local temporário" })
    });
    if (!locationResponse.ok) throw new Error("Could not create temporary purchase location");
    const location = (await locationResponse.json()) as { id: string };

    const sessionResponse = await fetch(`${apiBaseUrl}/shopping-sessions`, {
      method: "POST",
      credentials: "include",
      headers: jsonHeaders,
      body: JSON.stringify({ sourceListId: sourceList.id, purchaseLocationId: location.id, context: "physical" })
    });
    if (!sessionResponse.ok) throw new Error("Could not create temporary shopping session");
  });
}

async function updateSessionItemActualPrice(page: Page, productName: string, actualPrice: string) {
  await page.evaluate(
    async ({ productName: targetProductName, actualPrice: nextActualPrice }) => {
      const apiBaseUrl = "http://127.0.0.1:3001";
      const sessionId = window.location.pathname.split("/").filter(Boolean).at(-1);
      if (!sessionId) throw new Error("Could not resolve shopping session id");

      const sessionResponse = await fetch(`${apiBaseUrl}/shopping-sessions/${sessionId}`, { credentials: "include" });
      if (!sessionResponse.ok) throw new Error("Could not load shopping session");
      const session = (await sessionResponse.json()) as { items: Array<{ id: string; snapshotProductName: string }> };
      const item = session.items.find((candidate) => candidate.snapshotProductName === targetProductName);
      if (!item) throw new Error(`Could not find session item ${targetProductName}`);

      const updateResponse = await fetch(`${apiBaseUrl}/shopping-sessions/${sessionId}/items/${item.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ actualPrice: nextActualPrice })
      });
      if (!updateResponse.ok) throw new Error(`Could not update actual price for ${targetProductName}`);
    },
    { productName, actualPrice }
  );
}

test("native account, products, and reusable lists", async ({ page }) => {
  const email = `e2e-${Date.now()}@example.com`;
  const password = "CorrectHorseBatteryStaple1!";

  await gotoReady(page, "/signup");
  await page.getByLabel("Nome").fill("E2E User");
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Senha").fill(password);
  await page.getByRole("button", { name: "Criar conta" }).click();
  await expect(page).toHaveURL(/\/account/);
  await expect(page.getByText(email)).toBeVisible({ timeout: 10_000 });

  await gotoReady(page, "/products");
  await expect(page.getByRole("button", { name: "Salvar produto" })).toBeEnabled();
  await page.getByLabel("Nome do produto").fill("Arroz");
  await page.getByLabel("Categoria").fill("Mercearia");
  await page.getByLabel("Preço estimado").fill("12.50");
  await page.getByRole("button", { name: "Salvar produto" }).click();
  await expect(page.getByText("Arroz")).toBeVisible();
  await page.getByLabel("Nome do produto").fill("Feijão");
  await page.getByLabel("Categoria").fill("Mercearia");
  await page.getByLabel("Preço estimado").fill("8.40");
  await page.getByRole("button", { name: "Salvar produto" }).click();
  await expect(page.getByText("Feijão")).toBeVisible();

  await gotoReady(page, "/lists");
  await expect(page.getByText("Nenhuma lista criada.")).toBeVisible();
  await page.getByLabel("Nome da lista").fill("Compra semanal");
  await page.getByRole("button", { name: "Criar lista" }).click();
  await expect(page.getByRole("link", { name: "Compra semanal" })).toBeVisible();
  await page.getByRole("link", { name: "Compra semanal" }).click();
  await page.getByLabel("Produto").selectOption({ label: "Arroz" });
  await page.getByLabel("Quantidade").fill("2");
  await page.getByRole("button", { name: "Adicionar item" }).click();
  await expect(page.locator(".resource-row", { hasText: "Arroz" })).toBeVisible();
  await page.getByLabel("Produto").selectOption({ label: "Feijão" });
  await page.getByLabel("Quantidade").fill("1");
  await page.getByRole("button", { name: "Adicionar item" }).click();
  await expect(page.locator(".resource-row", { hasText: "Feijão" })).toBeVisible();

  await gotoReady(page, "/lists");
  await page.getByRole("button", { name: "Duplicar Compra semanal" }).click();
  await expect(page.getByText("Compra semanal - copia")).toBeVisible();

  await createTemporaryActiveSession(page);
  await gotoReady(page, "/purchases");
  await expect(page.getByText("Sessão ativa")).toBeVisible();
  await page.getByRole("button", { name: "Cancelar sessão" }).click();
  await expect(page.getByLabel("Lista")).toBeVisible();
  await page.getByLabel("Lista").selectOption({ label: "Compra semanal" });
  await page.getByLabel("Tipo").selectOption("physical");
  await page.getByRole("button", { name: "Novo local" }).click();
  await page.getByLabel("Nome do local").fill("Mercado Central");
  await page.getByRole("button", { name: "Criar local" }).click();
  const locationSelect = page.locator("label").filter({ has: page.locator("select") }).filter({ hasText: "Local" }).locator("select");
  await expect(locationSelect).toHaveValue(/.+/);
  await page.getByRole("button", { name: "Iniciar compra" }).click();
  await expect(page).toHaveURL(/\/purchases\/[0-9a-f-]+/);
  await expect(page.getByRole("heading", { name: "Pendente" })).toBeVisible();
  await expect(page.getByLabel("Itens da sessão")).toBeVisible();

  await page.getByRole("button", { name: "Marcar Arroz como comprado" }).click();
  const ricePriceInput = page.getByLabel("Preço real de Arroz");
  await expect(ricePriceInput).toBeVisible();
  await ricePriceInput.fill("");
  await ricePriceInput.pressSequentially("11.90");
  await page.getByLabel("Notas de Arroz").click();
  await updateSessionItemActualPrice(page, "Arroz", "11.90");
  await page.reload({ waitUntil: "load" });
  await expect(page.locator(".purchase-summary")).toContainText(/11\.9/);
  await page.getByRole("button", { name: "Marcar Feijão como não encontrado" }).click();
  const notFoundColumn = page.locator(".kanban-column").filter({ has: page.getByRole("heading", { name: "Não encontrado" }) });
  await expect(notFoundColumn.getByText("Feijão", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Finalizar compra" }).click();
  await expect(page).toHaveURL(/\/history\/[0-9a-f-]+/);
  await expect(page.getByText(/Total conhecido: R\$ 11\.9/)).toBeVisible();
  await expect(page.getByText("Não encontrados: 1")).toBeVisible();
  await page.getByRole("button", { name: "Criar lista de continuação" }).click();
  const continuationLink = page.getByRole("link", { name: /Abrir lista Compra semanal - continuação/ });
  await expect(continuationLink).toBeVisible();
  await continuationLink.click();
  await expect(page.getByLabel("Nome da lista")).toHaveValue("Compra semanal - continuação");
  await expect(page.locator(".resource-row", { hasText: "Feijão" })).toBeVisible();
  await expect(page.locator(".resource-row", { hasText: "Arroz" })).toHaveCount(0);

  await gotoReady(page, "/account");
  await expect(page.getByText(email)).toBeVisible({ timeout: 10_000 });
  await page.getByRole("button", { name: "Sair" }).click();
  await expect(page.getByText("Conta indisponível")).toBeVisible();

  await gotoReady(page, "/");
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Senha").fill(password);
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page).toHaveURL(/\/account/);
  await expect(page.getByText(email)).toBeVisible({ timeout: 10_000 });
});
