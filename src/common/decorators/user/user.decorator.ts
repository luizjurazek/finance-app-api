import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from './user.interface';

export const User = createParamDecorator((data: keyof IUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as IUser;

    return data ? user?.[data] : user;
});
