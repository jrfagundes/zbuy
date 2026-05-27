-- CreateEnum
CREATE TYPE "ShoppingJourneyContext" AS ENUM ('physical', 'online');

-- CreateEnum
CREATE TYPE "ShoppingJourneyStatus" AS ENUM ('active', 'completed', 'canceled');

-- CreateEnum
CREATE TYPE "ShoppingJourneyStopStatus" AS ENUM ('active', 'finished', 'canceled');

-- CreateEnum
CREATE TYPE "ShoppingJourneyItemFinalStatus" AS ENUM ('active', 'bought', 'not_found', 'unprocessed');

-- CreateTable
CREATE TABLE "Supermarket" (
    "id" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "presenceRadiusMeters" INTEGER NOT NULL DEFAULT 500,
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supermarket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingJourney" (
    "id" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "sourceListId" TEXT NOT NULL,
    "snapshotSourceListName" TEXT NOT NULL,
    "context" "ShoppingJourneyContext" NOT NULL DEFAULT 'physical',
    "status" "ShoppingJourneyStatus" NOT NULL DEFAULT 'active',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),
    "knownTotal" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "boughtItemsWithoutPriceCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShoppingJourney_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingJourneyItem" (
    "id" TEXT NOT NULL,
    "journeyId" TEXT NOT NULL,
    "sourceProductId" TEXT,
    "sourceListItemId" TEXT,
    "snapshotProductName" TEXT NOT NULL,
    "snapshotCategoryLabel" TEXT NOT NULL,
    "snapshotBrand" TEXT,
    "quantity" DECIMAL(10,3) NOT NULL,
    "unitId" TEXT,
    "snapshotUnitName" TEXT NOT NULL,
    "snapshotUnitAbbreviation" TEXT NOT NULL,
    "expectedPrice" DECIMAL(10,2),
    "finalActualPrice" DECIMAL(10,2),
    "finalStatus" "ShoppingJourneyItemFinalStatus" NOT NULL DEFAULT 'active',
    "priority" "ListItemPriority" NOT NULL DEFAULT 'normal',
    "notes" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShoppingJourneyItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingJourneyStop" (
    "id" TEXT NOT NULL,
    "journeyId" TEXT NOT NULL,
    "supermarketId" TEXT NOT NULL,
    "status" "ShoppingJourneyStopStatus" NOT NULL DEFAULT 'active',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),
    "exitDetectedAt" TIMESTAMP(3),
    "continuedOutsideRadiusAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShoppingJourneyStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingJourneyStopItem" (
    "id" TEXT NOT NULL,
    "stopId" TEXT NOT NULL,
    "journeyItemId" TEXT NOT NULL,
    "status" "ShoppingSessionItemStatus" NOT NULL DEFAULT 'pending',
    "actualPrice" DECIMAL(10,2),
    "corridorId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShoppingJourneyStopItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupermarketCorridor" (
    "id" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "supermarketId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupermarketCorridor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrivateProductPlacement" (
    "id" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "supermarketId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "corridorId" TEXT NOT NULL,
    "lastConfirmedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrivateProductPlacement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharedLayoutSuggestion" (
    "id" TEXT NOT NULL,
    "supermarketId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "suggestedCorridorName" TEXT NOT NULL,
    "confidenceScore" DECIMAL(4,2) NOT NULL,
    "sourceContributionCount" INTEGER NOT NULL DEFAULT 0,
    "lastConfirmedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SharedLayoutSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LayoutContributionConsent" (
    "id" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "globalSharedLayoutContributionEnabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LayoutContributionConsent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupermarketLayoutConsentOverride" (
    "id" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "supermarketId" TEXT NOT NULL,
    "sharedLayoutContributionEnabled" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupermarketLayoutConsentOverride_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Supermarket_ownerUserId_archivedAt_idx" ON "Supermarket"("ownerUserId", "archivedAt");

-- CreateIndex
CREATE INDEX "Supermarket_latitude_longitude_idx" ON "Supermarket"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "Supermarket_name_idx" ON "Supermarket"("name");

-- CreateIndex
CREATE INDEX "ShoppingJourney_ownerUserId_status_idx" ON "ShoppingJourney"("ownerUserId", "status");

-- CreateIndex
CREATE INDEX "ShoppingJourney_ownerUserId_startedAt_idx" ON "ShoppingJourney"("ownerUserId", "startedAt");

-- CreateIndex
CREATE INDEX "ShoppingJourney_sourceListId_idx" ON "ShoppingJourney"("sourceListId");

-- CreateIndex
CREATE INDEX "ShoppingJourneyItem_journeyId_finalStatus_sortOrder_idx" ON "ShoppingJourneyItem"("journeyId", "finalStatus", "sortOrder");

-- CreateIndex
CREATE INDEX "ShoppingJourneyItem_sourceProductId_idx" ON "ShoppingJourneyItem"("sourceProductId");

-- CreateIndex
CREATE INDEX "ShoppingJourneyItem_sourceListItemId_idx" ON "ShoppingJourneyItem"("sourceListItemId");

-- CreateIndex
CREATE INDEX "ShoppingJourneyStop_journeyId_status_idx" ON "ShoppingJourneyStop"("journeyId", "status");

-- CreateIndex
CREATE INDEX "ShoppingJourneyStop_supermarketId_idx" ON "ShoppingJourneyStop"("supermarketId");

-- CreateIndex
CREATE INDEX "ShoppingJourneyStopItem_stopId_status_idx" ON "ShoppingJourneyStopItem"("stopId", "status");

-- CreateIndex
CREATE INDEX "ShoppingJourneyStopItem_journeyItemId_idx" ON "ShoppingJourneyStopItem"("journeyItemId");

-- CreateIndex
CREATE INDEX "ShoppingJourneyStopItem_corridorId_idx" ON "ShoppingJourneyStopItem"("corridorId");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingJourneyStopItem_stopId_journeyItemId_key" ON "ShoppingJourneyStopItem"("stopId", "journeyItemId");

-- CreateIndex
CREATE INDEX "SupermarketCorridor_ownerUserId_supermarketId_sortOrder_idx" ON "SupermarketCorridor"("ownerUserId", "supermarketId", "sortOrder");

-- CreateIndex
CREATE INDEX "PrivateProductPlacement_supermarketId_corridorId_idx" ON "PrivateProductPlacement"("supermarketId", "corridorId");

-- CreateIndex
CREATE UNIQUE INDEX "PrivateProductPlacement_ownerUserId_supermarketId_productId_key" ON "PrivateProductPlacement"("ownerUserId", "supermarketId", "productId");

-- CreateIndex
CREATE INDEX "SharedLayoutSuggestion_supermarketId_productId_idx" ON "SharedLayoutSuggestion"("supermarketId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "LayoutContributionConsent_ownerUserId_key" ON "LayoutContributionConsent"("ownerUserId");

-- CreateIndex
CREATE UNIQUE INDEX "SupermarketLayoutConsentOverride_ownerUserId_supermarketId_key" ON "SupermarketLayoutConsentOverride"("ownerUserId", "supermarketId");

-- AddForeignKey
ALTER TABLE "Supermarket" ADD CONSTRAINT "Supermarket_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingJourney" ADD CONSTRAINT "ShoppingJourney_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingJourney" ADD CONSTRAINT "ShoppingJourney_sourceListId_fkey" FOREIGN KEY ("sourceListId") REFERENCES "ShoppingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingJourneyItem" ADD CONSTRAINT "ShoppingJourneyItem_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "ShoppingJourney"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingJourneyItem" ADD CONSTRAINT "ShoppingJourneyItem_sourceProductId_fkey" FOREIGN KEY ("sourceProductId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingJourneyItem" ADD CONSTRAINT "ShoppingJourneyItem_sourceListItemId_fkey" FOREIGN KEY ("sourceListItemId") REFERENCES "ShoppingListItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingJourneyItem" ADD CONSTRAINT "ShoppingJourneyItem_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingJourneyStop" ADD CONSTRAINT "ShoppingJourneyStop_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "ShoppingJourney"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingJourneyStop" ADD CONSTRAINT "ShoppingJourneyStop_supermarketId_fkey" FOREIGN KEY ("supermarketId") REFERENCES "Supermarket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingJourneyStopItem" ADD CONSTRAINT "ShoppingJourneyStopItem_stopId_fkey" FOREIGN KEY ("stopId") REFERENCES "ShoppingJourneyStop"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingJourneyStopItem" ADD CONSTRAINT "ShoppingJourneyStopItem_journeyItemId_fkey" FOREIGN KEY ("journeyItemId") REFERENCES "ShoppingJourneyItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingJourneyStopItem" ADD CONSTRAINT "ShoppingJourneyStopItem_corridorId_fkey" FOREIGN KEY ("corridorId") REFERENCES "SupermarketCorridor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupermarketCorridor" ADD CONSTRAINT "SupermarketCorridor_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupermarketCorridor" ADD CONSTRAINT "SupermarketCorridor_supermarketId_fkey" FOREIGN KEY ("supermarketId") REFERENCES "Supermarket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateProductPlacement" ADD CONSTRAINT "PrivateProductPlacement_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateProductPlacement" ADD CONSTRAINT "PrivateProductPlacement_supermarketId_fkey" FOREIGN KEY ("supermarketId") REFERENCES "Supermarket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateProductPlacement" ADD CONSTRAINT "PrivateProductPlacement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrivateProductPlacement" ADD CONSTRAINT "PrivateProductPlacement_corridorId_fkey" FOREIGN KEY ("corridorId") REFERENCES "SupermarketCorridor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedLayoutSuggestion" ADD CONSTRAINT "SharedLayoutSuggestion_supermarketId_fkey" FOREIGN KEY ("supermarketId") REFERENCES "Supermarket"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedLayoutSuggestion" ADD CONSTRAINT "SharedLayoutSuggestion_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LayoutContributionConsent" ADD CONSTRAINT "LayoutContributionConsent_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupermarketLayoutConsentOverride" ADD CONSTRAINT "SupermarketLayoutConsentOverride_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupermarketLayoutConsentOverride" ADD CONSTRAINT "SupermarketLayoutConsentOverride_supermarketId_fkey" FOREIGN KEY ("supermarketId") REFERENCES "Supermarket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
