/*
  Warnings:

  - The primary key for the `ordered_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productId` on the `ordered_products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ordered_products" DROP CONSTRAINT "ordered_products_productId_fkey";

-- AlterTable
ALTER TABLE "ordered_products" DROP CONSTRAINT "ordered_products_pkey",
DROP COLUMN "productId",
ADD COLUMN     "productInfoCode" INTEGER NOT NULL DEFAULT 1,
ADD CONSTRAINT "ordered_products_pkey" PRIMARY KEY ("orderId", "productInfoCode");

-- AddForeignKey
ALTER TABLE "ordered_products" ADD CONSTRAINT "ordered_products_productInfoCode_fkey" FOREIGN KEY ("productInfoCode") REFERENCES "productInfo"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
