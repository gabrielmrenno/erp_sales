/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderedProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customerCode_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_userId_fkey";

-- DropForeignKey
ALTER TABLE "OrderedProducts" DROP CONSTRAINT "OrderedProducts_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderedProducts" DROP CONSTRAINT "OrderedProducts_productInfoCode_fkey";

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderedProducts";

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "deliveryDate" TIMESTAMP(3),
    "customerCode" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderedProducts" (
    "orderId" INTEGER NOT NULL,
    "productInfoCode" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "orderedProducts_pkey" PRIMARY KEY ("orderId","productInfoCode")
);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customerCode_fkey" FOREIGN KEY ("customerCode") REFERENCES "customer"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderedProducts" ADD CONSTRAINT "orderedProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderedProducts" ADD CONSTRAINT "orderedProducts_productInfoCode_fkey" FOREIGN KEY ("productInfoCode") REFERENCES "productInfo"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
