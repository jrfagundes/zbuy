import { IsIn, IsOptional, IsString, IsUUID, Matches, MaxLength } from "class-validator";

export class StartShoppingSessionDto {
  @IsUUID()
  sourceListId!: string;

  @IsUUID()
  purchaseLocationId!: string;

  @IsIn(["physical", "online"])
  context!: "physical" | "online";
}

export class UpdateShoppingSessionItemDto {
  @IsOptional()
  @IsIn(["pending", "bought", "not_found"])
  status?: "pending" | "bought" | "not_found";

  @IsOptional()
  @Matches(/^\d+(\.\d{1,2})?$/)
  actualPrice?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string | null;
}

export class CreateContinuationListDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;
}
