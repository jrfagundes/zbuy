import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RequestContextMiddleware } from "./request-context/request-context.middleware";

@Module({
  imports: [PrismaModule, HealthModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes("*");
  }
}
