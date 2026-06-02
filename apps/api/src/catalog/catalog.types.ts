export interface CatalogProductDto {
  id: string;
  barcode: string;
  name: string;
  brand: string | null;
  categoryLabel: string;
  source: string;
}

export interface CosmosProductResponse {
  gtin: string;
  description: string;
  brand: string | null;
  gtinType: string;
  thumbnail: string | null;
  avg_price: number | null;
  max_price: number | null;
  min_price: number | null;
  nbm: string | null;
  ncm: string | null;
}
