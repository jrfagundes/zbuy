import { Injectable } from "@nestjs/common";
import { trace } from "@opentelemetry/api";
import pino from "pino";

type LogContext = Record<string, unknown>;

@Injectable()
export class LoggerService {
  private readonly logger = pino({
    level: process.env.NODE_ENV === "test" ? "silent" : process.env.LOG_LEVEL ?? "info",
    base: {
      service: process.env.OTEL_SERVICE_NAME ?? "zbuy-api",
      environment: process.env.OTEL_ENVIRONMENT ?? "local"
    }
  });

  info(message: string, context: LogContext = {}) {
    this.logger.info({ ...this.traceContext(), ...context }, message);
  }

  error(message: string, context: LogContext = {}) {
    this.logger.error({ ...this.traceContext(), ...context }, message);
  }

  private traceContext() {
    const spanContext = trace.getActiveSpan()?.spanContext();
    if (!spanContext) return {};

    return {
      traceId: spanContext.traceId,
      spanId: spanContext.spanId
    };
  }
}
