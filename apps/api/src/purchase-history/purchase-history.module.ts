import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { PurchaseHistoryController } from "./purchase-history.controller";
import { PurchaseHistoryService } from "./purchase-history.service";

@Module({
  imports: [AuthModule],
  controllers: [PurchaseHistoryController],
  providers: [PurchaseHistoryService]
})
export class PurchaseHistoryModule {}
