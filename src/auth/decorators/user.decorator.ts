import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface UserPayload {
  sub: number;
  username: string;
}

export const User = createParamDecorator(
  (_, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
