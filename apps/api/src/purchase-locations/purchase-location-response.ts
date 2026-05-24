import type { PurchaseLocation } from "@prisma/client";
import type { PurchaseLocationDto } from "@zbuy/shared";

export function toPurchaseLocationDto(location: PurchaseLocation): PurchaseLocationDto {
  return {
    id: location.id,
    type: location.type,
    name: location.name,
    address: location.address,
    city: location.city,
    websiteOrApp: location.websiteOrApp,
    notes: location.notes,
    archivedAt: location.archivedAt?.toISOString() ?? null,
    createdAt: location.createdAt.toISOString(),
    updatedAt: location.updatedAt.toISOString()
  };
}
