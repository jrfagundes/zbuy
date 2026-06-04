import { ArrayMinSize, IsArray, IsEmail, IsIn, IsOptional, IsString, IsUUID, Matches, MaxLength } from "class-validator";

export class ShareListDto {
  @IsEmail()
  @MaxLength(255)
  email!: string;
}

export class UpsertShoppingListDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string | null;
}

export class UpsertShoppingListItemDto {
  @IsUUID()
  productId!: string;

  @Matches(/^\d+(\.\d{1,3})?$/)
  quantity!: string;

  @IsUUID()
  unitId!: string;

  @IsOptional()
  @Matches(/^\d+(\.\d{1,2})?$/)
  expectedPrice?: string | null;

  @IsOptional()
  @IsIn(["low", "normal", "high"])
  priority?: "low" | "normal" | "high";

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string | null;
}

export class ReorderShoppingListItemsDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID("4", { each: true })
  itemIds!: string[];
}
