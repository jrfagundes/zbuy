import { ArrayMinSize, IsArray, IsIn, IsNumberString, IsOptional, IsString, IsUUID, Matches, MaxLength } from "class-validator";

export class StartShoppingJourneyDto {
  @IsArray()
  @IsUUID("all", { each: true })
  @ArrayMinSize(1)
  sourceListIds!: string[];

  @IsUUID()
  supermarketId!: string;

  @IsOptional()
  @IsNumberString()
  latitude?: string | null;

  @IsOptional()
  @IsNumberString()
  longitude?: string | null;
}

export class StartJourneyStopDto {
  @IsUUID()
  supermarketId!: string;
}

export class UpdateShoppingJourneyStopItemDto {
  @IsOptional()
  @IsIn(["pending", "bought", "not_found"])
  status?: "pending" | "bought" | "not_found";

  @IsOptional()
  @Matches(/^\d+(\.\d{1,2})?$/)
  actualPrice?: string | null;

  @IsOptional()
  @IsUUID()
  corridorId?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string | null;
}
