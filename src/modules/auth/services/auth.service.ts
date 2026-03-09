import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import * as bcrypt from 'bcrypt';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<Omit<User, 'password'> | null> {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: Omit<User, 'password'>): Promise<{
        access_token: string;
        user: { id: number; email: string; name: string };
    }> {
        const payload = { email: user.email, sub: user.id, name: user.name };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }

    async register(userData: Prisma.UserCreateInput): Promise<Omit<User, 'password'>> {
        const existingUser = await this.usersService.findByEmail(userData.email);
        if (existingUser) {
            throw new ConflictException('Email already in use');
        }
        const user = await this.usersService.create(userData);
        const { password, ...result } = user;
        return result;
    }
}
