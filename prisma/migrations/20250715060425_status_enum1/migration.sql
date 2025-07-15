-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'none';

-- AlterTable
ALTER TABLE "TagTimer" ALTER COLUMN "tagStatus" DROP DEFAULT;
