/*
  Warnings:

  - The `type` column on the `task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "type",
ADD COLUMN     "type" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "task_type";
