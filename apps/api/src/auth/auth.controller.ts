import { Body, Controller, HttpCode, Post, Req, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { toAuthResponse } from "./auth-response";
import { LoginDto, SignUpDto } from "./dto";
import { clearSessionCookie, getSessionCookieName, setSessionCookie } from "./session-cookie";

type RequestWithCookies = Request & {
  cookies?: Record<string, string | undefined>;
};

@Controller("auth")
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("signup")
  async signUp(@Body() body: SignUpDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.signUp({
      ...body,
      requestId: req.requestId
    });
    setSessionCookie(res, result.sessionToken);
    return toAuthResponse(result.user);
  }

  @Post("login")
  async login(@Body() body: LoginDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const result = await this.auth.login({
      ...body,
      requestId: req.requestId
    });
    setSessionCookie(res, result.sessionToken);
    return toAuthResponse(result.user);
  }

  @Post("logout")
  @HttpCode(204)
  async logout(@Req() req: RequestWithCookies, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.[getSessionCookieName()];
    if (token) {
      await this.auth.logout(token, req.requestId);
    }
    clearSessionCookie(res);
  }
}
