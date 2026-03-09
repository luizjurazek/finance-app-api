-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('DEBIT', 'CREDIT_CARD', 'PIX', 'CASH', 'BANK_TRANSFER');

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "category" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "installment" INTEGER,
    "totalInstallments" INTEGER,
    "installmentGroupId" TEXT,
    "creditCardId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_cards" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "closingDay" INTEGER NOT NULL,
    "dueDay" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "credit_cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES "credit_cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_cards" ADD CONSTRAINT "credit_cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
