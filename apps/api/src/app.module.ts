import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { RequestContextMiddleware } from "./request-context/request-context.middleware";

@Module({
  imports: [HealthModule]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes("*");
  }
}
