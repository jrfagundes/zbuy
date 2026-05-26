import { Body, Controller, Get, HttpCode, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { type AuthUser } from "../auth/auth-response";
import { CurrentUser } from "../auth/current-user.decorator";
import { SessionGuard } from "../auth/session.guard";
import { StartJourneyStopDto, StartShoppingJourneyDto, UpdateShoppingJourneyStopItemDto } from "./dto";
import { ShoppingJourneysService } from "./shopping-journeys.service";

@Controller("shopping-journeys")
@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class ShoppingJourneysController {
  constructor(private readonly journeys: ShoppingJourneysService) {}

  @Post()
  start(@CurrentUser() user: AuthUser, @Body() body: StartShoppingJourneyDto) {
    return this.journeys.start(user.id, body);
  }

  @Get("active")
  getActive(@CurrentUser() user: AuthUser) {
    return this.journeys.getActive(user.id);
  }

  @Get(":id")
  get(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.journeys.get(user.id, id);
  }

  @Post(":id/complete")
  @HttpCode(200)
  complete(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.journeys.complete(user.id, id);
  }

  @Post(":id/cancel")
  @HttpCode(200)
  cancel(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.journeys.cancel(user.id, id);
  }

  @Post(":id/stops/:stopId/finish")
  @HttpCode(200)
  finishStop(@CurrentUser() user: AuthUser, @Param("id") id: string, @Param("stopId") stopId: string) {
    return this.journeys.finishStop(user.id, id, stopId);
  }

  @Post(":id/stops/:stopId/continue-outside-radius")
  @HttpCode(200)
  continueOutsideRadius(@CurrentUser() user: AuthUser, @Param("id") id: string, @Param("stopId") stopId: string) {
    return this.journeys.continueOutsideRadius(user.id, id, stopId);
  }

  @Post(":id/stops/:stopId/switch-supermarket")
  @HttpCode(200)
  switchSupermarket(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Param("stopId") stopId: string,
    @Body() body: StartJourneyStopDto
  ) {
    return this.journeys.switchSupermarket(user.id, id, stopId, body);
  }

  @Patch(":id/stops/:stopId/items/:itemId")
  updateStopItem(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Param("stopId") stopId: string,
    @Param("itemId") itemId: string,
    @Body() body: UpdateShoppingJourneyStopItemDto
  ) {
    return this.journeys.updateStopItem(user.id, id, stopId, itemId, body);
  }
}
