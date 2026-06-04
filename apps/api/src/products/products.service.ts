import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CatalogService } from "../catalog/catalog.service";
import { PrismaService } from "../prisma/prisma.service";
import { UpsertProductDto } from "./dto";
import { toProductDto } from "./product-response";

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly catalog: CatalogService
  ) {}

  async list(ownerUserId: string, query?: string, includeArchived = false, scope: "mine" | "all" = "all") {
    const normalizedQuery = query?.trim();
    const products = await this.prisma.product.findMany({
      where: {
        ownerUserId,
        ...(includeArchived ? {} : { archivedAt: null }),
        ...(scope === "mine" ? { origin: "user" } : {}),
        ...(normalizedQuery
          ? {
              OR: [
                { name: { contains: normalizedQuery, mode: Prisma.QueryMode.insensitive } },
                { categoryLabel: { contains: normalizedQuery, mode: Prisma.QueryMode.insensitive } },
                { brand: { contains: normalizedQuery, mode: Prisma.QueryMode.insensitive } }
              ]
            }
          : {})
      },
      include: { defaultUnit: true },
      orderBy: [{ archivedAt: "asc" }, { name: "asc" }]
    });
    return { products: products.map(toProductDto) };
  }

  async create(ownerUserId: string, dto: UpsertProductDto) {
    await this.ensureActiveUnit(dto.defaultUnitId);
    const product = await this.prisma.product.create({
      data: {
        ownerUserId,
        name: dto.name.trim(),
        categoryLabel: dto.categoryLabel.trim(),
        brand: cleanOptionalText(dto.brand),
        barcode: cleanOptionalText(dto.barcode),
        defaultUnitId: dto.defaultUnitId,
        estimatedPrice: cleanOptionalText(dto.estimatedPrice),
        notes: cleanOptionalText(dto.notes)
      },
      include: { defaultUnit: true }
    });
    return toProductDto(product);
  }

  async get(ownerUserId: string, id: string) {
    const product = await this.findOwnedProduct(ownerUserId, id);
    return toProductDto(product);
  }

  async update(ownerUserId: string, id: string, dto: UpsertProductDto) {
    await this.findOwnedProduct(ownerUserId, id);
    await this.ensureActiveUnit(dto.defaultUnitId);
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        name: dto.name.trim(),
        categoryLabel: dto.categoryLabel.trim(),
        brand: cleanOptionalText(dto.brand),
        barcode: cleanOptionalText(dto.barcode),
        defaultUnitId: dto.defaultUnitId,
        estimatedPrice: cleanOptionalText(dto.estimatedPrice),
        notes: cleanOptionalText(dto.notes)
      },
      include: { defaultUnit: true }
    });
    return toProductDto(product);
  }

  async getByBarcode(ownerUserId: string, barcode: string) {
    const trimmed = barcode.trim();

    // 1. User's own product
    const existing = await this.prisma.product.findFirst({
      where: { ownerUserId, barcode: trimmed, archivedAt: null },
      include: { defaultUnit: true }
    });
    if (existing) return toProductDto(existing);

    // 2. Global catalog (OFF + Cosmos cache) — auto-create for this user
    const catalogEntry = await this.catalog.lookupBarcode(trimmed);
    if (catalogEntry) {
      const unit = await this.prisma.unit.findFirst({
        where: { abbreviation: "unit", active: true }
      });
      if (!unit) throw new NotFoundException("Product not found for barcode");

      const created = await this.prisma.product.create({
        data: {
          ownerUserId,
          name: catalogEntry.name,
          categoryLabel: catalogEntry.categoryLabel,
          brand: catalogEntry.brand,
          barcode: trimmed,
          defaultUnitId: unit.id
        },
        include: { defaultUnit: true }
      });
      return toProductDto(created);
    }

    throw new NotFoundException("Product not found for barcode");
  }

  /** Returns catalog suggestions matching a query (for autocomplete). */
  async searchCatalog(query: string) {
    return this.catalog.search(query);
  }

  async archive(ownerUserId: string, id: string) {
    await this.findOwnedProduct(ownerUserId, id);
    const product = await this.prisma.product.update({
      where: { id },
      data: { archivedAt: new Date() },
      include: { defaultUnit: true }
    });
    return toProductDto(product);
  }

  private async findOwnedProduct(ownerUserId: string, id: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, ownerUserId },
      include: { defaultUnit: true }
    });
    if (!product) {
      throw new NotFoundException("Product not found");
    }
    return product;
  }

  private async ensureActiveUnit(id: string) {
    const unit = await this.prisma.unit.findFirst({ where: { id, active: true } });
    if (!unit) {
      throw new BadRequestException("Unit not found");
    }
  }
}

function cleanOptionalText(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : null;
}
