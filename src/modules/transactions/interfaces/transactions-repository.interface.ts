import { Transaction, Prisma } from '@prisma/client';

export abstract class ITransactionsRepository {
    abstract create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction>;
    abstract createMany(data: Prisma.TransactionUncheckedCreateInput[]): Promise<Transaction[]>;
    abstract findAllByUserId(userId: number): Promise<Transaction[]>;
    abstract findById(id: number): Promise<Transaction | null>;
    abstract update(id: number, data: Prisma.TransactionUncheckedUpdateInput): Promise<Transaction>;
    abstract delete(id: number): Promise<Transaction>;
    abstract deleteByInstallmentGroupId(installmentGroupId: string): Promise<number>;
}
