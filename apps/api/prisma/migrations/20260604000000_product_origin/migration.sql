-- AlterTable
ALTER TABLE "Product" ADD COLUMN "origin" TEXT NOT NULL DEFAULT 'user';

-- CreateIndex
CREATE INDEX "Product_ownerUserId_origin_archivedAt_idx" ON "Product"("ownerUserId", "origin", "archivedAt");
