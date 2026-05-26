import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { SupermarketsModule } from "../supermarkets/supermarkets.module";
import { SupermarketLayoutsController } from "./supermarket-layouts.controller";
import { SupermarketLayoutsService } from "./supermarket-layouts.service";

@Module({
  imports: [AuthModule, SupermarketsModule],
  controllers: [SupermarketLayoutsController],
  providers: [SupermarketLayoutsService],
  exports: [SupermarketLayoutsService]
})
export class SupermarketLayoutsModule {}
