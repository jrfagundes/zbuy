import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { type AuthUser } from "../auth/auth-response";
import { CurrentUser } from "../auth/current-user.decorator";
import { SessionGuard } from "../auth/session.guard";
import { UpsertPurchaseLocationDto } from "./dto";
import { PurchaseLocationsService } from "./purchase-locations.service";

@Controller("purchase-locations")
@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class PurchaseLocationsController {
  constructor(private readonly purchaseLocations: PurchaseLocationsService) {}

  @Get()
  list(@CurrentUser() user: AuthUser, @Query("type") type?: string, @Query("query") query?: string) {
    return this.purchaseLocations.list(user.id, type, query);
  }

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() body: UpsertPurchaseLocationDto) {
    return this.purchaseLocations.create(user.id, body);
  }

  @Get(":id")
  get(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.purchaseLocations.get(user.id, id);
  }

  @Patch(":id")
  update(@CurrentUser() user: AuthUser, @Param("id") id: string, @Body() body: UpsertPurchaseLocationDto) {
    return this.purchaseLocations.update(user.id, id, body);
  }

  @Post(":id/archive")
  @HttpCode(200)
  archive(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.purchaseLocations.archive(user.id, id);
  }
}
