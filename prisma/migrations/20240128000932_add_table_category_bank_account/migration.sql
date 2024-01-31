/*
  Warnings:

  - You are about to drop the column `icon_id` on the `bank_accounts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "bank_accounts" DROP CONSTRAINT "bank_accounts_icon_id_fkey";

-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "icon_id",
ADD COLUMN     "category_bank_account" UUID;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_category_bank_account_fkey" FOREIGN KEY ("category_bank_account") REFERENCES "icon_bank_account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
