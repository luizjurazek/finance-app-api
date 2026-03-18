import { TransactionType, PaymentMethod } from '@prisma/client';

export class UpdateTransactionDto {
    name?: string;
    purchaseDate?: Date;
    amount?: number;
    category?: string;
    type?: TransactionType;
    paymentMethod?: PaymentMethod;
    received?: boolean;
}
