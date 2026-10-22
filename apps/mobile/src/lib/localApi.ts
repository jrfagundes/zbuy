import AsyncStorage from '@react-native-async-storage/async-storage';
import type {
  ProductDto,
  ShoppingListDetailDto,
  ShoppingListItemDto,
  ShoppingListSummaryDto,
  UnitDto,
  UpsertProductRequest,
  UpsertShoppingListItemRequest,
  UpsertShoppingListRequest,
} from '@zbuy/shared';

import { ApiError } from './api';

/**
 * Backend local: serve no próprio aparelho as rotas que Produtos e Listas
 * usam, persistindo em AsyncStorage. Mesmas formas de DTO do backend real,
 * então resources.ts e as telas não mudam. Rotas não suportadas aqui
 * (jornadas, histórico, compartilhamento) lançam ApiError 501.
 *
 * ponytail: único ponto de interceptação (apiRequest delega aqui quando
 * OFFLINE); só as rotas realmente chamadas pelas telas habilitadas existem.
 */

const PRODUCTS_KEY = 'zbuy.offline.products';
const LISTS_KEY = 'zbuy.offline.lists';
export const OFFLINE_USER_KEY = 'zbuy.offline.user';

const DEFAULT_USER = { id: 'local-user', name: 'Você', email: 'offline@zbuy.app' };

const UNITS: UnitDto[] = [
  { id: 'un', name: 'Unidade', abbreviation: 'un', type: 'count', allowsDecimals: false, sortOrder: 1 },
  { id: 'kg', name: 'Quilograma', abbreviation: 'kg', type: 'weight', allowsDecimals: true, sortOrder: 2 },
  { id: 'g', name: 'Grama', abbreviation: 'g', type: 'weight', allowsDecimals: true, sortOrder: 3 },
  { id: 'l', name: 'Litro', abbreviation: 'L', type: 'volume', allowsDecimals: true, sortOrder: 4 },
  { id: 'ml', name: 'Mililitro', abbreviation: 'ml', type: 'volume', allowsDecimals: true, sortOrder: 5 },
  { id: 'pct', name: 'Pacote', abbreviation: 'pct', type: 'package', allowsDecimals: false, sortOrder: 6 },
  { id: 'cx', name: 'Caixa', abbreviation: 'cx', type: 'package', allowsDecimals: false, sortOrder: 7 },
  { id: 'dz', name: 'Dúzia', abbreviation: 'dz', type: 'count', allowsDecimals: false, sortOrder: 8 },
];

const now = () => new Date().toISOString();
const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const unitById = (id: string) => UNITS.find((u) => u.id === id) ?? UNITS[0];

async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const writeJson = (key: string, value: unknown) =>
  AsyncStorage.setItem(key, JSON.stringify(value));

const readProducts = () => readJson<ProductDto[]>(PRODUCTS_KEY, []);
// Listas guardadas já no formato "detail" (com items); summary é derivado.
const readLists = () => readJson<ShoppingListDetailDto[]>(LISTS_KEY, []);

function toSummary(list: ShoppingListDetailDto): ShoppingListSummaryDto {
  const { items, ...rest } = list;
  return { ...rest, itemCount: items.length };
}

function buildProduct(input: UpsertProductRequest): ProductDto {
  const ts = now();
  const unit = unitById(input.defaultUnitId);
  return {
    id: newId(),
    name: input.name,
    categoryLabel: input.categoryLabel,
    brand: input.brand ?? null,
    barcode: input.barcode ?? null,
    origin: 'user',
    defaultUnitId: unit.id,
    defaultUnit: unit,
    estimatedPrice: input.estimatedPrice ?? null,
    notes: input.notes ?? null,
    archivedAt: null,
    createdAt: ts,
    updatedAt: ts,
  };
}

async function buildItem(
  input: UpsertShoppingListItemRequest,
  sortOrder: number
): Promise<ShoppingListItemDto> {
  const products = await readProducts();
  const product = products.find((p) => p.id === input.productId);
  const unit = unitById(input.unitId);
  return {
    id: newId(),
    productId: input.productId,
    productName: product?.name ?? 'Produto',
    categoryLabel: product?.categoryLabel ?? '',
    quantity: input.quantity,
    unitId: unit.id,
    unit,
    expectedPrice: input.expectedPrice ?? null,
    priority: input.priority ?? 'normal',
    notes: input.notes ?? null,
    sortOrder,
  };
}

/** Rotas /shopping-lists/:id... — carrega a lista ou lança 404. */
async function withList(
  lists: ShoppingListDetailDto[],
  id: string
): Promise<ShoppingListDetailDto> {
  const list = lists.find((l) => l.id === id);
  if (!list) throw new ApiError(404, 'Lista não encontrada');
  return list;
}

type Json = Record<string, unknown>;

export async function handleLocalRequest<T>(
  rawPath: string,
  method: string,
  bodyStr?: string
): Promise<T> {
  const [path, queryStr = ''] = rawPath.split('?');
  const query = new URLSearchParams(queryStr);
  const body: Json = bodyStr ? JSON.parse(bodyStr) : {};
  const segments = path.split('/').filter(Boolean); // ex: ['shopping-lists', ':id', 'items']

  // --- Sessão / conta ---
  if (path === '/me' && method === 'GET') {
    const user = await readJson(OFFLINE_USER_KEY, DEFAULT_USER);
    return { user } as T;
  }
  if (path === '/auth/logout') return undefined as T;

  // --- Units ---
  if (path === '/units' && method === 'GET') return { units: UNITS } as T;

  // --- Products ---
  if (segments[0] === 'products') {
    const products = await readProducts();

    if (segments.length === 1 && method === 'GET') {
      const q = (query.get('query') ?? '').trim().toLowerCase();
      const visible = products.filter(
        (p) =>
          !p.archivedAt &&
          (!q ||
            p.name.toLowerCase().includes(q) ||
            (p.brand ?? '').toLowerCase().includes(q) ||
            p.categoryLabel.toLowerCase().includes(q))
      );
      return { products: visible } as T;
    }

    if (segments.length === 1 && method === 'POST') {
      const product = buildProduct(body as unknown as UpsertProductRequest);
      products.push(product);
      await writeJson(PRODUCTS_KEY, products);
      return product as T;
    }

    const id = segments[1];
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) throw new ApiError(404, 'Produto não encontrado');

    if (segments.length === 2 && method === 'PATCH') {
      const input = body as unknown as UpsertProductRequest;
      const unit = unitById(input.defaultUnitId);
      products[idx] = {
        ...products[idx],
        name: input.name,
        categoryLabel: input.categoryLabel,
        brand: input.brand ?? null,
        barcode: input.barcode ?? null,
        defaultUnitId: unit.id,
        defaultUnit: unit,
        estimatedPrice: input.estimatedPrice ?? null,
        notes: input.notes ?? null,
        updatedAt: now(),
      };
      await writeJson(PRODUCTS_KEY, products);
      return products[idx] as T;
    }

    if (segments[2] === 'archive' && method === 'POST') {
      products[idx] = { ...products[idx], archivedAt: now(), updatedAt: now() };
      await writeJson(PRODUCTS_KEY, products);
      return products[idx] as T;
    }
  }

  // --- Shopping lists ---
  if (segments[0] === 'shopping-lists') {
    const lists = await readLists();

    if (segments.length === 1 && method === 'GET') {
      const active = lists.filter((l) => l.status === 'active').map(toSummary);
      return { shoppingLists: active } as T;
    }

    if (segments.length === 1 && method === 'POST') {
      const input = body as unknown as UpsertShoppingListRequest;
      const ts = now();
      const list: ShoppingListDetailDto = {
        id: newId(),
        name: input.name,
        description: input.description ?? null,
        status: 'active',
        duplicatedFromListId: null,
        itemCount: 0,
        isOwner: true,
        sharedByName: null,
        memberCount: 0,
        createdAt: ts,
        updatedAt: ts,
        items: [],
      };
      lists.push(list);
      await writeJson(LISTS_KEY, lists);
      return list as T;
    }

    const id = segments[1];

    // /shopping-lists/:id
    if (segments.length === 2) {
      const list = await withList(lists, id);
      if (method === 'GET') return list as T;
      if (method === 'PATCH') {
        const input = body as unknown as UpsertShoppingListRequest;
        list.name = input.name;
        list.description = input.description ?? null;
        list.updatedAt = now();
        await writeJson(LISTS_KEY, lists);
        return list as T;
      }
      if (method === 'DELETE') {
        await writeJson(LISTS_KEY, lists.filter((l) => l.id !== id));
        return undefined as T;
      }
    }

    // /shopping-lists/:id/archive | /duplicate
    if (segments.length === 3 && segments[2] === 'archive' && method === 'POST') {
      const list = await withList(lists, id);
      list.status = 'archived';
      list.updatedAt = now();
      await writeJson(LISTS_KEY, lists);
      return list as T;
    }
    if (segments.length === 3 && segments[2] === 'duplicate' && method === 'POST') {
      const source = await withList(lists, id);
      const ts = now();
      const copy: ShoppingListDetailDto = {
        ...source,
        id: newId(),
        name: `${source.name} (cópia)`,
        status: 'active',
        duplicatedFromListId: source.id,
        createdAt: ts,
        updatedAt: ts,
        items: source.items.map((it) => ({ ...it, id: newId() })),
      };
      lists.push(copy);
      await writeJson(LISTS_KEY, lists);
      return copy as T;
    }

    // /shopping-lists/:id/items[/:itemId]
    if (segments[2] === 'items') {
      const list = await withList(lists, id);

      if (segments.length === 3 && method === 'POST') {
        const item = await buildItem(
          body as unknown as UpsertShoppingListItemRequest,
          list.items.length
        );
        list.items.push(item);
        list.updatedAt = now();
        await writeJson(LISTS_KEY, lists);
        return list as T;
      }

      const itemId = segments[3];
      const itemIdx = list.items.findIndex((it) => it.id === itemId);
      if (itemIdx === -1) throw new ApiError(404, 'Item não encontrado');

      if (method === 'PATCH') {
        const input = body as unknown as UpsertShoppingListItemRequest;
        const unit = unitById(input.unitId);
        const products = await readProducts();
        const product = products.find((p) => p.id === input.productId);
        list.items[itemIdx] = {
          ...list.items[itemIdx],
          productId: input.productId,
          productName: product?.name ?? list.items[itemIdx].productName,
          categoryLabel: product?.categoryLabel ?? list.items[itemIdx].categoryLabel,
          quantity: input.quantity,
          unitId: unit.id,
          unit,
          expectedPrice: input.expectedPrice ?? null,
          priority: input.priority ?? 'normal',
          notes: input.notes ?? null,
        };
        list.updatedAt = now();
        await writeJson(LISTS_KEY, lists);
        return list as T;
      }

      if (method === 'DELETE') {
        list.items.splice(itemIdx, 1);
        list.updatedAt = now();
        await writeJson(LISTS_KEY, lists);
        return list as T;
      }
    }
  }

  throw new ApiError(501, 'Função indisponível no modo offline.');
}
