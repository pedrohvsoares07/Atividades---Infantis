import test from "node:test";
import assert from "node:assert/strict";
import checkoutHandler from "../api/checkout.js";
import catalogHandler from "../api/catalog.js";
import healthHandler from "../api/health.js";

function mockResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(name, value) { this.headers[name.toLowerCase()] = value; },
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
}

test("checkout permanece desativado mesmo com POST", () => {
  const res = mockResponse();
  checkoutHandler({ method: "POST" }, res);
  assert.equal(res.statusCode, 503);
  assert.deepEqual(res.body, { error: "checkout_disabled" });
});

test("checkout rejeita GET, independentemente do estado do banco", () => {
  const res = mockResponse();
  checkoutHandler({ method: "GET" }, res);
  assert.equal(res.statusCode, 405);
});

test("catálogo e health só permitem GET", async () => {
  for (const handler of [catalogHandler, healthHandler]) {
    const res = mockResponse();
    await handler({ method: "POST" }, res);
    assert.equal(res.statusCode, 405);
    assert.deepEqual(res.body, { error: "method_not_allowed" });
  }
});
