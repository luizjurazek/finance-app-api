import { TransactionType, PaymentMethod } from '@prisma/client';

export class CreateTransactionDto {
    name!: string;
    date!: string;
    amount!: number;
    category!: string;
    type!: TransactionType;
    paymentMethod!: PaymentMethod;
    totalInstallments?: number;
    creditCardId?: number;
}
