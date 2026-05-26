import { IsInt, IsNumberString, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

export class UpsertSupermarketDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(240)
  address?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  city?: string | null;

  @IsOptional()
  @IsNumberString()
  latitude?: string | null;

  @IsOptional()
  @IsNumberString()
  longitude?: string | null;

  @IsOptional()
  @IsInt()
  @Min(50)
  @Max(5000)
  presenceRadiusMeters?: number;
}

export class UpdateSupermarketDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(240)
  address?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  city?: string | null;

  @IsOptional()
  @IsNumberString()
  latitude?: string | null;

  @IsOptional()
  @IsNumberString()
  longitude?: string | null;

  @IsOptional()
  @IsInt()
  @Min(50)
  @Max(5000)
  presenceRadiusMeters?: number;
}

export class DetectSupermarketDto {
  @IsNumberString()
  latitude!: string;

  @IsNumberString()
  longitude!: string;

  @IsOptional()
  @IsInt()
  @Min(50)
  @Max(5000)
  radiusMeters?: number;
}
