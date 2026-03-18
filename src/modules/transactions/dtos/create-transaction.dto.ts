import { TransactionType, PaymentMethod } from '@prisma/client';

export class CreateTransactionDto {
    name!: string;
    date!: Date;
    amount!: number;
    category!: string;
    type!: TransactionType;
    isPaid!: boolean;
    paymentMethod!: PaymentMethod;
    totalInstallments?: number;
    creditCardId?: number;
}
