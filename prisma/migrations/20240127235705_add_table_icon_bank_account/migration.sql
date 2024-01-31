-- AlterTable
ALTER TABLE "bank_accounts" ADD COLUMN     "icon_id" UUID;

-- CreateTable
CREATE TABLE "icon_bank_account" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "icon" TEXT,
    "bg_color" TEXT NOT NULL,

    CONSTRAINT "icon_bank_account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "icon_bank_account" ADD CONSTRAINT "icon_bank_account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_icon_id_fkey" FOREIGN KEY ("icon_id") REFERENCES "icon_bank_account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
