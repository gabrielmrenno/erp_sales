/*
  Warnings:

  - You are about to drop the `orderedProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orderedProducts" DROP CONSTRAINT "orderedProducts_orderId_fkey";

-- DropForeignKey
ALTER TABLE "orderedProducts" DROP CONSTRAINT "orderedProducts_productInfoCode_fkey";

-- DropTable
DROP TABLE "orderedProducts";

-- CreateTable
CREATE TABLE "ordered_products" (
    "orderId" INTEGER NOT NULL,
    "productInfoCode" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "ordered_products_pkey" PRIMARY KEY ("orderId","productInfoCode")
);

-- AddForeignKey
ALTER TABLE "ordered_products" ADD CONSTRAINT "ordered_products_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordered_products" ADD CONSTRAINT "ordered_products_productInfoCode_fkey" FOREIGN KEY ("productInfoCode") REFERENCES "productInfo"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
