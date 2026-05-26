import { IsBoolean, IsOptional } from "class-validator";

export class UpdateLayoutContributionConsentDto {
  @IsOptional()
  @IsBoolean()
  globalSharedLayoutContributionEnabled?: boolean;

  @IsOptional()
  @IsBoolean()
  supermarketOverride?: boolean | null;
}
