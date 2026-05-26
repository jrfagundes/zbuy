import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { type AuthUser } from "../auth/auth-response";
import { CurrentUser } from "../auth/current-user.decorator";
import { SessionGuard } from "../auth/session.guard";
import {
  AcceptSharedLayoutSuggestionDto,
  ReorderCorridorsDto,
  UpsertCorridorDto,
  UpsertPrivateProductPlacementDto
} from "./dto";
import { SupermarketLayoutsService } from "./supermarket-layouts.service";

@Controller("supermarkets/:supermarketId/layout")
@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class SupermarketLayoutsController {
  constructor(private readonly layouts: SupermarketLayoutsService) {}

  @Get()
  getLayout(@CurrentUser() user: AuthUser, @Param("supermarketId") supermarketId: string) {
    return this.layouts.getLayout(user.id, supermarketId);
  }

  @Post("corridors")
  createCorridor(
    @CurrentUser() user: AuthUser,
    @Param("supermarketId") supermarketId: string,
    @Body() body: UpsertCorridorDto
  ) {
    return this.layouts.createCorridor(user.id, supermarketId, body);
  }

  @Post("corridors/reorder")
  @HttpCode(200)
  reorderCorridors(
    @CurrentUser() user: AuthUser,
    @Param("supermarketId") supermarketId: string,
    @Body() body: ReorderCorridorsDto
  ) {
    return this.layouts.reorderCorridors(user.id, supermarketId, body);
  }

  @Patch("corridors/:corridorId")
  updateCorridor(
    @CurrentUser() user: AuthUser,
    @Param("supermarketId") supermarketId: string,
    @Param("corridorId") corridorId: string,
    @Body() body: UpsertCorridorDto
  ) {
    return this.layouts.updateCorridor(user.id, supermarketId, corridorId, body);
  }

  @Delete("corridors/:corridorId")
  @HttpCode(204)
  deleteCorridor(
    @CurrentUser() user: AuthUser,
    @Param("supermarketId") supermarketId: string,
    @Param("corridorId") corridorId: string
  ) {
    return this.layouts.deleteCorridor(user.id, supermarketId, corridorId);
  }

  @Put("products/:productId/placement")
  setProductPlacement(
    @CurrentUser() user: AuthUser,
    @Param("supermarketId") supermarketId: string,
    @Param("productId") productId: string,
    @Body() body: UpsertPrivateProductPlacementDto
  ) {
    return this.layouts.setProductPlacement(user.id, supermarketId, productId, body);
  }

  @Delete("products/:productId/placement")
  @HttpCode(204)
  deleteProductPlacement(
    @CurrentUser() user: AuthUser,
    @Param("supermarketId") supermarketId: string,
    @Param("productId") productId: string
  ) {
    return this.layouts.deleteProductPlacement(user.id, supermarketId, productId);
  }

  @Get("suggestions")
  listSuggestions(@CurrentUser() user: AuthUser, @Param("supermarketId") supermarketId: string) {
    return this.layouts.listSuggestions(user.id, supermarketId);
  }

  @Post("suggestions/:suggestionId/accept")
  @HttpCode(200)
  acceptSuggestion(
    @CurrentUser() user: AuthUser,
    @Param("supermarketId") supermarketId: string,
    @Param("suggestionId") suggestionId: string,
    @Body() body: AcceptSharedLayoutSuggestionDto
  ) {
    return this.layouts.acceptSuggestion(user.id, supermarketId, suggestionId, body);
  }
}
