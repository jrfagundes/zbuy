import type {
  PrivateProductPlacementDto,
  SharedLayoutSuggestionDto,
  SupermarketCorridorDto,
  SupermarketLayoutDto
} from "@zbuy/shared";

export function toSupermarketCorridorDto(corridor: {
  id: string;
  name: string;
  sortOrder: number;
  _count?: { placements?: number };
}): SupermarketCorridorDto {
  return {
    id: corridor.id,
    name: corridor.name,
    sortOrder: corridor.sortOrder,
    productCount: corridor._count?.placements ?? 0
  };
}

export function toPrivateProductPlacementDto(placement: {
  productId: string;
  corridorId: string;
  lastConfirmedAt: Date;
}): PrivateProductPlacementDto {
  return {
    productId: placement.productId,
    corridorId: placement.corridorId,
    lastConfirmedAt: placement.lastConfirmedAt.toISOString()
  };
}

export function toSharedLayoutSuggestionDto(suggestion: {
  id: string;
  productId: string;
  suggestedCorridorName: string;
  confidenceScore: { toString(): string };
  sourceContributionCount: number;
}): SharedLayoutSuggestionDto {
  return {
    id: suggestion.id,
    productId: suggestion.productId,
    suggestedCorridorName: suggestion.suggestedCorridorName,
    confidenceScore: suggestion.confidenceScore.toString(),
    sourceContributionCount: suggestion.sourceContributionCount
  };
}

export function toSupermarketLayoutDto(input: {
  supermarketId: string;
  presenceRadiusMeters: number;
  corridors: SupermarketCorridorDto[];
  placements: PrivateProductPlacementDto[];
  suggestions: SharedLayoutSuggestionDto[];
}): SupermarketLayoutDto {
  return {
    supermarketId: input.supermarketId,
    presenceRadiusMeters: input.presenceRadiusMeters,
    corridors: input.corridors,
    placements: input.placements,
    suggestions: input.suggestions
  };
}
