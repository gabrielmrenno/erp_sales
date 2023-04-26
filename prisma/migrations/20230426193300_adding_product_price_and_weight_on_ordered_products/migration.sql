/*
  Warnings:

  - You are about to drop the column `totalValue` on the `ordered_products` table. All the data in the column will be lost.
  - Added the required column `productPrice` to the `ordered_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productWeight` to the `ordered_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ordered_products" DROP COLUMN "totalValue",
ADD COLUMN     "productPrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "productWeight" DECIMAL(65,30) NOT NULL;
