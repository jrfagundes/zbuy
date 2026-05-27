import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { SupermarketLayoutsModule } from "../supermarket-layouts/supermarket-layouts.module";
import { SupermarketsModule } from "../supermarkets/supermarkets.module";
import { ShoppingJourneysController } from "./shopping-journeys.controller";
import { ShoppingJourneysService } from "./shopping-journeys.service";

@Module({
  imports: [AuthModule, SupermarketsModule, SupermarketLayoutsModule],
  controllers: [ShoppingJourneysController],
  providers: [ShoppingJourneysService],
  exports: [ShoppingJourneysService]
})
export class ShoppingJourneysModule {}
