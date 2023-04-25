/*
  Warnings:

  - Changed the type of `unit` on the `productInfo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `group` on the `productInfo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "unit" AS ENUM ('FD', 'SC');

-- AlterTable
ALTER TABLE "productInfo" DROP COLUMN "unit",
ADD COLUMN     "unit" "unit" NOT NULL,
DROP COLUMN "group",
ADD COLUMN     "group" TEXT NOT NULL;

-- DropEnum
DROP TYPE "group";
