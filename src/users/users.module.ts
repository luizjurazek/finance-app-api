import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUsersRepository } from './interfaces/users-repository.interface';
import { PrismaUsersRepository } from './repositories/prisma-users.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    UsersService,
    {
      provide: IUsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
