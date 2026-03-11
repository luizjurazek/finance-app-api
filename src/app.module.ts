import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { CreditCardsModule } from './modules/credit-cards/credit-cards.module';

@Module({
    imports: [UsersModule, AuthModule, TransactionsModule, CreditCardsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
