import cookieParser from "cookie-parser";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const allowedOrigins = (process.env.WEB_ORIGIN ?? "http://localhost:3000,http://127.0.0.1:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  app.enableCors({
    origin: allowedOrigins,
    credentials: true
  });
  const port = Number(process.env.API_PORT ?? 3001);
  await app.listen(port);
}
