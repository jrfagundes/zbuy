import type { Unit } from "@prisma/client";
import type { UnitDto } from "@zbuy/shared";

export function toUnitDto(unit: Unit): UnitDto {
  return {
    id: unit.id,
    name: unit.name,
    abbreviation: unit.abbreviation,
    type: unit.type,
    allowsDecimals: unit.allowsDecimals,
    sortOrder: unit.sortOrder
  };
}
