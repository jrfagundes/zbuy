import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { CatalogService } from "./catalog.service";
import { CosmosService } from "./cosmos.service";

@Module({
  imports: [PrismaModule],
  providers: [CatalogService, CosmosService],
  exports: [CatalogService]
})
export class CatalogModule {}
