import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, type Supermarket } from "@prisma/client";
import type { DetectSupermarketResponse } from "@zbuy/shared";
import { PrismaService } from "../prisma/prisma.service";
import { DetectSupermarketDto, UpdateSupermarketDto, UpsertSupermarketDto } from "./dto";
import { toSupermarketDto } from "./supermarket-response";

@Injectable()
export class SupermarketsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(ownerUserId: string, query?: string, lat?: string, lng?: string, radiusMeters?: number) {
    const normalizedQuery = query?.trim();
    const supermarkets = await this.prisma.supermarket.findMany({
      where: {
        ownerUserId,
        archivedAt: null,
        ...(normalizedQuery ? { name: { contains: normalizedQuery, mode: Prisma.QueryMode.insensitive } } : {})
      },
      orderBy: [{ name: "asc" }]
    });

    const origin = parseCoordinates(lat, lng);
    const withDistances = origin
      ? supermarkets.map((supermarket) => ({
          supermarket,
          distanceMeters: hasCoordinates(supermarket)
            ? distanceMeters(origin, {
                latitude: supermarket.latitude.toNumber(),
                longitude: supermarket.longitude.toNumber()
              })
            : undefined
        }))
      : supermarkets.map((supermarket) => ({ supermarket, distanceMeters: undefined }));

    const filtered =
      origin && radiusMeters
        ? withDistances.filter((item) => item.distanceMeters !== undefined && item.distanceMeters <= radiusMeters)
        : withDistances;

    return { supermarkets: filtered.map((item) => toSupermarketDto(item.supermarket, item.distanceMeters)) };
  }

  async create(ownerUserId: string, dto: UpsertSupermarketDto) {
    const supermarket = await this.prisma.supermarket.create({
      data: cleanCreateSupermarketInput(ownerUserId, dto)
    });
    return toSupermarketDto(supermarket);
  }

  async get(ownerUserId: string, id: string) {
    const supermarket = await this.findOwnedActive(ownerUserId, id);
    return toSupermarketDto(supermarket);
  }

  async update(ownerUserId: string, id: string, dto: UpdateSupermarketDto) {
    await this.findOwnedActive(ownerUserId, id);
    const supermarket = await this.prisma.supermarket.update({
      where: { id },
      data: cleanUpdateSupermarketInput(dto)
    });
    return toSupermarketDto(supermarket);
  }

  async archive(ownerUserId: string, id: string) {
    await this.findOwnedActive(ownerUserId, id);
    const supermarket = await this.prisma.supermarket.update({
      where: { id },
      data: { archivedAt: new Date() }
    });
    return toSupermarketDto(supermarket);
  }

  async detect(ownerUserId: string, dto: DetectSupermarketDto): Promise<DetectSupermarketResponse> {
    const origin = {
      latitude: Number(dto.latitude),
      longitude: Number(dto.longitude)
    };
    const supermarkets = await this.prisma.supermarket.findMany({
      where: {
        ownerUserId,
        archivedAt: null,
        latitude: { not: null },
        longitude: { not: null }
      },
      orderBy: [{ name: "asc" }]
    });

    const candidates = supermarkets
      .map((supermarket) => ({
        supermarket,
        distanceMeters: distanceMeters(origin, {
          latitude: supermarket.latitude?.toNumber() ?? 0,
          longitude: supermarket.longitude?.toNumber() ?? 0
        })
      }))
      .filter((item) => item.distanceMeters <= item.supermarket.presenceRadiusMeters)
      .map((item) => toSupermarketDto(item.supermarket, item.distanceMeters));

    if (candidates.length === 0) {
      return { status: "unknown", candidates: [] };
    }

    return {
      status: candidates.length === 1 ? "detected" : "ambiguous",
      candidates
    };
  }

  async findOwnedActive(ownerUserId: string, id: string) {
    const supermarket = await this.prisma.supermarket.findFirst({ where: { id, ownerUserId, archivedAt: null } });
    if (!supermarket) {
      throw new NotFoundException("Supermarket not found");
    }
    return supermarket;
  }
}

export function distanceMeters(
  a: { latitude: number; longitude: number },
  b: { latitude: number; longitude: number }
) {
  const earthRadiusMeters = 6371000;
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const dLat = toRadians(b.latitude - a.latitude);
  const dLng = toRadians(b.longitude - a.longitude);
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);
  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return Math.round(2 * earthRadiusMeters * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));
}

function cleanCreateSupermarketInput(ownerUserId: string, dto: UpsertSupermarketDto) {
  const name = dto.name.trim();
  if (name.length === 0) {
    throw new BadRequestException("Supermarket name is required");
  }

  return {
    ownerUserId,
    name,
    address: cleanOptionalText(dto.address),
    city: cleanOptionalText(dto.city),
    latitude: cleanOptionalDecimal(dto.latitude),
    longitude: cleanOptionalDecimal(dto.longitude),
    presenceRadiusMeters: dto.presenceRadiusMeters ?? 500
  };
}

function cleanUpdateSupermarketInput(dto: UpdateSupermarketDto) {
  const data: {
    name?: string;
    address?: string | null;
    city?: string | null;
    latitude?: Prisma.Decimal | null;
    longitude?: Prisma.Decimal | null;
    presenceRadiusMeters?: number;
  } = {};

  if (dto.name !== undefined) {
    const name = dto.name.trim();
    if (name.length === 0) {
      throw new BadRequestException("Supermarket name is required");
    }
    data.name = name;
  }
  if (dto.address !== undefined) {
    data.address = cleanOptionalText(dto.address);
  }
  if (dto.city !== undefined) {
    data.city = cleanOptionalText(dto.city);
  }
  if (dto.latitude !== undefined) {
    data.latitude = cleanOptionalDecimal(dto.latitude);
  }
  if (dto.longitude !== undefined) {
    data.longitude = cleanOptionalDecimal(dto.longitude);
  }
  if (dto.presenceRadiusMeters !== undefined) {
    data.presenceRadiusMeters = dto.presenceRadiusMeters;
  }

  return data;
}

function cleanOptionalText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : null;
}

function cleanOptionalDecimal(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? new Prisma.Decimal(trimmed) : null;
}

function parseCoordinates(latitude: string | undefined, longitude: string | undefined) {
  if (!latitude || !longitude) {
    return null;
  }
  const parsedLatitude = Number(latitude);
  const parsedLongitude = Number(longitude);
  if (!Number.isFinite(parsedLatitude) || !Number.isFinite(parsedLongitude)) {
    return null;
  }
  return { latitude: parsedLatitude, longitude: parsedLongitude };
}

function hasCoordinates(supermarket: Supermarket): supermarket is Supermarket & {
  latitude: Prisma.Decimal;
  longitude: Prisma.Decimal;
} {
  return supermarket.latitude !== null && supermarket.longitude !== null;
}
