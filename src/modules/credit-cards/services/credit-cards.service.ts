import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ICreditCardsRepository } from '../interfaces/credit-cards-repository.interface';
import { CreateCreditCardDto } from '../dtos/create-credit-card.dto';
import { UpdateCreditCardDto } from '../dtos/update-credit-card.dto';
import { CreditCard } from '@prisma/client';

@Injectable()
export class CreditCardsService {
    constructor(private creditCardsRepository: ICreditCardsRepository) {}

    async create(userId: number, dto: CreateCreditCardDto): Promise<CreditCard> {
        return this.creditCardsRepository.create({
            ...dto,
            userId,
        });
    }

    async findAll(userId: number): Promise<CreditCard[]> {
        return this.creditCardsRepository.findAllByUserId(userId);
    }

    async findOne(id: number, userId: number): Promise<CreditCard> {
        const creditCard = await this.creditCardsRepository.findById(id);

        if (!creditCard) {
            throw new NotFoundException('Credit card not found');
        }

        if (creditCard.userId !== userId) {
            throw new ForbiddenException('Access denied');
        }

        return creditCard;
    }

    async update(id: number, userId: number, dto: UpdateCreditCardDto): Promise<CreditCard> {
        await this.findOne(id, userId);
        return this.creditCardsRepository.update(id, dto);
    }

    async remove(id: number, userId: number): Promise<CreditCard> {
        await this.findOne(id, userId);
        return this.creditCardsRepository.delete(id);
    }
}
