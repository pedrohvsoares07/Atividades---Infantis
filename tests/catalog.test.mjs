import test from "node:test";
import assert from "node:assert/strict";
import { toPublicCatalog, toPublicCatalogItem } from "../server/catalog.mjs";

const kit = {
  slug: "kit-essencial", name: "Kit Essencial", description: "100 atividades",
  age_min: 6, age_max: 10, activity_count: 100,
  currency: "BRL", status: "draft", price_cents: null,
  internal_secret: "não expor", id: "interno",
};

test("draft não expõe preço nem habilita checkout", () => {
  const [result] = toPublicCatalog([kit]);
  assert.equal(result.status, "coming_soon");
  assert.equal(result.priceCents, null);
  assert.equal(result.purchaseEnabled, false);
  assert.equal(result.id, undefined);
  assert.equal(result.internal_secret, undefined);
});

test("produto não oficial nunca aparece", () => {
  assert.deepEqual(toPublicCatalog([{ ...kit, slug: "teste-sprint03", status: "active", price_cents: 100 }]), []);
  assert.equal(toPublicCatalogItem(null), null);
});

test("produto oficial ativo não ativa checkout", () => {
  const [result] = toPublicCatalog([{ ...kit, status: "active", price_cents: 990 }]);
  assert.equal(result.status, "published");
  assert.equal(result.priceCents, 990);
  assert.equal(result.purchaseEnabled, false);
});

test("preço inválido não é publicado", () => {
  const [result] = toPublicCatalog([{ ...kit, status: "active", price_cents: -1 }]);
  assert.equal(result.priceCents, null);
});
