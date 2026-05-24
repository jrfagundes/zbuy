import { IsIn, IsOptional, IsString, MaxLength } from "class-validator";

export class UpsertPurchaseLocationDto {
  @IsIn(["physical", "online"])
  type!: "physical" | "online";

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
  @IsString()
  @MaxLength(160)
  websiteOrApp?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string | null;
}
