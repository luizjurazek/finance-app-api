/*
  Warnings:

  - You are about to drop the column `purchaseDate` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `received` on the `transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "purchaseDate",
DROP COLUMN "received",
ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false;
