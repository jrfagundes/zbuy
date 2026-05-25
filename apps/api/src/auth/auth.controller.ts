import { Body, Controller, HttpCode, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { toAuthResponse } from "./auth-response";
import { LoginDto, OAuthTestCallbackDto, PasswordResetConfirmDto, PasswordResetRequestDto, SignUpDto } from "./dto";
import { OAuthService } from "./oauth.service";
import { OAuthTestModeGuard } from "./oauth-test-mode.guard";
import { clearSessionCookie, getSessionCookieName, setSessionCookie } from "./session-cookie";

type RequestWithCookies = Request & {
  cookies?: Record<string, string | undefined>;
};

@Controller("auth")
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly oauth: OAuthService
  ) {}

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

  @Post("password-reset/request")
  async requestPasswordReset(@Body() body: PasswordResetRequestDto, @Req() req: Request) {
    return this.auth.requestPasswordReset(body.email, req.requestId);
  }

  @Post("password-reset/confirm")
  @HttpCode(200)
  async confirmPasswordReset(@Body() body: PasswordResetConfirmDto, @Req() req: Request) {
    return this.auth.confirmPasswordReset(body.token, body.password, req.requestId);
  }

  @Post("google/test-callback")
  @UseGuards(OAuthTestModeGuard)
  async googleTestCallback(
    @Body() body: OAuthTestCallbackDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.oauth.loginWithTestProfile({
      provider: "google",
      subject: body.subject,
      email: body.email,
      name: body.name,
      requestId: req.requestId
    });
    setSessionCookie(res, result.sessionToken);
    return toAuthResponse(result.user);
  }

  @Post("microsoft/test-callback")
  @UseGuards(OAuthTestModeGuard)
  async microsoftTestCallback(
    @Body() body: OAuthTestCallbackDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.oauth.loginWithTestProfile({
      provider: "microsoft",
      subject: body.subject,
      email: body.email,
      name: body.name,
      requestId: req.requestId
    });
    setSessionCookie(res, result.sessionToken);
    return toAuthResponse(result.user);
  }
}
