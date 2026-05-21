import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Controller("health")
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("live")
  live() {
    return { status: "ok" };
  }

  @Get("ready")
  async ready() {
    try {
      await this.prisma.isReady();
      return { status: "ok", checks: { api: "ok", postgres: "ok" } };
    } catch {
      throw new ServiceUnavailableException({
        status: "error",
        checks: { api: "ok", postgres: "error" }
      });
    }
  }
}
