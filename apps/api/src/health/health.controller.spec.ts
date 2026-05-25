import { HealthController } from "./health.controller";

describe("HealthController", () => {
  const prisma = { isReady: jest.fn() };

  beforeEach(() => {
    prisma.isReady.mockReset();
  });

  it("returns liveness", () => {
    const controller = new HealthController(prisma as never);
    expect(controller.live()).toEqual({ status: "ok" });
  });

  it("returns readiness when PostgreSQL is reachable", async () => {
    prisma.isReady.mockResolvedValue(true);
    const controller = new HealthController(prisma as never);

    await expect(controller.ready()).resolves.toEqual({
      status: "ok",
      checks: { api: "ok", postgres: "ok" }
    });
    expect(prisma.isReady).toHaveBeenCalledTimes(1);
  });

  it("throws service unavailable when PostgreSQL is unreachable", async () => {
    prisma.isReady.mockRejectedValue(new Error("database unavailable"));
    const controller = new HealthController(prisma as never);

    await expect(controller.ready()).rejects.toMatchObject({
      response: {
        status: "error",
        checks: { api: "ok", postgres: "error" }
      },
      status: 503
    });
  });
});
