import { Module } from '@nestjs/common';
import { CreditCardsService } from './services/credit-cards.service';
import { CreditCardsController } from './controllers/credit-cards.controller';
import { ICreditCardsRepository } from './interfaces/credit-cards-repository.interface';
import { PrismaCreditCardsRepository } from './repositories/prisma-credit-cards.repository';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
    providers: [
        PrismaService,
        CreditCardsService,
        {
            provide: ICreditCardsRepository,
            useClass: PrismaCreditCardsRepository,
        },
    ],
    controllers: [CreditCardsController],
    exports: [CreditCardsService],
})
export class CreditCardsModule {}
