import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TransactionsService } from '../services/transactions.service';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { UpdateTransactionDto } from '../dtos/update-transaction.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user/user.decorator';
import { IUser } from 'src/common/decorators/user/user.interface';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
    constructor(private transactionsService: TransactionsService) {}

    @Post()
    create(@User() user: IUser, @Body() dto: CreateTransactionDto) {
        return this.transactionsService.create(user.userId, dto);
    }

    @Get()
    findAll(@User() user: IUser) {
        return this.transactionsService.findAll(user.userId);
    }

    @Get(':id')
    findOne(@User() user: IUser, @Param('id', ParseIntPipe) id: number) {
        return this.transactionsService.findOne(id, user.userId);
    }

    @Patch(':id')
    update(@User() user: IUser, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTransactionDto) {
        return this.transactionsService.update(id, user.userId, dto);
    }

    @Delete(':id')
    remove(@User() user: IUser, @Param('id', ParseIntPipe) id: number) {
        return this.transactionsService.remove(id, user.userId);
    }

    @Delete('installments/:groupId')
    removeInstallmentGroup(@User() user: IUser, @Param('groupId') groupId: string) {
        return this.transactionsService.removeInstallmentGroup(groupId, user.userId);
    }
}
