import "@testing-library/jest-dom/vitest";
import React from "react";
import type {
  LayoutContributionConsentDto,
  PurchaseLocationDto,
  ShoppingListSummaryDto,
  ShoppingJourneyDetailDto,
  ShoppingJourneySummaryDto,
  ShoppingSessionDetailDto,
  ShoppingSessionItemDto,
  ShoppingSessionSummaryDto,
  SupermarketDto,
  SupermarketLayoutDto
} from "@zbuy/shared";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import AccountPage from "./account/page";
import ListDetailPage from "./lists/[id]/page";
import ListsPage from "./lists/page";
import LoginPage from "./page";
import ProductsPage from "./products/page";
import PurchasesPage from "./purchases/page";
import PurchaseSessionPage from "./purchases/[id]/page";
import SupermarketLayoutPage from "./supermarkets/[id]/layout/page";
import SupermarketsPage from "./supermarkets/page";
import HistoryDetailPage from "./history/[id]/page";
import HistoryPage from "./history/page";
import JourneyPage from "./journeys/[id]/page";
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

describe("supermarket layout screens", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    routeParams.current = { id: "supermarket-1" };
  });

  const supermarket: SupermarketDto = {
    id: "supermarket-1",
    name: "Mercado Central",
    address: "Rua A, 100",
    city: "São Paulo",
    latitude: "-23.5",
    longitude: "-46.6",
    presenceRadiusMeters: 500,
    archivedAt: null,
    createdAt: "2026-05-24T00:00:00.000Z",
    updatedAt: "2026-05-24T00:00:00.000Z"
  };

  const layout: SupermarketLayoutDto = {
    supermarketId: "supermarket-1",
    presenceRadiusMeters: 500,
    corridors: [
      { id: "corridor-1", name: "Mercearia", sortOrder: 0, productCount: 2 },
      { id: "corridor-2", name: "Hortifruti", sortOrder: 1, productCount: 1 }
    ],
    placements: [
      { productId: "product-rice", corridorId: "corridor-1", lastConfirmedAt: "2026-05-24T10:00:00.000Z" },
      { productId: "product-banana", corridorId: "corridor-2", lastConfirmedAt: "2026-05-24T10:00:00.000Z" }
    ],
    suggestions: [
      {
        id: "suggestion-1",
        productId: "product-bread",
        suggestedCorridorName: "Padaria",
        confidenceScore: "0.82",
        sourceContributionCount: 8
      }
    ]
  };

  const consent: LayoutContributionConsentDto = {
    globalSharedLayoutContributionEnabled: true,
    supermarketOverride: null,
    effectiveSharedLayoutContributionEnabled: true
  };

  function mockSupermarketLayout(overrides: Partial<SupermarketLayoutDto> = {}) {
    routeParams.current = { id: "supermarket-1" };
    vi.spyOn(resources, "listSupermarkets").mockResolvedValue({ supermarkets: [supermarket] });
    vi.spyOn(resources, "createSupermarket").mockResolvedValue({ ...supermarket, id: "supermarket-2", name: "Atacado Norte" });
    vi.spyOn(resources, "getSupermarketLayout").mockResolvedValue({ ...layout, ...overrides });
    vi.spyOn(resources, "updateSupermarket").mockResolvedValue({ ...supermarket, presenceRadiusMeters: 650 });
    vi.spyOn(resources, "createSupermarketCorridor").mockResolvedValue({ id: "corridor-3", name: "Bebidas", sortOrder: 2, productCount: 0 });
    vi.spyOn(resources, "updateSupermarketCorridor").mockResolvedValue({ id: "corridor-1", name: "Limpeza", sortOrder: 0, productCount: 2 });
    vi.spyOn(resources, "reorderSupermarketCorridors").mockResolvedValue({
      ...layout,
      corridors: [
        { id: "corridor-2", name: "Hortifruti", sortOrder: 0, productCount: 1 },
        { id: "corridor-1", name: "Mercearia", sortOrder: 1, productCount: 2 }
      ]
    });
    vi.spyOn(resources, "deleteSupermarketCorridor").mockResolvedValue(undefined);
    vi.spyOn(resources, "acceptSharedLayoutSuggestion").mockResolvedValue({
      productId: "product-bread",
      corridorId: "corridor-3",
      lastConfirmedAt: "2026-05-24T10:00:00.000Z"
    });
    vi.spyOn(resources, "getSupermarketLayoutConsent").mockResolvedValue(consent);
    vi.spyOn(resources, "updateSupermarketLayoutConsent").mockResolvedValue({
      ...consent,
      supermarketOverride: false,
      effectiveSharedLayoutContributionEnabled: false
    });
  }

  it("renders active supermarkets and creates a new supermarket", async () => {
    mockSupermarketLayout();

    render(<SupermarketsPage />);

    expect(await screen.findByText("Mercado Central")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Editar layout de Mercado Central" })).toHaveAttribute(
      "href",
      "/supermarkets/supermarket-1/layout"
    );

    fireEvent.change(screen.getByLabelText("Nome do supermercado"), { target: { value: "Atacado Norte" } });
    fireEvent.click(screen.getByRole("button", { name: "Criar supermercado" }));

    await waitFor(() => expect(resources.createSupermarket).toHaveBeenCalledWith({ name: "Atacado Norte" }));
  });

  it("edits corridors, radius, suggestions, and supermarket consent override", async () => {
    mockSupermarketLayout();

    render(<SupermarketLayoutPage />);

    expect(await screen.findByText("Mercado Central")).toBeInTheDocument();
    expect(screen.getByText("product-rice")).toBeInTheDocument();
    expect(screen.getByText("Sem corredor definido")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Raio de presença em metros"), { target: { value: "650" } });
    fireEvent.click(screen.getByRole("button", { name: "Salvar raio" }));
    await waitFor(() => expect(resources.updateSupermarket).toHaveBeenCalledWith("supermarket-1", { presenceRadiusMeters: 650 }));

    fireEvent.change(screen.getByLabelText("Nome do novo corredor"), { target: { value: "Bebidas" } });
    fireEvent.click(screen.getByRole("button", { name: "Criar corredor" }));
    await waitFor(() => expect(resources.createSupermarketCorridor).toHaveBeenCalledWith("supermarket-1", { name: "Bebidas" }));

    fireEvent.change(screen.getByLabelText("Nome do corredor Mercearia"), { target: { value: "Limpeza" } });
    fireEvent.click(screen.getByRole("button", { name: "Renomear Mercearia" }));
    await waitFor(() =>
      expect(resources.updateSupermarketCorridor).toHaveBeenCalledWith("supermarket-1", "corridor-1", { name: "Limpeza" })
    );

    fireEvent.click(screen.getByRole("button", { name: "Mover Hortifruti para cima" }));
    await waitFor(() =>
      expect(resources.reorderSupermarketCorridors).toHaveBeenCalledWith("supermarket-1", {
        corridorIds: ["corridor-2", "corridor-1", "corridor-3"]
      })
    );

    fireEvent.click(screen.getByRole("button", { name: "Excluir Mercearia" }));
    await waitFor(() => expect(resources.deleteSupermarketCorridor).toHaveBeenCalledWith("supermarket-1", "corridor-1"));

    fireEvent.click(screen.getByRole("button", { name: "Aceitar sugestão Padaria para product-bread" }));
    await waitFor(() =>
      expect(resources.acceptSharedLayoutSuggestion).toHaveBeenCalledWith("supermarket-1", "suggestion-1", {
        corridorName: "Padaria"
      })
    );

    fireEvent.change(screen.getByLabelText("Compartilhamento deste supermercado"), { target: { value: "false" } });
    fireEvent.click(screen.getByRole("button", { name: "Salvar compartilhamento do supermercado" }));
    await waitFor(() =>
      expect(resources.updateSupermarketLayoutConsent).toHaveBeenCalledWith("supermarket-1", { supermarketOverride: false })
    );
  });

  it("updates global layout contribution consent from account page", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ user: { id: "user-1", name: "Junio", email: "junio@example.com" } }),
        json: async () => ({ user: { id: "user-1", name: "Junio", email: "junio@example.com" } })
      })
    );
    vi.spyOn(resources, "getLayoutContributionConsent").mockResolvedValue(consent);
    vi.spyOn(resources, "updateLayoutContributionConsent").mockResolvedValue({
      ...consent,
      globalSharedLayoutContributionEnabled: false,
      effectiveSharedLayoutContributionEnabled: false
    });

    render(<AccountPage />);

    expect(await screen.findByText("Junio")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText("Contribuir com layouts compartilhados"));
    fireEvent.click(screen.getByRole("button", { name: "Salvar preferências de layout" }));

    await waitFor(() =>
      expect(resources.updateLayoutContributionConsent).toHaveBeenCalledWith({
        globalSharedLayoutContributionEnabled: false
      })
    );
  });
});

describe("purchase dashboard", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
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

  const activeJourney: ShoppingJourneyDetailDto = {
    id: "journey-active",
    sourceListId: shoppingList.id,
    sourceListName: shoppingList.name,
    sourceLists: [{ id: shoppingList.id, name: shoppingList.name }],
    context: "physical",
    status: "active",
    startedAt: "2026-05-24T10:00:00.000Z",
    completedAt: null,
    canceledAt: null,
    knownTotal: "0.00",
    boughtItemsWithoutPriceCount: 0,
    activeStop: {
      id: "stop-1",
      supermarketId: "supermarket-1",
      supermarketName: "Mercado Central",
      status: "active",
      startedAt: "2026-05-24T10:00:00.000Z",
      finishedAt: null,
      exitDetectedAt: null,
      continuedOutsideRadiusAt: null
    },
    items: [],
    layout: null
  };

  const canceledSession = {
    ...activeSession,
    id: "session-canceled",
    sourceListName: "Compra cancelada",
    status: "canceled" as const,
    canceledAt: "2026-05-24T10:30:00.000Z"
  };

  function mockPurchaseResources(active: typeof activeSession | null = null) {
    vi.stubGlobal("navigator", {
      geolocation: {
        getCurrentPosition: vi.fn((resolve) =>
          resolve({ coords: { latitude: -23.5, longitude: -46.6 } })
        )
      }
    });
    vi.spyOn(resources, "getActiveShoppingSession").mockResolvedValue(active);
    vi.spyOn(resources, "getActiveShoppingJourney").mockResolvedValue(null);
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
    vi.spyOn(resources, "detectSupermarket").mockResolvedValue({
      status: "detected",
      candidates: [
        {
          id: "supermarket-1",
          name: "Mercado Central",
          address: null,
          city: null,
          latitude: "-23.5",
          longitude: "-46.6",
          presenceRadiusMeters: 500,
          archivedAt: null,
          createdAt: "2026-05-24T00:00:00.000Z",
          updatedAt: "2026-05-24T00:00:00.000Z"
        }
      ]
    });
    vi.spyOn(resources, "createSupermarket").mockResolvedValue({
      id: "supermarket-created",
      name: "Mercado Novo",
      address: null,
      city: null,
      latitude: "-23.5",
      longitude: "-46.6",
      presenceRadiusMeters: 500,
      archivedAt: null,
      createdAt: "2026-05-24T00:00:00.000Z",
      updatedAt: "2026-05-24T00:00:00.000Z"
    });
    vi.spyOn(resources, "startShoppingJourney").mockResolvedValue({ ...activeJourney, id: "journey-new" });
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

  it("renders the physical journey start form by default", async () => {
    mockPurchaseResources();

    render(<PurchasesPage />);

    expect(await screen.findByLabelText("Lista")).toBeInTheDocument();
    expect(screen.getByLabelText("Tipo")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Compra semanal" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Detectar supermercado" })).toBeInTheDocument();
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

  it("loads locations for the selected online purchase type", async () => {
    const onlineLocations = deferred<{ purchaseLocations: typeof onlineLocation[] }>();
    mockPurchaseResources();
    vi.mocked(resources.listPurchaseLocations).mockImplementation(async (type) => {
      if (type === "online") return onlineLocations.promise;
      return { purchaseLocations: [location] };
    });

    render(<PurchasesPage />);

    const typeSelect = await screen.findByLabelText("Tipo");
    fireEvent.change(typeSelect, { target: { value: "online" } });

    await act(async () => {
      onlineLocations.resolve({ purchaseLocations: [onlineLocation] });
      await onlineLocations.promise;
    });

    expect(screen.getByRole("option", { name: "Loja Online" })).toBeInTheDocument();
  });

  it("detects the current supermarket using coordinates", async () => {
    mockPurchaseResources();

    render(<PurchasesPage />);

    await screen.findByLabelText("Lista");
    fireEvent.click(screen.getByRole("button", { name: "Detectar supermercado" }));

    await waitFor(() =>
      expect(resources.detectSupermarket).toHaveBeenCalledWith({ latitude: "-23.5", longitude: "-46.6" })
    );
    expect(await screen.findByLabelText("Mercado Central")).toBeInTheDocument();
  });

  it("starts a physical shopping journey from a detected supermarket", async () => {
    mockPurchaseResources();

    render(<PurchasesPage />);

    await screen.findByLabelText("Lista");
    fireEvent.change(screen.getByLabelText("Lista"), { target: { value: "list-1" } });
    fireEvent.click(screen.getByRole("button", { name: "Detectar supermercado" }));
    await screen.findByLabelText("Mercado Central");
    fireEvent.click(screen.getByRole("button", { name: "Iniciar compra" }));

    await waitFor(() =>
      expect(resources.startShoppingJourney).toHaveBeenCalledWith({
        sourceListId: "list-1",
        supermarketId: "supermarket-1",
        latitude: "-23.5",
        longitude: "-46.6"
      })
    );
    expect(routerPush).toHaveBeenCalledWith("/journeys/journey-new");
  });

  it("shows candidate selection when supermarket detection is ambiguous", async () => {
    mockPurchaseResources();
    vi.mocked(resources.detectSupermarket).mockResolvedValue({
      status: "ambiguous",
      candidates: [
        {
          id: "supermarket-1",
          name: "Mercado Central",
          address: null,
          city: null,
          latitude: "-23.5",
          longitude: "-46.6",
          presenceRadiusMeters: 500,
          archivedAt: null,
          createdAt: "2026-05-24T00:00:00.000Z",
          updatedAt: "2026-05-24T00:00:00.000Z"
        },
        {
          id: "supermarket-2",
          name: "Atacado Norte",
          address: null,
          city: null,
          latitude: "-23.5001",
          longitude: "-46.6001",
          presenceRadiusMeters: 500,
          archivedAt: null,
          createdAt: "2026-05-24T00:00:00.000Z",
          updatedAt: "2026-05-24T00:00:00.000Z"
        }
      ]
    });

    render(<PurchasesPage />);

    await screen.findByLabelText("Lista");
    fireEvent.click(screen.getByRole("button", { name: "Detectar supermercado" }));

    expect(await screen.findByText("Escolha o supermercado")).toBeInTheDocument();
    expect(screen.getByLabelText("Atacado Norte")).toBeInTheDocument();
  });

  it("shows supermarket creation fields when detection is unknown", async () => {
    mockPurchaseResources();
    vi.mocked(resources.detectSupermarket).mockResolvedValue({ status: "unknown", candidates: [] });

    render(<PurchasesPage />);

    await screen.findByLabelText("Lista");
    fireEvent.click(screen.getByRole("button", { name: "Detectar supermercado" }));
    fireEvent.change(await screen.findByLabelText("Nome do supermercado"), { target: { value: "Mercado Novo" } });
    fireEvent.click(screen.getByRole("button", { name: "Criar supermercado" }));

    await waitFor(() =>
      expect(resources.createSupermarket).toHaveBeenCalledWith({
        name: "Mercado Novo",
        latitude: "-23.5",
        longitude: "-46.6",
        presenceRadiusMeters: 500
      })
    );
  });

  it("creates and starts a physical journey manually without browser geolocation", async () => {
    mockPurchaseResources();

    render(<PurchasesPage />);

    await screen.findByLabelText("Lista");
    fireEvent.change(screen.getByLabelText("Lista"), { target: { value: "list-1" } });
    fireEvent.click(screen.getByRole("button", { name: "Criar supermercado manualmente" }));
    fireEvent.change(await screen.findByLabelText("Nome do supermercado"), { target: { value: "Mercado Manual" } });
    fireEvent.click(screen.getByRole("button", { name: "Criar e iniciar compra" }));

    await waitFor(() =>
      expect(resources.createSupermarket).toHaveBeenCalledWith({
        name: "Mercado Manual",
        presenceRadiusMeters: 500
      })
    );
    await waitFor(() =>
      expect(resources.startShoppingJourney).toHaveBeenCalledWith({
        sourceListId: "list-1",
        supermarketId: "supermarket-created"
      })
    );
    expect(routerPush).toHaveBeenCalledWith("/journeys/journey-new");
  });

  it("keeps the online context using the existing session start flow", async () => {
    mockPurchaseResources();

    render(<PurchasesPage />);

    const typeSelect = await screen.findByLabelText("Tipo");
    fireEvent.change(typeSelect, { target: { value: "online" } });
    await waitFor(() => expect(screen.getByLabelText("Local")).toBeInTheDocument());
    fireEvent.change(screen.getByLabelText("Lista"), { target: { value: "list-1" } });
    fireEvent.change(screen.getByLabelText("Local"), { target: { value: "loc-1" } });
    fireEvent.click(screen.getByRole("button", { name: "Iniciar compra" }));

    await waitFor(() =>
      expect(resources.startShoppingSession).toHaveBeenCalledWith({
        sourceListId: "list-1",
        purchaseLocationId: "loc-1",
        context: "online"
      })
    );
  });

  it("shows active physical journey before active online session", async () => {
    mockPurchaseResources(activeSession);
    vi.mocked(resources.getActiveShoppingJourney).mockResolvedValue(activeJourney);

    render(<PurchasesPage />);

    expect(await screen.findByText("Compra física ativa")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Continuar jornada" })).toHaveAttribute("href", "/journeys/journey-active");
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

  function deferred<T>() {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>((done) => {
      resolve = done;
    });
    return { promise, resolve };
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
    fireEvent.click(screen.getByRole("button", { name: "Salvar preço de Feijão" }));

    await waitFor(() =>
      expect(resources.updateShoppingSessionItem).toHaveBeenCalledWith(session.id, boughtItem.id, { actualPrice: "9.25" })
    );
    expect(resources.updateShoppingSessionItem).toHaveBeenCalledTimes(1);
  });

  it("completes the shopping session through the API", async () => {
    const session = mockSession();

    render(<PurchaseSessionPage />);

    fireEvent.click(await screen.findByRole("button", { name: "Finalizar compra" }));

    await waitFor(() => expect(resources.completeShoppingSession).toHaveBeenCalledWith(session.id));
    expect(routerPush).toHaveBeenCalledWith(`/history/${session.id}`);
  });

  it("disables complete and cancel actions while a session action is running", async () => {
    const session = mockSession();
    const completeRequest = deferred<ShoppingSessionDetailDto>();
    vi.mocked(resources.completeShoppingSession).mockReturnValue(completeRequest.promise);

    render(<PurchaseSessionPage />);

    const completeButton = await screen.findByRole("button", { name: "Finalizar compra" });
    const cancelButton = screen.getByRole("button", { name: "Cancelar sessão" });
    fireEvent.click(completeButton);

    await waitFor(() => expect(completeButton).toBeDisabled());
    expect(cancelButton).toBeDisabled();

    fireEvent.click(cancelButton);
    expect(resources.cancelShoppingSession).not.toHaveBeenCalled();

    await act(async () => {
      completeRequest.resolve({ ...session, status: "completed" });
      await completeRequest.promise;
    });
  });

  it("cancels the shopping session through the API", async () => {
    const session = mockSession();

    render(<PurchaseSessionPage />);

    fireEvent.click(await screen.findByRole("button", { name: "Cancelar sessão" }));

    await waitFor(() => expect(resources.cancelShoppingSession).toHaveBeenCalledWith(session.id));
    expect(routerPush).toHaveBeenCalledWith("/purchases");
  });

  it("blocks other item actions while an item update is running", async () => {
    const anotherPendingItem: ShoppingSessionItemDto = {
      ...pendingItem,
      id: "item-pending-2",
      snapshotProductName: "Açúcar",
      sortOrder: 1
    };
    mockSession(makeSession([pendingItem, anotherPendingItem]));
    const updateRequest = deferred<ShoppingSessionDetailDto>();
    vi.mocked(resources.updateShoppingSessionItem).mockReturnValue(updateRequest.promise);

    render(<PurchaseSessionPage />);

    const firstButton = await screen.findByRole("button", { name: "Marcar Arroz como comprado" });
    const secondButton = screen.getByRole("button", { name: "Marcar Açúcar como comprado" });
    fireEvent.click(firstButton);

    await waitFor(() => expect(firstButton).toBeDisabled());
    expect(secondButton).toBeDisabled();

    fireEvent.click(secondButton);
    expect(resources.updateShoppingSessionItem).toHaveBeenCalledTimes(1);

    await act(async () => {
      updateRequest.resolve(makeSession([{ ...pendingItem, status: "bought" as const }, anotherPendingItem]));
      await updateRequest.promise;
    });
  });
});

describe("active physical journey board", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    routerPush.mockClear();
    routeParams.current = { id: "list-1" };
  });

  const activeStop = {
    id: "stop-1",
    supermarketId: "supermarket-1",
    supermarketName: "Mercado Central",
    status: "active" as const,
    startedAt: "2026-05-24T10:00:00.000Z",
    finishedAt: null,
    exitDetectedAt: null,
    continuedOutsideRadiusAt: null
  };

  const layout = {
    supermarketId: "supermarket-1",
    presenceRadiusMeters: 500,
    corridors: [
      { id: "corridor-1", name: "Mercearia", sortOrder: 0, productCount: 1 },
      { id: "corridor-2", name: "Hortifruti", sortOrder: 1, productCount: 1 }
    ],
    placements: [],
    suggestions: []
  };

  const riceItem = {
    id: "journey-item-rice",
    sourceProductId: "product-rice",
    sourceListId: "list-1",
    sourceListName: "Compra semanal",
    snapshotProductName: "Arroz",
    snapshotCategoryLabel: "Mercearia",
    snapshotBrand: null,
    quantity: "2",
    unitId: "unit-kg",
    snapshotUnitName: "Kilogram",
    snapshotUnitAbbreviation: "kg",
    expectedPrice: "10.00",
    finalActualPrice: null,
    finalStatus: "active" as const,
    priority: "normal" as const,
    notes: null,
    sortOrder: 0,
    activeStopItem: {
      id: "stop-item-rice",
      stopId: "stop-1",
      journeyItemId: "journey-item-rice",
      status: "pending" as const,
      actualPrice: null,
      corridorId: null,
      notes: null
    },
    placement: { corridorId: "corridor-1", corridorName: "Mercearia" }
  };

  const bananaItem = {
    ...riceItem,
    id: "journey-item-banana",
    sourceProductId: "product-banana",
    snapshotProductName: "Banana",
    snapshotCategoryLabel: "Hortifruti",
    sortOrder: 1,
    activeStopItem: {
      ...riceItem.activeStopItem,
      id: "stop-item-banana",
      journeyItemId: "journey-item-banana"
    },
    placement: { corridorId: "corridor-2", corridorName: "Hortifruti" }
  };

  const oilItem = {
    ...riceItem,
    id: "journey-item-oil",
    sourceProductId: "product-oil",
    snapshotProductName: "Azeite",
    snapshotCategoryLabel: "Condimentos",
    sortOrder: 2,
    activeStopItem: {
      ...riceItem.activeStopItem,
      id: "stop-item-oil",
      journeyItemId: "journey-item-oil"
    },
    placement: null
  };

  function makeJourney(overrides: Partial<ShoppingJourneyDetailDto> = {}): ShoppingJourneyDetailDto {
    return {
      id: "journey-1",
      sourceListId: "list-1",
      sourceListName: "Compra semanal",
      sourceLists: [{ id: "list-1", name: "Compra semanal" }],
      context: "physical",
      status: "active",
      startedAt: "2026-05-24T10:00:00.000Z",
      completedAt: null,
      canceledAt: null,
      knownTotal: "0",
      boughtItemsWithoutPriceCount: 0,
      activeStop,
      items: [riceItem, bananaItem, oilItem],
      layout,
      ...overrides
    };
  }

  function mockJourney(journey = makeJourney()) {
    routeParams.current = { id: journey.id };
    vi.spyOn(resources, "getShoppingJourney").mockResolvedValue(journey);
    vi.spyOn(resources, "updateShoppingJourneyStopItem").mockResolvedValue(journey);
    vi.spyOn(resources, "finishJourneyStop").mockResolvedValue({ ...journey, activeStop: null });
    vi.spyOn(resources, "continueJourneyStopOutsideRadius").mockResolvedValue(journey);
    vi.spyOn(resources, "switchJourneyStopSupermarket").mockResolvedValue(journey);
    vi.spyOn(resources, "createSupermarketCorridor").mockResolvedValue({ id: "corridor-3", name: "Bebidas", sortOrder: 2, productCount: 0 });
    vi.spyOn(resources, "completeShoppingJourney").mockResolvedValue({ ...journey, status: "completed", completedAt: "2026-05-24T12:00:00.000Z" });
    vi.spyOn(resources, "listSupermarkets").mockResolvedValue({
      supermarkets: [
        {
          id: "supermarket-2",
          name: "Atacado Norte",
          address: null,
          city: null,
          latitude: null,
          longitude: null,
          presenceRadiusMeters: 500,
          archivedAt: null,
          createdAt: "2026-05-24T00:00:00.000Z",
          updatedAt: "2026-05-24T00:00:00.000Z"
        }
      ]
    });
  }

  it("groups items by corridor order and groups items without placements by category", async () => {
    mockJourney();

    render(<JourneyPage />);

    const mercearia = await screen.findByRole("heading", { name: "Mercearia" });
    const hortifruti = screen.getByRole("heading", { name: "Hortifruti" });
    const condimentos = screen.getByRole("heading", { name: "Condimentos" });

    expect(mercearia.compareDocumentPosition(hortifruti) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hortifruti.compareDocumentPosition(condimentos) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByText("Arroz")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Azeite")).toBeInTheDocument();
  });

  it("marks an item bought with selected corridor and actual price", async () => {
    const journey = makeJourney();
    mockJourney(journey);

    render(<JourneyPage />);

    // Expand the Arroz card to access corridor/price fields
    const arrozText = await screen.findByText("Arroz");
    const arrozCard = arrozText.closest("article")!;
    fireEvent.click(within(arrozCard).getByRole("button", { name: "Expandir detalhes" }));

    fireEvent.change(screen.getByLabelText("Corredor de Arroz"), { target: { value: "corridor-1" } });
    fireEvent.change(screen.getByLabelText("Preço real de Arroz"), { target: { value: "12.50" } });
    fireEvent.click(screen.getByRole("button", { name: "Salvar e marcar como comprado" }));

    await waitFor(() =>
      expect(resources.updateShoppingJourneyStopItem).toHaveBeenCalledWith("journey-1", "stop-1", "stop-item-rice", {
        status: "bought",
        actualPrice: "12.50",
        corridorId: "corridor-1"
      })
    );
  });

  it("creates a corridor from the active journey board", async () => {
    mockJourney();

    render(<JourneyPage />);

    fireEvent.click(await screen.findByRole("button", { name: "Novo corredor" }));
    fireEvent.change(screen.getByLabelText("Nome do corredor"), { target: { value: "Bebidas" } });
    fireEvent.click(screen.getByRole("button", { name: "Salvar corredor" }));

    await waitFor(() => expect(resources.createSupermarketCorridor).toHaveBeenCalledWith("supermarket-1", { name: "Bebidas" }));
    expect(await screen.findByRole("heading", { name: "Bebidas" })).toBeInTheDocument();
  });

  it("marks not found and keeps the item visible for the next stop after finishing", async () => {
    const notFoundJourney = makeJourney({
      items: [{ ...oilItem, activeStopItem: { ...oilItem.activeStopItem, status: "not_found" } }]
    });
    mockJourney(notFoundJourney);
    vi.mocked(resources.updateShoppingJourneyStopItem).mockResolvedValue(notFoundJourney);
    vi.mocked(resources.finishJourneyStop).mockResolvedValue({ ...notFoundJourney, activeStop: null });

    render(<JourneyPage />);

    fireEvent.click(await screen.findByRole("button", { name: "Marcar Azeite como não encontrado" })); // quick action button (aria-label)
    await waitFor(() => expect(resources.updateShoppingJourneyStopItem).toHaveBeenCalled());
    fireEvent.click(screen.getByRole("button", { name: "Finalizar supermercado atual" }));

    expect(await screen.findByText("Escolher próximo supermercado")).toBeInTheDocument();
    expect(screen.getAllByText("Azeite").length).toBeGreaterThan(0);
  });

  it("switches supermarket from the next-stop prompt", async () => {
    const journey = makeJourney();
    mockJourney(journey);

    render(<JourneyPage />);

    fireEvent.click(await screen.findByRole("button", { name: "Finalizar supermercado atual" }));
    await screen.findByText("Escolher próximo supermercado");
    await screen.findByRole("option", { name: "Atacado Norte" });
    fireEvent.change(screen.getByLabelText("Próximo supermercado"), { target: { value: "supermarket-2" } });
    fireEvent.click(screen.getByRole("button", { name: "Continuar no supermercado" }));

    await waitFor(() =>
      expect(resources.switchJourneyStopSupermarket).toHaveBeenCalledWith("journey-1", "stop-1", { supermarketId: "supermarket-2" })
    );
  });

  it("finishes current stop and completes the journey", async () => {
    const journey = makeJourney();
    mockJourney(journey);

    render(<JourneyPage />);

    fireEvent.click(await screen.findByRole("button", { name: "Finalizar supermercado atual" }));
    await waitFor(() => expect(resources.finishJourneyStop).toHaveBeenCalledWith("journey-1", "stop-1"));

    fireEvent.click(screen.getByRole("button", { name: "Finalizar compra completa" }));
    await waitFor(() => expect(resources.completeShoppingJourney).toHaveBeenCalledWith("journey-1"));
    expect(routerPush).toHaveBeenCalledWith("/history");
  });
});

describe("purchase history screens", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    routerPush.mockClear();
    routeParams.current = { id: "list-1" };
  });

  const location: PurchaseLocationDto = {
    id: "loc-1",
    type: "physical",
    name: "Mercado Central",
    address: null,
    city: null,
    websiteOrApp: null,
    notes: null,
    archivedAt: null,
    createdAt: "2026-05-24T00:00:00.000Z",
    updatedAt: "2026-05-24T00:00:00.000Z"
  };

  const shoppingList: ShoppingListSummaryDto = {
    id: "list-1",
    name: "Compra semanal",
    description: "Mercado",
    status: "active",
    duplicatedFromListId: null,
    itemCount: 3,
    createdAt: "2026-05-24T00:00:00.000Z",
    updatedAt: "2026-05-24T00:00:00.000Z"
  };

  const summarySession: ShoppingSessionSummaryDto = {
    id: "session-history",
    sourceListId: shoppingList.id,
    sourceListName: shoppingList.name,
    purchaseLocation: location,
    context: "physical",
    status: "completed",
    startedAt: "2026-05-24T10:00:00.000Z",
    completedAt: "2026-05-24T11:00:00.000Z",
    canceledAt: null,
    knownTotal: "30.50",
    boughtItemsWithoutPriceCount: 2,
    itemCounts: { pending: 0, bought: 3, notFound: 1, unprocessed: 1 }
  };

  const boughtItem: ShoppingSessionItemDto = {
    id: "item-bought-history",
    sourceProductId: "product-1",
    sourceListItemId: "list-item-1",
    snapshotProductName: "Arroz",
    snapshotCategoryLabel: "Mercearia",
    snapshotBrand: null,
    quantity: "2",
    unitId: "unit-kg",
    snapshotUnitName: "Kilogram",
    snapshotUnitAbbreviation: "kg",
    expectedPrice: "20.00",
    actualPrice: "18.50",
    status: "bought",
    priority: "normal",
    notes: null,
    sortOrder: 0
  };

  const notFoundItem: ShoppingSessionItemDto = {
    ...boughtItem,
    id: "item-not-found-history",
    snapshotProductName: "Azeite",
    expectedPrice: "24.00",
    actualPrice: null,
    status: "not_found",
    sortOrder: 1
  };

  const unprocessedItem: ShoppingSessionItemDto = {
    ...boughtItem,
    id: "item-unprocessed-history",
    snapshotProductName: "Café",
    expectedPrice: null,
    actualPrice: null,
    status: "unprocessed",
    sortOrder: 2
  };

  function mockHistoryList(sessions: ShoppingSessionSummaryDto[] = [summarySession]) {
    vi.spyOn(resources, "listPurchaseLocations").mockResolvedValue({ purchaseLocations: [location] });
    vi.spyOn(resources, "listShoppingLists").mockResolvedValue({ shoppingLists: [shoppingList] });
    vi.spyOn(resources, "listPurchaseHistorySessions").mockResolvedValue({ shoppingSessions: sessions });
  }

  function deferred<T>() {
    let resolve!: (value: T) => void;
    const promise = new Promise<T>((done) => {
      resolve = done;
    });
    return { promise, resolve };
  }

  function mockHistoryDetail(session: ShoppingSessionDetailDto = { ...summarySession, items: [boughtItem, notFoundItem, unprocessedItem] }) {
    routeParams.current = { id: session.id };
    vi.spyOn(resources, "getPurchaseHistorySession").mockResolvedValue(session);
    vi.spyOn(resources, "createContinuationList").mockResolvedValue({
      ...shoppingList,
      id: "list-continuation",
      name: "Continuação",
      items: []
    });
  }

  it("calls the history API with advanced filters", async () => {
    mockHistoryList();

    render(<HistoryPage />);

    fireEvent.change(await screen.findByLabelText("Data inicial"), { target: { value: "2026-05-01" } });
    fireEvent.change(screen.getByLabelText("Data final"), { target: { value: "2026-05-24" } });
    fireEvent.change(screen.getByLabelText("Local"), { target: { value: "loc-1" } });
    fireEvent.change(screen.getByLabelText("Tipo de local"), { target: { value: "physical" } });
    fireEvent.change(screen.getByLabelText("Produto"), { target: { value: "arroz" } });
    fireEvent.change(screen.getByLabelText("Lista origem"), { target: { value: "list-1" } });
    fireEvent.change(screen.getByLabelText("Status do item"), { target: { value: "bought" } });
    fireEvent.change(screen.getByLabelText("Preço mínimo"), { target: { value: "10.00" } });
    fireEvent.change(screen.getByLabelText("Preço máximo"), { target: { value: "50.00" } });
    fireEvent.click(screen.getByLabelText("Somente comprados sem preço"));
    fireEvent.click(screen.getByRole("button", { name: "Aplicar filtros" }));

    await waitFor(() =>
      expect(resources.listPurchaseHistorySessions).toHaveBeenLastCalledWith({
        dateFrom: "2026-05-01T00:00:00.000Z",
        dateTo: "2026-05-24T23:59:59.999Z",
        locationId: "loc-1",
        locationType: "physical",
        productQuery: "arroz",
        sourceListId: "list-1",
        itemStatus: "bought",
        minPrice: "10.00",
        maxPrice: "50.00",
        withoutPrice: true
      })
    );
    expect(vi.mocked(resources.listPurchaseHistorySessions).mock.calls.at(-1)?.[0]?.dateTo).toBe(
      "2026-05-24T23:59:59.999Z"
    );
    expect(vi.mocked(resources.listPurchaseHistorySessions).mock.calls.at(-1)?.[0]?.dateTo).not.toBe("2026-05-24");
  });

  it("does not let an older history response overwrite filtered results", async () => {
    const initialHistory = deferred<{ shoppingSessions: ShoppingSessionSummaryDto[] }>();
    const filteredSession: ShoppingSessionSummaryDto = {
      ...summarySession,
      id: "session-filtered",
      sourceListName: "Compra filtrada",
      knownTotal: "12.00",
      boughtItemsWithoutPriceCount: 0
    };
    vi.spyOn(resources, "listPurchaseLocations").mockResolvedValue({ purchaseLocations: [location] });
    vi.spyOn(resources, "listShoppingLists").mockResolvedValue({ shoppingLists: [shoppingList] });
    vi.spyOn(resources, "listPurchaseHistorySessions")
      .mockReturnValueOnce(initialHistory.promise)
      .mockResolvedValueOnce({ shoppingSessions: [filteredSession] });

    render(<HistoryPage />);

    fireEvent.change(screen.getByLabelText("Produto"), { target: { value: "arroz" } });
    fireEvent.click(screen.getByRole("button", { name: "Aplicar filtros" }));

    expect(await screen.findByRole("link", { name: "Ver detalhes de Compra filtrada" })).toBeInTheDocument();

    await act(async () => {
      initialHistory.resolve({ shoppingSessions: [summarySession] });
      await initialHistory.promise;
    });

    expect(screen.getByRole("link", { name: "Ver detalhes de Compra filtrada" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Ver detalhes de Compra semanal" })).not.toBeInTheDocument();
  });

  it("shows known totals and missing price warnings in history rows", async () => {
    mockHistoryList();

    render(<HistoryPage />);

    expect(await screen.findByRole("link", { name: "Ver detalhes de Compra semanal" })).toBeInTheDocument();
    expect(screen.getByText("Total conhecido: R$ 30.50")).toBeInTheDocument();
    expect(screen.getByText("2 comprado(s) sem preço real.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver detalhes de Compra semanal" })).toHaveAttribute(
      "href",
      "/history/session-history"
    );
  });

  it("groups bought, not found, and unprocessed items in history detail", async () => {
    mockHistoryDetail();

    render(<HistoryDetailPage />);

    expect(await screen.findByRole("heading", { name: "Comprados" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Não encontrados" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Não processados" })).toBeInTheDocument();
    expect(screen.getByText("Arroz")).toBeInTheDocument();
    expect(screen.getByText("Azeite")).toBeInTheDocument();
    expect(screen.getByText("Café")).toBeInTheDocument();
    expect(screen.getByText("Real: R$ 18.50")).toBeInTheDocument();
    expect(screen.getByText("Esperado: R$ 24.00")).toBeInTheDocument();
  });

  it("creates a continuation list from history detail", async () => {
    mockHistoryDetail();

    render(<HistoryDetailPage />);

    fireEvent.click(await screen.findByRole("button", { name: "Criar lista de continuação" }));

    await waitFor(() => expect(resources.createContinuationList).toHaveBeenCalledWith("session-history", {}));
    expect(await screen.findByRole("link", { name: "Abrir lista Continuação" })).toHaveAttribute(
      "href",
      "/lists/list-continuation"
    );
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
        const text = JSON.stringify(body);
        return Promise.resolve({
          ok: true,
          status: 200,
          text: async () => text,
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
