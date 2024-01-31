-- DropForeignKey
ALTER TABLE "bank_accounts" DROP CONSTRAINT "bank_accounts_category_id_fkey";

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "CategoryBankAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
