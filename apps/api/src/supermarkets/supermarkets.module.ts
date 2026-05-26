import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { SupermarketsController } from "./supermarkets.controller";
import { SupermarketsService } from "./supermarkets.service";

@Module({
  imports: [AuthModule],
  controllers: [SupermarketsController],
  providers: [SupermarketsService],
  exports: [SupermarketsService]
})
export class SupermarketsModule {}
