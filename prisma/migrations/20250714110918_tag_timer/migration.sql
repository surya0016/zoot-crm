/*
  Warnings:

  - You are about to drop the column `countDownMins` on the `TagTimer` table. All the data in the column will be lost.
  - You are about to drop the column `durationMins` on the `TagTimer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TagTimer" DROP COLUMN "countDownMins",
DROP COLUMN "durationMins",
ADD COLUMN     "countDownSec" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tagStatus" "Status" NOT NULL DEFAULT 'in_progress';
