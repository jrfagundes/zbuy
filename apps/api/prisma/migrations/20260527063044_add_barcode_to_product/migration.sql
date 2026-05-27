-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "barcode" TEXT;

-- CreateIndex
CREATE INDEX "Product_ownerUserId_barcode_idx" ON "Product"("ownerUserId", "barcode");
