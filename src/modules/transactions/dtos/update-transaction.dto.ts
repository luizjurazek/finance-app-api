import { TransactionType, PaymentMethod } from '@prisma/client';

export class UpdateTransactionDto {
    name?: string;
    date?: string;
    amount?: number;
    category?: string;
    type?: TransactionType;
    paymentMethod?: PaymentMethod;
}
