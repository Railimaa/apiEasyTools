/*
  Warnings:

  - You are about to drop the `CategoryBankAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryBankAccount" DROP CONSTRAINT "CategoryBankAccount_user_id_fkey";

-- DropForeignKey
ALTER TABLE "bank_accounts" DROP CONSTRAINT "bank_accounts_category_id_fkey";

-- DropTable
DROP TABLE "CategoryBankAccount";

-- CreateTable
CREATE TABLE "category_bank_account" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "color" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "category_bank_account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "category_bank_account" ADD CONSTRAINT "category_bank_account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category_bank_account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
