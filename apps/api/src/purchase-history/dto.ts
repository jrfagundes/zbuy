import { IsISO8601, IsIn, IsOptional, IsString, IsUUID, Matches, MaxLength } from "class-validator";

export class PurchaseHistoryQueryDto {
  @IsOptional()
  @IsISO8601()
  dateFrom?: string;

  @IsOptional()
  @IsISO8601()
  dateTo?: string;

  @IsOptional()
  @IsUUID()
  locationId?: string;

  @IsOptional()
  @IsIn(["physical", "online"])
  locationType?: "physical" | "online";

  @IsOptional()
  @IsString()
  @MaxLength(120)
  productQuery?: string;

  @IsOptional()
  @IsUUID()
  sourceListId?: string;

  @IsOptional()
  @IsIn(["bought", "not_found", "unprocessed"])
  itemStatus?: "bought" | "not_found" | "unprocessed";

  @IsOptional()
  @Matches(/^\d+(\.\d{1,2})?$/)
  minPrice?: string;

  @IsOptional()
  @Matches(/^\d+(\.\d{1,2})?$/)
  maxPrice?: string;

  @IsOptional()
  @IsIn(["true", "false"])
  withoutPrice?: "true" | "false";
}
