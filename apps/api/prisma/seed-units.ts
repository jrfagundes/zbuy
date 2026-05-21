import { PrismaClient, UnitType } from "@prisma/client";

const prisma = new PrismaClient();

const units: Array<{
  name: string;
  abbreviation: string;
  type: UnitType;
  allowsDecimals: boolean;
  sortOrder: number;
}> = [
  { name: "Kilogram", abbreviation: "kg", type: "weight", allowsDecimals: true, sortOrder: 10 },
  { name: "Gram", abbreviation: "g", type: "weight", allowsDecimals: true, sortOrder: 20 },
  { name: "Liter", abbreviation: "L", type: "volume", allowsDecimals: true, sortOrder: 30 },
  { name: "Milliliter", abbreviation: "ml", type: "volume", allowsDecimals: true, sortOrder: 40 },
  { name: "Unit", abbreviation: "unit", type: "count", allowsDecimals: false, sortOrder: 50 },
  { name: "Dozen", abbreviation: "dozen", type: "count", allowsDecimals: false, sortOrder: 60 },
  { name: "Box", abbreviation: "box", type: "package", allowsDecimals: false, sortOrder: 70 },
  { name: "Package", abbreviation: "package", type: "package", allowsDecimals: false, sortOrder: 80 },
  { name: "Bundle", abbreviation: "bundle", type: "package", allowsDecimals: false, sortOrder: 90 },
  { name: "Tray", abbreviation: "tray", type: "package", allowsDecimals: false, sortOrder: 100 },
  { name: "Can", abbreviation: "can", type: "package", allowsDecimals: false, sortOrder: 110 },
  { name: "Bottle", abbreviation: "bottle", type: "package", allowsDecimals: false, sortOrder: 120 }
];

async function main() {
  for (const unit of units) {
    await prisma.unit.upsert({
      where: { abbreviation_type: { abbreviation: unit.abbreviation, type: unit.type } },
      update: unit,
      create: unit
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
