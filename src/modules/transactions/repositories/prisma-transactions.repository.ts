import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ITransactionsRepository } from '../interfaces/transactions-repository.interface';
import { Transaction, Prisma } from '@prisma/client';

@Injectable()
export class PrismaTransactionsRepository implements ITransactionsRepository {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.TransactionUncheckedCreateInput): Promise<Transaction> {
        return this.prisma.transaction.create({ data });
    }

    async createMany(data: Prisma.TransactionUncheckedCreateInput[]): Promise<Transaction[]> {
        const transactions: Transaction[] = [];

        for (const item of data) {
            const transaction = await this.prisma.transaction.create({ data: item });
            transactions.push(transaction);
        }

        return transactions;
    }

    async findAllByUserId(userId: number): Promise<Transaction[]> {
        return this.prisma.transaction.findMany({
            where: { userId },
            include: { creditCard: true },
            orderBy: { date: 'desc' },
        });
    }

    async findById(id: number): Promise<Transaction | null> {
        return this.prisma.transaction.findUnique({
            where: { id },
            include: { creditCard: true },
        });
    }

    async update(id: number, data: Prisma.TransactionUncheckedUpdateInput): Promise<Transaction> {
        return this.prisma.transaction.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<Transaction> {
        return this.prisma.transaction.delete({
            where: { id },
        });
    }

    async deleteByInstallmentGroupId(installmentGroupId: string): Promise<number> {
        const result = await this.prisma.transaction.deleteMany({
            where: { installmentGroupId },
        });

        return result.count;
    }
}
