-- CreateEnum
CREATE TYPE "PurchaseLocationType" AS ENUM ('physical', 'online');

-- CreateEnum
CREATE TYPE "ShoppingSessionContext" AS ENUM ('physical', 'online');

-- CreateEnum
CREATE TYPE "ShoppingSessionStatus" AS ENUM ('active', 'completed', 'canceled');

-- CreateEnum
CREATE TYPE "ShoppingSessionItemStatus" AS ENUM ('pending', 'bought', 'not_found', 'unprocessed');

-- CreateTable
CREATE TABLE "PurchaseLocation" (
    "id" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "type" "PurchaseLocationType" NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "websiteOrApp" TEXT,
    "notes" TEXT,
    "archivedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchaseLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingSession" (
    "id" TEXT NOT NULL,
    "ownerUserId" TEXT NOT NULL,
    "sourceListId" TEXT NOT NULL,
    "purchaseLocationId" TEXT NOT NULL,
    "context" "ShoppingSessionContext" NOT NULL,
    "status" "ShoppingSessionStatus" NOT NULL DEFAULT 'active',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),
    "knownTotal" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "boughtItemsWithoutPriceCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShoppingSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingSessionItem" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
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
    "actualPrice" DECIMAL(10,2),
    "status" "ShoppingSessionItemStatus" NOT NULL DEFAULT 'pending',
    "priority" "ListItemPriority" NOT NULL DEFAULT 'normal',
    "notes" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShoppingSessionItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PurchaseLocation_ownerUserId_type_archivedAt_idx" ON "PurchaseLocation"("ownerUserId", "type", "archivedAt");

-- CreateIndex
CREATE INDEX "PurchaseLocation_ownerUserId_name_idx" ON "PurchaseLocation"("ownerUserId", "name");

-- CreateIndex
CREATE INDEX "ShoppingSession_ownerUserId_status_idx" ON "ShoppingSession"("ownerUserId", "status");

-- CreateIndex
CREATE INDEX "ShoppingSession_ownerUserId_startedAt_idx" ON "ShoppingSession"("ownerUserId", "startedAt");

-- CreateIndex
CREATE INDEX "ShoppingSession_purchaseLocationId_idx" ON "ShoppingSession"("purchaseLocationId");

-- CreateIndex
CREATE INDEX "ShoppingSession_sourceListId_idx" ON "ShoppingSession"("sourceListId");

-- CreateIndex
CREATE INDEX "ShoppingSessionItem_sessionId_status_sortOrder_idx" ON "ShoppingSessionItem"("sessionId", "status", "sortOrder");

-- CreateIndex
CREATE INDEX "ShoppingSessionItem_sourceProductId_idx" ON "ShoppingSessionItem"("sourceProductId");

-- CreateIndex
CREATE INDEX "ShoppingSessionItem_sourceListItemId_idx" ON "ShoppingSessionItem"("sourceListItemId");

-- AddForeignKey
ALTER TABLE "PurchaseLocation" ADD CONSTRAINT "PurchaseLocation_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingSession" ADD CONSTRAINT "ShoppingSession_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingSession" ADD CONSTRAINT "ShoppingSession_sourceListId_fkey" FOREIGN KEY ("sourceListId") REFERENCES "ShoppingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingSession" ADD CONSTRAINT "ShoppingSession_purchaseLocationId_fkey" FOREIGN KEY ("purchaseLocationId") REFERENCES "PurchaseLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingSessionItem" ADD CONSTRAINT "ShoppingSessionItem_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ShoppingSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingSessionItem" ADD CONSTRAINT "ShoppingSessionItem_sourceProductId_fkey" FOREIGN KEY ("sourceProductId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingSessionItem" ADD CONSTRAINT "ShoppingSessionItem_sourceListItemId_fkey" FOREIGN KEY ("sourceListItemId") REFERENCES "ShoppingListItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingSessionItem" ADD CONSTRAINT "ShoppingSessionItem_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
