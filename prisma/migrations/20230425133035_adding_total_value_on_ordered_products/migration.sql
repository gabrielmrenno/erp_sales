/*
  Warnings:

  - Added the required column `totalValue` to the `ordered_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ordered_products" ADD COLUMN     "totalValue" DECIMAL(65,30) NOT NULL;
