/*
  Warnings:

  - Changed the type of `group` on the `productInfo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "group" AS ENUM ('FD', 'SC');

-- AlterTable
ALTER TABLE "productInfo" DROP COLUMN "group",
ADD COLUMN     "group" "group" NOT NULL;
