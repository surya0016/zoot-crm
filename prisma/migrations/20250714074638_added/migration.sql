/*
  Warnings:

  - Added the required column `countDownMins` to the `TagTimer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TagTimer" ADD COLUMN     "countDownMins" INTEGER NOT NULL;
