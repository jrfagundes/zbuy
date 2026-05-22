import { expect, test } from "@playwright/test";

test("native account, products, and reusable lists", async ({ page }) => {
  const email = `e2e-${Date.now()}@example.com`;
  const password = "CorrectHorseBatteryStaple1!";

  await page.goto("/signup");
  await page.getByLabel("Nome").fill("E2E User");
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Senha").fill(password);
  await page.getByRole("button", { name: "Criar conta" }).click();
  await expect(page).toHaveURL(/\/account/);
  await expect(page.getByText(email)).toBeVisible({ timeout: 10_000 });

  await page.goto("/products");
  await expect(page.getByRole("button", { name: "Salvar produto" })).toBeEnabled();
  await page.getByLabel("Nome do produto").fill("Arroz");
  await page.getByLabel("Categoria").fill("Mercearia");
  await page.getByLabel("Preço estimado").fill("12.50");
  await page.getByRole("button", { name: "Salvar produto" }).click();
  await expect(page.getByText("Arroz")).toBeVisible();

  await page.goto("/lists");
  await expect(page.getByText("Nenhuma lista criada.")).toBeVisible();
  await page.getByLabel("Nome da lista").fill("Compra semanal");
  await page.getByRole("button", { name: "Criar lista" }).click();
  await expect(page.getByRole("link", { name: "Compra semanal" })).toBeVisible();
  await page.getByRole("link", { name: "Compra semanal" }).click();
  await page.getByLabel("Produto").selectOption({ label: "Arroz" });
  await page.getByLabel("Quantidade").fill("2");
  await page.getByRole("button", { name: "Adicionar item" }).click();
  await expect(page.locator(".resource-row", { hasText: "Arroz" })).toBeVisible();

  await page.goto("/lists");
  await page.getByRole("button", { name: "Duplicar Compra semanal" }).click();
  await expect(page.getByText("Compra semanal - copia")).toBeVisible();

  await page.goto("/account");
  await expect(page.getByText(email)).toBeVisible({ timeout: 10_000 });
  await page.getByRole("button", { name: "Sair" }).click();
  await expect(page.getByText("Conta indisponível")).toBeVisible();

  await page.goto("/");
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Senha").fill(password);
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page).toHaveURL(/\/account/);
  await expect(page.getByText(email)).toBeVisible({ timeout: 10_000 });
});
