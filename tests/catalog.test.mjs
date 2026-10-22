import test from "node:test";
import assert from "node:assert/strict";
import { toPublicCatalog } from "../server/catalog.mjs";

const kit = {
  slug: "kit-essencial", name: "Kit Essencial", description: "Atividades",
  age_min: 6, age_max: 10, activity_count: 100,
  currency: "BRL", status: "draft", price_cents: null,
  id: "internal-id", reference_images: ["private.png"],
};

test("mostra kit em rascunho sem liberar compra, preço ou dados privados", () => {
  const [item] = toPublicCatalog([kit]);
  assert.equal(item.status, "coming_soon");
  assert.equal(item.priceCents, null);
  assert.equal(item.purchaseEnabled, false);
  assert.equal(item.activityCount, 100);
  assert.equal(item.id, undefined);
  assert.equal(item.reference_images, undefined);
});

test("exclui produto interno de teste mesmo quando ativo", () => {
  const rows = toPublicCatalog([{...kit, slug: "teste-sprint03", status: "active", price_cents: 100}]);
  assert.deepEqual(rows, []);
});

test("kit oficial ativo continua sem checkout", () => {
  const [item] = toPublicCatalog([{ ...kit, status: "active", price_cents: 990 }]);
  assert.equal(item.priceCents, 990);
  assert.equal(item.status, "published");
  assert.equal(item.purchaseEnabled, false);
});
