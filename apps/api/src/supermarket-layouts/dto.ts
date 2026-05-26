import { IsArray, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class UpsertCorridorDto {
  @IsString()
  @MaxLength(80)
  name!: string;
}

export class ReorderCorridorsDto {
  @IsArray()
  @IsUUID(undefined, { each: true })
  corridorIds!: string[];
}

export class UpsertPrivateProductPlacementDto {
  @IsUUID()
  corridorId!: string;
}

export class AcceptSharedLayoutSuggestionDto {
  @IsOptional()
  @IsUUID()
  corridorId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  corridorName?: string;
}
