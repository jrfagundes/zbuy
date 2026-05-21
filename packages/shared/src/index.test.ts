import test from "node:test";
import assert from "node:assert/strict";
import type {
  ProductDto,
  ShoppingListDetailDto,
  UnitDto,
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
