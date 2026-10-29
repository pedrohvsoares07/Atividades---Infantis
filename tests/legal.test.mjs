import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  CURRENT_TERMS_VERSION, LEGAL_DOCUMENT_APPROVED,
  CHECKOUT_REQUIRES_EXPLICIT_ACCEPTANCE, APPROVED_DISPLAY_PRICES_CENTS
} from "../server/legal.mjs";

test("documentos legais revisados e pendência cadastral sinalizada", async () => {
  const terms = await readFile("termos.html", "utf8");
  const privacy = await readFile("privacidade.html", "utf8");
  const home = await readFile("index.html", "utf8");
  assert.equal(CURRENT_TERMS_VERSION, "2026-10-28.1");
  assert.equal(LEGAL_DOCUMENT_APPROVED, false);
  assert.equal(CHECKOUT_REQUIRES_EXPLICIT_ACCEPTANCE, true);
  for (const doc of [terms, privacy]) {
    assert.ok(doc.includes("2026-10-28.1"));
    assert.ok(doc.includes("pendente de confirmação"));
    assert.ok(doc.includes("venturinigroup0709@gmail.com"));
    assert.ok(!doc.includes("[PREENCHER"));
    assert.ok(!doc.includes("Pagamentos continuam desativados"));
  }
  assert.ok(terms.includes("R$ 5,90"));
  assert.ok(terms.includes("7 (sete) dias"));
  assert.ok(privacy.includes("Vercel"));
  assert.ok(privacy.includes("Meta"));
  assert.ok(home.includes('href="/privacidade.html"'));
  assert.ok(home.includes('href="/termos.html"'));
});

test("preços confirmados sem expor cobrança prematura", async () => {
  const html = await readFile("termos.html", "utf8");
  assert.deepEqual(APPROVED_DISPLAY_PRICES_CENTS, {"kit-essencial":990,"kit-completo":1990});
  assert.ok(html.includes("R$ 9,90"));
  assert.ok(html.includes("R$ 19,90"));
  const checkout = await readFile("api/checkout.js", "utf8");
  assert.ok(checkout.includes("checkout_disabled"));
});

test("build publica termos extras e preserva frontend anterior", async () => {
  const script = await readFile("scripts/build.mjs", "utf8");
  assert.ok(script.includes('"termos.html"'));
  assert.ok(script.includes('"privacidade.html"'));
  assert.ok(script.includes('"index.html"'));
  assert.ok(script.includes('"assets"'));
});
