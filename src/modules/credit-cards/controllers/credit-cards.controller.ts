import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreditCardsService } from '../services/credit-cards.service';
import { CreateCreditCardDto } from '../dtos/create-credit-card.dto';
import { UpdateCreditCardDto } from '../dtos/update-credit-card.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user/user.decorator';
import { IUser } from 'src/common/decorators/user/user.interface';

@UseGuards(JwtAuthGuard)
@Controller('credit-cards')
export class CreditCardsController {
    constructor(private creditCardsService: CreditCardsService) {}

    @Post()
    create(@User() user: IUser, @Body() dto: CreateCreditCardDto) {
        return this.creditCardsService.create(user.userId, dto);
    }

    @Get()
    findAll(@User() user: IUser) {
        return this.creditCardsService.findAll(user.userId);
    }

    @Get(':id')
    findOne(@User() user: IUser, @Param('id', ParseIntPipe) id: number) {
        return this.creditCardsService.findOne(id, user.userId);
    }

    @Patch(':id')
    update(@User() user: IUser, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCreditCardDto) {
        return this.creditCardsService.update(id, user.userId, dto);
    }

    @Delete(':id')
    remove(@User() user: IUser, @Param('id', ParseIntPipe) id: number) {
        return this.creditCardsService.remove(id, user.userId);
    }
}
