import "@testing-library/jest-dom/vitest";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import AccountPage from "./account/page";
import ListDetailPage from "./lists/[id]/page";
import ListsPage from "./lists/page";
import LoginPage from "./page";
import ProductsPage from "./products/page";
import PurchasesPage from "./purchases/page";
import ResetPasswordPage from "./reset-password/page";
import SignUpPage from "./signup/page";
import * as resources from "../lib/resources";

const routerPush = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useParams: () => ({ id: "list-1" }),
  useRouter: () => ({ push: routerPush })
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

describe("purchase dashboard", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    routerPush.mockClear();
  });

  const location = {
    id: "loc-1",
    type: "physical" as const,
    name: "Mercado Central",
    address: null,
    city: null,
    websiteOrApp: null,
    notes: null,
    archivedAt: null,
    createdAt: "2026-05-24T00:00:00.000Z",
    updatedAt: "2026-05-24T00:00:00.000Z"
  };

  const onlineLocation = {
    ...location,
    id: "loc-online",
    type: "online" as const,
    name: "Loja Online"
  };

  const shoppingList = {
    id: "list-1",
    name: "Compra semanal",
    description: "Mercado",
    status: "active" as const,
    duplicatedFromListId: null,
    itemCount: 2,
    createdAt: "2026-05-24T00:00:00.000Z",
    updatedAt: "2026-05-24T00:00:00.000Z"
  };

  const activeSession = {
    id: "session-active",
    sourceListId: shoppingList.id,
    sourceListName: shoppingList.name,
    purchaseLocation: location,
    context: "physical" as const,
    status: "active" as const,
    startedAt: "2026-05-24T10:00:00.000Z",
    completedAt: null,
    canceledAt: null,
    knownTotal: "0.00",
    boughtItemsWithoutPriceCount: 0,
    itemCounts: { pending: 2, bought: 0, notFound: 0, unprocessed: 0 },
    items: []
  };

  const completedSession = {
    ...activeSession,
    id: "session-completed",
    status: "completed" as const,
    completedAt: "2026-05-24T11:00:00.000Z",
    itemCounts: { pending: 0, bought: 2, notFound: 0, unprocessed: 0 }
  };

  const canceledSession = {
    ...activeSession,
    id: "session-canceled",
    sourceListName: "Compra cancelada",
    status: "canceled" as const,
    canceledAt: "2026-05-24T10:30:00.000Z"
  };

  function mockPurchaseResources(active: typeof activeSession | null = null) {
    vi.spyOn(resources, "getActiveShoppingSession").mockResolvedValue(active);
    vi.spyOn(resources, "listShoppingSessions").mockImplementation(async (status) => {
      if (status === "completed") return { shoppingSessions: [completedSession] };
      if (status === "canceled") return { shoppingSessions: [canceledSession] };
      return { shoppingSessions: [] };
    });
    vi.spyOn(resources, "listShoppingLists").mockResolvedValue({ shoppingLists: [shoppingList] });
    vi.spyOn(resources, "listPurchaseLocations").mockResolvedValue({ purchaseLocations: [location] });
    vi.spyOn(resources, "cancelShoppingSession").mockResolvedValue({
      ...activeSession,
      status: "canceled",
      canceledAt: "2026-05-24T10:30:00.000Z"
    });
    vi.spyOn(resources, "createPurchaseLocation").mockResolvedValue({ ...location, id: "loc-2", name: "Atacado Norte" });
    vi.spyOn(resources, "startShoppingSession").mockResolvedValue({ ...activeSession, id: "session-new" });
  }

  function deferred<T>() {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>((done) => {
      resolve = done;
    });
    return { promise, resolve };
  }

  it("shows the active session with continue and cancel actions", async () => {
    mockPurchaseResources(activeSession);

    render(<PurchasesPage />);

    expect(await screen.findByText("Sessão ativa")).toBeInTheDocument();
    expect(screen.getAllByText("Mercado Central").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Compra semanal").length).toBeGreaterThan(0);
    expect(screen.getAllByText("active").length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: "Continuar compra" })).toHaveAttribute("href", "/purchases/session-active");

    fireEvent.click(screen.getByRole("button", { name: "Cancelar sessão" }));

    await waitFor(() => expect(resources.cancelShoppingSession).toHaveBeenCalledWith("session-active"));
  });

  it("lists reusable shopping lists and locations in the start form", async () => {
    mockPurchaseResources();

    render(<PurchasesPage />);

    expect(await screen.findByLabelText("Lista")).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo")).toBeInTheDocument();
    expect(screen.getByLabelText("Local")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Compra semanal" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Mercado Central" })).toBeInTheDocument();
  });

  it("links to full history and shows canceled recent sessions", async () => {
    mockPurchaseResources();

    render(<PurchasesPage />);

    expect(await screen.findByRole("link", { name: "Ver histórico completo" })).toHaveAttribute("href", "/history");
    expect(screen.getAllByText("Compra cancelada").length).toBeGreaterThan(0);
    expect(screen.getAllByText("canceled").length).toBeGreaterThan(0);
  });

  it("loads recent sessions by completed and canceled status only", async () => {
    mockPurchaseResources();

    render(<PurchasesPage />);

    await screen.findByText("Sessões recentes");

    expect(resources.listShoppingSessions).toHaveBeenCalledWith("completed", expect.any(Number));
    expect(resources.listShoppingSessions).toHaveBeenCalledWith("canceled", expect.any(Number));
    expect(resources.listShoppingSessions).not.toHaveBeenCalledWith(undefined, expect.any(Number));
  });

  it("keeps locations aligned with the latest selected purchase type", async () => {
    const onlineLocations = deferred<{ purchaseLocations: typeof onlineLocation[] }>();
    mockPurchaseResources();
    vi.mocked(resources.listPurchaseLocations).mockImplementation(async (type) => {
      if (type === "online") return onlineLocations.promise;
      return { purchaseLocations: [location] };
    });

    render(<PurchasesPage />);

    const typeSelect = await screen.findByLabelText("Tipo");
    fireEvent.change(typeSelect, { target: { value: "online" } });
    fireEvent.change(typeSelect, { target: { value: "physical" } });

    await waitFor(() => expect(screen.getByRole("option", { name: "Mercado Central" })).toBeInTheDocument());

    await act(async () => {
      onlineLocations.resolve({ purchaseLocations: [onlineLocation] });
      await onlineLocations.promise;
    });

    expect(screen.getByRole("option", { name: "Mercado Central" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Loja Online" })).not.toBeInTheDocument();
  });

  it("creates a purchase location inline", async () => {
    mockPurchaseResources();

    render(<PurchasesPage />);

    await screen.findByLabelText("Lista");
    fireEvent.click(screen.getByRole("button", { name: "Novo local" }));
    fireEvent.change(screen.getByLabelText("Nome do local"), { target: { value: "Atacado Norte" } });
    fireEvent.click(screen.getByRole("button", { name: "Criar local" }));

    await waitFor(() =>
      expect(resources.createPurchaseLocation).toHaveBeenCalledWith({ type: "physical", name: "Atacado Norte" })
    );
  });

  it("starts a shopping session from the selected list and location", async () => {
    mockPurchaseResources();

    render(<PurchasesPage />);

    await screen.findByLabelText("Lista");
    fireEvent.change(screen.getByLabelText("Lista"), { target: { value: "list-1" } });
    fireEvent.change(screen.getByLabelText("Local"), { target: { value: "loc-1" } });
    fireEvent.click(screen.getByRole("button", { name: "Iniciar compra" }));

    await waitFor(() =>
      expect(resources.startShoppingSession).toHaveBeenCalledWith({
        sourceListId: "list-1",
        purchaseLocationId: "loc-1",
        context: "physical"
      })
    );
    expect(routerPush).toHaveBeenCalledWith("/purchases/session-new");
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
