/*
  Warnings:

  - The primary key for the `ordered_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `productInfoCode` on the `ordered_products` table. All the data in the column will be lost.
  - Added the required column `productId` to the `ordered_products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ordered_products" DROP CONSTRAINT "ordered_products_productInfoCode_fkey";

-- AlterTable
ALTER TABLE "ordered_products" DROP CONSTRAINT "ordered_products_pkey",
DROP COLUMN "productInfoCode",
ADD COLUMN     "productId" TEXT NOT NULL,
ADD CONSTRAINT "ordered_products_pkey" PRIMARY KEY ("orderId", "productId");

-- CreateTable
CREATE TABLE "missing_products" (
    "amount" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productInfoCode" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "missing_products_pkey" PRIMARY KEY ("orderId","productInfoCode")
);

-- AddForeignKey
ALTER TABLE "ordered_products" ADD CONSTRAINT "ordered_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missing_products" ADD CONSTRAINT "missing_products_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "missing_products" ADD CONSTRAINT "missing_products_productInfoCode_fkey" FOREIGN KEY ("productInfoCode") REFERENCES "productInfo"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
