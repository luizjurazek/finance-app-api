import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { IUsersRepository } from '../interfaces/users-repository.interface';
import { Prisma, User } from '@prisma/client';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
    constructor(private prisma: PrismaService) {}

    @UseGuards(JwtAuthGuard)
    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

    @UseGuards(JwtAuthGuard)
    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    @UseGuards(JwtAuthGuard)
    async findById(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
}
