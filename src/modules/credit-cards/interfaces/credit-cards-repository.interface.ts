import { CreditCard, Prisma } from '@prisma/client';

export abstract class ICreditCardsRepository {
    abstract create(data: Prisma.CreditCardUncheckedCreateInput): Promise<CreditCard>;
    abstract findAllByUserId(userId: number): Promise<CreditCard[]>;
    abstract findById(id: number): Promise<CreditCard | null>;
    abstract update(id: number, data: Prisma.CreditCardUncheckedUpdateInput): Promise<CreditCard>;
    abstract delete(id: number): Promise<CreditCard>;
}
