/*
  Warnings:

  - You are about to drop the column `done` on the `task` table. All the data in the column will be lost.
  - Added the required column `type` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "task_type" AS ENUM ('DONE', 'NOT');

-- AlterTable
ALTER TABLE "task" DROP COLUMN "done",
ADD COLUMN     "type" "task_type" NOT NULL;
