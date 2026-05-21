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
import { CurrentUser } from "../auth/current-user.decorator";
import { type AuthUser } from "../auth/auth-response";
import { SessionGuard } from "../auth/session.guard";
import { UpsertProductDto } from "./dto";
import { ProductsService } from "./products.service";

@Controller("products")
@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  list(@CurrentUser() user: AuthUser, @Query("query") query?: string, @Query("includeArchived") includeArchived?: string) {
    return this.products.list(user.id, query, includeArchived === "true");
  }

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() body: UpsertProductDto) {
    return this.products.create(user.id, body);
  }

  @Get(":id")
  get(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.products.get(user.id, id);
  }

  @Patch(":id")
  update(@CurrentUser() user: AuthUser, @Param("id") id: string, @Body() body: UpsertProductDto) {
    return this.products.update(user.id, id, body);
  }

  @Post(":id/archive")
  @HttpCode(200)
  archive(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.products.archive(user.id, id);
  }
}
