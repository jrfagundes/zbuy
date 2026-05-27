import { Body, Controller, Get, Param, Patch, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { type AuthUser } from "../auth/auth-response";
import { CurrentUser } from "../auth/current-user.decorator";
import { SessionGuard } from "../auth/session.guard";
import { UpdateLayoutContributionConsentDto } from "./dto";
import { LayoutConsentService } from "./layout-consent.service";

@Controller()
@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class LayoutConsentController {
  constructor(private readonly layoutConsent: LayoutConsentService) {}

  @Get("layout-consent")
  getGlobal(@CurrentUser() user: AuthUser) {
    return this.layoutConsent.getGlobal(user.id);
  }

  @Patch("layout-consent")
  updateGlobal(@CurrentUser() user: AuthUser, @Body() body: UpdateLayoutContributionConsentDto) {
    if (body.globalSharedLayoutContributionEnabled === undefined) {
      return this.layoutConsent.getGlobal(user.id);
    }
    return this.layoutConsent.updateGlobal(user.id, body.globalSharedLayoutContributionEnabled);
  }

  @Get("supermarkets/:id/layout-consent")
  getForSupermarket(@CurrentUser() user: AuthUser, @Param("id") supermarketId: string) {
    return this.layoutConsent.getForSupermarket(user.id, supermarketId);
  }

  @Patch("supermarkets/:id/layout-consent")
  updateForSupermarket(
    @CurrentUser() user: AuthUser,
    @Param("id") supermarketId: string,
    @Body() body: UpdateLayoutContributionConsentDto
  ) {
    if (body.supermarketOverride === undefined) {
      return this.layoutConsent.getForSupermarket(user.id, supermarketId);
    }
    return this.layoutConsent.updateForSupermarket(user.id, supermarketId, body.supermarketOverride);
  }
}
