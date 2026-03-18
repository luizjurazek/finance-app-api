import { TransactionType, PaymentMethod } from '@prisma/client';

export class CreateTransactionDto {
    name!: string;
    purchaseDate!: Date;
    amount!: number;
    category!: string;
    type!: TransactionType;
    received!: boolean;
    paymentMethod!: PaymentMethod;
    totalInstallments?: number;
    creditCardId?: number;
}
