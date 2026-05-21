import { expect, test } from "@playwright/test";

test("native account sign up, login, account, logout", async ({ page }) => {
  const email = `e2e-${Date.now()}@example.com`;
  const password = "CorrectHorseBatteryStaple1!";

  await page.goto("/signup");
  await page.getByLabel("Nome").fill("E2E User");
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Senha").fill(password);
  await page.getByRole("button", { name: "Criar conta" }).click();
  await expect(page.getByText(email)).toBeVisible();
  await page.getByRole("button", { name: "Sair" }).click();
  await expect(page.getByText("Conta indisponível")).toBeVisible();

  await page.goto("/");
  await page.getByLabel("E-mail").fill(email);
  await page.getByLabel("Senha").fill(password);
  await page.getByRole("button", { name: "Entrar" }).click();
  await expect(page.getByText(email)).toBeVisible();
});
