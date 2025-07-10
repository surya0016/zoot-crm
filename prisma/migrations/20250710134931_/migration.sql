/*
  Warnings:

  - The `note` column on the `ClientEntry` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ClientEntry" DROP COLUMN "note",
ADD COLUMN     "note" TEXT[];
