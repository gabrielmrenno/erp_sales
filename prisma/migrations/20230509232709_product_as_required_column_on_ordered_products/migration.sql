/*
  Warnings:

  - Made the column `productId` on table `ordered_products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ordered_products" DROP CONSTRAINT "ordered_products_productId_fkey";

-- AlterTable
ALTER TABLE "ordered_products" ALTER COLUMN "productId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ordered_products" ADD CONSTRAINT "ordered_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
