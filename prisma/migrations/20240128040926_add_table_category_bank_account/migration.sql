/*
  Warnings:

  - You are about to drop the column `color` on the `bank_accounts` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "color",
ADD COLUMN     "category_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "CategoryBankAccount" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "color" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "CategoryBankAccount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CategoryBankAccount" ADD CONSTRAINT "CategoryBankAccount_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "CategoryBankAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
