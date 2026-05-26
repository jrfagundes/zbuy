import type { Supermarket } from "@prisma/client";
import type { SupermarketDto } from "@zbuy/shared";

export function toSupermarketDto(supermarket: Supermarket, distanceMeters?: number): SupermarketDto {
  return {
    id: supermarket.id,
    name: supermarket.name,
    address: supermarket.address,
    city: supermarket.city,
    latitude: supermarket.latitude?.toString() ?? null,
    longitude: supermarket.longitude?.toString() ?? null,
    presenceRadiusMeters: supermarket.presenceRadiusMeters,
    ...(distanceMeters === undefined ? {} : { distanceMeters }),
    archivedAt: supermarket.archivedAt?.toISOString() ?? null,
    createdAt: supermarket.createdAt.toISOString(),
    updatedAt: supermarket.updatedAt.toISOString()
  };
}
