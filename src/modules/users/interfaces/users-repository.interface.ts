import { Prisma, User } from '@prisma/client';

export abstract class IUsersRepository {
    abstract create(data: Prisma.UserCreateInput): Promise<User>;
    abstract findByEmail(email: string): Promise<User | null>;
    abstract findById(id: number): Promise<User | null>;
}
