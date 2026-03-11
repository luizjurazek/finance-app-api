import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './controllers/transactions.controller';
import { ITransactionsRepository } from './interfaces/transactions-repository.interface';
import { PrismaTransactionsRepository } from './repositories/prisma-transactions.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { CreditCardsModule } from '../credit-cards/credit-cards.module';

@Module({
    imports: [CreditCardsModule],
    providers: [
        PrismaService,
        TransactionsService,
        {
            provide: ITransactionsRepository,
            useClass: PrismaTransactionsRepository,
        },
    ],
    controllers: [TransactionsController],
    exports: [TransactionsService],
})
export class TransactionsModule {}
