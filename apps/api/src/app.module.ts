import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { HealthModule } from "./health/health.module";
import { MeModule } from "./me/me.module";
import { ObservabilityModule } from "./observability/observability.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductsModule } from "./products/products.module";
import { PurchaseLocationsModule } from "./purchase-locations/purchase-locations.module";
import { RequestContextMiddleware } from "./request-context/request-context.middleware";
import { ShoppingListsModule } from "./shopping-lists/shopping-lists.module";
import { ShoppingSessionsModule } from "./shopping-sessions/shopping-sessions.module";
import { UnitsModule } from "./units/units.module";

@Module({
  imports: [
    ObservabilityModule,
    PrismaModule,
    HealthModule,
    AuthModule,
    MeModule,
    UnitsModule,
    ProductsModule,
    PurchaseLocationsModule,
    ShoppingListsModule,
    ShoppingSessionsModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes("*");
  }
}
