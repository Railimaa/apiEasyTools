/*
  Warnings:

  - You are about to drop the column `category_bank_account` on the `bank_accounts` table. All the data in the column will be lost.
  - You are about to drop the `icon_bank_account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bank_accounts" DROP CONSTRAINT "bank_accounts_category_bank_account_fkey";

-- DropForeignKey
ALTER TABLE "icon_bank_account" DROP CONSTRAINT "icon_bank_account_user_id_fkey";

-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "category_bank_account";

-- DropTable
DROP TABLE "icon_bank_account";
