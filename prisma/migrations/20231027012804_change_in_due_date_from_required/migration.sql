/*
  Warnings:

  - Made the column `due_date` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "task" ALTER COLUMN "due_date" SET NOT NULL;
