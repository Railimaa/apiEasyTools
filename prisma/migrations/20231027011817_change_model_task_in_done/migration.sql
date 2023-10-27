/*
  Warnings:

  - You are about to drop the column `completed` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "completed",
ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;
