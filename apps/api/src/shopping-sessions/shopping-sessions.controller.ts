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
import { CreateContinuationListDto, StartShoppingSessionDto, UpdateShoppingSessionItemDto } from "./dto";
import { ShoppingSessionsService } from "./shopping-sessions.service";

@Controller("shopping-sessions")
@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class ShoppingSessionsController {
  constructor(private readonly shoppingSessions: ShoppingSessionsService) {}

  @Get()
  list(@CurrentUser() user: AuthUser, @Query("status") status?: string, @Query("limit") limit?: string) {
    return this.shoppingSessions.list(user.id, status, limit ? Number(limit) : undefined);
  }

  @Post()
  start(@CurrentUser() user: AuthUser, @Body() body: StartShoppingSessionDto) {
    return this.shoppingSessions.start(user.id, body);
  }

  @Get("active")
  getActive(@CurrentUser() user: AuthUser) {
    return this.shoppingSessions.getActive(user.id);
  }

  @Get(":id")
  get(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.shoppingSessions.get(user.id, id);
  }

  @Post(":id/cancel")
  @HttpCode(200)
  cancel(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.shoppingSessions.cancel(user.id, id);
  }

  @Post(":id/complete")
  @HttpCode(200)
  complete(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.shoppingSessions.complete(user.id, id);
  }

  @Patch(":id/items/:itemId")
  updateItem(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Param("itemId") itemId: string,
    @Body() body: UpdateShoppingSessionItemDto
  ) {
    return this.shoppingSessions.updateItem(user.id, id, itemId, body);
  }

  @Patch(":id/items/:itemId/status")
  updateItemStatus(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Param("itemId") itemId: string,
    @Body() body: UpdateShoppingSessionItemDto
  ) {
    return this.shoppingSessions.updateItem(user.id, id, itemId, { status: body.status });
  }

  @Post(":id/continuation-list")
  @HttpCode(200)
  createContinuationList(@CurrentUser() user: AuthUser, @Param("id") id: string, @Body() body: CreateContinuationListDto) {
    return this.shoppingSessions.createContinuationList(user.id, id, body);
  }
}
