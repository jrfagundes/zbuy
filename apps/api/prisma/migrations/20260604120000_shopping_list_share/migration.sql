-- CreateTable
CREATE TABLE "ShoppingListShare" (
    "id" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "invitedByUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShoppingListShare_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ShoppingListShare_userId_idx" ON "ShoppingListShare"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ShoppingListShare_listId_userId_key" ON "ShoppingListShare"("listId", "userId");

-- AddForeignKey
ALTER TABLE "ShoppingListShare" ADD CONSTRAINT "ShoppingListShare_listId_fkey" FOREIGN KEY ("listId") REFERENCES "ShoppingList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingListShare" ADD CONSTRAINT "ShoppingListShare_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingListShare" ADD CONSTRAINT "ShoppingListShare_invitedByUserId_fkey" FOREIGN KEY ("invitedByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
