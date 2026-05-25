import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PurchaseLocationsModule } from "../purchase-locations/purchase-locations.module";
import { ShoppingSessionsController } from "./shopping-sessions.controller";
import { ShoppingSessionsService } from "./shopping-sessions.service";

@Module({
  imports: [AuthModule, PurchaseLocationsModule],
  controllers: [ShoppingSessionsController],
  providers: [ShoppingSessionsService],
  exports: [ShoppingSessionsService]
})
export class ShoppingSessionsModule {}
