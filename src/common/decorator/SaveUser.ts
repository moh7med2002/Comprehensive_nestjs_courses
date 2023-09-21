import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const SaveUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const payload = request.user;
    return payload;
  },
);
