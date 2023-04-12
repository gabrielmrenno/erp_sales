-- CreateTable
CREATE TABLE "productInfo" (
    "code" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "productInfo_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "customer" (
    "code" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fantasyName" TEXT NOT NULL,
    "doc" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,
    "paymentTerm" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "customer_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "productInfo_name_key" ON "productInfo"("name");

-- CreateIndex
CREATE UNIQUE INDEX "productInfo_description_key" ON "productInfo"("description");

-- CreateIndex
CREATE UNIQUE INDEX "customer_name_key" ON "customer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "customer_fantasyName_key" ON "customer"("fantasyName");
