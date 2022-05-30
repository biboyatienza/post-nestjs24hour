import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayloadType } from "src/auth/types/jwt-payload.type";

export const GetCurrentUserDecorator = createParamDecorator(
  (data: keyof JwtPayloadType | undefined, executionContext: ExecutionContext) => {
    const request = executionContext.switchToHttp().getRequest();
    if(!data) return request.user;
    return request.user[data];
  }
)