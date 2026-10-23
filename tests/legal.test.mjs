import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  CURRENT_TERMS_VERSION, LEGAL_DOCUMENT_APPROVED,
  CHECKOUT_REQUIRES_EXPLICIT_ACCEPTANCE, APPROVED_DISPLAY_PRICES_CENTS
} from "../server/legal.mjs";

test("termos versionados e ainda não liberados para compra", async () => {
  const html = await readFile("termos.html", "utf8");
  assert.equal(CURRENT_TERMS_VERSION, "2026-10-22.2");
  assert.equal(LEGAL_DOCUMENT_APPROVED, false);
  assert.equal(CHECKOUT_REQUIRES_EXPLICIT_ACCEPTANCE, true);
  assert.ok(html.includes(CURRENT_TERMS_VERSION));
  assert.ok(html.includes("MINUTA EM REVISÃO"));
  assert.ok(html.includes("[PREENCHER NOME CIVIL COMPLETO DO PEDRO]"));
  assert.ok(html.includes("[PREENCHER CPF DO PEDRO]"));
  assert.ok(html.includes("[PREENCHER ENDEREÇO]"));
  assert.ok(html.includes("Venturini Group"));
  assert.ok(html.includes("venturinigroup0709@gmail.com"));
  assert.ok(!html.includes("[PREENCHER E-MAIL DE ATENDIMENTO]"));
  assert.ok(html.includes("7 (sete) dias"));
  assert.ok(html.includes("não gera, por si só, renúncia automática"));
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
  assert.ok(script.includes('"index.html"'));
  assert.ok(script.includes('"assets"'));
});
