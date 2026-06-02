import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { CatalogModule } from "../catalog/catalog.module";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
  imports: [AuthModule, CatalogModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
