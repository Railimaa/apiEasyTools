/*
  Warnings:

  - You are about to drop the column `type` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "type",
ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;
