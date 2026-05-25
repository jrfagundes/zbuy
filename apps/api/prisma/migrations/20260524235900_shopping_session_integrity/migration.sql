ALTER TABLE "ShoppingSession" ADD COLUMN "snapshotSourceListName" TEXT;

UPDATE "ShoppingSession"
SET "snapshotSourceListName" = "ShoppingList"."name"
FROM "ShoppingList"
WHERE "ShoppingSession"."sourceListId" = "ShoppingList"."id";

ALTER TABLE "ShoppingSession" ALTER COLUMN "snapshotSourceListName" SET NOT NULL;

CREATE UNIQUE INDEX "ShoppingSession_one_active_per_owner_idx"
ON "ShoppingSession"("ownerUserId")
WHERE "status" = 'active';
