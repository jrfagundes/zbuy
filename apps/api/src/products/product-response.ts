import type { Product, Unit } from "@prisma/client";
import type { ProductDto } from "@zbuy/shared";
import { toUnitDto } from "../units/unit-response";

type ProductWithUnit = Product & { defaultUnit: Unit };

function decimalToString(value: { toString(): string } | string | number | null) {
  return value === null ? null : value.toString();
}

export function toProductDto(product: ProductWithUnit): ProductDto {
  return {
    id: product.id,
    name: product.name,
    categoryLabel: product.categoryLabel,
    brand: product.brand,
    defaultUnitId: product.defaultUnitId,
    defaultUnit: toUnitDto(product.defaultUnit),
    estimatedPrice: decimalToString(product.estimatedPrice),
    notes: product.notes,
    archivedAt: product.archivedAt?.toISOString() ?? null,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString()
  };
}
