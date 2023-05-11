/*
  Warnings:

  - The primary key for the `ordered_products` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ordered_products" DROP CONSTRAINT "ordered_products_pkey",
ADD CONSTRAINT "ordered_products_pkey" PRIMARY KEY ("orderId", "productId");
