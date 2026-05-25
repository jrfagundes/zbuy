import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { UpsertPurchaseLocationDto } from "./dto";
import { toPurchaseLocationDto } from "./purchase-location-response";

@Injectable()
export class PurchaseLocationsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(ownerUserId: string, type?: string, query?: string) {
    const normalizedQuery = query?.trim();
    const locations = await this.prisma.purchaseLocation.findMany({
      where: {
        ownerUserId,
        archivedAt: null,
        ...(type === "physical" || type === "online" ? { type } : {}),
        ...(normalizedQuery ? { name: { contains: normalizedQuery, mode: Prisma.QueryMode.insensitive } } : {})
      },
      orderBy: [{ name: "asc" }]
    });
    return { purchaseLocations: locations.map(toPurchaseLocationDto) };
  }

  async create(ownerUserId: string, dto: UpsertPurchaseLocationDto) {
    const location = await this.prisma.purchaseLocation.create({
      data: cleanLocationInput(ownerUserId, dto)
    });
    return toPurchaseLocationDto(location);
  }

  async get(ownerUserId: string, id: string) {
    const location = await this.findOwned(ownerUserId, id);
    return toPurchaseLocationDto(location);
  }

  async update(ownerUserId: string, id: string, dto: UpsertPurchaseLocationDto) {
    await this.findOwned(ownerUserId, id);
    const sessionCount = await this.prisma.shoppingSession.count({ where: { purchaseLocationId: id } });
    if (sessionCount > 0) {
      throw new ConflictException("Purchase location with shopping history cannot be updated");
    }
    const location = await this.prisma.purchaseLocation.update({
      where: { id },
      data: cleanLocationInput(ownerUserId, dto)
    });
    return toPurchaseLocationDto(location);
  }

  async archive(ownerUserId: string, id: string) {
    await this.findOwned(ownerUserId, id);
    const location = await this.prisma.purchaseLocation.update({
      where: { id },
      data: { archivedAt: new Date() }
    });
    return toPurchaseLocationDto(location);
  }

  async findOwned(ownerUserId: string, id: string) {
    const location = await this.prisma.purchaseLocation.findFirst({ where: { id, ownerUserId } });
    if (!location) {
      throw new NotFoundException("Purchase location not found");
    }
    return location;
  }
}

function cleanLocationInput(ownerUserId: string, dto: UpsertPurchaseLocationDto) {
  const name = dto.name.trim();
  if (name.length === 0) {
    throw new BadRequestException("Purchase location name is required");
  }

  return {
    ownerUserId,
    type: dto.type,
    name,
    address: cleanOptionalText(dto.address),
    city: cleanOptionalText(dto.city),
    websiteOrApp: cleanOptionalText(dto.websiteOrApp),
    notes: cleanOptionalText(dto.notes)
  };
}

function cleanOptionalText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : null;
}
