/*
  Warnings:

  - A unique constraint covering the columns `[doc]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "customer_doc_key" ON "customer"("doc");
