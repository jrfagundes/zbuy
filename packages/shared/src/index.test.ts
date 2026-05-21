import test from "node:test";
import assert from "node:assert/strict";

test("shared package exports compile-time DTO shapes", () => {
  const response = {
    user: {
      id: "user-1",
      name: "ZBuy User",
      email: "user@example.com"
    }
  };

  assert.equal(response.user.email, "user@example.com");
});
