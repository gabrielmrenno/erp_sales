-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "productInfoCode" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productionLaunch" (
    "id" TEXT NOT NULL,
    "batch" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startHour" TIMESTAMP(3) NOT NULL,
    "endHour" TIMESTAMP(3) NOT NULL,
    "rawMaterial" TEXT NOT NULL,
    "rawMaterialBatch" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "productInfoCode" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "productionLaunch_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_productInfoCode_fkey" FOREIGN KEY ("productInfoCode") REFERENCES "productInfo"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productionLaunch" ADD CONSTRAINT "productionLaunch_productInfoCode_fkey" FOREIGN KEY ("productInfoCode") REFERENCES "productInfo"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
