import { IsOptional, IsString, IsUUID, Matches, MaxLength } from "class-validator";

export class UpsertProductDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsString()
  @MaxLength(80)
  categoryLabel!: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  brand?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(48)
  barcode?: string | null;

  @IsUUID()
  defaultUnitId!: string;

  @IsOptional()
  @Matches(/^\d+(\.\d{1,2})?$/)
  estimatedPrice?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string | null;
}
