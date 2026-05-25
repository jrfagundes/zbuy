import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { toUnitDto } from "./unit-response";

@Injectable()
export class UnitsService {
  constructor(private readonly prisma: PrismaService) {}

  async listActive() {
    const units = await this.prisma.unit.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }]
    });
    return { units: units.map(toUnitDto) };
  }
}
