import { HealthController } from "./health.controller";

describe("HealthController", () => {
  it("returns liveness", () => {
    const controller = new HealthController();
    expect(controller.live()).toEqual({ status: "ok" });
  });

  it("returns API-only readiness before database wiring", () => {
    const controller = new HealthController();
    expect(controller.ready()).toEqual({ status: "ok", checks: { api: "ok" } });
  });
});
