import "@testing-library/jest-dom/vitest";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import AccountPage from "./account/page";
import ListDetailPage from "./lists/[id]/page";
import ListsPage from "./lists/page";
import LoginPage from "./page";
import ProductsPage from "./products/page";
import ResetPasswordPage from "./reset-password/page";
import SignUpPage from "./signup/page";

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "list-1" }),
  useRouter: () => ({ push: vi.fn() })
}));

describe("authentication screens", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders login with native, Google, and Microsoft options", () => {
    render(<LoginPage />);

    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Continuar com Google" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Continuar com Microsoft" })).toBeInTheDocument();
  });

  it("renders sign up fields", () => {
    render(<SignUpPage />);

    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Criar conta" })).toBeInTheDocument();
  });

  it("renders reset password request form", () => {
    render(<ResetPasswordPage />);

    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Enviar instruções" })).toBeInTheDocument();
  });

  it("shows account unavailable state when the API cannot load /me", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ message: "Unauthorized" })
      })
    );

    render(<AccountPage />);

    expect(await screen.findByText("Conta indisponível")).toBeInTheDocument();
  });
});

describe("product and list screens", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const unit = {
    id: "unit-kg",
    name: "Kilogram",
    abbreviation: "kg",
    type: "weight",
    allowsDecimals: true,
    sortOrder: 10
  };

  const product = {
    id: "product-1",
    name: "Arroz",
    categoryLabel: "Mercearia",
    brand: null,
    defaultUnitId: unit.id,
    defaultUnit: unit,
    estimatedPrice: "12.50",
    notes: null,
    archivedAt: null,
    createdAt: "2026-05-22T00:00:00.000Z",
    updatedAt: "2026-05-22T00:00:00.000Z"
  };

  function mockJsonResponses(...bodies: unknown[]) {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(() => {
        const body = bodies.shift();
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => body
        });
      })
    );
  }

  it("renders products form fields and product rows", async () => {
    mockJsonResponses({ units: [unit] }, { products: [product] });

    render(<ProductsPage />);

    expect(await screen.findByText("Arroz")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome do produto")).toBeInTheDocument();
    expect(screen.getByLabelText("Categoria")).toBeInTheDocument();
    expect(screen.getByLabelText("Preço estimado")).toBeInTheDocument();
  });

  it("renders lists form and duplicate action", async () => {
    mockJsonResponses({
      shoppingLists: [
        {
          id: "list-1",
          name: "Compra semanal",
          description: "Mercado",
          status: "active",
          duplicatedFromListId: null,
          itemCount: 2,
          createdAt: "2026-05-22T00:00:00.000Z",
          updatedAt: "2026-05-22T00:00:00.000Z"
        }
      ]
    });

    render(<ListsPage />);

    expect(await screen.findByText("Compra semanal")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome da lista")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Duplicar Compra semanal" })).toBeInTheDocument();
  });

  it("renders list detail item controls and expected price field", async () => {
    mockJsonResponses(
      {
        id: "list-1",
        name: "Compra semanal",
        description: "Mercado",
        status: "active",
        duplicatedFromListId: null,
        itemCount: 1,
        createdAt: "2026-05-22T00:00:00.000Z",
        updatedAt: "2026-05-22T00:00:00.000Z",
        items: [
          {
            id: "item-1",
            productId: product.id,
            productName: product.name,
            categoryLabel: product.categoryLabel,
            quantity: "2",
            unitId: unit.id,
            unit,
            expectedPrice: "25.00",
            priority: "normal",
            notes: null,
            sortOrder: 0
          }
        ]
      },
      { products: [product] },
      { units: [unit] }
    );

    render(<ListDetailPage />);

    expect(await screen.findByText("Itens da lista")).toBeInTheDocument();
    expect(screen.getByLabelText("Produto")).toBeInTheDocument();
    expect(screen.getByLabelText("Preço esperado")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Adicionar item" })).toBeInTheDocument();
  });
});
