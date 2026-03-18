import { TransactionType, PaymentMethod } from '@prisma/client';

export class UpdateTransactionDto {
    name?: string;
    date?: Date;
    amount?: number;
    category?: string;
    type?: TransactionType;
    paymentMethod?: PaymentMethod;
    isPaid?: boolean;
}
