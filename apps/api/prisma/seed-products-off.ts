/**
 * seed-products-off.ts
 *
 * Popula a tabela ProductCatalog com produtos brasileiros do Open Food Facts.
 * Fonte: https://world.openfoodfacts.org (licença ODbL)
 *
 * Uso:
 *   pnpm --filter @zbuy/api prisma:seed-catalog
 *
 * Variáveis de ambiente (opcionais):
 *   OFF_PAGE_SIZE   — itens por página (padrão: 1000, máx ~1000)
 *   OFF_MAX_PAGES   — número máximo de páginas a processar (padrão: 50 → ~50k produtos)
 *   OFF_DRY_RUN     — se "true", apenas mostra o que seria importado sem gravar
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PAGE_SIZE = parseInt(process.env.OFF_PAGE_SIZE ?? "1000", 10);
const MAX_PAGES = parseInt(process.env.OFF_MAX_PAGES ?? "50", 10);
const START_PAGE = parseInt(process.env.OFF_START_PAGE ?? "1", 10);
const DRY_RUN = process.env.OFF_DRY_RUN === "true";

// ─── Category mapping ─────────────────────────────────────────────────────────
// Traduz as tags hierárquicas do Open Food Facts para labels legíveis em pt-BR.

const CATEGORY_MAP: Record<string, string> = {
  beverages: "Bebidas",
  "non-alcoholic-beverages": "Bebidas não alcoólicas",
  "alcoholic-beverages": "Bebidas alcoólicas",
  waters: "Águas",
  juices: "Sucos",
  "soft-drinks": "Refrigerantes",
  "energy-drinks": "Bebidas energéticas",
  coffees: "Cafés",
  teas: "Chás",
  milks: "Leites",
  "plant-based-milks": "Bebidas vegetais",
  yogurts: "Iogurtes",
  cheeses: "Queijos",
  "dairy-desserts": "Sobremesas lácteas",
  "ice-creams": "Sorvetes",
  butters: "Manteigas",
  "spreads": "Pastas e cremes",
  breads: "Pães",
  "breakfast-cereals": "Cereais matinais",
  biscuits: "Biscoitos",
  pastas: "Massas",
  rice: "Arroz",
  flours: "Farinhas",
  "cooking-oils": "Óleos",
  "condiments": "Condimentos",
  sauces: "Molhos",
  "canned-goods": "Conservas",
  "frozen-foods": "Congelados",
  meats: "Carnes",
  "processed-meats": "Frios e embutidos",
  "fish-and-seafood": "Pescados",
  "fruits-and-vegetables": "Frutas e verduras",
  fruits: "Frutas",
  vegetables: "Legumes e verduras",
  legumes: "Leguminosas",
  nuts: "Castanhas e nozes",
  snacks: "Salgadinhos",
  "sweet-snacks": "Doces e guloseimas",
  chocolates: "Chocolates",
  candies: "Balas e doces",
  "baby-foods": "Alimentos infantis",
  "pet-foods": "Alimentos para pets",
  "cleaning-products": "Limpeza",
  "hygiene-products": "Higiene pessoal",
  supplements: "Suplementos",
  "plant-based-foods": "Alimentos veganos"
};

function parseCategoryLabel(categoriesTags: string | string[] | undefined): string {
  if (!categoriesTags) return "Geral";

  // API returns either a comma-separated string or an array
  const tags = Array.isArray(categoriesTags)
    ? categoriesTags.map((t) => t.trim())
    : categoriesTags.split(",").map((t) => t.trim());

  // Prefer pt: tags first (Portuguese)
  const ptTag = tags.find((t) => t.startsWith("pt:"));
  if (ptTag) {
    return capitalize(ptTag.replace("pt:", "").replace(/-/g, " "));
  }

  // Try en: tags mapped to Portuguese
  for (const tag of tags) {
    const key = tag.replace(/^en:/, "").toLowerCase();
    if (CATEGORY_MAP[key]) return CATEGORY_MAP[key];
  }

  // Fallback: clean up the first en: tag
  const enTag = tags.find((t) => t.startsWith("en:"));
  if (enTag) {
    return capitalize(enTag.replace("en:", "").replace(/-/g, " "));
  }

  return "Geral";
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function cleanName(raw: string): string {
  return raw.replace(/\s+/g, " ").trim().slice(0, 120);
}

function cleanBrand(raw: string | undefined): string | null {
  if (!raw) return null;
  const cleaned = raw.split(",")[0].trim().slice(0, 80);
  return cleaned || null;
}

// ─── Open Food Facts API ──────────────────────────────────────────────────────

interface OFFProduct {
  code: string;
  product_name?: string;
  product_name_pt?: string;
  brands?: string;
  categories_tags?: string | string[];
  countries_tags?: string | string[];
}

interface OFFSearchResponse {
  count: number;
  page: number;
  page_size: number;
  products: OFFProduct[];
}

async function fetchPage(page: number, attempt = 1): Promise<OFFSearchResponse> {
  const url = new URL("https://world.openfoodfacts.org/cgi/search.pl");
  url.searchParams.set("action", "process");
  url.searchParams.set("tagtype_0", "countries");
  url.searchParams.set("tag_contains_0", "contains");
  url.searchParams.set("tag_0", "Brazil");
  url.searchParams.set("fields", "code,product_name,product_name_pt,brands,categories_tags,countries_tags");
  url.searchParams.set("json", "1");
  url.searchParams.set("page_size", String(PAGE_SIZE));
  url.searchParams.set("page", String(page));

  const res = await fetch(url.toString(), {
    headers: { "User-Agent": "ZBuy Seed Script/1.0 (contato@zbuy.app)" },
    signal: AbortSignal.timeout(30_000)
  });

  // Retry on 429 / 503 with exponential backoff (max 5 attempts)
  if ((res.status === 429 || res.status === 503) && attempt <= 5) {
    const backoff = Math.min(2 ** attempt * 2000, 60_000);
    process.stdout.write(`\n  ⚠ HTTP ${res.status} na página ${page} — aguardando ${backoff / 1000}s (tentativa ${attempt}/5)...`);
    await sleep(backoff);
    return fetchPage(page, attempt + 1);
  }

  if (!res.ok) throw new Error(`OFF API error: ${res.status} ${res.statusText}`);
  return res.json() as Promise<OFFSearchResponse>;
}

// ─── Seed logic ───────────────────────────────────────────────────────────────

interface ValidProduct {
  barcode: string;
  name: string;
  brand: string | null;
  categoryLabel: string;
  source: string;
}

function toValidProduct(p: OFFProduct): ValidProduct | null {
  if (!p.code || p.code.length > 48) return null;
  const name = cleanName(p.product_name_pt || p.product_name || "");
  if (!name || name.length < 2) return null;

  return {
    barcode: p.code,
    name,
    brand: cleanBrand(p.brands),
    categoryLabel: parseCategoryLabel(p.categories_tags),
    source: "open_food_facts"
  };
}

async function upsertBatch(items: ValidProduct[]): Promise<number> {
  if (DRY_RUN) {
    console.log(`  [dry-run] Would upsert ${items.length} products`);
    return items.length;
  }

  // Prisma doesn't support createMany with skipDuplicates across all dbs reliably
  // for upsert; use raw SQL for performance on large batches.
  const now = new Date().toISOString();
  let inserted = 0;

  // Batch in chunks of 200 to avoid parameter limits
  const CHUNK = 200;
  for (let i = 0; i < items.length; i += CHUNK) {
    const chunk = items.slice(i, i + CHUNK);

    await prisma.$transaction(
      chunk.map((p) =>
        prisma.productCatalog.upsert({
          where: { barcode: p.barcode },
          update: {
            name: p.name,
            brand: p.brand,
            categoryLabel: p.categoryLabel,
            updatedAt: new Date(now)
          },
          create: {
            barcode: p.barcode,
            name: p.name,
            brand: p.brand,
            categoryLabel: p.categoryLabel,
            source: p.source,
            updatedAt: new Date(now)
          }
        })
      )
    );
    inserted += chunk.length;
  }

  return inserted;
}

async function main() {
  console.log("=== ZBuy — Seed de produtos (Open Food Facts) ===");
  if (DRY_RUN) console.log("⚠  Modo dry-run ativo — nada será gravado no banco\n");

  let totalProcessed = 0;
  let totalInserted = 0;
  let totalSkipped = 0;

  // First fetch to discover total count
  const firstFetchPage = START_PAGE;
  console.log(`Buscando página ${firstFetchPage}...`);
  const firstPage = await fetchPage(firstFetchPage);
  const totalProducts = firstPage.count;
  const totalPages = Math.min(START_PAGE + MAX_PAGES - 1, Math.ceil(totalProducts / PAGE_SIZE));

  console.log(`Total de produtos brasileiros no OFF: ~${totalProducts.toLocaleString("pt-BR")}`);
  console.log(`Processando páginas ${START_PAGE}–${totalPages} × ${PAGE_SIZE} itens = até ${((totalPages - START_PAGE + 1) * PAGE_SIZE).toLocaleString("pt-BR")} produtos`);
  if (START_PAGE > 1) console.log(`  (retomando a partir da página ${START_PAGE})`);
  console.log();

  async function processPage(pageData: OFFSearchResponse, pageNum: number) {
    const valid: ValidProduct[] = [];
    for (const p of pageData.products) {
      const v = toValidProduct(p);
      if (v) valid.push(v);
      else totalSkipped++;
    }
    totalProcessed += pageData.products.length;

    const inserted = await upsertBatch(valid);
    totalInserted += inserted;

    const pct = Math.round(((pageNum - START_PAGE + 1) / (totalPages - START_PAGE + 1)) * 100);
    process.stdout.write(
      `\r  Página ${pageNum}/${totalPages} (${pct}%) — ${totalInserted.toLocaleString("pt-BR")} inseridos, ${totalSkipped} ignorados`
    );
  }

  await processPage(firstPage, firstFetchPage);

  for (let page = firstFetchPage + 1; page <= totalPages; page++) {
    // Polite delay to respect OFF servers (1s between pages)
    await sleep(1000);
    const data = await fetchPage(page);
    await processPage(data, page);
    if (data.products.length === 0) break;
  }

  console.log("\n\n=== Concluído ===");
  console.log(`  Produtos processados : ${totalProcessed.toLocaleString("pt-BR")}`);
  console.log(`  Inseridos/atualizados: ${totalInserted.toLocaleString("pt-BR")}`);
  console.log(`  Ignorados (inválidos): ${totalSkipped.toLocaleString("pt-BR")}`);

  const finalCount = await prisma.productCatalog.count();
  console.log(`  Total no catálogo    : ${finalCount.toLocaleString("pt-BR")} produtos`);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .finally(() => prisma.$disconnect())
  .catch((err) => {
    console.error("\nErro durante o seed:", err);
    process.exitCode = 1;
  });
