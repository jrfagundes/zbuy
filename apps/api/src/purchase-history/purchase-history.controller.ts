import { Controller, Get, Param, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { type AuthUser } from "../auth/auth-response";
import { CurrentUser } from "../auth/current-user.decorator";
import { SessionGuard } from "../auth/session.guard";
import { PurchaseHistoryQueryDto } from "./dto";
import { PurchaseHistoryService } from "./purchase-history.service";

@Controller("purchase-history")
@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class PurchaseHistoryController {
  constructor(private readonly purchaseHistory: PurchaseHistoryService) {}

  @Get("sessions")
  listSessions(@CurrentUser() user: AuthUser, @Query() query: PurchaseHistoryQueryDto) {
    return this.purchaseHistory.listSessions(user.id, query);
  }

  @Get("sessions/:id")
  getSession(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.purchaseHistory.getSession(user.id, id);
  }

  @Get("items")
  listItems(@CurrentUser() user: AuthUser, @Query() query: PurchaseHistoryQueryDto) {
    return this.purchaseHistory.listItems(user.id, query);
  }
}
