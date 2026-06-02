import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import type { CatalogProductDto } from "./catalog.types";
import { CosmosService } from "./cosmos.service";

@Injectable()
export class CatalogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cosmos: CosmosService
  ) {}

  /** Search catalog by name/brand (for autocomplete suggestions). */
  async search(query: string, limit = 20): Promise<CatalogProductDto[]> {
    const q = query.trim();
    if (!q) return [];

    const rows = await this.prisma.productCatalog.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: Prisma.QueryMode.insensitive } },
          { brand: { contains: q, mode: Prisma.QueryMode.insensitive } }
        ]
      },
      take: limit,
      orderBy: { name: "asc" }
    });

    return rows.map(toDto);
  }

  /**
   * Lookup by barcode.
   * 1. Local catalog
   * 2. Cosmos Bluesoft API (if configured)
   * Returns null when nothing is found.
   */
  async lookupBarcode(barcode: string): Promise<CatalogProductDto | null> {
    const local = await this.prisma.productCatalog.findUnique({
      where: { barcode }
    });
    if (local) return toDto(local);

    const cosmos = await this.cosmos.lookupBarcode(barcode);
    if (!cosmos) return null;

    // Persist in catalog so future lookups are instant (free tier friendly).
    const saved = await this.prisma.productCatalog.upsert({
      where: { barcode },
      update: {},
      create: {
        barcode,
        name: cosmos.description,
        brand: cosmos.brand ?? null,
        categoryLabel: "Geral",
        source: "cosmos"
      }
    });

    return toDto(saved);
  }
}

function toDto(row: {
  id: string;
  barcode: string;
  name: string;
  brand: string | null;
  categoryLabel: string;
  source: string;
}): CatalogProductDto {
  return {
    id: row.id,
    barcode: row.barcode,
    name: row.name,
    brand: row.brand,
    categoryLabel: row.categoryLabel,
    source: row.source
  };
}
