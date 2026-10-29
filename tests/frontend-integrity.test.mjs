import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

test("build preserva os arquivos oficiais de frontend byte por byte", async () => {
  execFileSync(process.execPath, ["scripts/build.mjs"], { stdio: "pipe" });
  for (const name of ["index.html", "script.js", "style.css"]) {
    const [original, generated] = await Promise.all([
      readFile(name), readFile(join("dist", name))
    ]);
    assert.deepEqual(generated, original, name);
  }
  const images = await readdir(join("assets", "images"));
  assert.equal(images.filter(x => x.endsWith(".webp")).length, 11);
  for (const name of images) {
    const original = await readFile(join("assets", "images", name));
    const copied = await readFile(join("dist", "assets", "images", name));
    assert.deepEqual(copied, original, name);
  }
  const pdf = "assets/amostra-atividades.pdf";
  assert.deepEqual(await readFile(join("dist", pdf)), await readFile(pdf));
  assert.ok((await stat(join("dist", pdf))).size > 0);
});

test("preços e links de checkout externo da Cakto são exibidos corretamente", async () => {
  const html = await readFile("index.html", "utf8");
  for (const token of ["R$ 14,90", "9,90", "R$ 29,90", "19,90"]) {
    assert.ok(html.includes(token), `Preço exibido ausente: ${token}`);
  }
  assert.ok(html.includes('"checkoutConfigured":true'));
  assert.ok(html.includes('"checkoutMode":"external"'));
  assert.ok(html.includes('href="https://pay.cakto.com.br/zdk6j2p_1243948"'));
  assert.ok(html.includes('href="https://pay.cakto.com.br/msvk7xs_1245425"'));
  assert.ok(!html.includes("Compra ainda não disponível"));
  const script = await readFile("script.js", "utf8");
  assert.ok(!script.includes("planModal"));
  assert.ok(html.includes("assets/images/imagem-01.webp"));
});
