import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { OAuthService } from "./oauth.service";
import { OAuthTestModeGuard } from "./oauth-test-mode.guard";
import { PasswordService } from "./password.service";
import { SessionGuard } from "./session.guard";
import { TokenService } from "./token.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, OAuthService, OAuthTestModeGuard, PasswordService, SessionGuard, TokenService],
  exports: [AuthService, SessionGuard]
})
export class AuthModule {}
