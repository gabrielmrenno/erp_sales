/*
  Warnings:

  - The primary key for the `ordered_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productInfoCode` on the `ordered_products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ordered_products" DROP CONSTRAINT "ordered_products_productInfoCode_fkey";

-- AlterTable
ALTER TABLE "ordered_products" DROP CONSTRAINT "ordered_products_pkey",
DROP COLUMN "productInfoCode",
ADD COLUMN     "productId" TEXT,
ADD CONSTRAINT "ordered_products_pkey" PRIMARY KEY ("orderId");

-- AddForeignKey
ALTER TABLE "ordered_products" ADD CONSTRAINT "ordered_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
