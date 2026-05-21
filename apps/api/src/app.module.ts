import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { HealthModule } from "./health/health.module";
import { MeModule } from "./me/me.module";
import { ObservabilityModule } from "./observability/observability.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProductsModule } from "./products/products.module";
import { RequestContextMiddleware } from "./request-context/request-context.middleware";
import { UnitsModule } from "./units/units.module";

@Module({
  imports: [ObservabilityModule, PrismaModule, HealthModule, AuthModule, MeModule, UnitsModule, ProductsModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes("*");
  }
}
