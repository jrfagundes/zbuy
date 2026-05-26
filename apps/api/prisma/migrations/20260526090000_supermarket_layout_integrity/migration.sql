-- Add race guards for active shopping workflows.
CREATE UNIQUE INDEX "ShoppingJourney_ownerUserId_active_key"
ON "ShoppingJourney"("ownerUserId")
WHERE "status" = 'active';

CREATE UNIQUE INDEX "ShoppingJourneyStop_journeyId_active_key"
ON "ShoppingJourneyStop"("journeyId")
WHERE "status" = 'active';

-- Strengthen supermarket layout integrity.
CREATE UNIQUE INDEX "SharedLayoutSuggestion_supermarketId_productId_suggestedCorridorName_key"
ON "SharedLayoutSuggestion"("supermarketId", "productId", "suggestedCorridorName");

CREATE UNIQUE INDEX "SupermarketCorridor_id_ownerUserId_supermarketId_key"
ON "SupermarketCorridor"("id", "ownerUserId", "supermarketId");

ALTER TABLE "PrivateProductPlacement"
DROP CONSTRAINT "PrivateProductPlacement_corridorId_fkey";

ALTER TABLE "PrivateProductPlacement"
ADD CONSTRAINT "PrivateProductPlacement_corridorId_ownerUserId_supermarketId_fkey"
FOREIGN KEY ("corridorId", "ownerUserId", "supermarketId")
REFERENCES "SupermarketCorridor"("id", "ownerUserId", "supermarketId")
ON DELETE CASCADE
ON UPDATE CASCADE;

-- Basic database-level value bounds.
ALTER TABLE "Supermarket"
ADD CONSTRAINT "Supermarket_presenceRadiusMeters_check"
CHECK ("presenceRadiusMeters" BETWEEN 50 AND 5000);

ALTER TABLE "SharedLayoutSuggestion"
ADD CONSTRAINT "SharedLayoutSuggestion_confidenceScore_check"
CHECK ("confidenceScore" >= 0 AND "confidenceScore" <= 1);

ALTER TABLE "SharedLayoutSuggestion"
ADD CONSTRAINT "SharedLayoutSuggestion_sourceContributionCount_check"
CHECK ("sourceContributionCount" >= 0);
