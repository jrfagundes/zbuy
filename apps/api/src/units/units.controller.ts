import { Controller, Get, UseGuards } from "@nestjs/common";
import { SessionGuard } from "../auth/session.guard";
import { UnitsService } from "./units.service";

@Controller("units")
@UseGuards(SessionGuard)
export class UnitsController {
  constructor(private readonly units: UnitsService) {}

  @Get()
  list() {
    return this.units.listActive();
  }
}
