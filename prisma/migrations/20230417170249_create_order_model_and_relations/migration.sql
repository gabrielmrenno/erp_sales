-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "customerCode" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderedProducts" (
    "orderId" INTEGER NOT NULL,
    "productInfoCode" INTEGER NOT NULL,

    CONSTRAINT "OrderedProducts_pkey" PRIMARY KEY ("orderId","productInfoCode")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerCode_fkey" FOREIGN KEY ("customerCode") REFERENCES "customer"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedProducts" ADD CONSTRAINT "OrderedProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedProducts" ADD CONSTRAINT "OrderedProducts_productInfoCode_fkey" FOREIGN KEY ("productInfoCode") REFERENCES "productInfo"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
