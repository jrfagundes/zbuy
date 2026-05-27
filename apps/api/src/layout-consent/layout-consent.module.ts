import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { SupermarketsModule } from "../supermarkets/supermarkets.module";
import { LayoutConsentController } from "./layout-consent.controller";
import { LayoutConsentService } from "./layout-consent.service";

@Module({
  imports: [AuthModule, SupermarketsModule],
  controllers: [LayoutConsentController],
  providers: [LayoutConsentService],
  exports: [LayoutConsentService]
})
export class LayoutConsentModule {}
