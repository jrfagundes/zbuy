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
import { DetectSupermarketDto, UpdateSupermarketDto, UpsertSupermarketDto } from "./dto";
import { SupermarketsService } from "./supermarkets.service";

@Controller("supermarkets")
@UseGuards(SessionGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class SupermarketsController {
  constructor(private readonly supermarkets: SupermarketsService) {}

  @Get()
  list(
    @CurrentUser() user: AuthUser,
    @Query("query") query?: string,
    @Query("lat") lat?: string,
    @Query("lng") lng?: string,
    @Query("radiusMeters") radiusMeters?: string
  ) {
    return this.supermarkets.list(user.id, query, lat, lng, parseOptionalInteger(radiusMeters));
  }

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() body: UpsertSupermarketDto) {
    return this.supermarkets.create(user.id, body);
  }

  @Get(":id")
  get(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.supermarkets.get(user.id, id);
  }

  @Patch(":id")
  update(@CurrentUser() user: AuthUser, @Param("id") id: string, @Body() body: UpdateSupermarketDto) {
    return this.supermarkets.update(user.id, id, body);
  }

  @Post(":id/archive")
  @HttpCode(200)
  archive(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.supermarkets.archive(user.id, id);
  }

  @Post("detect")
  @HttpCode(200)
  detect(@CurrentUser() user: AuthUser, @Body() body: DetectSupermarketDto) {
    return this.supermarkets.detect(user.id, body);
  }
}

function parseOptionalInteger(value: string | undefined) {
  return value === undefined ? undefined : Number.parseInt(value, 10);
}
