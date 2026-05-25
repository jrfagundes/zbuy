import "@testing-library/jest-dom/vitest";
import React from "react";
import type { ShoppingSessionDetailDto, ShoppingSessionItemDto } from "@zbuy/shared";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import AccountPage from "./account/page";
import ListDetailPage from "./lists/[id]/page";
import ListsPage from "./lists/page";
import LoginPage from "./page";
import ProductsPage from "./products/page";
import PurchasesPage from "./purchases/page";
import PurchaseSessionPage from "./purchases/[id]/page";
import ResetPasswordPage from "./reset-password/page";
import SignUpPage from "./signup/page";
import * as resources from "../lib/resources";

const routerPush = vi.hoisted(() => vi.fn());
const routeParams = vi.hoisted(() => ({ current: { id: "list-1" } }));

vi.mock("next/navigation", () => ({
  useParams: () => routeParams.current,
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
    routeParams.current = { id: "list-1" };
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

describe("purchase session detail", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    routerPush.mockClear();
    routeParams.current = { id: "list-1" };
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

  const pendingItem: ShoppingSessionItemDto = {
    id: "item-pending",
    sourceProductId: "product-1",
    sourceListItemId: "list-item-1",
    snapshotProductName: "Arroz",
    snapshotCategoryLabel: "Mercearia",
    snapshotBrand: null,
    quantity: "2",
    unitId: "unit-kg",
    snapshotUnitName: "Kilogram",
    snapshotUnitAbbreviation: "kg",
    expectedPrice: "10.00",
    actualPrice: null,
    status: "pending" as const,
    priority: "normal" as const,
    notes: "Comprar tipo 1",
    sortOrder: 0
  };

  const boughtItem: ShoppingSessionItemDto = {
    ...pendingItem,
    id: "item-bought",
    snapshotProductName: "Feijão",
    actualPrice: "8.50",
    status: "bought" as const,
    notes: null
  };

  const notFoundItem: ShoppingSessionItemDto = {
    ...pendingItem,
    id: "item-not-found",
    snapshotProductName: "Azeite",
    actualPrice: null,
    status: "not_found" as const,
    notes: null
  };

  function makeSession(items: ShoppingSessionItemDto[] = [pendingItem, boughtItem, notFoundItem]): ShoppingSessionDetailDto {
    return {
      id: "session-1",
      sourceListId: "list-1",
      sourceListName: "Compra semanal",
      purchaseLocation: location,
      context: "physical" as const,
      status: "active" as const,
      startedAt: "2026-05-24T10:00:00.000Z",
      completedAt: null,
      canceledAt: null,
      knownTotal: "8.50",
      boughtItemsWithoutPriceCount: 0,
      itemCounts: {
        pending: items.filter((item) => item.status === "pending").length,
        bought: items.filter((item) => item.status === "bought").length,
        notFound: items.filter((item) => item.status === "not_found").length,
        unprocessed: items.filter((item) => item.status === "unprocessed").length
      },
      items
    };
  }

  function mockSession(session = makeSession()) {
    routeParams.current = { id: "session-1" };
    vi.spyOn(resources, "getShoppingSession").mockResolvedValue(session);
    vi.spyOn(resources, "updateShoppingSessionItem").mockResolvedValue(session);
    vi.spyOn(resources, "completeShoppingSession").mockResolvedValue({ ...session, status: "completed" as const });
    vi.spyOn(resources, "cancelShoppingSession").mockResolvedValue({ ...session, status: "canceled" as const });
    return session;
  }

  it("renders pending, bought, and not found columns", async () => {
    mockSession();

    render(<PurchaseSessionPage />);

    expect(await screen.findByText("Pendente")).toBeInTheDocument();
    expect(screen.getByText("Comprado")).toBeInTheDocument();
    expect(screen.getByText("Não encontrado")).toBeInTheDocument();
    expect(screen.getByText("Arroz")).toBeInTheDocument();
    expect(screen.getByText("Feijão")).toBeInTheDocument();
    expect(screen.getByText("Azeite")).toBeInTheDocument();
  });

  it("moves a pending item to bought with the fallback button", async () => {
    const session = mockSession(makeSession([pendingItem]));
    vi.mocked(resources.updateShoppingSessionItem).mockResolvedValue(makeSession([{ ...pendingItem, status: "bought" as const }]));

    render(<PurchaseSessionPage />);

    await screen.findByText("Arroz");
    fireEvent.click(screen.getByRole("button", { name: "Marcar Arroz como comprado" }));

    await waitFor(() =>
      expect(resources.updateShoppingSessionItem).toHaveBeenCalledWith(session.id, pendingItem.id, { status: "bought" })
    );
  });

  it("moves an item back to pending with the fallback button", async () => {
    const session = mockSession(makeSession([boughtItem]));
    vi.mocked(resources.updateShoppingSessionItem).mockResolvedValue(makeSession([{ ...boughtItem, status: "pending" as const }]));

    render(<PurchaseSessionPage />);

    await screen.findByText("Feijão");
    fireEvent.click(screen.getByRole("button", { name: "Voltar Feijão para pendente" }));

    await waitFor(() =>
      expect(resources.updateShoppingSessionItem).toHaveBeenCalledWith(session.id, boughtItem.id, { status: "pending" })
    );
  });

  it("updates actual price through the API", async () => {
    const session = mockSession(makeSession([boughtItem]));

    render(<PurchaseSessionPage />);

    const priceInput = await screen.findByLabelText("Preço real de Feijão");
    fireEvent.change(priceInput, { target: { value: "9.25" } });
    fireEvent.blur(priceInput);

    await waitFor(() =>
      expect(resources.updateShoppingSessionItem).toHaveBeenCalledWith(session.id, boughtItem.id, { actualPrice: "9.25" })
    );
  });

  it("completes the shopping session through the API", async () => {
    const session = mockSession();

    render(<PurchaseSessionPage />);

    fireEvent.click(await screen.findByRole("button", { name: "Finalizar compra" }));

    await waitFor(() => expect(resources.completeShoppingSession).toHaveBeenCalledWith(session.id));
    expect(routerPush).toHaveBeenCalledWith(`/history/${session.id}`);
  });

  it("cancels the shopping session through the API", async () => {
    const session = mockSession();

    render(<PurchaseSessionPage />);

    fireEvent.click(await screen.findByRole("button", { name: "Cancelar sessão" }));

    await waitFor(() => expect(resources.cancelShoppingSession).toHaveBeenCalledWith(session.id));
    expect(routerPush).toHaveBeenCalledWith("/purchases");
  });
});

describe("product and list screens", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    routeParams.current = { id: "list-1" };
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
