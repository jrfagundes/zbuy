import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SupermarketsService } from "../supermarkets/supermarkets.service";
import {
  AcceptSharedLayoutSuggestionDto,
  ReorderCorridorsDto,
  UpsertCorridorDto,
  UpsertPrivateProductPlacementDto
} from "./dto";
import {
  toPrivateProductPlacementDto,
  toSharedLayoutSuggestionDto,
  toSupermarketCorridorDto,
  toSupermarketLayoutDto
} from "./supermarket-layout-response";

const corridorInclude = { _count: { select: { placements: true } } };

@Injectable()
export class SupermarketLayoutsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supermarkets: SupermarketsService
  ) {}

  async getLayout(ownerUserId: string, supermarketId: string) {
    const supermarket = await this.supermarkets.findOwnedActive(ownerUserId, supermarketId);
    const [corridors, placements, suggestions] = await Promise.all([
      this.prisma.supermarketCorridor.findMany({
        where: { ownerUserId, supermarketId },
        include: corridorInclude,
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }]
      }),
      this.prisma.privateProductPlacement.findMany({
        where: { ownerUserId, supermarketId },
        orderBy: [{ lastConfirmedAt: "desc" }]
      }),
      this.prisma.sharedLayoutSuggestion.findMany({
        where: { supermarketId },
        orderBy: [{ confidenceScore: "desc" }, { sourceContributionCount: "desc" }]
      })
    ]);

    return toSupermarketLayoutDto({
      supermarketId,
      presenceRadiusMeters: supermarket.presenceRadiusMeters,
      corridors: corridors.map(toSupermarketCorridorDto),
      placements: placements.map(toPrivateProductPlacementDto),
      suggestions: suggestions.map(toSharedLayoutSuggestionDto)
    });
  }

  async createCorridor(ownerUserId: string, supermarketId: string, dto: UpsertCorridorDto) {
    await this.supermarkets.findOwnedActive(ownerUserId, supermarketId);
    const name = cleanName(dto.name);
    const sortOrder = await this.prisma.supermarketCorridor.count({ where: { ownerUserId, supermarketId } });
    const corridor = await this.prisma.supermarketCorridor.create({
      data: { ownerUserId, supermarketId, name, sortOrder },
      include: corridorInclude
    });
    return toSupermarketCorridorDto(corridor);
  }

  async updateCorridor(ownerUserId: string, supermarketId: string, corridorId: string, dto: UpsertCorridorDto) {
    await this.findOwnedCorridor(ownerUserId, supermarketId, corridorId);
    const corridor = await this.prisma.supermarketCorridor.update({
      where: { id: corridorId },
      data: { name: cleanName(dto.name) },
      include: corridorInclude
    });
    return toSupermarketCorridorDto(corridor);
  }

  async reorderCorridors(ownerUserId: string, supermarketId: string, dto: ReorderCorridorsDto) {
    await this.supermarkets.findOwnedActive(ownerUserId, supermarketId);
    const corridors = await this.prisma.supermarketCorridor.findMany({ where: { ownerUserId, supermarketId } });
    const existingIds = new Set(corridors.map((corridor) => corridor.id));
    if (dto.corridorIds.length !== existingIds.size || dto.corridorIds.some((id) => !existingIds.has(id))) {
      throw new BadRequestException("Corridor order must include every corridor exactly once");
    }

    await this.prisma.$transaction(
      dto.corridorIds.map((id, index) =>
        this.prisma.supermarketCorridor.update({
          where: { id },
          data: { sortOrder: index }
        })
      )
    );
    return this.getLayout(ownerUserId, supermarketId);
  }

  async deleteCorridor(ownerUserId: string, supermarketId: string, corridorId: string) {
    await this.findOwnedCorridor(ownerUserId, supermarketId, corridorId);
    await this.prisma.privateProductPlacement.deleteMany({ where: { ownerUserId, supermarketId, corridorId } });
    await this.prisma.supermarketCorridor.delete({ where: { id: corridorId } });
  }

  async setProductPlacement(
    ownerUserId: string,
    supermarketId: string,
    productId: string,
    dto: UpsertPrivateProductPlacementDto
  ) {
    await this.supermarkets.findOwnedActive(ownerUserId, supermarketId);
    await this.ensureOwnedProduct(ownerUserId, productId);
    await this.findOwnedCorridor(ownerUserId, supermarketId, dto.corridorId);

    const placement = await this.prisma.privateProductPlacement.upsert({
      where: { ownerUserId_supermarketId_productId: { ownerUserId, supermarketId, productId } },
      create: { ownerUserId, supermarketId, productId, corridorId: dto.corridorId },
      update: { corridorId: dto.corridorId, lastConfirmedAt: new Date() }
    });
    return toPrivateProductPlacementDto(placement);
  }

  async deleteProductPlacement(ownerUserId: string, supermarketId: string, productId: string) {
    await this.supermarkets.findOwnedActive(ownerUserId, supermarketId);
    await this.prisma.privateProductPlacement.deleteMany({ where: { ownerUserId, supermarketId, productId } });
  }

  async listSuggestions(ownerUserId: string, supermarketId: string) {
    await this.supermarkets.findOwnedActive(ownerUserId, supermarketId);
    const suggestions = await this.prisma.sharedLayoutSuggestion.findMany({
      where: { supermarketId },
      orderBy: [{ confidenceScore: "desc" }, { sourceContributionCount: "desc" }]
    });
    return { suggestions: suggestions.map(toSharedLayoutSuggestionDto) };
  }

  async acceptSuggestion(
    ownerUserId: string,
    supermarketId: string,
    suggestionId: string,
    dto: AcceptSharedLayoutSuggestionDto
  ) {
    await this.supermarkets.findOwnedActive(ownerUserId, supermarketId);
    const suggestion = await this.prisma.sharedLayoutSuggestion.findFirst({ where: { id: suggestionId, supermarketId } });
    if (!suggestion) {
      throw new NotFoundException("Shared layout suggestion not found");
    }
    await this.ensureOwnedProduct(ownerUserId, suggestion.productId);

    const corridorId = dto.corridorId
      ? (await this.findOwnedCorridor(ownerUserId, supermarketId, dto.corridorId)).id
      : (await this.createCorridor(ownerUserId, supermarketId, {
          name: dto.corridorName ?? suggestion.suggestedCorridorName
        })).id;

    return this.setProductPlacement(ownerUserId, supermarketId, suggestion.productId, { corridorId });
  }

  private async findOwnedCorridor(ownerUserId: string, supermarketId: string, corridorId: string) {
    const corridor = await this.prisma.supermarketCorridor.findFirst({
      where: { id: corridorId, ownerUserId, supermarketId },
      include: corridorInclude
    });
    if (!corridor) {
      throw new NotFoundException("Supermarket corridor not found");
    }
    return corridor;
  }

  private async ensureOwnedProduct(ownerUserId: string, productId: string) {
    const product = await this.prisma.product.findFirst({ where: { id: productId, ownerUserId, archivedAt: null } });
    if (!product) {
      throw new NotFoundException("Product not found");
    }
  }
}

function cleanName(name: string) {
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    throw new BadRequestException("Corridor name is required");
  }
  return trimmed;
}
