import { EventEmitter } from "node:events";
import type { NextFunction, Request, Response } from "express";
import { LoggerService } from "../observability/logger.service";
import { RequestContextMiddleware } from "./request-context.middleware";

describe("RequestContextMiddleware", () => {
  it("sets a request id and logs completed requests", () => {
    const logger = { info: jest.fn() } as unknown as LoggerService;
    const middleware = new RequestContextMiddleware(logger);
    const req = {
      header: jest.fn().mockReturnValue(" request-123 "),
      method: "GET",
      originalUrl: "/health/live"
    } as unknown as Request;
    const responseEvents = new EventEmitter();
    const res = Object.assign(responseEvents, {
      statusCode: 204,
      setHeader: jest.fn()
    }) as unknown as Response;
    const next: NextFunction = jest.fn();

    middleware.use(req, res, next);
    responseEvents.emit("finish");

    expect(req.requestId).toBe("request-123");
    expect(res.setHeader).toHaveBeenCalledWith("x-request-id", "request-123");
    expect(next).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith(
      "http_request_completed",
      expect.objectContaining({
        requestId: "request-123",
        method: "GET",
        path: "/health/live",
        statusCode: 204,
        durationMs: expect.any(Number)
      })
    );
  });
});
