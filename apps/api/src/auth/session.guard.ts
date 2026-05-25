import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";
import { AuthService } from "./auth.service";
import type { AuthUser } from "./auth-response";
import { getSessionCookieName } from "./session-cookie";

type RequestWithCookies = Request & {
  cookies?: Record<string, string | undefined>;
  user?: AuthUser;
};

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<RequestWithCookies>();
    const token = request.cookies?.[getSessionCookieName()];
    if (!token) {
      throw new UnauthorizedException("Authentication required");
    }

    const user = await this.auth.findUserBySession(token);
    if (!user) {
      throw new UnauthorizedException("Authentication required");
    }

    request.user = user;
    return true;
  }
}
