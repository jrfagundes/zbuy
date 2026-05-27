import type { LayoutContributionConsentDto } from "@zbuy/shared";

export function toLayoutContributionConsentDto(input: {
  globalSharedLayoutContributionEnabled: boolean;
  supermarketOverride?: boolean | null;
}): LayoutContributionConsentDto {
  const supermarketOverride = input.supermarketOverride ?? null;
  return {
    globalSharedLayoutContributionEnabled: input.globalSharedLayoutContributionEnabled,
    supermarketOverride,
    effectiveSharedLayoutContributionEnabled: supermarketOverride ?? input.globalSharedLayoutContributionEnabled
  };
}
