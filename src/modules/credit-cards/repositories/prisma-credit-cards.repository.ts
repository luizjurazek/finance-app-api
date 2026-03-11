import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ICreditCardsRepository } from '../interfaces/credit-cards-repository.interface';
import { CreditCard, Prisma } from '@prisma/client';

@Injectable()
export class PrismaCreditCardsRepository implements ICreditCardsRepository {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.CreditCardUncheckedCreateInput): Promise<CreditCard> {
        return this.prisma.creditCard.create({ data });
    }

    async findAllByUserId(userId: number): Promise<CreditCard[]> {
        return this.prisma.creditCard.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: number): Promise<CreditCard | null> {
        return this.prisma.creditCard.findUnique({
            where: { id },
        });
    }

    async update(id: number, data: Prisma.CreditCardUncheckedUpdateInput): Promise<CreditCard> {
        return this.prisma.creditCard.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<CreditCard> {
        return this.prisma.creditCard.delete({
            where: { id },
        });
    }
}
