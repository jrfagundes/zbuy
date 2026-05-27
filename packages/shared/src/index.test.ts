import test from "node:test";
import assert from "node:assert/strict";
import type {
  AcceptSharedLayoutSuggestionRequest,
  DetectSupermarketRequest,
  DetectSupermarketResponse,
  LayoutContributionConsentDto,
  ProductDto,
  PurchaseLocationDto,
  ShoppingJourneyDetailDto,
  ShoppingListDetailDto,
  ShoppingSessionDetailDto,
  StartShoppingJourneyRequest,
  StartShoppingSessionRequest,
  SupermarketLayoutDto,
  UnitDto,
  UpdateShoppingSessionItemRequest,
  UpsertSupermarketRequest,
  UpsertShoppingListItemRequest
} from "./index.js";

test("shared package exports compile-time DTO shapes", () => {
  const response = {
    user: {
      id: "user-1",
      name: "ZBuy User",
      email: "user@example.com"
    }
  };

  assert.equal(response.user.email, "user@example.com");
});

test("phase 3 DTO shapes support products, units, and list items", () => {
  const unit: UnitDto = {
    id: "unit-kg",
    name: "Kilogram",
    abbreviation: "kg",
    type: "weight",
    allowsDecimals: true,
    sortOrder: 10
  };

  const product: ProductDto = {
    id: "product-1",
    name: "Rice",
    categoryLabel: "Pantry",
    brand: null,
    defaultUnitId: unit.id,
    defaultUnit: unit,
    estimatedPrice: "12.50",
    notes: null,
    archivedAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const item: UpsertShoppingListItemRequest = {
    productId: product.id,
    quantity: "2",
    unitId: unit.id,
    priority: "normal"
  };

  const list: ShoppingListDetailDto = {
    id: "list-1",
    name: "Weekly",
    description: null,
    status: "active",
    duplicatedFromListId: null,
    itemCount: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    items: [
      {
        id: "item-1",
        productId: product.id,
        productName: product.name,
        categoryLabel: product.categoryLabel,
        quantity: item.quantity,
        unitId: unit.id,
        unit,
        expectedPrice: null,
        priority: "normal",
        notes: null,
        sortOrder: 0
      }
    ]
  };

  assert.equal(list.items[0].productName, "Rice");
});

test("phase 4 DTO shapes support purchase locations and shopping sessions", () => {
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

  const start: StartShoppingSessionRequest = {
    sourceListId: "list-1",
    purchaseLocationId: "loc-1",
    context: "physical"
  };

  const update: UpdateShoppingSessionItemRequest = {
    status: "bought",
    actualPrice: "12.50",
    notes: "Bought on sale"
  };

  const detail: ShoppingSessionDetailDto = {
    id: "session-1",
    sourceListId: start.sourceListId,
    sourceListName: "Compra semanal",
    purchaseLocation: location,
    context: "physical",
    status: "completed",
    startedAt: "2026-05-24T00:00:00.000Z",
    completedAt: "2026-05-24T01:00:00.000Z",
    canceledAt: null,
    knownTotal: "12.50",
    boughtItemsWithoutPriceCount: 0,
    itemCounts: { pending: 0, bought: 1, notFound: 0, unprocessed: 0 },
    items: [
      {
        id: "item-1",
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
        actualPrice: update.actualPrice ?? null,
        status: "bought",
        priority: "normal",
        notes: update.notes ?? null,
        sortOrder: 0
      }
    ]
  };

  assert.equal(detail.purchaseLocation.name, "Mercado Central");
  assert.equal(detail.items[0]?.status, "bought");
});

test("phase 5 DTO shapes support supermarkets, journeys, layouts, and consent", () => {
  const supermarketInput: UpsertSupermarketRequest = {
    name: "Mercado Central",
    address: "Rua Principal, 100",
    city: "Sao Paulo",
    latitude: "-23.55052",
    longitude: "-46.63331",
    presenceRadiusMeters: 500
  };

  const detectionRequest: DetectSupermarketRequest = {
    latitude: "-23.55052",
    longitude: "-46.63331"
  };

  const detectionResponse: DetectSupermarketResponse = {
    status: "detected",
    candidates: [
      {
        id: "market-1",
        name: supermarketInput.name,
        address: supermarketInput.address ?? null,
        city: supermarketInput.city ?? null,
        latitude: supermarketInput.latitude ?? null,
        longitude: supermarketInput.longitude ?? null,
        presenceRadiusMeters: 500,
        distanceMeters: 12,
        archivedAt: null,
        createdAt: "2026-05-26T00:00:00.000Z",
        updatedAt: "2026-05-26T00:00:00.000Z"
      }
    ]
  };

  const start: StartShoppingJourneyRequest = {
    sourceListId: "list-1",
    supermarketId: "market-1",
    latitude: detectionRequest.latitude,
    longitude: detectionRequest.longitude
  };

  const layout: SupermarketLayoutDto = {
    supermarketId: "market-1",
    presenceRadiusMeters: 500,
    corridors: [{ id: "corridor-1", name: "Corredor 1", sortOrder: 0, productCount: 1 }],
    placements: [{ productId: "product-1", corridorId: "corridor-1", lastConfirmedAt: "2026-05-26T00:00:00.000Z" }],
    suggestions: [{ id: "suggestion-1", productId: "product-2", suggestedCorridorName: "Corredor 2", confidenceScore: "0.80", sourceContributionCount: 3 }]
  };

  const consent: LayoutContributionConsentDto = {
    globalSharedLayoutContributionEnabled: false,
    supermarketOverride: null,
    effectiveSharedLayoutContributionEnabled: false
  };

  const accept: AcceptSharedLayoutSuggestionRequest = {
    corridorId: "corridor-1"
  };

  const journey: ShoppingJourneyDetailDto = {
    id: "journey-1",
    sourceListId: start.sourceListId,
    sourceListName: "Compra semanal",
    context: "physical",
    status: "active",
    startedAt: "2026-05-26T00:00:00.000Z",
    completedAt: null,
    canceledAt: null,
    knownTotal: "0",
    boughtItemsWithoutPriceCount: 0,
    activeStop: {
      id: "stop-1",
      supermarketId: "market-1",
      supermarketName: "Mercado Central",
      status: "active",
      startedAt: "2026-05-26T00:00:00.000Z",
      finishedAt: null,
      exitDetectedAt: null,
      continuedOutsideRadiusAt: null
    },
    items: [
      {
        id: "journey-item-1",
        sourceProductId: "product-1",
        snapshotProductName: "Arroz",
        snapshotCategoryLabel: "Mercearia",
        snapshotBrand: null,
        quantity: "1",
        unitId: "unit-1",
        snapshotUnitName: "Unidade",
        snapshotUnitAbbreviation: "un",
        expectedPrice: null,
        finalActualPrice: null,
        finalStatus: "active",
        priority: "normal",
        notes: null,
        sortOrder: 0,
        activeStopItem: null,
        placement: { corridorId: "corridor-1", corridorName: "Corredor 1" }
      }
    ],
    layout
  };

  assert.equal(detectionResponse.status, "detected");
  assert.equal(journey.items[0]?.placement?.corridorName, "Corredor 1");
  assert.equal(consent.effectiveSharedLayoutContributionEnabled, false);
  assert.equal(accept.corridorId, "corridor-1");
});
