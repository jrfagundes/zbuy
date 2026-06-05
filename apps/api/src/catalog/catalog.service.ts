import { Injectable, Logger } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import type { CatalogProductDto } from "./catalog.types";
import { CosmosService } from "./cosmos.service";

const PROVISION_CHUNK = 500;

@Injectable()
export class CatalogService {
  private readonly logger = new Logger(CatalogService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cosmos: CosmosService
  ) {}

  /**
   * Copies the global ProductCatalog into a user's Product table (origin="catalog"),
   * skipping barcodes the user already has. Called once when a user is created so
   * every new account starts with the known-products catalog.
   * Errors are swallowed (logged) — provisioning must never break account creation.
   */
  async provisionForUser(userId: string): Promise<number> {
    try {
      const defaultUnit = await this.prisma.unit.findFirst({
        where: { abbreviation: "unit", active: true }
      });
      if (!defaultUnit) {
        this.logger.warn(`Cannot provision catalog for ${userId}: default unit "unit" not found`);
        return 0;
      }

      const [catalog, existing] = await Promise.all([
        this.prisma.productCatalog.findMany({
          select: { barcode: true, name: true, brand: true, categoryLabel: true }
        }),
        this.prisma.product.findMany({
          where: { ownerUserId: userId, barcode: { not: null } },
          select: { barcode: true }
        })
      ]);
      const existingBarcodes = new Set(existing.map((p) => p.barcode));

      const toInsert = catalog
        .filter((c) => !existingBarcodes.has(c.barcode))
        .map((c) => ({
          ownerUserId: userId,
          name: c.name,
          categoryLabel: c.categoryLabel,
          brand: c.brand,
          barcode: c.barcode,
          origin: "catalog",
          defaultUnitId: defaultUnit.id
        }));

      let inserted = 0;
      for (let i = 0; i < toInsert.length; i += PROVISION_CHUNK) {
        const result = await this.prisma.product.createMany({ data: toInsert.slice(i, i + PROVISION_CHUNK) });
        inserted += result.count;
      }
      return inserted;
    } catch (err) {
      this.logger.error(`Catalog provisioning failed for ${userId}: ${String(err)}`);
      return 0;
    }
  }

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
