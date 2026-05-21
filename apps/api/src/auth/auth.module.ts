import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PasswordService } from "./password.service";
import { SessionGuard } from "./session.guard";
import { TokenService } from "./token.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, PasswordService, SessionGuard, TokenService],
  exports: [AuthService, SessionGuard]
})
export class AuthModule {}
