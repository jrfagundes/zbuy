import {
  Body,
  Controller,
  Delete,
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
import { ReorderShoppingListItemsDto, ShareListDto, UpsertShoppingListDto, UpsertShoppingListItemDto } from "./dto";
import { ShoppingListsService } from "./shopping-lists.service";

@Controller("shopping-lists")
@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class ShoppingListsController {
  constructor(private readonly shoppingLists: ShoppingListsService) {}

  @Get()
  list(@CurrentUser() user: AuthUser, @Query("includeArchived") includeArchived?: string) {
    return this.shoppingLists.list(user.id, includeArchived === "true");
  }

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() body: UpsertShoppingListDto) {
    return this.shoppingLists.create(user.id, body);
  }

  @Get(":id")
  get(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.shoppingLists.get(user.id, id);
  }

  @Patch(":id")
  update(@CurrentUser() user: AuthUser, @Param("id") id: string, @Body() body: UpsertShoppingListDto) {
    return this.shoppingLists.update(user.id, id, body);
  }

  @Delete(":id")
  @HttpCode(204)
  delete(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.shoppingLists.delete(user.id, id);
  }

  @Post(":id/archive")
  @HttpCode(200)
  archive(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.shoppingLists.archive(user.id, id);
  }

  @Post(":id/duplicate")
  duplicate(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.shoppingLists.duplicate(user.id, id);
  }

  @Post(":id/items")
  addItem(@CurrentUser() user: AuthUser, @Param("id") id: string, @Body() body: UpsertShoppingListItemDto) {
    return this.shoppingLists.addItem(user.id, id, body);
  }

  @Patch(":id/items/reorder")
  reorderItems(@CurrentUser() user: AuthUser, @Param("id") id: string, @Body() body: ReorderShoppingListItemsDto) {
    return this.shoppingLists.reorderItems(user.id, id, body);
  }

  @Patch(":id/items/:itemId")
  updateItem(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Param("itemId") itemId: string,
    @Body() body: UpsertShoppingListItemDto
  ) {
    return this.shoppingLists.updateItem(user.id, id, itemId, body);
  }

  @Delete(":id/items/:itemId")
  deleteItem(@CurrentUser() user: AuthUser, @Param("id") id: string, @Param("itemId") itemId: string) {
    return this.shoppingLists.deleteItem(user.id, id, itemId);
  }

  @Get(":id/shares")
  listShares(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.shoppingLists.listShares(user.id, id);
  }

  @Post(":id/shares")
  addShare(@CurrentUser() user: AuthUser, @Param("id") id: string, @Body() body: ShareListDto) {
    return this.shoppingLists.addShare(user.id, id, body.email);
  }

  @Delete(":id/shares/:userId")
  removeShare(@CurrentUser() user: AuthUser, @Param("id") id: string, @Param("userId") memberUserId: string) {
    return this.shoppingLists.removeShare(user.id, id, memberUserId);
  }
}
