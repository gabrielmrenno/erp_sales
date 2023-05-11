/*
  Warnings:

  - Added the required column `productBatch` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "productBatch" TEXT NOT NULL;
