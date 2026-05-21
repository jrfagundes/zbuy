import { Controller, Get, UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/current-user.decorator";
import { SessionGuard } from "../auth/session.guard";
import { toAuthResponse, type AuthUser } from "../auth/auth-response";

@Controller("me")
export class MeController {
  @Get()
  @UseGuards(SessionGuard)
  me(@CurrentUser() user: AuthUser) {
    return toAuthResponse(user);
  }
}
