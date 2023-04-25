/*
  Warnings:

  - Added the required column `amount` to the `OrderedProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderedProducts" ADD COLUMN     "amount" INTEGER NOT NULL;
