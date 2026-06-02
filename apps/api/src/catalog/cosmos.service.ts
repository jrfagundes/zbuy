import { Injectable, Logger } from "@nestjs/common";
import type { CosmosProductResponse } from "./catalog.types";

/**
 * Client for the Cosmos Bluesoft API (https://cosmos.bluesoft.com.br/api).
 * Used as a fallback when a scanned barcode is not found in the user's products
 * nor in the local ProductCatalog.
 *
 * Requires the COSMOS_API_TOKEN environment variable to be set.
 * When the token is absent the service silently returns null (graceful no-op).
 */
@Injectable()
export class CosmosService {
  private readonly logger = new Logger(CosmosService.name);
  private readonly baseUrl = "https://api.cosmos.bluesoft.com.br";

  get isConfigured(): boolean {
    return Boolean(process.env.COSMOS_API_TOKEN);
  }

  async lookupBarcode(barcode: string): Promise<CosmosProductResponse | null> {
    if (!this.isConfigured) {
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/gtins/${encodeURIComponent(barcode)}`, {
        headers: {
          "X-Cosmos-Token": process.env.COSMOS_API_TOKEN!,
          "Content-Type": "application/json",
          "User-Agent": "ZBuy/1.0"
        },
        signal: AbortSignal.timeout(5000)
      });

      if (response.status === 404) return null;

      if (!response.ok) {
        this.logger.warn(`Cosmos API returned ${response.status} for barcode ${barcode}`);
        return null;
      }

      return (await response.json()) as CosmosProductResponse;
    } catch (err) {
      this.logger.warn(`Cosmos API lookup failed for barcode ${barcode}: ${String(err)}`);
      return null;
    }
  }
}
