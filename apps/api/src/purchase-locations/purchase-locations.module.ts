import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PurchaseLocationsController } from "./purchase-locations.controller";
import { PurchaseLocationsService } from "./purchase-locations.service";

@Module({
  imports: [AuthModule],
  controllers: [PurchaseLocationsController],
  providers: [PurchaseLocationsService],
  exports: [PurchaseLocationsService]
})
export class PurchaseLocationsModule {}
