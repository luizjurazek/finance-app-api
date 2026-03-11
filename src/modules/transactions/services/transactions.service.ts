import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { ITransactionsRepository } from '../interfaces/transactions-repository.interface';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { UpdateTransactionDto } from '../dtos/update-transaction.dto';
import { CreditCardsService } from '../../credit-cards/services/credit-cards.service';
import { Transaction, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';

@Injectable()
export class TransactionsService {
    constructor(
        private transactionsRepository: ITransactionsRepository,
        private creditCardsService: CreditCardsService,
    ) {}

    async create(userId: number, dto: CreateTransactionDto): Promise<Transaction[]> {
        const purchaseDate = new Date(dto.date);
        const isInstallment =
            dto.paymentMethod === 'CREDIT_CARD' && dto.totalInstallments !== undefined && dto.totalInstallments > 1;

        if (dto.paymentMethod === 'CREDIT_CARD' && !dto.creditCardId) {
            throw new BadRequestException('creditCardId is required for credit card transactions');
        }

        if (dto.creditCardId) {
            await this.creditCardsService.findOne(dto.creditCardId, userId);
        }

        if (isInstallment) {
            return this.createInstallments(userId, dto, purchaseDate);
        }

        const transaction = await this.transactionsRepository.create({
            userId,
            name: dto.name,
            date: purchaseDate,
            purchaseDate: null,
            amount: new Prisma.Decimal(dto.amount),
            category: dto.category,
            type: dto.type,
            paymentMethod: dto.paymentMethod,
            creditCardId: dto.creditCardId ?? null,
        });

        return [transaction];
    }

    private async createInstallments(
        userId: number,
        dto: CreateTransactionDto,
        purchaseDate: Date,
    ): Promise<Transaction[]> {
        const creditCard = await this.creditCardsService.findOne(dto.creditCardId!, userId);
        const totalInstallments = dto.totalInstallments!;
        const installmentAmount = Number((dto.amount / totalInstallments).toFixed(2));
        const installmentGroupId = randomUUID();

        const transactionsData: Prisma.TransactionUncheckedCreateInput[] = [];

        for (let i = 1; i <= totalInstallments; i++) {
            const dueDate = this.calculateDueDate(purchaseDate, creditCard.closingDay, creditCard.dueDay, i);

            transactionsData.push({
                userId,
                name: `${dto.name} (${i}/${totalInstallments})`,
                date: dueDate,
                purchaseDate,
                amount: new Prisma.Decimal(installmentAmount),
                category: dto.category,
                type: dto.type,
                paymentMethod: dto.paymentMethod,
                installment: i,
                totalInstallments,
                installmentGroupId,
                creditCardId: creditCard.id,
            });
        }

        return this.transactionsRepository.createMany(transactionsData);
    }

    private calculateDueDate(purchaseDate: Date, closingDay: number, dueDay: number, installmentNumber: number): Date {
        const purchaseDay = purchaseDate.getDate();
        const purchaseMonth = purchaseDate.getMonth();
        const purchaseYear = purchaseDate.getFullYear();

        // Se a compra foi feita antes do fechamento, a 1ª parcela cai na fatura atual
        // Se foi feita depois do fechamento, a 1ª parcela cai na próxima fatura
        const monthOffset = purchaseDay <= closingDay ? installmentNumber - 1 : installmentNumber;

        const dueDate = new Date(purchaseYear, purchaseMonth + monthOffset, dueDay);
        return dueDate;
    }

    async findAll(userId: number): Promise<Transaction[]> {
        return this.transactionsRepository.findAllByUserId(userId);
    }

    async findOne(id: number, userId: number): Promise<Transaction> {
        const transaction = await this.transactionsRepository.findById(id);

        if (!transaction) {
            throw new NotFoundException('Transaction not found');
        }

        if (transaction.userId !== userId) {
            throw new ForbiddenException('Access denied');
        }

        return transaction;
    }

    async update(id: number, userId: number, dto: UpdateTransactionDto): Promise<Transaction> {
        await this.findOne(id, userId);

        const data: Prisma.TransactionUncheckedUpdateInput = {};

        if (dto.name !== undefined) data.name = dto.name;
        if (dto.date !== undefined) data.date = new Date(dto.date);
        if (dto.amount !== undefined) data.amount = new Prisma.Decimal(dto.amount);
        if (dto.category !== undefined) data.category = dto.category;
        if (dto.type !== undefined) data.type = dto.type;
        if (dto.paymentMethod !== undefined) data.paymentMethod = dto.paymentMethod;

        return this.transactionsRepository.update(id, data);
    }

    async remove(id: number, userId: number): Promise<Transaction> {
        await this.findOne(id, userId);
        return this.transactionsRepository.delete(id);
    }

    async removeInstallmentGroup(installmentGroupId: string, userId: number): Promise<number> {
        // Validate that at least one transaction of this group belongs to the user
        const transactions = await this.transactionsRepository.findAllByUserId(userId);
        const groupTransaction = transactions.find((t) => t.installmentGroupId === installmentGroupId);

        if (!groupTransaction) {
            throw new NotFoundException('Installment group not found');
        }

        return this.transactionsRepository.deleteByInstallmentGroupId(installmentGroupId);
    }
}
