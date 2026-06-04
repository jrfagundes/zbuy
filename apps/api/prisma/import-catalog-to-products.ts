/**
 * import-catalog-to-products.ts
 *
 * Copia os produtos do catálogo global (ProductCatalog) para a tabela Product
 * de cada usuário, marcados com origin="catalog".
 *
 * - Idempotente: re-execuções pulam produtos já importados (dedupe por barcode).
 * - Não toca nos produtos criados pelo usuário (origin="user").
 *
 * Uso:
 *   pnpm --filter @zbuy/api prisma:import-catalog
 *
 * Variáveis de ambiente (opcionais):
 *   IMPORT_USER_ID  — importa só para um usuário específico (padrão: todos)
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CHUNK = 500;
const TARGET_USER = process.env.IMPORT_USER_ID;

async function main() {
  console.log("=== ZBuy — Importar catálogo → produtos do usuário ===\n");

  // Unidade padrão para produtos importados (count / "unit")
  const defaultUnit = await prisma.unit.findFirst({
    where: { abbreviation: "unit", active: true }
  });
  if (!defaultUnit) {
    throw new Error('Unidade padrão "unit" não encontrada. Rode prisma:seed-units primeiro.');
  }

  const catalog = await prisma.productCatalog.findMany({
    select: { barcode: true, name: true, brand: true, categoryLabel: true }
  });
  console.log(`Catálogo global: ${catalog.length.toLocaleString("pt-BR")} produtos`);

  const users = await prisma.user.findMany({
    where: TARGET_USER ? { id: TARGET_USER } : {},
    select: { id: true, email: true }
  });
  console.log(`Usuários alvo: ${users.length}\n`);

  let grandTotal = 0;

  for (const user of users) {
    // Barcodes já existentes na lista do usuário (evita duplicar)
    const existing = await prisma.product.findMany({
      where: { ownerUserId: user.id, barcode: { not: null } },
      select: { barcode: true }
    });
    const existingBarcodes = new Set(existing.map((p) => p.barcode));

    const toInsert = catalog
      .filter((c) => !existingBarcodes.has(c.barcode))
      .map((c) => ({
        ownerUserId: user.id,
        name: c.name,
        categoryLabel: c.categoryLabel,
        brand: c.brand,
        barcode: c.barcode,
        origin: "catalog",
        defaultUnitId: defaultUnit.id
      }));

    let userInserted = 0;
    for (let i = 0; i < toInsert.length; i += CHUNK) {
      const chunk = toInsert.slice(i, i + CHUNK);
      const result = await prisma.product.createMany({ data: chunk });
      userInserted += result.count;
      process.stdout.write(
        `\r  ${user.email}: ${userInserted.toLocaleString("pt-BR")} importados`
      );
    }
    process.stdout.write(
      `\r  ${user.email}: ${userInserted.toLocaleString("pt-BR")} importados (${(catalog.length - toInsert.length).toLocaleString("pt-BR")} já existiam)\n`
    );
    grandTotal += userInserted;
  }

  console.log(`\n=== Concluído: ${grandTotal.toLocaleString("pt-BR")} produtos importados ===`);

  const totals = await prisma.product.groupBy({
    by: ["origin"],
    _count: true
  });
  console.log("Distribuição da tabela Product:");
  for (const t of totals) {
    console.log(`  origin="${t.origin}": ${t._count.toLocaleString("pt-BR")}`);
  }
}

main()
  .finally(() => prisma.$disconnect())
  .catch((err) => {
    console.error("\nErro durante a importação:", err);
    process.exitCode = 1;
  });
